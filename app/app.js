// GTA VI trophy guide and tracker v2: step-level cited guides, audit strip and
// source matrix, checklist in localStorage, export/import, kind, grade and
// status filters, search, and a spoiler setting for story trophies. The audit
// strip is computed live from trophies.json, so its numbers always match the data.
const STORAGE_KEY = 'gta6-trophy-guide-v2';
const listEl = document.getElementById('list');
const detailEl = document.getElementById('detail');
const searchEl = document.getElementById('search');
const kindEl = document.getElementById('kind');
const gradeEl = document.getElementById('grade');
const statusEl = document.getElementById('status');
const earnedFilterEl = document.getElementById('earnedFilter');
const spoilersEl = document.getElementById('spoilers');

let trophies = [];
let sourceList = [];
let earned = new Set(loadEarned());
let selectedName = null;

function loadEarned() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]'); } catch { return []; }
}
function saveEarned() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...earned].sort()));
}
function isStory(t) { return t.kind === 'story'; }
function isHidden(t) { return isStory(t) && !spoilersEl.checked && !earned.has(t.name); }
function displayName(t) { return isHidden(t) ? 'Hidden story trophy' : t.name; }
function displayDescription(t) { return isHidden(t) ? 'Hidden until earned — turn “Show story spoilers” on, or earn it.' : t.description; }
function stepCount(t) { return (t.steps ?? []).length; }
function backedCount(t) { return (t.steps ?? []).filter((s) => (s.s ?? []).length >= 2).length; }

function renderAudit() {
  const totalSteps = trophies.reduce((n, t) => n + stepCount(t), 0);
  const backed = trophies.reduce((n, t) => n + backedCount(t), 0);
  const verified = trophies.filter((t) => t.status === 'verified').length;
  const disputed = trophies.filter((t) => t.status === 'disputed').length;
  const unconfirmed = trophies.filter((t) => t.status === 'unconfirmed').length;
  const grid = document.getElementById('auditGrid');
  grid.replaceChildren();
  const cells = [
    [`${totalSteps}`, 'cited steps in total'],
    [`${backed}`, 'steps backed by 2+ sources'],
    [`${verified} / 55`, 'trophies verified'],
    [`${disputed}`, 'trophies disputed'],
    [`${unconfirmed}`, 'trophies unconfirmed'],
    [`${sourceList.length}`, 'named sources, dated'],
  ];
  for (const [big, small] of cells) {
    const div = document.createElement('div');
    div.className = 'auditCell';
    const b = document.createElement('div');
    b.className = 'auditBig';
    b.textContent = big;
    const s = document.createElement('div');
    s.className = 'auditSmall';
    s.textContent = small;
    div.append(b, s);
    grid.append(div);
  }
}

function renderMatrix() {
  const body = document.querySelector('#sourceMatrix tbody');
  body.replaceChildren();
  for (const s of sourceList) {
    const tr = document.createElement('tr');
    for (const text of [s.name, s.date, s.what]) {
      const td = document.createElement('td');
      td.textContent = text;
      tr.append(td);
    }
    body.append(tr);
  }
}

function updateProgress() {
  const total = trophies.length;
  const n = earned.size;
  const pct = total ? Math.round((n / total) * 100) : 0;
  document.getElementById('progressCount').textContent = `${n} / ${total}`;
  document.getElementById('progressBar').style.width = `${pct}%`;
  const byGrade = (g) => trophies.filter((t) => t.grade === g && earned.has(t.name)).length;
  const totalByGrade = (g) => trophies.filter((t) => t.grade === g).length;
  document.getElementById('progressText').textContent =
    `${n} earned · ${pct}% · Platinum ${byGrade('platinum')}/${totalByGrade('platinum')} · Gold ${byGrade('gold')}/${totalByGrade('gold')} · Silver ${byGrade('silver')}/${totalByGrade('silver')} · Bronze ${byGrade('bronze')}/${totalByGrade('bronze')}`;
}

function visibleTrophies() {
  const q = searchEl.value.trim().toLowerCase();
  return trophies.filter((t) => {
    if (kindEl.value === 'missable' && !t.missable) return false;
    if (kindEl.value !== 'all' && kindEl.value !== 'missable' && t.kind !== kindEl.value) return false;
    if (gradeEl.value !== 'all' && t.grade !== gradeEl.value) return false;
    if (statusEl.value !== 'all' && t.status !== statusEl.value) return false;
    if (earnedFilterEl.value === 'earned' && !earned.has(t.name)) return false;
    if (earnedFilterEl.value === 'todo' && earned.has(t.name)) return false;
    if (q && !`${t.name} ${t.description} ${t.guide} ${(t.steps ?? []).map((s) => s.t).join(' ')}`.toLowerCase().includes(q)) return false;
    return true;
  });
}

function renderList() {
  const shown = visibleTrophies();
  document.getElementById('resultCount').textContent =
    `Showing ${shown.length} of ${trophies.length} trophies · ${earned.size} earned · ${trophies.reduce((n, t) => n + stepCount(t), 0)} cited steps · Online trophies: 0 — the official list has none.`;
  listEl.replaceChildren();
  for (const t of shown) {
    const card = document.createElement('article');
    card.className = 'card' + (earned.has(t.name) ? ' earned' : '') + (selectedName === t.name ? ' selected' : '');
    card.tabIndex = 0;
    const title = document.createElement('h3');
    title.textContent = displayName(t);
    const desc = document.createElement('p');
    desc.className = 'desc';
    desc.textContent = displayDescription(t);
    const meta = document.createElement('div');
    meta.className = 'meta';
    for (const [label, cls] of [[t.grade, `pill grade-${t.grade}`], [t.kind, 'pill'], [t.count != null ? `×${t.count}` : null, 'pill'], [t.status, `pill status-${t.status}`], [`${stepCount(t)} steps`, 'pill'], [`${backedCount(t)} backed by 2+`, 'pill']]) {
      if (!label) continue;
      const pill = document.createElement('span');
      pill.className = cls;
      pill.textContent = label;
      meta.append(pill);
    }
    if (t.missable) {
      const pill = document.createElement('span');
      pill.className = 'pill missable';
      pill.textContent = '⚠ Possibly missable';
      meta.append(pill);
    }
    card.append(title, desc, meta);
    card.addEventListener('click', () => selectTrophy(t));
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter') selectTrophy(t); });
    listEl.append(card);
  }
  if (!shown.length) {
    const p = document.createElement('p');
    p.textContent = 'No trophies match these filters. Clear the search or change the filters.';
    listEl.append(p);
  }
}

function selectTrophy(t) {
  selectedName = t.name;
  renderList();
  renderDetail(t);
}

function renderDetail(t) {
  if (!t) return;
  detailEl.replaceChildren();
  const title = document.createElement('h2');
  title.textContent = displayName(t);
  const desc = document.createElement('p');
  desc.className = 'desc';
  desc.textContent = `${t.grade} · ${t.kind}${t.count != null ? ` · count ${t.count}` : ''} · ${t.status} · ${stepCount(t)} cited steps, ${backedCount(t)} backed by 2+ sources — ${displayDescription(t)}`;
  const label = document.createElement('label');
  const box = document.createElement('input');
  box.type = 'checkbox';
  box.checked = earned.has(t.name);
  box.addEventListener('change', () => {
    if (box.checked) earned.add(t.name); else earned.delete(t.name);
    saveEarned();
    updateProgress();
    renderList();
    renderDetail(t);
  });
  label.append(box, document.createTextNode(earned.has(t.name) ? 'Earned — ticked' : 'Mark as earned'));
  detailEl.append(title, desc, label);
  if (isHidden(t)) {
    const p = document.createElement('p');
    p.className = 'guide';
    p.textContent = 'This guide is hidden with the trophy, so the story stays unspoiled.';
    detailEl.append(p);
    return;
  }
  const guide = document.createElement('p');
  guide.className = 'guide';
  guide.textContent = t.guide;
  detailEl.append(guide);
  const ol = document.createElement('ol');
  ol.className = 'steps';
  for (const step of t.steps ?? []) {
    const li = document.createElement('li');
    li.textContent = `${step.t} `;
    const tag = document.createElement('span');
    tag.className = 'src';
    tag.textContent = `— ${(step.s ?? []).join(', ')}`;
    li.append(tag);
    ol.append(li);
  }
  detailEl.append(ol);
  if (t.dispute) {
    const d = document.createElement('p');
    d.className = 'dispute';
    d.textContent = `Disputed / unconfirmed: ${t.dispute}`;
    detailEl.append(d);
  }
  const source = document.createElement('p');
  source.className = 'source';
  source.textContent = `Source: ${t.source}. Names, descriptions and grades are as PlayStation publishes them (Exophase official list).`;
  detailEl.append(source);
  if (t.missable) {
    const warn = document.createElement('p');
    warn.className = 'missable';
    warn.textContent = '⚠ Possibly missable — do the Chapter 1 balcony meditation before Chapter 1 ends.';
    detailEl.append(warn);
  }
}

function exportProgress() {
  const blob = new Blob([JSON.stringify({ game: 'Grand Theft Auto VI', exportedAt: new Date().toISOString(), earned: [...earned].sort() }, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'gta6-trophy-progress.json';
  a.click();
  URL.revokeObjectURL(a.href);
}

async function importProgress(file) {
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    const names = Array.isArray(data) ? data : data.earned;
    const known = new Set(trophies.map((t) => t.name));
    const good = names.filter((n) => known.has(n));
    if (!good.length) throw new Error('no known trophy names in that file');
    earned = new Set(good);
    saveEarned();
    updateProgress();
    renderList();
    if (selectedName) { const t = trophies.find((x) => x.name === selectedName); if (t) renderDetail(t); }
  } catch {
    alert('That file is not a progress export from this guide.');
  }
}

async function loadTrophies() {
  const res = await fetch('data/trophies.json');
  const data = await res.json();
  trophies = data.trophies;
  sourceList = data.sources ?? [];
  renderAudit();
  renderMatrix();
  updateProgress();
  renderList();
  selectTrophy(trophies.find((t) => t.name === 'Positive Mental Attitude') ?? trophies[0]);
}

searchEl.addEventListener('input', renderList);
kindEl.addEventListener('change', renderList);
gradeEl.addEventListener('change', renderList);
statusEl.addEventListener('change', renderList);
earnedFilterEl.addEventListener('change', renderList);
spoilersEl.addEventListener('change', () => { renderList(); if (selectedName) { const t = trophies.find((x) => x.name === selectedName); if (t) renderDetail(t); } });
document.getElementById('export').addEventListener('click', exportProgress);
document.getElementById('import').addEventListener('change', (e) => importProgress(e.target.files[0]));
document.getElementById('reset').addEventListener('click', () => {
  if (!confirm('Clear all earned trophies in this browser?')) return;
  earned = new Set();
  saveEarned();
  updateProgress();
  renderList();
});
loadTrophies();
