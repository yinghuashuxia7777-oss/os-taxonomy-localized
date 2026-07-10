import {
  buildAgeOutline,
  buildGraphFocus,
  getAvailableAges,
  rankNextSteps,
  topicStageAtAge,
} from "./outline-model.js?v=20260710-agepaths-final";

const LANG = {
  en: {
    eyebrow: "Open curriculum taxonomy",
    title: "Marble Skill Taxonomy",
    subtitle: "1,590 micro-topics connected by 3,221 prerequisite relationships across the primary years.",
    outlineEyebrow: "Age guide",
    outlineTitle: "Learning path",
    outlineButton: "Learning path",
    closeOutline: "Close learning path",
    chooseAge: "Choose age",
    focusLearning: "Focus learning",
    reinforceLearning: "Continue practising",
    extensionLearning: "Consolidation & extension",
    learningGoal: "Learning goal",
    masterySignal: "How to tell",
    recommendedNext: "Recommended next",
    furtherExtensions: "Further extensions",
    backToPrevious: "Back to previous concept",
    noTopics: "No topics in this section.",
    prerequisiteContext: "Earlier prerequisite",
    nextContext: "Next stage",
    language: "Language",
    concepts: "concepts",
    links: "prerequisite links",
    visible: "in focus",
    loadingTitle: "Loading curriculum graph",
    loadingText: "Preparing concepts and prerequisite links...",
    emptyTitle: "Select a concept",
    emptyText: "Its prerequisites and unlocked concepts will appear here.",
    evidence: "Mastery evidence",
    assessment: "Assessment prompt",
    prerequisites: "Prerequisites",
    unlocks: "Unlocks",
    allSubjects: "All subjects",
    age: "Age",
    noItems: "None",
    errorTitle: "Unable to load curriculum data",
    errorText: "Check that the page is served over HTTP and the data files are present.",
    subjects: {
      Computing: "Computing",
      English: "English",
      History: "History",
      "Learning to Learn": "Learning to Learn",
      "Life Skills": "Life Skills",
      Mathematics: "Mathematics",
      "Personal & Social Development": "Personal & Social Development",
      Science: "Science",
    },
  },
  zh: {
    eyebrow: "开放课程知识图谱",
    title: "Marble 技能分类体系",
    subtitle: "1,590 个微主题，通过 3,221 条先修关系连接小学阶段学习内容。",
    outlineEyebrow: "年龄学习指南",
    outlineTitle: "学习路径",
    outlineButton: "学习路径",
    closeOutline: "关闭学习路径",
    chooseAge: "选择年龄",
    focusLearning: "重点学习",
    reinforceLearning: "继续巩固",
    extensionLearning: "巩固与延伸",
    learningGoal: "学习目标",
    masterySignal: "掌握判断",
    recommendedNext: "建议优先学习",
    furtherExtensions: "后续可延伸",
    backToPrevious: "返回上一个知识点",
    noTopics: "本部分暂无知识点。",
    prerequisiteContext: "较早的先修知识",
    nextContext: "下一阶段",
    language: "语言",
    concepts: "概念",
    links: "先修链接",
    visible: "本阶段",
    loadingTitle: "正在加载课程图谱",
    loadingText: "正在准备概念与先修关系...",
    emptyTitle: "选择一个概念",
    emptyText: "它的先修知识和后续解锁概念会显示在这里。",
    evidence: "掌握证据",
    assessment: "评估提示",
    prerequisites: "先修知识",
    unlocks: "解锁内容",
    allSubjects: "全部科目",
    age: "年龄",
    noItems: "无",
    errorTitle: "无法加载课程数据",
    errorText: "请确认页面通过 HTTP 服务打开，并且数据文件存在。",
    subjects: {
      Computing: "计算机科学",
      English: "英语",
      History: "历史",
      "Learning to Learn": "学会学习",
      "Life Skills": "生活技能",
      Mathematics: "数学",
      "Personal & Social Development": "个人与社会发展",
      Science: "科学",
    },
  },
  th: {
    eyebrow: "แผนผังหลักสูตรแบบเปิด",
    title: "อนุกรมวิธานทักษะ Marble",
    subtitle: "ไมโครหัวข้อ 1,590 รายการ เชื่อมด้วยความสัมพันธ์ความรู้พื้นฐาน 3,221 เส้นตลอดช่วงประถมศึกษา",
    outlineEyebrow: "คู่มือการเรียนรู้ตามวัย",
    outlineTitle: "เส้นทางการเรียนรู้",
    outlineButton: "เส้นทางการเรียนรู้",
    closeOutline: "ปิดเส้นทางการเรียนรู้",
    chooseAge: "เลือกอายุ",
    focusLearning: "เนื้อหาหลักที่ควรเรียน",
    reinforceLearning: "ทบทวนและฝึกต่อ",
    extensionLearning: "ทบทวนและต่อยอด",
    learningGoal: "เป้าหมายการเรียนรู้",
    masterySignal: "เกณฑ์สังเกตความเข้าใจ",
    recommendedNext: "แนะนำให้เรียนต่อ",
    furtherExtensions: "หัวข้อต่อยอด",
    backToPrevious: "กลับไปแนวคิดก่อนหน้า",
    noTopics: "ไม่มีหัวข้อในส่วนนี้",
    prerequisiteContext: "พื้นฐานก่อนหน้า",
    nextContext: "ขั้นถัดไป",
    language: "ภาษา",
    concepts: "แนวคิด",
    links: "ลิงก์ความรู้พื้นฐาน",
    visible: "ในช่วงนี้",
    loadingTitle: "กำลังโหลดแผนผังหลักสูตร",
    loadingText: "กำลังเตรียมแนวคิดและความสัมพันธ์ความรู้พื้นฐาน...",
    emptyTitle: "เลือกแนวคิด",
    emptyText: "ความรู้พื้นฐานและแนวคิดที่ต่อยอดจะแสดงที่นี่",
    evidence: "หลักฐานการเรียนรู้",
    assessment: "คำถามประเมิน",
    prerequisites: "ความรู้พื้นฐาน",
    unlocks: "ต่อยอดไปสู่",
    allSubjects: "ทุกวิชา",
    age: "อายุ",
    noItems: "ไม่มี",
    errorTitle: "โหลดข้อมูลหลักสูตรไม่ได้",
    errorText: "ตรวจสอบว่าเปิดหน้านี้ผ่าน HTTP และมีไฟล์ข้อมูลครบถ้วน",
    subjects: {
      Computing: "วิทยาการคอมพิวเตอร์",
      English: "ภาษาอังกฤษ",
      History: "ประวัติศาสตร์",
      "Learning to Learn": "การเรียนรู้วิธีเรียน",
      "Life Skills": "ทักษะชีวิต",
      Mathematics: "คณิตศาสตร์",
      "Personal & Social Development": "พัฒนาการส่วนบุคคลและสังคม",
      Science: "วิทยาศาสตร์",
    },
  },
};

const SUBJECT_COLORS = {
  Computing: "#78e0ff",
  English: "#f5c15b",
  History: "#ff8a7a",
  "Learning to Learn": "#c59cff",
  "Life Skills": "#74d99f",
  Mathematics: "#7aa7ff",
  "Personal & Social Development": "#ff80bd",
  Science: "#62e6c8",
};

const NEARBY_NODE_PICK_RADIUS = 48;
const POINTER_CLICK_MAX_DRIFT = 10;
const POINTER_FALLBACK_CLEAR_MS = 300;

const state = {
  language: "en",
  age: 4,
  subject: "all",
  domain: "all",
  availableAges: [],
  graphFocus: null,
  outlineOpen: !window.matchMedia("(max-width: 1360px)").matches,
  expandedSubjects: new Set(),
  expandedDomains: new Set(),
  selectionHistory: [],
  graph: null,
  englishTopics: null,
  englishDependencies: null,
  localizedTopics: null,
  localizedDependencies: null,
  nodes: [],
  links: [],
  nodeById: new Map(),
  canonicalById: new Map(),
  incoming: new Map(),
  outgoing: new Map(),
  highlightedNodes: new Set(),
  highlightedLinks: new Set(),
  selectedNode: null,
  hoveredNode: null,
  graphPointerFallbackInstalled: false,
  pointerDown: null,
  recentPointerFallback: null,
  languageLoadVersion: 0,
};

const els = {
  appShell: document.getElementById("appShell"),
  outlinePanel: document.getElementById("outlinePanel"),
  outlineToggle: document.getElementById("outlineToggle"),
  outlineClose: document.getElementById("outlineClose"),
  ageSelector: document.getElementById("ageSelector"),
  outlineAgeTitle: document.getElementById("outlineAgeTitle"),
  outlineAgeSummary: document.getElementById("outlineAgeSummary"),
  outlineTree: document.getElementById("outlineTree"),
  graph: document.getElementById("graph"),
  fallbackGraph: document.getElementById("fallbackGraph"),
  subjectStrip: document.getElementById("subjectStrip"),
  languageSelect: document.getElementById("languageSelect"),
  topicCount: document.getElementById("topicCount"),
  edgeCount: document.getElementById("edgeCount"),
  visibleCount: document.getElementById("visibleCount"),
  statusLayer: document.getElementById("statusLayer"),
  statusTitle: document.getElementById("statusTitle"),
  statusText: document.getElementById("statusText"),
  emptyState: document.getElementById("emptyState"),
  topicDetail: document.getElementById("topicDetail"),
  detailSubject: document.getElementById("detailSubject"),
  closeDetail: document.getElementById("closeDetail"),
  detailTitle: document.getElementById("detailTitle"),
  detailMeta: document.getElementById("detailMeta"),
  detailDescription: document.getElementById("detailDescription"),
  detailEvidence: document.getElementById("detailEvidence"),
  detailAssessment: document.getElementById("detailAssessment"),
  prerequisiteList: document.getElementById("prerequisiteList"),
  unlockList: document.getElementById("unlockList"),
  extensionList: document.getElementById("extensionList"),
};

function t(key) {
  return LANG[state.language][key] || LANG.en[key] || key;
}

function subjectLabel(subject) {
  return LANG[state.language].subjects[subject] || subject;
}

function localizeStaticText() {
  document.documentElement.lang = state.language === "en" ? "en" : state.language;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  els.languageSelect.setAttribute("aria-label", t("language"));
  els.outlineToggle.setAttribute("aria-label", t("outlineButton"));
  els.outlineClose.setAttribute("aria-label", t("closeOutline"));
  els.outlineClose.title = t("closeOutline");
  els.ageSelector.setAttribute("aria-label", t("chooseAge"));
  els.outlineTree.setAttribute("aria-label", t("outlineTitle"));
}

async function fetchJson(path) {
  const response = await fetch(path, { cache: "no-cache" });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${path}`);
  }
  return response.json();
}

function dataPath(kind, language) {
  const suffix = language === "en" ? "" : `_${language}`;
  return `../data/${kind}${suffix}.json`;
}

async function loadLanguage(language) {
  const loadVersion = ++state.languageLoadVersion;
  state.language = language;
  localizeStaticText();
  showStatus(t("loadingTitle"), t("loadingText"));

  let englishTopics = state.englishTopics;
  let englishDependencies = state.englishDependencies;
  if (!state.englishTopics || !state.englishDependencies) {
    [englishTopics, englishDependencies] = await Promise.all([
      fetchJson(dataPath("topics", "en")),
      fetchJson(dataPath("dependencies", "en")),
    ]);
  }
  if (loadVersion !== state.languageLoadVersion) return false;
  state.englishTopics = englishTopics;
  state.englishDependencies = englishDependencies;

  let localizedTopics;
  let localizedDependencies;
  if (language === "en") {
    localizedTopics = state.englishTopics;
    localizedDependencies = state.englishDependencies;
  } else {
    [localizedTopics, localizedDependencies] = await Promise.all([
      fetchJson(dataPath("topics", language)),
      fetchJson(dataPath("dependencies", language)),
    ]);
  }
  if (loadVersion !== state.languageLoadVersion) return false;
  state.localizedTopics = localizedTopics;
  state.localizedDependencies = localizedDependencies;

  buildGraphData();
  state.availableAges = getAvailableAges(state.nodes);
  if (!state.availableAges.includes(state.age)) {
    state.age = state.availableAges[0] || 4;
  }
  renderAgeNavigator();
  renderSubjectFilters();
  renderOutline();
  renderGraph();
  updateStats();
  setOutlineOpen(state.outlineOpen);
  hideStatus();
  return true;
}

function buildGraphData() {
  state.nodeById = new Map();
  state.canonicalById = new Map();
  state.incoming = new Map();
  state.outgoing = new Map();

  const localizedById = new Map(state.localizedTopics.topics.map((topic) => [topic.id, topic]));
  state.englishTopics.topics.forEach((topic) => state.canonicalById.set(topic.id, topic));

  state.nodes = state.englishTopics.topics.map((canonical) => {
    const localized = localizedById.get(canonical.id) || canonical;
    const node = {
      id: canonical.id,
      canonicalSubject: canonical.subject,
      canonicalDomain: canonical.domain,
      localized,
      canonical,
      label: localized.name || canonical.name,
      ageRangeStart: canonical.ageRangeStart,
      ageRangeEnd: canonical.ageRangeEnd,
      val: Math.max(1.8, 2 + (canonical.centrality || 0) * 28),
      age: `${canonical.ageRangeStart}-${canonical.ageRangeEnd}`,
    };
    state.nodeById.set(node.id, node);
    return node;
  });

  state.links = state.englishDependencies.dependencies.map((edge, index) => {
    const localizedEdge = state.localizedDependencies.dependencies[index] || edge;
    const link = {
      source: edge.prerequisiteId,
      target: edge.topicId,
      strength: edge.strength,
      reason: localizedEdge.reason || edge.reason,
      canonicalReason: edge.reason,
    };
    pushRelation(state.outgoing, edge.prerequisiteId, link);
    pushRelation(state.incoming, edge.topicId, link);
    return link;
  });
}

function pushRelation(map, id, link) {
  if (!map.has(id)) {
    map.set(id, []);
  }
  map.get(id).push(link);
}

function ageLabel(age) {
  if (state.language === "zh") return `${age}岁`;
  if (state.language === "th") return `อายุ ${age} ปี`;
  return `Age ${age}`;
}

function renderAgeNavigator() {
  els.ageSelector.innerHTML = state.availableAges
    .map(
      (age) => `
        <button
          class="age-button ${age === state.age ? "is-active" : ""} ${age >= 14 ? "is-extension" : ""}"
          type="button"
          data-age="${age}"
          aria-label="${escapeHtml(ageLabel(age))}"
          aria-pressed="${age === state.age}"
        >${age}</button>
      `,
    )
    .join("");
  els.ageSelector.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => selectAge(Number(button.dataset.age)));
  });
}

function selectAge(age) {
  if (!state.availableAges.includes(age)) return;
  state.age = age;
  state.subject = "all";
  state.domain = "all";
  state.expandedSubjects.clear();
  state.expandedDomains.clear();
  clearSelection({ renderOutline: false });
  renderAgeNavigator();
  renderSubjectFilters();
  renderOutline();
  renderGraph();
  updateStats();
}

function renderSubjectFilters() {
  const activeNodes = state.nodes.filter((node) => topicStageAtAge(node, state.age));
  const subjects = [...new Set(state.englishTopics.topics.map((topic) => topic.subject))].sort();
  const buttons = [
    chipMarkup("all", t("allSubjects"), state.subject === "all", "#d7e3ff", activeNodes.length),
    ...subjects.map((subject) => {
      const count = activeNodes.filter((node) => node.canonicalSubject === subject).length;
      return chipMarkup(subject, subjectLabel(subject), state.subject === subject, SUBJECT_COLORS[subject], count);
    }),
  ];
  els.subjectStrip.innerHTML = buttons.join("");
  els.subjectStrip.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.subject = button.dataset.subject;
      state.domain = "all";
      if (state.subject !== "all") {
        state.expandedSubjects.add(`focus|${state.subject}`);
        state.expandedSubjects.add(`reinforce|${state.subject}`);
      }
      clearSelection({ renderOutline: false });
      renderSubjectFilters();
      renderOutline();
      renderGraph();
      updateStats();
    });
  });
}

function chipMarkup(subject, label, active, color, count) {
  return `
    <button class="subject-chip ${active ? "is-active" : ""}" data-subject="${escapeHtml(subject)}" style="--chip-color: ${color}">
      <span class="chip-dot"></span>
      <span>${escapeHtml(label)}</span>
      <span>${count}</span>
    </button>
  `;
}

function totalOutlineTopics(groups) {
  return groups.reduce((total, subject) => total + subject.count, 0);
}

function ageSummaryText(outline) {
  const focusCount = totalOutlineTopics(outline.focus);
  const reinforceCount = totalOutlineTopics(outline.reinforce);
  if (state.age >= 14) {
    if (state.language === "zh") return `${reinforceCount} 个知识点 · ${t("extensionLearning")}`;
    if (state.language === "th") return `${reinforceCount} หัวข้อ · ${t("extensionLearning")}`;
    return `${reinforceCount} topics · ${t("extensionLearning")}`;
  }
  if (state.language === "zh") return `${focusCount} 个重点学习 · ${reinforceCount} 个继续巩固`;
  if (state.language === "th") return `${focusCount} หัวข้อหลัก · ${reinforceCount} หัวข้อทบทวน`;
  return `${focusCount} focus · ${reinforceCount} continuing`;
}

function renderOutline() {
  if (!state.nodes.length) return;
  const outline = buildAgeOutline(state.nodes, state.age);
  els.outlineAgeTitle.textContent = ageLabel(state.age);
  els.outlineAgeSummary.textContent = ageSummaryText(outline);

  const sections = state.age >= 14
    ? [{ key: "reinforce", label: t("extensionLearning"), groups: outline.reinforce }]
    : [
        { key: "focus", label: t("focusLearning"), groups: outline.focus },
        { key: "reinforce", label: t("reinforceLearning"), groups: outline.reinforce },
      ];
  els.outlineTree.innerHTML = sections.map(outlineSectionMarkup).join("");
  bindOutlineEvents();
  scrollSelectedOutlineIntoView();
}

function outlineSectionMarkup(section) {
  const count = totalOutlineTopics(section.groups);
  const content = section.groups.length
    ? section.groups.map((subject) => outlineSubjectMarkup(section.key, subject)).join("")
    : `<p class="outline-empty">${escapeHtml(t("noTopics"))}</p>`;
  return `
    <section class="outline-section ${section.key === "reinforce" ? "is-reinforce" : ""}">
      <h3 class="outline-section-heading">
        <span>${escapeHtml(section.label)}</span>
        <span class="outline-count">${formatNumber(count)}</span>
      </h3>
      ${content}
    </section>
  `;
}

function outlineSubjectMarkup(stage, subject) {
  const subjectKey = `${stage}|${subject.key}`;
  const selectedInSubject = state.selectedNode?.canonicalSubject === subject.key && topicStageAtAge(state.selectedNode, state.age) === stage;
  const open = state.expandedSubjects.has(subjectKey) || selectedInSubject;
  return `
    <div class="outline-branch" style="--subject-color: ${SUBJECT_COLORS[subject.key] || "#8be7ff"}">
      <button
        class="outline-branch-button"
        type="button"
        data-outline-subject="${escapeHtml(subject.key)}"
        data-outline-stage="${stage}"
        aria-expanded="${open}"
      >
        <span class="outline-disclosure">›</span>
        <span class="outline-branch-label"><span class="outline-subject-dot"></span>${escapeHtml(subjectLabel(subject.key))}</span>
        <span class="outline-count">${formatNumber(subject.count)}</span>
      </button>
      <div class="outline-children" ${open ? "" : "hidden"}>
        ${subject.domains.map((domain) => outlineDomainMarkup(stage, subject.key, domain)).join("")}
      </div>
    </div>
  `;
}

function outlineDomainMarkup(stage, subject, domain) {
  const domainStateKey = `${stage}|${subject}|${domain.key}`;
  const selectedInDomain = state.selectedNode?.canonicalSubject === subject
    && state.selectedNode?.canonicalDomain === domain.key
    && topicStageAtAge(state.selectedNode, state.age) === stage;
  const open = state.expandedDomains.has(domainStateKey) || selectedInDomain;
  const localizedDomain = domain.topics[0]?.localized?.domain || domain.key;
  return `
    <div class="outline-domain">
      <button
        class="outline-domain-button"
        type="button"
        data-outline-domain="${escapeHtml(domain.key)}"
        data-outline-subject="${escapeHtml(subject)}"
        data-outline-stage="${stage}"
        aria-expanded="${open}"
      >
        <span class="outline-disclosure">›</span>
        <span class="outline-branch-label">${escapeHtml(localizedDomain)}</span>
        <span class="outline-count">${formatNumber(domain.count)}</span>
      </button>
      <div class="outline-children" ${open ? "" : "hidden"}>
        ${domain.topics.map(outlineTopicMarkup).join("")}
      </div>
    </div>
  `;
}

function outlineTopicMarkup(node) {
  const selected = state.selectedNode?.id === node.id;
  return `
    <div class="outline-topic">
      <button
        class="outline-topic-button ${selected ? "is-selected" : ""}"
        type="button"
        data-outline-topic-id="${escapeHtml(node.id)}"
        ${selected ? 'aria-current="true"' : ""}
      >${escapeHtml(node.label)}</button>
      ${selected ? selectedTopicSummaryMarkup(node) : ""}
    </div>
  `;
}

function selectedTopicSummaryMarkup(node) {
  const topic = node.localized;
  const prerequisites = (state.incoming.get(node.id) || [])
    .map((link) => ({ link, node: state.nodeById.get(link.source.id || link.source) }))
    .filter((entry) => entry.node)
    .sort(compareRelationEntries)
    .slice(0, 4);
  const next = rankNextSteps(node, state.outgoing.get(node.id) || [], state.nodeById);
  const blocks = [
    summaryCopyBlock(t("learningGoal"), topic.description || node.canonical.description),
    summaryCopyBlock(t("masterySignal"), (topic.evidence || [])[0]),
    summaryRelationBlock(t("prerequisites"), prerequisites),
    summaryRelationBlock(t("recommendedNext"), next.recommended.slice(0, 4)),
    summaryRelationBlock(t("furtherExtensions"), next.extensions.slice(0, 3)),
  ].filter(Boolean);
  const back = state.selectionHistory.length
    ? `<button class="outline-back-button" type="button" data-outline-back>← ${escapeHtml(t("backToPrevious"))}</button>`
    : "";
  return `<div class="outline-topic-summary">${blocks.join("")}${back}</div>`;
}

function summaryCopyBlock(label, value) {
  if (!value) return "";
  return `
    <div class="outline-summary-block">
      <span class="outline-summary-label">${escapeHtml(label)}</span>
      <p class="outline-summary-copy">${escapeHtml(value)}</p>
    </div>
  `;
}

function summaryRelationBlock(label, entries) {
  if (!entries.length) return "";
  return `
    <div class="outline-summary-block">
      <span class="outline-summary-label">${escapeHtml(label)}</span>
      ${entries
        .map(
          (entry) => `<button class="outline-relation-button" type="button" data-outline-related-id="${escapeHtml(entry.node.id)}">${escapeHtml(entry.node.label)}</button>`,
        )
        .join("")}
    </div>
  `;
}

function compareRelationEntries(left, right) {
  if (left.link.strength !== right.link.strength) return left.link.strength === "hard" ? -1 : 1;
  const leftSameDomain = left.node.canonicalDomain === state.selectedNode?.canonicalDomain ? 0 : 1;
  const rightSameDomain = right.node.canonicalDomain === state.selectedNode?.canonicalDomain ? 0 : 1;
  if (leftSameDomain !== rightSameDomain) return leftSameDomain - rightSameDomain;
  return left.node.label.localeCompare(right.node.label, state.language);
}

function bindOutlineEvents() {
  els.outlineTree.querySelectorAll("[data-outline-subject]").forEach((button) => {
    if (button.hasAttribute("data-outline-domain")) return;
    button.addEventListener("click", () => {
      const key = `${button.dataset.outlineStage}|${button.dataset.outlineSubject}`;
      toggleSetValue(state.expandedSubjects, key);
      state.subject = button.dataset.outlineSubject;
      state.domain = "all";
      clearSelection({ renderOutline: false });
      renderSubjectFilters();
      renderOutline();
      renderGraph();
      updateStats();
    });
  });
  els.outlineTree.querySelectorAll("[data-outline-domain]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = `${button.dataset.outlineStage}|${button.dataset.outlineSubject}|${button.dataset.outlineDomain}`;
      toggleSetValue(state.expandedDomains, key);
      state.subject = button.dataset.outlineSubject;
      state.domain = button.dataset.outlineDomain;
      clearSelection({ renderOutline: false });
      renderSubjectFilters();
      renderOutline();
      renderGraph();
      updateStats();
    });
  });
  els.outlineTree.querySelectorAll("[data-outline-topic-id]").forEach((button) => {
    button.addEventListener("click", () => selectNode(state.nodeById.get(button.dataset.outlineTopicId), { source: "outline" }));
  });
  els.outlineTree.querySelectorAll("[data-outline-related-id]").forEach((button) => {
    button.addEventListener("click", () => selectNode(state.nodeById.get(button.dataset.outlineRelatedId), { source: "relation" }));
  });
  const backButton = els.outlineTree.querySelector("[data-outline-back]");
  if (backButton) backButton.addEventListener("click", selectPreviousNode);
}

function toggleSetValue(set, value) {
  if (set.has(value)) set.delete(value);
  else set.add(value);
}

function visibleNodes() {
  const focus = state.graphFocus || buildCurrentGraphFocus();
  return state.nodes.filter((node) => focus.visibleIds.has(node.id));
}

function buildCurrentGraphFocus() {
  state.graphFocus = buildGraphFocus(state.nodes, state.links, {
    age: state.age,
    subject: state.subject,
    domain: state.domain,
  });
  return state.graphFocus;
}

function visibleGraphData() {
  const focus = buildCurrentGraphFocus();
  const nodes = state.nodes.filter((node) => focus.visibleIds.has(node.id));
  return { nodes, links: focus.links };
}

function renderGraph(options = {}) {
  const graphData = visibleGraphData();
  if (!window.ForceGraph3D) {
    renderFallbackGraph(graphData);
    return;
  }
  els.fallbackGraph.style.display = "none";
  els.graph.style.display = "block";

  if (!state.graph) {
    state.graph = window.ForceGraph3D()(els.graph)
      .backgroundColor("rgba(0,0,0,0)")
      .nodeId("id")
      .nodeLabel(
        (node) => `${escapeHtml(node.label)}<br>${escapeHtml(subjectLabel(node.canonicalSubject))} · ${escapeHtml(t("age"))} ${node.age}<br>${escapeHtml(nodeFocusLabel(node))}`,
      )
      .nodeVal((node) => node.val)
      .nodeRelSize(4.2)
      .nodeResolution(18)
      .nodeOpacity(0.94)
      .nodeColor(nodeColor)
      .linkColor(linkColor)
      .linkOpacity(0.2)
      .linkWidth((link) => (state.highlightedLinks.has(link) ? 2.2 : link.strength === "hard" ? 0.7 : 0.35))
      .linkDirectionalParticles((link) => (state.highlightedLinks.has(link) ? 4 : 0))
      .linkDirectionalParticleWidth(1.35)
      .linkDirectionalParticleSpeed(0.006)
      .onNodeHover(handleNodeHover)
      .onNodeClick((node) => selectNode(node, { source: "graph" }))
      .onBackgroundClick(handleBackgroundClick)
      .enableNodeDrag(true)
      .cooldownTicks(140);

    if (typeof state.graph.showNavInfo === "function") {
      state.graph.showNavInfo(false);
    }

    state.graph.d3Force("charge").strength(-42);
    state.graph.d3Force("link").distance((link) => (link.strength === "hard" ? 42 : 64));
    window.addEventListener("resize", resizeGraph);
    resizeGraph();
    installGraphPointerFallback();
  }

  state.graph.graphData(graphData);
  if (options.fit === false) return;
  requestAnimationFrame(() => {
    if (state.graph) {
      state.graph.zoomToFit(920, 70);
    }
  });
}

function renderFallbackGraph(graphData) {
  els.graph.style.display = "none";
  els.fallbackGraph.style.display = "block";
  const canvas = els.fallbackGraph;
  const rect = canvas.getBoundingClientRect();
  const scale = window.devicePixelRatio || 1;
  canvas.width = rect.width * scale;
  canvas.height = rect.height * scale;
  const ctx = canvas.getContext("2d");
  ctx.scale(scale, scale);
  ctx.clearRect(0, 0, rect.width, rect.height);
  ctx.fillStyle = "#08101a";
  ctx.fillRect(0, 0, rect.width, rect.height);

  const nodes = graphData.nodes.slice(0, 420);
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const radius = Math.max(120, Math.min(rect.width, rect.height) * 0.36);
  nodes.forEach((node, index) => {
    const angle = (index / nodes.length) * Math.PI * 2;
    node.fx2 = centerX + Math.cos(angle) * radius * (0.42 + (index % 7) / 12);
    node.fy2 = centerY + Math.sin(angle) * radius * (0.42 + (index % 5) / 10);
  });
  const nodeIds = new Set(nodes.map((node) => node.id));
  ctx.strokeStyle = "rgba(180,201,255,0.12)";
  graphData.links.slice(0, 1100).forEach((link) => {
    const sourceId = link.source.id || link.source;
    const targetId = link.target.id || link.target;
    if (!nodeIds.has(sourceId) || !nodeIds.has(targetId)) return;
    const source = state.nodeById.get(sourceId);
    const target = state.nodeById.get(targetId);
    if (!source || !target) return;
    ctx.beginPath();
    ctx.moveTo(source.fx2, source.fy2);
    ctx.lineTo(target.fx2, target.fy2);
    ctx.stroke();
  });
  nodes.forEach((node) => {
    ctx.beginPath();
    ctx.fillStyle = nodeColor(node);
    ctx.shadowBlur = 12;
    ctx.shadowColor = ctx.fillStyle;
    ctx.arc(node.fx2, node.fy2, Math.max(2, node.val), 0, Math.PI * 2);
    ctx.fill();
  });
}

function nodeColor(node) {
  if (state.selectedNode && node.id === state.selectedNode.id) {
    return "#ffffff";
  }
  if (state.highlightedNodes.size && !state.highlightedNodes.has(node.id)) {
    return "rgba(115, 127, 148, 0.34)";
  }
  if (state.graphFocus?.prerequisiteIds.has(node.id)) {
    return "rgba(156, 174, 204, 0.48)";
  }
  if (state.graphFocus?.nextIds.has(node.id)) {
    return "rgba(255, 209, 102, 0.58)";
  }
  return SUBJECT_COLORS[node.canonicalSubject] || "#8be7ff";
}

function nodeFocusLabel(node) {
  if (state.graphFocus?.prerequisiteIds.has(node.id)) return t("prerequisiteContext");
  if (state.graphFocus?.nextIds.has(node.id)) return t("nextContext");
  return t("focusLearning");
}

function linkColor(link) {
  if (state.highlightedLinks.has(link)) {
    return link.strength === "hard" ? "#ffffff" : "#8be7ff";
  }
  return link.strength === "hard" ? "rgba(210, 225, 255, 0.24)" : "rgba(139, 231, 255, 0.14)";
}

function selectNode(node, options = {}) {
  if (!node) return;
  const previousNode = state.selectedNode;
  if (options.recordHistory !== false && previousNode && previousNode.id !== node.id) {
    state.selectionHistory.push(previousNode.id);
    state.selectionHistory = state.selectionHistory.slice(-30);
  }

  const navigationChanged = synchronizeSelectionContext(node);
  state.selectedNode = node;
  state.highlightedNodes = new Set([node.id]);
  state.highlightedLinks = new Set();
  [...(state.incoming.get(node.id) || []), ...(state.outgoing.get(node.id) || [])].forEach((link) => {
    state.highlightedLinks.add(link);
    state.highlightedNodes.add(link.source.id || link.source);
    state.highlightedNodes.add(link.target.id || link.target);
  });

  const stage = topicStageAtAge(node, state.age);
  if (stage) {
    state.expandedSubjects.add(`${stage}|${node.canonicalSubject}`);
    state.expandedDomains.add(`${stage}|${node.canonicalSubject}|${node.canonicalDomain}`);
  }
  if (options.source === "graph") {
    setOutlineOpen(true);
  }
  if (navigationChanged) {
    renderAgeNavigator();
    renderSubjectFilters();
    renderGraph({ fit: false });
    updateStats();
  }
  renderOutline();
  renderDetail(node);
  if (state.graph) {
    state.graph.nodeColor(nodeColor).linkColor(linkColor).linkWidth((link) => (state.highlightedLinks.has(link) ? 2.2 : link.strength === "hard" ? 0.7 : 0.35));
    if (options.focusCamera === false) {
      return;
    }
    if (Number.isFinite(node.x) && Number.isFinite(node.y) && Number.isFinite(node.z)) {
      const distance = 78;
      const distRatio = 1 + distance / Math.hypot(node.x || 1, node.y || 1, node.z || 1);
      state.graph.cameraPosition({ x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, node, 900);
    }
  }
}

function synchronizeSelectionContext(node) {
  let changed = false;
  if (state.age < node.ageRangeStart || state.age > node.ageRangeEnd) {
    state.age = node.ageRangeStart;
    state.subject = "all";
    state.domain = "all";
    state.expandedSubjects.clear();
    state.expandedDomains.clear();
    changed = true;
  }
  if (state.subject !== "all" && state.subject !== node.canonicalSubject) {
    state.subject = node.canonicalSubject;
    state.domain = "all";
    changed = true;
  }
  if (state.domain !== "all" && state.domain !== node.canonicalDomain) {
    state.domain = node.canonicalDomain;
    changed = true;
  }
  if (changed) state.graphFocus = null;
  return changed;
}

function handleNodeHover(node) {
  state.hoveredNode = node || null;
  els.graph.style.cursor = node ? "pointer" : "grab";
}

function handleBackgroundClick(event) {
  if (isRecentPointerFallbackSelection(event)) {
    return;
  }
  if (state.hoveredNode) {
    selectNode(state.hoveredNode, { source: "graph" });
    return;
  }
  if (selectTooltipNode({ focusCamera: true, source: "graph" })) {
    return;
  }
  const nearbyNode = nearestNodeFromPointerEvent(event);
  if (nearbyNode) {
    selectNode(nearbyNode, { source: "graph" });
    return;
  }
  clearSelection();
}

function installGraphPointerFallback() {
  if (state.graphPointerFallbackInstalled) {
    return;
  }
  els.graph.addEventListener("pointerdown", handleGraphPointerDown, true);
  els.graph.addEventListener("pointerup", handleGraphPointerUp, true);
  state.graphPointerFallbackInstalled = true;
}

function handleGraphPointerDown(event) {
  state.pointerDown = pointerPoint(event);
}

function handleGraphPointerUp(event) {
  const pointerUp = pointerPoint(event);
  if (!state.pointerDown || !pointerUp) {
    state.pointerDown = null;
    return;
  }
  const drift = Math.hypot(pointerUp.clientX - state.pointerDown.clientX, pointerUp.clientY - state.pointerDown.clientY);
  state.pointerDown = null;
  if (drift > POINTER_CLICK_MAX_DRIFT) {
    return;
  }
  if (selectTooltipNode({ focusCamera: true, source: "graph" })) {
    event.stopPropagation();
    return;
  }
  if (selectNearestNodeFromPointerEvent(event, { focusCamera: true, source: "graph" })) {
    event.stopPropagation();
  }
}

function selectNearestNodeFromPointerEvent(event, options = {}) {
  const node = nearestNodeFromPointerEvent(event);
  if (!node) {
    return false;
  }
  rememberPointerFallbackSelection(event, node);
  selectNode(node, options);
  return true;
}

function selectTooltipNode(options = {}) {
  const node = nodeFromVisibleTooltip();
  if (!node) {
    return false;
  }
  selectNode(node, options);
  return true;
}

function nodeFromVisibleTooltip() {
  const tooltip = document.querySelector(".scene-tooltip") || document.querySelector("[class*='tooltip']");
  const text = tooltip ? tooltip.textContent.trim() : "";
  if (!text) {
    return null;
  }
  return visibleNodes().find((node) => text.includes(node.label)) || null;
}

function rememberPointerFallbackSelection(event, node) {
  const point = pointerPoint(event);
  if (!point) {
    return;
  }
  state.recentPointerFallback = {
    nodeId: node.id,
    clientX: point.clientX,
    clientY: point.clientY,
    at: Date.now(),
  };
}

function isRecentPointerFallbackSelection(event) {
  const point = pointerPoint(event);
  const recent = state.recentPointerFallback;
  if (!point || !recent) {
    return false;
  }
  const age = Date.now() - recent.at;
  const drift = Math.hypot(point.clientX - recent.clientX, point.clientY - recent.clientY);
  return age >= 0 && age < POINTER_FALLBACK_CLEAR_MS && drift <= POINTER_CLICK_MAX_DRIFT;
}

function pointerPoint(event) {
  if (!event) {
    return null;
  }
  const clientX = event.clientX;
  const clientY = event.clientY;
  if (!Number.isFinite(clientX) || !Number.isFinite(clientY)) {
    return null;
  }
  return { clientX, clientY };
}

function nearestNodeFromPointerEvent(event) {
  if (!event || !state.graph || !window.THREE || typeof state.graph.camera !== "function") {
    return null;
  }
  const eventPoint = pointerPoint(event);
  if (!eventPoint) {
    return null;
  }

  const camera = state.graph.camera();
  const rect = els.graph.getBoundingClientRect();
  let nearest = null;
  let nearestDistance = NEARBY_NODE_PICK_RADIUS;
  visibleNodes().forEach((node) => {
    if (!Number.isFinite(node.x) || !Number.isFinite(node.y) || !Number.isFinite(node.z)) {
      return;
    }
    const projected = new window.THREE.Vector3(node.x, node.y, node.z).project(camera);
    const screenX = rect.left + ((projected.x + 1) / 2) * rect.width;
    const screenY = rect.top + ((1 - projected.y) / 2) * rect.height;
    const distance = Math.hypot(screenX - eventPoint.clientX, screenY - eventPoint.clientY);
    if (distance < nearestDistance) {
      nearest = node;
      nearestDistance = distance;
    }
  });
  return nearest;
}

function selectPreviousNode() {
  const previousId = state.selectionHistory.pop();
  const previousNode = previousId ? state.nodeById.get(previousId) : null;
  if (previousNode) {
    selectNode(previousNode, { recordHistory: false, source: "history" });
  }
}

function scrollSelectedOutlineIntoView() {
  if (!state.selectedNode) return;
  requestAnimationFrame(() => {
    const button = [...els.outlineTree.querySelectorAll("[data-outline-topic-id]")]
      .find((candidate) => candidate.dataset.outlineTopicId === state.selectedNode?.id);
    button?.scrollIntoView({ block: "nearest" });
  });
}

function setOutlineOpen(open) {
  state.outlineOpen = Boolean(open);
  els.appShell.classList.toggle("is-outline-open", state.outlineOpen);
  els.outlineToggle.setAttribute("aria-expanded", String(state.outlineOpen));
  els.outlinePanel.toggleAttribute("inert", !state.outlineOpen);
  requestAnimationFrame(resizeGraph);
}

function clearSelection(options = {}) {
  state.selectedNode = null;
  state.highlightedNodes.clear();
  state.highlightedLinks.clear();
  if (options.clearHistory !== false) state.selectionHistory = [];
  els.topicDetail.hidden = true;
  els.emptyState.hidden = false;
  if (options.renderOutline !== false) renderOutline();
  if (state.graph) {
    state.graph.nodeColor(nodeColor).linkColor(linkColor).linkWidth((link) => (link.strength === "hard" ? 0.7 : 0.35));
  }
}

function renderDetail(node) {
  const topic = node.localized;
  const canonical = node.canonical;
  const color = SUBJECT_COLORS[node.canonicalSubject] || "#8be7ff";
  els.emptyState.hidden = true;
  els.topicDetail.hidden = false;
  els.detailSubject.style.setProperty("--subject-color", color);
  els.detailSubject.textContent = subjectLabel(node.canonicalSubject);
  els.detailTitle.textContent = topic.name || canonical.name;
  els.detailMeta.textContent = `${topic.domain || canonical.domain} · ${canonical.type} · ${t("age")} ${canonical.ageRangeStart}-${canonical.ageRangeEnd}`;
  els.detailDescription.textContent = topic.description || canonical.description;
  renderList(els.detailEvidence, topic.evidence || [], null);
  els.detailAssessment.textContent = topic.assessmentPrompt || "";
  renderRelationList(els.prerequisiteList, state.incoming.get(node.id) || [], "source");
  const nextSteps = rankNextSteps(node, state.outgoing.get(node.id) || [], state.nodeById);
  renderRelationEntries(els.unlockList, nextSteps.recommended);
  renderRelationEntries(els.extensionList, nextSteps.extensions);
}

function renderList(container, items, clickRole) {
  container.innerHTML = "";
  if (!items.length) {
    const li = document.createElement("li");
    li.textContent = t("noItems");
    container.appendChild(li);
    return;
  }
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    if (clickRole) {
      li.classList.add("relation-link");
    }
    container.appendChild(li);
  });
}

function renderRelationList(container, links, endpoint) {
  container.innerHTML = "";
  if (!links.length) {
    const li = document.createElement("li");
    li.textContent = t("noItems");
    container.appendChild(li);
    return;
  }
  links.slice(0, 12).forEach((link) => {
    const id = endpoint === "source" ? link.source.id || link.source : link.target.id || link.target;
    const node = state.nodeById.get(id);
    const li = document.createElement("li");
    li.className = "relation-link";
    li.tabIndex = 0;
    li.textContent = node ? node.label : id;
    const reason = document.createElement("span");
    reason.className = "relation-reason";
    reason.textContent = link.reason;
    li.appendChild(reason);
    li.addEventListener("click", () => node && selectNode(node, { source: "relation" }));
    li.addEventListener("keydown", (event) => {
      if ((event.key === "Enter" || event.key === " ") && node) {
        event.preventDefault();
        selectNode(node, { source: "relation" });
      }
    });
    container.appendChild(li);
  });
}

function renderRelationEntries(container, entries) {
  renderRelationList(container, entries.map((entry) => entry.link), "target");
}

function updateStats() {
  const focus = state.graphFocus || buildCurrentGraphFocus();
  els.topicCount.textContent = formatNumber(state.englishTopics.topicCount || state.nodes.length);
  els.edgeCount.textContent = formatNumber(state.englishDependencies.edgeCount || state.links.length);
  els.visibleCount.textContent = formatNumber(focus.focusIds.size);
}

function showStatus(title, text) {
  els.statusTitle.textContent = title;
  els.statusText.textContent = text;
  els.statusLayer.classList.remove("is-hidden");
}

function hideStatus() {
  els.statusLayer.classList.add("is-hidden");
}

function showError(error) {
  console.error(error);
  els.statusTitle.textContent = t("errorTitle");
  els.statusText.textContent = t("errorText");
  els.statusLayer.classList.remove("is-hidden");
}

function handleLanguageLoadError(error, loadVersion) {
  if (loadVersion === state.languageLoadVersion) {
    showError(error);
  }
}

function resizeGraph() {
  if (!state.graph) return;
  const rect = els.graph.getBoundingClientRect();
  state.graph.width(rect.width).height(rect.height);
}

function formatNumber(value) {
  return new Intl.NumberFormat(state.language === "en" ? "en" : state.language).format(value);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

els.languageSelect.addEventListener("change", async (event) => {
  clearSelection({ renderOutline: false });
  const loadPromise = loadLanguage(event.target.value);
  const loadVersion = state.languageLoadVersion;
  try {
    await loadPromise;
  } catch (error) {
    handleLanguageLoadError(error, loadVersion);
  }
});

els.closeDetail.addEventListener("click", clearSelection);
els.outlineToggle.addEventListener("click", () => setOutlineOpen(!state.outlineOpen));
els.outlineClose.addEventListener("click", () => setOutlineOpen(false));
els.appShell.addEventListener("transitionend", resizeGraph);

setOutlineOpen(state.outlineOpen);
const initialLanguageLoad = loadLanguage("en");
const initialLanguageLoadVersion = state.languageLoadVersion;
initialLanguageLoad.catch((error) => handleLanguageLoadError(error, initialLanguageLoadVersion));
