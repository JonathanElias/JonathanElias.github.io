/* ===== Yatzy Scoresheet ===== */

const LS_SETTINGS = 'yatzy_settings_v1';
const LS_GAME = 'yatzy_game_v1';

const DEFAULT_SETTINGS = {
  bonusThreshold: 63,
  bonusValue: 35,
  categories: [
    { id: 'ones',   label: 'Ones',   section: 'upper', type: 'count', max: 5,  enabled: true, help: 'Count only the ones' },
    { id: 'twos',   label: 'Twos',   section: 'upper', type: 'count', max: 10, enabled: true, help: 'Count only the twos' },
    { id: 'threes', label: 'Threes', section: 'upper', type: 'count', max: 15, enabled: true, help: 'Count only the threes' },
    { id: 'fours',  label: 'Fours',  section: 'upper', type: 'count', max: 20, enabled: true, help: 'Count only the fours' },
    { id: 'fives',  label: 'Fives',  section: 'upper', type: 'count', max: 25, enabled: true, help: 'Count only the fives' },
    { id: 'sixes',  label: 'Sixes',  section: 'upper', type: 'count', max: 30, enabled: true, help: 'Count only the sixes' },
    { id: 'one_pair',       label: 'One Pair',        section: 'lower', type: 'count', max: 30, enabled: true, help: 'Any pair — count all five dice' },
    { id: 'two_pairs',      label: 'Two Pairs',       section: 'lower', type: 'count', max: 30, enabled: true, help: 'Two pairs — count all five dice' },
    { id: 'three_kind',     label: 'Three of a Kind', section: 'lower', type: 'count', max: 30, enabled: true, help: 'Three of a kind — count all five dice' },
    { id: 'four_kind',      label: 'Four of a Kind',  section: 'lower', type: 'count', max: 30, enabled: true, help: 'Four of a kind — count all five dice' },
    { id: 'full_house',     label: 'Full House',      section: 'lower', type: 'fixed', points: 25, served: 30, enabled: true, help: 'One pair + three of a kind' },
    { id: 'small_straight', label: 'Small Straight',  section: 'lower', type: 'fixed', points: 30, served: 35, enabled: true, help: 'Four in a row' },
    { id: 'large_straight', label: 'Large Straight',  section: 'lower', type: 'fixed', points: 40, served: 45, enabled: true, help: 'Five in a row' },
    { id: 'yatzy',          label: 'Yatzy',           section: 'lower', type: 'fixed', points: 50, served: 80, enabled: true, help: 'Five of a kind' },
    { id: 'chance',         label: 'Chance',          section: 'lower', type: 'count', max: 30, enabled: true, help: 'Any five dice — count all' },
  ],
};

const UPPER_IDS = ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes'];

// Face value (1-6) for an upper-section category, or null for others.
function faceFor(cat) {
  const i = UPPER_IDS.indexOf(cat.id);
  return i === -1 ? null : i + 1;
}

/* ---------- Localization ---------- */
const LS_LANG = 'yatzy_lang';

const I18N = {
  de: {
    addPlayer: '+ Spieler',
    emptyHint: 'Füge einen Spieler hinzu, um zu punkten.',
    back: '← Zurück',
    settingsTitle: 'Einstellungen',
    resetDefaults: 'Zurücksetzen',
    language: 'Sprache',
    bonusBlock: 'Bonus im oberen Teil',
    bonusIf: 'Bonus wenn obere Summe ≥',
    bonusPoints: 'Bonuspunkte',
    categories: 'Kategorien',
    categoriesHelp: 'Wähle, welche Kategorien verwendet werden, und bearbeite ihre Punktwerte. „Serviert“ = im ersten Wurf erreicht.',
    scratch: 'Streichen (0)',
    clear: 'Leeren',
    cancel: 'Abbrechen',
    save: 'Speichern',
    removePlayer: 'Spieler entfernen',
    newPlayer: 'Neuer Spieler',
    editPlayer: 'Spieler bearbeiten',
    sectionUpper: 'Oberer Teil',
    sumUpper: 'Summe (Einser–Sechser)',
    bonus: 'Bonus',
    total: 'Gesamt',
    points: 'Punkte',
    served: 'Serviert',
    section_upper: 'oberer', section_lower: 'unterer',
    type_count: 'zählen', type_fixed: 'fest',
    multiples: (f, m) => `Vielfache von ${f}, max ${m}`,
    invalid: (f, m) => `Ungültig — muss ein Vielfaches von ${f} sein, max ${m}`,
    pointsBtn: p => `${p} Punkte`,
    servedBtn: s => `Serviert — ${s} Punkte`,
    playerN: n => `Spieler ${n}`,
    removeConfirm: name => `${name} entfernen?`,
    newGameConfirm: 'Neues Spiel starten? Alle aktuellen Punkte werden gelöscht (Spieler bleiben).',
    resetConfirm: 'Alle Einstellungen zurücksetzen?',
    cats: {
      ones: { label: 'Einser', help: 'Nur die Einser zählen' },
      twos: { label: 'Zweier', help: 'Nur die Zweier zählen' },
      threes: { label: 'Dreier', help: 'Nur die Dreier zählen' },
      fours: { label: 'Vierer', help: 'Nur die Vierer zählen' },
      fives: { label: 'Fünfer', help: 'Nur die Fünfer zählen' },
      sixes: { label: 'Sechser', help: 'Nur die Sechser zählen' },
      one_pair: { label: 'Ein Paar', help: 'Ein Paar — alle fünf Würfel zählen' },
      two_pairs: { label: 'Zwei Paare', help: 'Zwei Paare — alle fünf Würfel zählen' },
      three_kind: { label: 'Drei Gleiche', help: 'Drei Gleiche — alle fünf Würfel zählen' },
      four_kind: { label: 'Vier Gleiche', help: 'Vier Gleiche — alle fünf Würfel zählen' },
      full_house: { label: 'Full House', help: 'Ein Paar + drei Gleiche' },
      small_straight: { label: 'Kleine Straße', help: 'Vier in Folge' },
      large_straight: { label: 'Große Straße', help: 'Fünf in Folge' },
      yatzy: { label: 'Yatzy', help: 'Fünf Gleiche' },
      chance: { label: 'Chance', help: 'Beliebige fünf Würfel — alle zählen' },
    },
  },
  en: {
    addPlayer: '+ Player',
    emptyHint: 'Add a player to start scoring.',
    back: '← Back',
    settingsTitle: 'Settings',
    resetDefaults: 'Reset defaults',
    language: 'Language',
    bonusBlock: 'Upper section bonus',
    bonusIf: 'Bonus if upper sum ≥',
    bonusPoints: 'Bonus points',
    categories: 'Categories',
    categoriesHelp: 'Toggle which categories are used and edit their point values. "Served" = achieved on the first roll.',
    scratch: 'Scratch (0)',
    clear: 'Clear',
    cancel: 'Cancel',
    save: 'Save',
    removePlayer: 'Remove player',
    newPlayer: 'New player',
    editPlayer: 'Edit player',
    sectionUpper: 'Upper section',
    sumUpper: 'Sum (Ones–Sixes)',
    bonus: 'Bonus',
    total: 'Total',
    points: 'Points',
    served: 'Served',
    section_upper: 'upper', section_lower: 'lower',
    type_count: 'count', type_fixed: 'fixed',
    multiples: (f, m) => `multiples of ${f}, max ${m}`,
    invalid: (f, m) => `Invalid — must be a multiple of ${f}, max ${m}`,
    pointsBtn: p => `${p} points`,
    servedBtn: s => `Served — ${s} points`,
    playerN: n => `Player ${n}`,
    removeConfirm: name => `Remove ${name}?`,
    newGameConfirm: 'Start a new game? All current scores will be cleared (players kept).',
    resetConfirm: 'Reset all settings to defaults?',
    cats: {
      ones: { label: 'Ones', help: 'Count only the ones' },
      twos: { label: 'Twos', help: 'Count only the twos' },
      threes: { label: 'Threes', help: 'Count only the threes' },
      fours: { label: 'Fours', help: 'Count only the fours' },
      fives: { label: 'Fives', help: 'Count only the fives' },
      sixes: { label: 'Sixes', help: 'Count only the sixes' },
      one_pair: { label: 'One Pair', help: 'Any pair — count all five dice' },
      two_pairs: { label: 'Two Pairs', help: 'Two pairs — count all five dice' },
      three_kind: { label: 'Three of a Kind', help: 'Three of a kind — count all five dice' },
      four_kind: { label: 'Four of a Kind', help: 'Four of a kind — count all five dice' },
      full_house: { label: 'Full House', help: 'One pair + three of a kind' },
      small_straight: { label: 'Small Straight', help: 'Four in a row' },
      large_straight: { label: 'Large Straight', help: 'Five in a row' },
      yatzy: { label: 'Yatzy', help: 'Five of a kind' },
      chance: { label: 'Chance', help: 'Any five dice — count all' },
    },
  },
};

let lang = localStorage.getItem(LS_LANG) || 'de';
if (!I18N[lang]) lang = 'de';

function t(key) { return I18N[lang][key]; }
function catLabel(cat) { return (I18N[lang].cats[cat.id] || {}).label || cat.label || cat.id; }
function catHelp(cat) { return (I18N[lang].cats[cat.id] || {}).help || cat.help || ''; }

// Apply all static [data-i18n] text and update the <html lang> attribute.
function applyStaticI18n() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = t(el.dataset.i18n);
    if (typeof val === 'string') el.textContent = val;
  });
  document.querySelectorAll('.lang-switch .btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

function setLang(newLang) {
  if (!I18N[newLang]) return;
  lang = newLang;
  localStorage.setItem(LS_LANG, lang);
  applyStaticI18n();
  renderSheet();
  if (!viewSettings.classList.contains('hidden')) renderCatSettings();
}

let settings, game;

/* ---------- Persistence ---------- */
function load() {
  try {
    settings = JSON.parse(localStorage.getItem(LS_SETTINGS)) || null;
  } catch { settings = null; }
  if (!settings || !Array.isArray(settings.categories)) {
    settings = structuredClone(DEFAULT_SETTINGS);
  } else {
    // merge in any new default categories not present (forward compatibility)
    const known = new Set(settings.categories.map(c => c.id));
    for (const def of DEFAULT_SETTINGS.categories) {
      if (!known.has(def.id)) settings.categories.push(structuredClone(def));
    }
    if (settings.bonusThreshold == null) settings.bonusThreshold = DEFAULT_SETTINGS.bonusThreshold;
    if (settings.bonusValue == null) settings.bonusValue = DEFAULT_SETTINGS.bonusValue;
  }

  try {
    game = JSON.parse(localStorage.getItem(LS_GAME)) || null;
  } catch { game = null; }
  if (!game || !Array.isArray(game.players)) {
    game = { players: [], scores: {} };
  }
}

function saveSettings() { localStorage.setItem(LS_SETTINGS, JSON.stringify(settings)); }
function saveGame() { localStorage.setItem(LS_GAME, JSON.stringify(game)); }

/* ---------- Helpers ---------- */
function uid() { return Math.random().toString(36).slice(2, 9); }
function enabledCats() { return settings.categories.filter(c => c.enabled); }
function getScore(playerId, catId) {
  const s = game.scores[playerId];
  return s && s[catId] != null ? s[catId] : null;
}
function setScore(playerId, catId, value) {
  if (!game.scores[playerId]) game.scores[playerId] = {};
  if (value == null) delete game.scores[playerId][catId];
  else game.scores[playerId][catId] = value;
  saveGame();
}

function upperSum(playerId) {
  let sum = 0;
  for (const id of UPPER_IDS) {
    const cat = settings.categories.find(c => c.id === id);
    if (!cat || !cat.enabled) continue;
    const v = getScore(playerId, id);
    if (v != null) sum += v;
  }
  return sum;
}
function bonusFor(playerId) {
  return upperSum(playerId) >= settings.bonusThreshold ? settings.bonusValue : 0;
}
function lowerSum(playerId) {
  let sum = 0;
  for (const cat of enabledCats()) {
    if (cat.section !== 'lower') continue;
    const v = getScore(playerId, cat.id);
    if (v != null) sum += v;
  }
  return sum;
}
function grandTotal(playerId) {
  return upperSum(playerId) + bonusFor(playerId) + lowerSum(playerId);
}

/* ---------- Render scoresheet ---------- */
const sheetEl = document.getElementById('sheet');
const emptyHint = document.getElementById('empty-hint');

function renderSheet() {
  const players = game.players;
  emptyHint.classList.toggle('hidden', players.length > 0);
  sheetEl.innerHTML = '';
  if (players.length === 0) return;

  // Header
  const thead = document.createElement('thead');
  const hr = document.createElement('tr');
  hr.appendChild(th('', 'cat-col'));
  players.forEach(p => {
    const cell = document.createElement('th');
    cell.className = 'player-head';
    cell.innerHTML = `<span class="pname"></span><span class="ptotal">${grandTotal(p.id)}</span>`;
    cell.querySelector('.pname').textContent = p.name;
    cell.onclick = () => openNameModal(p);
    hr.appendChild(cell);
  });
  thead.appendChild(hr);
  sheetEl.appendChild(thead);

  const tbody = document.createElement('tbody');

  // Upper section
  tbody.appendChild(sectionRow(t('sectionUpper'), players.length));
  for (const cat of settings.categories) {
    if (cat.section !== 'upper' || !cat.enabled) continue;
    tbody.appendChild(scoreRow(cat, players));
  }
  tbody.appendChild(calcRow(t('sumUpper'), players, upperSum));
  tbody.appendChild(calcRow(`${t('bonus')} (≥ ${settings.bonusThreshold} → ${settings.bonusValue})`, players, bonusFor));

  // Lower section
  for (const cat of settings.categories) {
    if (cat.section !== 'lower' || !cat.enabled) continue;
    tbody.appendChild(scoreRow(cat, players));
  }

  tbody.appendChild(calcRow(t('total'), players, grandTotal, true));

  sheetEl.appendChild(tbody);
}

function th(text, cls) {
  const el = document.createElement('th');
  if (cls) el.className = cls;
  el.textContent = text;
  return el;
}

function sectionRow(label, colCount) {
  const tr = document.createElement('tr');
  tr.className = 'section-row';
  const td = document.createElement('td');
  td.colSpan = colCount + 1;
  td.textContent = label;
  tr.appendChild(td);
  return tr;
}

function scoreRow(cat, players) {
  const tr = document.createElement('tr');
  const nameTd = document.createElement('td');
  nameTd.className = 'cat-col';
  nameTd.innerHTML = `<span class="cat-label"></span><span class="cat-help"></span>`;
  nameTd.querySelector('.cat-label').textContent = catLabel(cat);
  nameTd.querySelector('.cat-help').textContent = catHelp(cat);
  tr.appendChild(nameTd);

  players.forEach(p => {
    const td = document.createElement('td');
    td.className = 'score-cell';
    const v = getScore(p.id, cat.id);
    if (v != null) {
      td.textContent = v;
      td.classList.add('filled');
      if (v === 0) td.classList.add('zero');
    } else {
      td.textContent = '';
    }
    td.onclick = () => openScoreModal(p, cat);
    tr.appendChild(td);
  });
  return tr;
}

function calcRow(label, players, fn, grand) {
  const tr = document.createElement('tr');
  tr.className = 'calc-row' + (grand ? ' grand-row' : '');
  const nameTd = document.createElement('td');
  nameTd.className = 'cat-col';
  nameTd.textContent = label;
  tr.appendChild(nameTd);
  players.forEach(p => {
    const td = document.createElement('td');
    td.className = 'calc-val';
    td.textContent = fn(p.id);
    tr.appendChild(td);
  });
  return tr;
}

/* ---------- Score entry modal ---------- */
const modalScore = document.getElementById('modal-score');
const modalPlayer = document.getElementById('modal-player');
const modalCat = document.getElementById('modal-cat');
const modalHelp = document.getElementById('modal-help');
const modalCountBody = document.getElementById('modal-count');
const modalFixedBody = document.getElementById('modal-fixed');
const keypadDisplay = document.getElementById('keypad-display');
const fixedPointsBtn = document.getElementById('fixed-points');
const fixedServedBtn = document.getElementById('fixed-served');

let modalState = null; // { player, cat, value }

function openScoreModal(player, cat) {
  modalState = { player, cat, value: getScore(player.id, cat.id) };
  modalPlayer.textContent = player.name;
  modalCat.textContent = catLabel(cat);
  const face = faceFor(cat);
  modalHelp.classList.remove('error');
  modalHelp.textContent = face
    ? `${catHelp(cat)} · ${t('multiples')(face, face * 5)}`
    : catHelp(cat);

  if (cat.type === 'fixed') {
    modalCountBody.classList.add('hidden');
    modalFixedBody.classList.remove('hidden');
    fixedPointsBtn.textContent = t('pointsBtn')(cat.points);
    fixedServedBtn.textContent = t('servedBtn')(cat.served);
    fixedPointsBtn.onclick = () => { modalState.value = cat.points; commitScore(); };
    fixedServedBtn.onclick = () => { modalState.value = cat.served; commitScore(); };
  } else {
    modalFixedBody.classList.add('hidden');
    modalCountBody.classList.remove('hidden');
    keypadDisplay.textContent = modalState.value != null ? String(modalState.value) : '0';
  }
  modalScore.classList.remove('hidden');
}

function closeScoreModal() {
  modalScore.classList.add('hidden');
  modalState = null;
}

// An upper-section count is valid only if it's a multiple of its face, up to 5×face.
function isValidUpper(cat, value) {
  const face = faceFor(cat);
  if (face == null || value == null) return true;
  return value >= 0 && value <= face * 5 && value % face === 0;
}

function commitScore() {
  if (!modalState) return;
  const val = modalState.value;
  if (val != null && modalState.cat.type !== 'fixed' && !isValidUpper(modalState.cat, val)) {
    const face = faceFor(modalState.cat);
    modalHelp.textContent = t('invalid')(face, face * 5);
    modalHelp.classList.add('error');
    return; // reject: leave the modal open and don't store the value
  }
  setScore(modalState.player.id, modalState.cat.id, val);
  closeScoreModal();
  renderSheet();
}

// Keypad
document.querySelectorAll('.keypad .key').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!modalState) return;
    const key = btn.dataset.key;
    let cur = keypadDisplay.textContent;
    if (key === 'clear') {
      cur = '0';
    } else if (key === 'back') {
      cur = cur.length > 1 ? cur.slice(0, -1) : '0';
    } else {
      cur = cur === '0' ? key : cur + key;
      if (cur.length > 3) cur = cur.slice(0, 3); // cap
    }
    keypadDisplay.textContent = cur;
    modalState.value = parseInt(cur, 10);
  });
});

document.getElementById('modal-save').onclick = () => {
  if (!modalState) return;
  if (modalState.cat.type !== 'fixed') {
    modalState.value = parseInt(keypadDisplay.textContent, 10) || 0;
  }
  if (modalState.value == null) modalState.value = 0;
  commitScore();
};
document.getElementById('modal-scratch').onclick = () => {
  if (!modalState) return;
  modalState.value = 0;
  commitScore();
};
document.getElementById('modal-unset').onclick = () => {
  if (!modalState) return;
  modalState.value = null;
  commitScore();
};
document.getElementById('modal-cancel').onclick = closeScoreModal;
modalScore.addEventListener('click', e => { if (e.target === modalScore) closeScoreModal(); });

// Physical keyboard support (desktop)
document.addEventListener('keydown', e => {
  if (modalScore.classList.contains('hidden') || !modalState) return;
  if (e.key === 'Escape') { e.preventDefault(); closeScoreModal(); return; }
  if (e.key === 'Enter') { e.preventDefault(); document.getElementById('modal-save').click(); return; }
  if (modalState.cat.type === 'fixed') return;
  let cur = keypadDisplay.textContent;
  if (/^[0-9]$/.test(e.key)) {
    cur = cur === '0' ? e.key : cur + e.key;
    if (cur.length > 3) cur = cur.slice(0, 3);
  } else if (e.key === 'Backspace') {
    cur = cur.length > 1 ? cur.slice(0, -1) : '0';
  } else {
    return;
  }
  e.preventDefault();
  keypadDisplay.textContent = cur;
  modalState.value = parseInt(cur, 10);
});

/* ---------- Player name modal ---------- */
const modalText = document.getElementById('modal-text');
const textTitle = document.getElementById('text-title');
const textInput = document.getElementById('text-input');
const textDelete = document.getElementById('text-delete');

let editingPlayer = null;

function openNameModal(player) {
  editingPlayer = player || null;
  textTitle.textContent = player ? t('editPlayer') : t('newPlayer');
  textInput.value = player ? player.name : '';
  textInput.placeholder = t('playerN')(game.players.length + 1);
  textDelete.classList.toggle('hidden', !player);
  modalText.classList.remove('hidden');
  setTimeout(() => textInput.focus(), 50);
}
function closeNameModal() {
  modalText.classList.add('hidden');
  editingPlayer = null;
}
document.getElementById('text-cancel').onclick = closeNameModal;
document.getElementById('text-save').onclick = () => {
  const name = textInput.value.trim() || textInput.placeholder;
  if (editingPlayer) {
    editingPlayer.name = name;
  } else {
    game.players.push({ id: uid(), name });
  }
  saveGame();
  closeNameModal();
  renderSheet();
};
document.getElementById('text-delete').onclick = () => {
  if (!editingPlayer) return;
  if (!confirm(t('removeConfirm')(editingPlayer.name))) return;
  game.players = game.players.filter(p => p.id !== editingPlayer.id);
  delete game.scores[editingPlayer.id];
  saveGame();
  closeNameModal();
  renderSheet();
};
textInput.addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('text-save').click(); });
modalText.addEventListener('click', e => { if (e.target === modalText) closeNameModal(); });

/* ---------- Settings view ---------- */
const viewGame = document.getElementById('view-game');
const viewSettings = document.getElementById('view-settings');
const catSettingsEl = document.getElementById('cat-settings');
const bonusThresholdInput = document.getElementById('bonus-threshold');
const bonusValueInput = document.getElementById('bonus-value');

function openSettings() {
  bonusThresholdInput.value = settings.bonusThreshold;
  bonusValueInput.value = settings.bonusValue;
  renderCatSettings();
  viewGame.classList.add('hidden');
  viewSettings.classList.remove('hidden');
}
function closeSettings() {
  viewSettings.classList.add('hidden');
  viewGame.classList.remove('hidden');
  renderSheet();
}

function renderCatSettings() {
  catSettingsEl.innerHTML = '';
  settings.categories.forEach(cat => {
    const row = document.createElement('div');
    row.className = 'cat-row';

    const sw = document.createElement('label');
    sw.className = 'switch';
    sw.innerHTML = `<input type="checkbox" ${cat.enabled ? 'checked' : ''}><span class="slider"></span>`;
    sw.querySelector('input').onchange = e => { cat.enabled = e.target.checked; saveSettings(); };
    row.appendChild(sw);

    const name = document.createElement('div');
    name.className = 'cat-name';
    name.innerHTML = `<span></span><small>${t('section_' + cat.section)} · ${t('type_' + cat.type)}</small>`;
    name.querySelector('span').textContent = catLabel(cat);
    row.appendChild(name);

    if (cat.type === 'fixed') {
      const fields = document.createElement('div');
      fields.className = 'cat-fields';
      fields.appendChild(numField(t('points'), cat.points, v => { cat.points = v; saveSettings(); }));
      fields.appendChild(numField(t('served'), cat.served, v => { cat.served = v; saveSettings(); }));
      row.appendChild(fields);
    }

    catSettingsEl.appendChild(row);
  });
}

function numField(label, value, onChange) {
  const wrap = document.createElement('label');
  const input = document.createElement('input');
  input.type = 'number';
  input.className = 'num-input';
  input.value = value;
  input.min = '0';
  input.onchange = () => onChange(parseInt(input.value, 10) || 0);
  wrap.append(label, input);
  return wrap;
}

bonusThresholdInput.onchange = () => { settings.bonusThreshold = parseInt(bonusThresholdInput.value, 10) || 0; saveSettings(); };
bonusValueInput.onchange = () => { settings.bonusValue = parseInt(bonusValueInput.value, 10) || 0; saveSettings(); };

document.getElementById('btn-reset-settings').onclick = () => {
  if (!confirm(t('resetConfirm'))) return;
  settings = structuredClone(DEFAULT_SETTINGS);
  saveSettings();
  openSettings();
};

document.querySelectorAll('.lang-switch .btn').forEach(btn => {
  btn.onclick = () => setLang(btn.dataset.lang);
});

/* ---------- Top-level actions ---------- */
document.getElementById('btn-add-player').onclick = () => openNameModal(null);
document.getElementById('btn-settings').onclick = openSettings;
document.getElementById('btn-back').onclick = closeSettings;
document.getElementById('btn-new-game').onclick = () => {
  if (!confirm(t('newGameConfirm'))) return;
  game.scores = {};
  saveGame();
  renderSheet();
};

/* ---------- Init ---------- */
function syncHeaderHeight() {
  const h = document.querySelector('.app-header').offsetHeight;
  document.documentElement.style.setProperty('--header-h', h + 'px');
}
window.addEventListener('resize', syncHeaderHeight);

load();
applyStaticI18n();
syncHeaderHeight();
renderSheet();
