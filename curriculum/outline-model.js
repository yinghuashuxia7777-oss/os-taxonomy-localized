const MIN_LEARNING_AGE = 4;
const MAX_LEARNING_AGE = 15;

function startAge(topic) {
  return topic.ageRangeStart ?? topic.canonical?.ageRangeStart;
}

function endAge(topic) {
  return topic.ageRangeEnd ?? topic.canonical?.ageRangeEnd;
}

function subjectKey(topic) {
  return topic.canonicalSubject || topic.subject || topic.canonical?.subject || "";
}

function domainKey(topic) {
  return topic.canonicalDomain || topic.domain || topic.canonical?.domain || "";
}

function topicLabel(topic) {
  return topic.label || topic.localized?.name || topic.name || topic.canonical?.name || topic.id;
}

function endpointId(endpoint) {
  return typeof endpoint === "object" && endpoint !== null ? endpoint.id : endpoint;
}

function compareText(left, right) {
  return String(left).localeCompare(String(right), "en", { sensitivity: "base" });
}

export function getAvailableAges(topics) {
  const hasValidRange = topics.some((topic) => Number.isFinite(startAge(topic)) && Number.isFinite(endAge(topic)));
  if (!hasValidRange) {
    return [];
  }
  return Array.from(
    { length: MAX_LEARNING_AGE - MIN_LEARNING_AGE + 1 },
    (_, index) => MIN_LEARNING_AGE + index,
  );
}

export function topicStageAtAge(topic, age) {
  const start = startAge(topic);
  const end = endAge(topic);
  if (!Number.isFinite(start) || !Number.isFinite(end) || !Number.isFinite(age)) {
    return null;
  }
  if (age >= 14) {
    return start <= age && end >= age - 1 ? "reinforce" : null;
  }
  if (start === age) {
    return "focus";
  }
  if (start < age && end >= age) {
    return "reinforce";
  }
  return null;
}

function groupTopics(topics) {
  const subjects = new Map();
  topics.forEach((topic) => {
    const subject = subjectKey(topic);
    const domain = domainKey(topic);
    if (!subjects.has(subject)) {
      subjects.set(subject, new Map());
    }
    const domains = subjects.get(subject);
    if (!domains.has(domain)) {
      domains.set(domain, []);
    }
    domains.get(domain).push(topic);
  });

  return [...subjects.entries()]
    .sort(([left], [right]) => compareText(left, right))
    .map(([subject, domains]) => {
      const groupedDomains = [...domains.entries()]
        .sort(([left], [right]) => compareText(left, right))
        .map(([domain, domainTopics]) => ({
          key: domain,
          count: domainTopics.length,
          topics: [...domainTopics].sort((left, right) => compareText(topicLabel(left), topicLabel(right))),
        }));
      return {
        key: subject,
        count: groupedDomains.reduce((total, domain) => total + domain.count, 0),
        domains: groupedDomains,
      };
    });
}

export function buildAgeOutline(topics, age) {
  const focus = [];
  const reinforce = [];
  topics.forEach((topic) => {
    const stage = topicStageAtAge(topic, age);
    if (stage === "focus") {
      focus.push(topic);
    } else if (stage === "reinforce") {
      reinforce.push(topic);
    }
  });
  return {
    focus: groupTopics(focus),
    reinforce: groupTopics(reinforce),
  };
}

export function buildGraphFocus(nodes, links, filters) {
  const age = filters.age;
  const subject = filters.subject || "all";
  const domain = filters.domain || "all";
  const nodeIds = new Set(nodes.map((node) => node.id));
  const focusIds = new Set(
    nodes
      .filter((node) => topicStageAtAge(node, age))
      .filter((node) => subject === "all" || subjectKey(node) === subject)
      .filter((node) => domain === "all" || domainKey(node) === domain)
      .map((node) => node.id),
  );
  const prerequisiteIds = new Set();
  const nextIds = new Set();

  links.forEach((link) => {
    const source = endpointId(link.source);
    const target = endpointId(link.target);
    if (focusIds.has(target) && !focusIds.has(source) && nodeIds.has(source)) {
      prerequisiteIds.add(source);
    }
    if (focusIds.has(source) && !focusIds.has(target) && nodeIds.has(target)) {
      nextIds.add(target);
    }
  });

  const visibleIds = new Set([...focusIds, ...prerequisiteIds, ...nextIds]);
  const visibleLinks = links.filter((link) => {
    const source = endpointId(link.source);
    const target = endpointId(link.target);
    return visibleIds.has(source) && visibleIds.has(target) && (focusIds.has(source) || focusIds.has(target));
  });

  return {
    focusIds,
    prerequisiteIds,
    nextIds,
    visibleIds,
    links: visibleLinks,
  };
}

function rankEntry(current, left, right) {
  const leftSameDomain = domainKey(left.node) === domainKey(current) ? 0 : 1;
  const rightSameDomain = domainKey(right.node) === domainKey(current) ? 0 : 1;
  if (leftSameDomain !== rightSameDomain) return leftSameDomain - rightSameDomain;

  const leftSameSubject = subjectKey(left.node) === subjectKey(current) ? 0 : 1;
  const rightSameSubject = subjectKey(right.node) === subjectKey(current) ? 0 : 1;
  if (leftSameSubject !== rightSameSubject) return leftSameSubject - rightSameSubject;

  const currentAge = startAge(current);
  const leftDistance = Math.abs(startAge(left.node) - currentAge);
  const rightDistance = Math.abs(startAge(right.node) - currentAge);
  if (leftDistance !== rightDistance) return leftDistance - rightDistance;

  return compareText(topicLabel(left.node), topicLabel(right.node));
}

export function rankNextSteps(current, outgoingLinks, nodeById) {
  const byTarget = new Map();
  outgoingLinks.forEach((link) => {
    const targetId = endpointId(link.target);
    const node = nodeById.get(targetId);
    if (!node || targetId === current.id) {
      return;
    }
    const existing = byTarget.get(targetId);
    if (!existing || (existing.link.strength !== "hard" && link.strength === "hard")) {
      byTarget.set(targetId, { node, link });
    }
  });

  const entries = [...byTarget.values()];
  return {
    recommended: entries.filter((entry) => entry.link.strength === "hard").sort((left, right) => rankEntry(current, left, right)),
    extensions: entries.filter((entry) => entry.link.strength !== "hard").sort((left, right) => rankEntry(current, left, right)),
  };
}
