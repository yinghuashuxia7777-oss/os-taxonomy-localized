const LANG = {
  en: {
    eyebrow: "Open curriculum taxonomy",
    title: "Marble Skill Taxonomy",
    subtitle: "1,590 micro-topics connected by 3,221 prerequisite relationships across the primary years.",
    language: "Language",
    concepts: "concepts",
    links: "prerequisite links",
    visible: "visible",
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
    language: "语言",
    concepts: "概念",
    links: "先修链接",
    visible: "可见",
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
    language: "ภาษา",
    concepts: "แนวคิด",
    links: "ลิงก์ความรู้พื้นฐาน",
    visible: "ที่แสดง",
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

const NEARBY_NODE_PICK_RADIUS = 28;

const state = {
  language: "en",
  subject: "all",
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
};

const els = {
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
  state.language = language;
  localizeStaticText();
  showStatus(t("loadingTitle"), t("loadingText"));

  if (!state.englishTopics || !state.englishDependencies) {
    [state.englishTopics, state.englishDependencies] = await Promise.all([
      fetchJson(dataPath("topics", "en")),
      fetchJson(dataPath("dependencies", "en")),
    ]);
  }

  if (language === "en") {
    state.localizedTopics = state.englishTopics;
    state.localizedDependencies = state.englishDependencies;
  } else {
    [state.localizedTopics, state.localizedDependencies] = await Promise.all([
      fetchJson(dataPath("topics", language)),
      fetchJson(dataPath("dependencies", language)),
    ]);
  }

  buildGraphData();
  renderSubjectFilters();
  updateStats();
  renderGraph();
  hideStatus();
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

function renderSubjectFilters() {
  const subjects = [...new Set(state.englishTopics.topics.map((topic) => topic.subject))].sort();
  const buttons = [
    chipMarkup("all", t("allSubjects"), state.subject === "all", "#d7e3ff", state.englishTopics.topics.length),
    ...subjects.map((subject) => {
      const count = state.englishTopics.topics.filter((topic) => topic.subject === subject).length;
      return chipMarkup(subject, subjectLabel(subject), state.subject === subject, SUBJECT_COLORS[subject], count);
    }),
  ];
  els.subjectStrip.innerHTML = buttons.join("");
  els.subjectStrip.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.subject = button.dataset.subject;
      renderSubjectFilters();
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

function visibleNodes() {
  if (state.subject === "all") {
    return state.nodes;
  }
  return state.nodes.filter((node) => node.canonicalSubject === state.subject);
}

function visibleGraphData() {
  const nodes = visibleNodes();
  const visibleIds = new Set(nodes.map((node) => node.id));
  const links = state.links.filter((link) => visibleIds.has(link.source.id || link.source) && visibleIds.has(link.target.id || link.target));
  return { nodes, links };
}

function renderGraph() {
  const graphData = visibleGraphData();
  if (!window.ForceGraph3D) {
    renderFallbackGraph(graphData);
    return;
  }
  els.fallbackGraph.style.display = "none";
  els.graph.style.display = "block";

  if (!state.graph) {
    state.graph = ForceGraph3D()(els.graph)
      .backgroundColor("rgba(0,0,0,0)")
      .nodeId("id")
      .nodeLabel((node) => `${escapeHtml(node.label)}<br>${escapeHtml(subjectLabel(node.canonicalSubject))} · ${escapeHtml(t("age"))} ${node.age}`)
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
      .onNodeClick(selectNode)
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
  }

  state.graph.graphData(graphData);
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
    if (!nodeIds.has(link.source) || !nodeIds.has(link.target)) return;
    const source = state.nodeById.get(link.source);
    const target = state.nodeById.get(link.target);
    if (!source || !target) return;
    ctx.beginPath();
    ctx.moveTo(source.fx2, source.fy2);
    ctx.lineTo(target.fx2, target.fy2);
    ctx.stroke();
  });
  nodes.forEach((node) => {
    ctx.beginPath();
    ctx.fillStyle = SUBJECT_COLORS[node.canonicalSubject] || "#8be7ff";
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
  return SUBJECT_COLORS[node.canonicalSubject] || "#8be7ff";
}

function linkColor(link) {
  if (state.highlightedLinks.has(link)) {
    return link.strength === "hard" ? "#ffffff" : "#8be7ff";
  }
  return link.strength === "hard" ? "rgba(210, 225, 255, 0.24)" : "rgba(139, 231, 255, 0.14)";
}

function selectNode(node, options = {}) {
  state.selectedNode = node;
  state.highlightedNodes = new Set([node.id]);
  state.highlightedLinks = new Set();
  [...(state.incoming.get(node.id) || []), ...(state.outgoing.get(node.id) || [])].forEach((link) => {
    state.highlightedLinks.add(link);
    state.highlightedNodes.add(link.source.id || link.source);
    state.highlightedNodes.add(link.target.id || link.target);
  });
  renderDetail(node);
  if (state.graph) {
    state.graph.nodeColor(nodeColor).linkColor(linkColor).linkWidth((link) => (state.highlightedLinks.has(link) ? 2.2 : link.strength === "hard" ? 0.7 : 0.35));
    if (options.focusCamera === false) {
      return;
    }
    const distance = 78;
    const distRatio = 1 + distance / Math.hypot(node.x || 1, node.y || 1, node.z || 1);
    state.graph.cameraPosition({ x: (node.x || 0) * distRatio, y: (node.y || 0) * distRatio, z: (node.z || 0) * distRatio }, node, 900);
  }
}

function handleNodeHover(node) {
  state.hoveredNode = node || null;
  els.graph.style.cursor = node ? "pointer" : "grab";
  if (node && (!state.selectedNode || state.selectedNode.id !== node.id)) {
    selectNode(node, { focusCamera: false });
  }
}

function handleBackgroundClick(event) {
  if (state.hoveredNode) {
    selectNode(state.hoveredNode);
    return;
  }
  const nearbyNode = nearestNodeFromPointerEvent(event);
  if (nearbyNode) {
    selectNode(nearbyNode);
    return;
  }
  clearSelection();
}

function nearestNodeFromPointerEvent(event) {
  if (!event || !state.graph || !window.THREE || typeof state.graph.camera !== "function") {
    return null;
  }
  const clientX = event.clientX;
  const clientY = event.clientY;
  if (!Number.isFinite(clientX) || !Number.isFinite(clientY)) {
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
    const point = new THREE.Vector3(node.x, node.y, node.z).project(camera);
    const screenX = rect.left + ((point.x + 1) / 2) * rect.width;
    const screenY = rect.top + ((1 - point.y) / 2) * rect.height;
    const distance = Math.hypot(screenX - clientX, screenY - clientY);
    if (distance < nearestDistance) {
      nearest = node;
      nearestDistance = distance;
    }
  });
  return nearest;
}

function clearSelection() {
  state.selectedNode = null;
  state.highlightedNodes.clear();
  state.highlightedLinks.clear();
  els.topicDetail.hidden = true;
  els.emptyState.hidden = false;
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
  renderRelationList(els.unlockList, state.outgoing.get(node.id) || [], "target");
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
    li.addEventListener("click", () => node && selectNode(node));
    li.addEventListener("keydown", (event) => {
      if ((event.key === "Enter" || event.key === " ") && node) {
        event.preventDefault();
        selectNode(node);
      }
    });
    container.appendChild(li);
  });
}

function updateStats() {
  const visible = visibleNodes().length;
  els.topicCount.textContent = formatNumber(state.englishTopics.topicCount || state.nodes.length);
  els.edgeCount.textContent = formatNumber(state.englishDependencies.edgeCount || state.links.length);
  els.visibleCount.textContent = formatNumber(visible);
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
  try {
    clearSelection();
    await loadLanguage(event.target.value);
  } catch (error) {
    showError(error);
  }
});

els.closeDetail.addEventListener("click", clearSelection);

loadLanguage("en").catch(showError);
