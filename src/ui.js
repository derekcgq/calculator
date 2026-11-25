const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const EL_CLS = ['wood','fire','earth','metal','water'];
const elOfChar = c => STEMS.includes(c) ? stemEl(c) : BRANCHES.includes(c) ? brEl(c) : -1;
const ch = (c, big) => { const e = elOfChar(c); return `<span class="ch ${e >= 0 ? EL_CLS[e] : ''} ${big ? 'big' : ''}">${c}</span>`; };
const elTag = e => `<span class="eltag ${EL_CLS[e]}">${EL[e]}${LANG === 'zh' ? '' : ' ' + EL_EN[e]}</span>`;
const godTag = g => g === '日主' ? `<span class="god dm">${L('日主 Day Master', '日主')}</span>` : `<span class="god g-${TG_GROUP[g]}">${g}${LANG === 'zh' ? '' : `<small>${TG_EN[g]}</small>`}</span>`;
const tone = t => `<span class="tone ${t}">${t === 'good' ? L('Supportive', '有利') : t === 'warn' ? L('Caution', '留意') : t === 'info' ? L('Note', '说明') : L('Mixed', '中性')}</span>`;

const PRESETS = {
  sg: {name:'Singapore', lon:103.82, tz:8, hist:'sgmy'},
  kl: {name:'Kuala Lumpur', lon:101.69, tz:8, hist:'sgmy'},
  bj: {name:'Beijing', lon:116.41, tz:8, grp:'cn', hist:'cn'},
  tj: {name:'Tianjin', lon:117.2, tz:8, grp:'cn', hist:'cn'},
  sh: {name:'Shanghai', lon:121.47, tz:8, grp:'cn', hist:'cn'},
  cq: {name:'Chongqing', lon:106.55, tz:8, grp:'cn', hist:'cn'},
  shijiazhuang: {name:'Shijiazhuang (Hebei)', lon:114.51, tz:8, grp:'cn', hist:'cn'},
  taiyuan: {name:'Taiyuan (Shanxi)', lon:112.55, tz:8, grp:'cn', hist:'cn'},
  hohhot: {name:'Hohhot (Inner Mongolia)', lon:111.67, tz:8, grp:'cn', hist:'cn'},
  shenyang: {name:'Shenyang (Liaoning)', lon:123.43, tz:8, grp:'cn', hist:'cn'},
  dalian: {name:'Dalian (Liaoning)', lon:121.62, tz:8, grp:'cn', hist:'cn'},
  changchun: {name:'Changchun (Jilin)', lon:125.32, tz:8, grp:'cn', hist:'cn'},
  harbin: {name:'Harbin (Heilongjiang)', lon:126.64, tz:8, grp:'cn', hist:'cn'},
  nanjing: {name:'Nanjing (Jiangsu)', lon:118.8, tz:8, grp:'cn', hist:'cn'},
  suzhou: {name:'Suzhou (Jiangsu)', lon:120.62, tz:8, grp:'cn', hist:'cn'},
  hangzhou: {name:'Hangzhou (Zhejiang)', lon:120.15, tz:8, grp:'cn', hist:'cn'},
  hefei: {name:'Hefei (Anhui)', lon:117.23, tz:8, grp:'cn', hist:'cn'},
  fuzhou: {name:'Fuzhou (Fujian)', lon:119.3, tz:8, grp:'cn', hist:'cn'},
  xiamen: {name:'Xiamen (Fujian)', lon:118.09, tz:8, grp:'cn', hist:'cn'},
  nanchang: {name:'Nanchang (Jiangxi)', lon:115.86, tz:8, grp:'cn', hist:'cn'},
  jinan: {name:'Jinan (Shandong)', lon:117.0, tz:8, grp:'cn', hist:'cn'},
  qingdao: {name:'Qingdao (Shandong)', lon:120.38, tz:8, grp:'cn', hist:'cn'},
  zhengzhou: {name:'Zhengzhou (Henan)', lon:113.63, tz:8, grp:'cn', hist:'cn'},
  wuhan: {name:'Wuhan (Hubei)', lon:114.31, tz:8, grp:'cn', hist:'cn'},
  changsha: {name:'Changsha (Hunan)', lon:112.94, tz:8, grp:'cn', hist:'cn'},
  guangzhou: {name:'Guangzhou (Guangdong)', lon:113.26, tz:8, grp:'cn', hist:'cn'},
  shenzhen: {name:'Shenzhen (Guangdong)', lon:114.06, tz:8, grp:'cn', hist:'cn'},
  nanning: {name:'Nanning (Guangxi)', lon:108.37, tz:8, grp:'cn', hist:'cn'},
  haikou: {name:'Haikou (Hainan)', lon:110.35, tz:8, grp:'cn', hist:'cn'},
  chengdu: {name:'Chengdu (Sichuan)', lon:104.07, tz:8, grp:'cn', hist:'cn'},
  guiyang: {name:'Guiyang (Guizhou)', lon:106.63, tz:8, grp:'cn', hist:'cn'},
  kunming: {name:'Kunming (Yunnan)', lon:102.83, tz:8, grp:'cn', hist:'cn'},
  lhasa: {name:'Lhasa (Tibet)', lon:91.11, tz:8, grp:'cn', hist:'cn'},
  xian: {name:"Xi'an (Shaanxi)", lon:108.94, tz:8, grp:'cn', hist:'cn'},
  lanzhou: {name:'Lanzhou (Gansu)', lon:103.83, tz:8, grp:'cn', hist:'cn'},
  xining: {name:'Xining (Qinghai)', lon:101.78, tz:8, grp:'cn', hist:'cn'},
  yinchuan: {name:'Yinchuan (Ningxia)', lon:106.23, tz:8, grp:'cn', hist:'cn'},
  urumqi: {name:'Urumqi (Xinjiang)', lon:87.62, tz:8, grp:'cn', hist:'cn'},
  kashgar: {name:'Kashgar (Xinjiang)', lon:75.99, tz:8, grp:'cn', hist:'cn'},
  hk: {name:'Hong Kong (SAR)', lon:114.17, tz:8, grp:'cn'},
  mo: {name:'Macau (SAR)', lon:113.54, tz:8, grp:'cn'},
  tp: {name:'Taipei (Taiwan)', lon:121.56, tz:8, grp:'cn'},
  jk: {name:'Jakarta', lon:106.85, tz:7},
  bk: {name:'Bangkok', lon:100.50, tz:7},
  tk: {name:'Tokyo', lon:139.69, tz:9},
  sy: {name:'Sydney', lon:151.21, tz:10},
  ld: {name:'London', lon:-0.13, tz:0},
  ny: {name:'New York', lon:-74.0, tz:-5},
  custom: {name:'Custom…', lon:null, tz:null},
};
// Mainland China daylight saving 1986-1991 (dates per the IANA tz database)
const CN_DST = {1986:[[5,4],[9,14]], 1987:[[4,12],[9,13]], 1988:[[4,17],[9,11]], 1989:[[4,16],[9,17]], 1990:[[4,15],[9,16]], 1991:[[4,14],[9,15]]};
function histTz(preset, y, m, d) {
  const p = PRESETS[preset];
  if (!p) return null;
  const v = y * 10000 + m * 100 + d;
  if (p.hist === 'cn') {
    const r = CN_DST[y];
    return r && v >= y * 10000 + r[0][0] * 100 + r[0][1] && v < y * 10000 + r[1][0] * 100 + r[1][1] ? 9 : null;
  }
  if (p.hist !== 'sgmy') return null;
  if (v < 19050601) return 6 + 55.4 / 60;   // Singapore Mean Time
  if (v < 19330101) return 7;
  if (v < 19410901) return 7 + 1/3;           // UTC+7:20
  if (v < 19420216) return 7.5;
  if (v < 19450912) return 9;
  if (v < 19820101) return 7.5;
  return 8;
}

function readForm() {
  const [y, m, d] = $('#bdate').value.split('-').map(Number);
  const noHour = $('#notime').checked;
  const [h, mi] = noHour ? [12, 0] : $('#btime').value.split(':').map(Number);
  const [qy, qm, qd] = $('#qdate').value.split('-').map(Number);
  const [qh, qmi] = $('#qtime').value.split(':').map(Number);
  return {
    wall: [y, m, d, h, mi], tz: parseFloat($('#tz').value), lon: parseFloat($('#lon').value),
    useTST: noHour ? false : $('#tst').checked, noHour, gender: $('#gender').value === 'm' ? 1 : 0, ziRule: $('#zi').value,
    preset: $('#place').value, qwall: [qy, qm, qd, qh, qmi], qtz: parseFloat($('#qtz').value),
    name: $('#pname').value.trim(),
  };
}

function pad(n) { return String(n).padStart(2, '0'); }
function fmt(c) { return `${c[0]}-${pad(c[1])}-${pad(c[2])} ${pad(c[3])}:${pad(c[4])}`; }

let STATE = null;

function deviceNow() {
  const tz = -new Date().getTimezoneOffset() / 60;
  const n = new Date(Date.now() + tz * 3600e3);
  return {tz, date: n.toISOString().slice(0, 10), time: n.toISOString().slice(11, 16)};
}
function syncQueryMode() {
  const auto = $('#qauto').checked;
  document.querySelectorAll('.qman').forEach(el => el.hidden = auto);
  if (auto) {
    const n = deviceNow();
    $('#qdate').value = n.date; $('#qtime').value = n.time; $('#qtz').value = n.tz;
    $('#qnowtxt').textContent = L(`Using ${n.date} ${n.time} (UTC${n.tz >= 0 ? '+' : ''}${n.tz})`, `使用 ${n.date} ${n.time}（UTC${n.tz >= 0 ? '+' : ''}${n.tz}）`);
  } else $('#qnowtxt').textContent = '';
}
// Placeholders used when the birth hour is unknown: Zi Wei and the Qi Men birth chart both need it
const NEUTRAL_PALACE = {name: '', en: '', stem: '', branch: '', isBody: false, major: [], minor: [], adj: [], decadal: [0, 0]};
const NEUTRAL_CELL = {p: 5, name: '', door: '', star: '', god: '', earth: '', heaven: '', tone: 'mixed', kong: false, ma: false, score: 0};
const ZW_STUB = {unknown: true, palaces: [], mutLoc: {}, current: null, lunarDate: '', time: '', fiveClass: '',
  byName: () => NEUTRAL_PALACE, opposite: () => NEUTRAL_PALACE, evalPalace: () => ({score: 0, tone: 'mixed', stars: [], borrowed: false, notes: []})};
const QM_STUB = {unknown: true, yang: true, ju: 0, jq: '', yuan: '', cells: {}, stemPalace: () => null, doorPalace: () => NEUTRAL_CELL, godPalace: () => NEUTRAL_CELL, starPalace: () => NEUTRAL_CELL};
const NOHOUR_NOTE = () => `<div class="card"><b>${L('Birth time unknown', '出生时间不详')}</b><p class="small muted">${L('Your chart uses the Year, Month and Day pillars only. The Hour pillar, the Zi Wei Dou Shu chart and the Qi Men birth chart all depend on the exact birth time, so they are left out rather than guessed. If a parent or document can narrow the time to even a rough window, enter it to unlock them.', '你的命盘只用年柱、月柱、日柱。时柱、紫微斗数命盘与奇门命局都依赖精确的出生时间，所以不作猜测，暂不显示。若能向家人或证件问到大致时段，填入后即可解锁。')}</p></div>`;
function calculate(scroll = true) {
  syncQueryMode();
  const inp = readForm();
  if (!inp.wall.every(n => !isNaN(n)) || isNaN(inp.tz) || isNaN(inp.lon)) { $('#err').textContent = L('Please complete birth date, time, longitude and UTC offset.', '请填写完整的出生日期、时间、经度和时区。'); return; }
  $('#err').textContent = '';
  try { localStorage.setItem('fp-input', JSON.stringify({b: $('#bdate').value, t: $('#btime').value, g: $('#gender').value, p: $('#place').value, lon: $('#lon').value, tz: $('#tz').value, nt: $('#notime').checked, tst: $('#tst').checked, zi: $('#zi').value, n: $('#pname').value})); } catch (e) {}
  const bazi = computeBazi(inp);
  const qUtc = Date.UTC(inp.qwall[0], inp.qwall[1] - 1, inp.qwall[2], inp.qwall[3], inp.qwall[4]) - inp.qtz * 3600e3;
  const queryDate = new Date(qUtc);
  const zw = inp.noHour ? ZW_STUB : computeZiwei(inp, bazi, queryDate);
  const qmBirth = inp.noHour ? QM_STUB : computeQimen(inp.wall, inp.tz, inp.lon, inp.useTST, inp.ziRule);
  const qmNow = computeQimen(inp.qwall, inp.qtz, inp.lon, inp.useTST, inp.ziRule);
  const qYear = new Date(qUtc + 8 * 3600e3).getUTCFullYear();
  STATE = {inp, bazi, zw, qmBirth, qmNow, qYear, qmView: inp.noHour ? 'now' : (STATE && STATE.qmView) || 'birth'};
  render();
  $('#results').hidden = false;
  { const cur = location.hash.slice(1); showTab(!cur || (cur === 'guide' && scroll) ? 'summary' : cur); }
  if (scroll) $('#results').scrollIntoView({behavior: 'smooth'});
}

function render() {
  renderBazi(); renderZiwei(); renderQimen(); renderCross(); initCompat(); guideYour(); renderReading(); renderSimple(); renderPastLife(); zhScope();
  if (STATE.inp.noHour) $('#tab-summary').insertAdjacentHTML('afterbegin', NOHOUR_NOTE());
}

// ---------- BaZi ----------
function renderBazi() {
  const {bazi: b, inp, qYear} = STATE;
  const t = b.times;
  let h = `<div class="card meta">
    <div><b>${esc(inp.name || L('Chart', '命盘'))}</b> · ${inp.gender ? 'Male 乾造' : 'Female 坤造'} · Lunar ${esc(b.lunar.getYearInGanZhi())}年 ${esc(b.lunar.getMonthInChinese())}月 ${esc(b.lunar.getDayInChinese())} · ${ZODIAC_ZH[BRANCHES.indexOf(b.pillars[0].zhi)]} ${ZODIAC[BRANCHES.indexOf(b.pillars[0].zhi)]}</div>
    <div class="muted">Clock ${fmt(inp.wall)} (UTC${inp.tz >= 0 ? '+' : ''}${+inp.tz.toFixed(2)}) → ${inp.useTST ? `True solar time ${fmt(t.tst)} (${t.correctionMin > 0 ? '+' : ''}${t.correctionMin} min incl. equation of time ${t.eot} min)` : 'clock time used (true solar time off)'} · Solar term: ${esc(b.jieqi)} · Zi hour: ${b.sect === 1 ? 'day changes 23:00' : 'day changes 00:00'}</div>
  </div>`;

  // Pillars
  h += `<h3>Four Pillars 四柱 <small>8 characters · 60 Jiazi cycle</small></h3>${ex('How to read the pillars', BAZI_HOWTO.pillars)}<div class="pillars">`;
  b.pillars.forEach((p, i) => {
    h += `<div class="pillar ${i === 2 ? 'daycol' : ''}">
      <div class="ptitle">${p.zh} ${p.en}</div>
      <div class="pmean">${esc(p.meaning)}</div>
      <div class="pgod">${godTag(p.stemGod)}</div>
      <div class="pchars">${ch(p.gan, 1)}<div class="sub">${STEM_PY[STEMS.indexOf(p.gan)]} · ${stemYang(p.gan) ? 'Yang' : 'Yin'} ${EL_EN[stemEl(p.gan)]}</div>
      ${ch(p.zhi, 1)}<div class="sub">${BR_PY[BRANCHES.indexOf(p.zhi)]} · ${ZODIAC[BRANCHES.indexOf(p.zhi)]} · ${EL_EN[brEl(p.zhi)]}</div></div>
      <div class="hidden"><div class="lbl">Hidden stems 藏干</div>${p.hidden.map(x => `<div>${ch(x.stem)} ${godTag(x.god)}</div>`).join('')}</div>
      <div class="pfoot"><span>${LIFE_STAGES[p.stage]} <small>${LIFE_STAGES_EN[p.stage]} — ${STAGE_PLAIN[p.stage]}</small></span><span>${esc(p.nayin)}</span><span class="muted">#${p.jiazi}/60 · ages ${p.ages}</span></div>
    </div>`;
  });
  if (!b.hourKnown) h += `<div class="pillar" style="opacity:.55"><div class="ptitle">时柱 Hour</div><div class="pmean">${L('Needs the birth time', '需要出生时间')}</div><div class="pchars"><span class="ch big">?</span><div class="sub">&nbsp;</div><span class="ch big">?</span></div></div>`;
  h += `</div><p class="muted small">Day pillar void (空亡): ${b.kong.join('')} · Palace ages are the classical guide (year 0–16, month 17–32, day 33–48, hour 49+).</p>`;

  // Elements
  const tot = b.scores.reduce((a, c) => a + c, 0);
  h += `<h3>Five Elements 五行 balance</h3>${ex('What the element balance means', BAZI_HOWTO.elements + `<table class="gloss"><tr><th>Element</th><th>Colours</th><th>Directions</th><th>Industries</th></tr>${EL_PRACTICAL.map((x, e) => `<tr><td>${elTag(e)}</td><td>${x.c}</td><td>${x.d}</td><td>${x.i}</td></tr>`).join('')}</table>`)}<div class="card"><div class="ebars">`;
  [0, 1, 2, 3, 4].forEach(e => {
    const pct = b.scores[e] / tot * 100;
    const fav = b.favourable.includes(e), unf = b.unfavourable.includes(e);
    h += `<div class="erow"><div class="elab">${elTag(e)}</div><div class="ebar"><div class="${EL_CLS[e]}-bg" style="width:${pct.toFixed(1)}%"></div></div><div class="epct">${pct.toFixed(0)}%</div><div class="ecount muted">${b.counts[e]}/8</div><div class="efav">${e === b.dmEl ? '<b>DM</b>' : ''}${fav ? '<span class="fav">用 favourable</span>' : unf ? '<span class="unf">忌 unfavourable</span>' : ''}</div></div>`;
  });
  h += `</div><p class="muted small">Weighted with hidden stems (main/middle/residual qi) and month command 月令 ×2. Right column = raw count of the 8 visible characters.</p>`;
  const meter = Math.max(0, Math.min(100, b.ratio * 100));
  h += `<div class="strength"><div class="lbl">Day Master ${ch(b.dm)} ${EL_EN[b.dmEl]} — <b>${b.label}</b></div>
    <div class="meter"><div style="left:${meter}%"></div><span>weak</span><span>balanced</span><span>strong</span></div>
    <div class="chips"><span class="chip ${b.deLing ? 'on' : ''}">得令 season ${b.deLing ? '✓' : '✗'}</span><span class="chip ${b.deDi ? 'on' : ''}">得地 rooted ${b.deDi ? '✓' : '✗'}</span><span class="chip ${b.deShi ? 'on' : ''}">得势 allies ${b.deShi ? '✓' : '✗'}</span></div>
    <p>Favourable (用/喜神): ${b.favourable.map(elTag).join(' ')} &nbsp; Unfavourable (忌神): ${b.unfavourable.map(elTag).join(' ')}</p>
    ${b.climate ? `<p class="note">🌡 ${esc(b.climate.text)}</p>` : ''}
    <p class="muted small">Strength is a rule-of-thumb score (support ÷ total = ${(b.ratio * 100).toFixed(0)}%). Special "Follow" structures (从格) are not auto-detected — treat extreme scores (&lt;20% or &gt;80%) with care.</p></div></div>`;

  // Structure & Ten Gods
  h += `<h3>Structure & Ten Gods 格局 · 十神</h3>${ex('What the Ten Gods mean', BAZI_HOWTO.gods)}<div class="card"><p class="plainline">${GROUP_PLAIN[b.dominant[0][0]]} The structure <b>${b.structure}</b> is named after the Ten God in your month branch — the \"engine\" of the chart (${esc(GOD_MEANING[b.monthGod].p.toLowerCase())}).</p>
    <p>Structure (by month branch main qi): <b>${b.structure}</b> · Spouse palace (day branch): ${godTag(b.spousePalace)} · Spouse star ${esc(b.spouseStarName)}: <b>${b.spouseStarCount ? 'present ×' + b.spouseStarCount : 'not prominent'}</b></p>
    <div class="groups">${b.dominant.map(([g, v]) => `<div class="grp g-${g}"><b>${GROUP_EN[g]}</b><div class="gbar"><div style="width:${Math.min(100, v / b.dominant[0][1] * 100)}%"></div></div><span>${v.toFixed(1)}</span></div>`).join('')}</div>
  </div>`;

  // Hurting Officer
  const ho = b.ho;
  h += `<h3>Hurting Officer 伤官 focus</h3>${ex('What the Hurting Officer is', BAZI_HOWTO.ho)}<div class="card ho">`;
  if (!ho.present) h += `<p>No Hurting Officer in the natal chart (visible or hidden). Its themes arrive when a Luck Pillar or year brings ${elTag((b.dmEl + 1) % 5)} of ${stemYang(b.dm) ? 'Yin' : 'Yang'} polarity.</p>`;
  else {
    h += `<p>Hurting Officer for ${ch(b.dm)} Day Master is ${ch(STEMS.find(s => tenGod(b.dm, s) === '伤官'))}. Visible: <b>${ho.visible.map(x => x.where).join(', ') || 'none'}</b> · Hidden: <b>${ho.hidden.map(x => x.where).join(', ') || 'none'}</b> · Direct Officer: <b>${[...ho.officerVisible, ...ho.officerHidden].map(x => x.where).join(', ') || 'none'}</b></p>`;
    h += ho.patterns.length ? ho.patterns.map(p => `<div class="pat ${p.tone}">${tone(p.tone)} <b>${p.name}</b><div>${esc(LANG === 'zh' && HO_PLAIN[p.name.split(' ')[0]] ? HO_PLAIN[p.name.split(' ')[0]][1] : p.text)}</div></div>`).join('') : `<p class="muted">Present but no classical pairing triggered — read it through Day Master strength: ${b.strong ? 'a strong DM uses it well as an outlet' : 'a weak DM finds it draining'}.</p>`;
  }
  h += `</div>`;

  // Interactions
  const AREA = {Year:'family background & society', Month:'career & parents', Day:'self & partner', Hour:'children & later life'};
  h += `<h3>Combinations & Clashes 合冲刑害</h3>${ex('What combinations and clashes mean', BAZI_HOWTO.inter)}<div class="card">${b.interactions.length ? b.interactions.map(x => `<div class="int ${x.type}"><b>${esc(x.text)}</b> <span class="muted">${esc(x.pair)}</span><div class="small">${x.type === 'clash' ? 'Tension / change between' : x.type === 'combo' ? 'Bond / cooperation between' : 'Subtle friction between'} ${x.pair.split(/ × |, /).map(p => AREA[p] || p).join(' and ')}.</div></div>`).join('') : '<p class="muted">No major natal interactions.</p>'}</div>`;

  h += renderNayinSection(b);
  // Luck pillars
  h += `<h3>10-Year Luck Pillars 大运</h3>${ex('How to read Luck Pillars', BAZI_HOWTO.luck)}<p class="muted small">Luck starts ${b.yunStart.y}y ${b.yunStart.m}m ${b.yunStart.d}d after birth · direction ${(stemYang(b.pillars[0].gan) ? 1 : 0) === b.gender ? 'forward 顺' : 'backward 逆'}. Tap a pillar for its annual pillars (流年) and element shift.</p><div class="luck">`;
  b.daYun.forEach((d, i) => {
    const cur = qYear >= d.startYear && qYear <= d.endYear;
    h += `<button class="lp ${cur ? 'cur' : ''} r-${d.rating}" data-i="${i}">
      <div class="lpage">${d.startAge}–${d.endAge}</div><div class="muted small">${d.startYear}–${d.endYear}</div>
      <div class="lpch">${ch(d.gz[0], 1)}${ch(d.gz[1], 1)}</div>
      <div class="small">${d.stemGod}<br>${d.branchGod}</div>
      <div class="lprate">${d.rating}</div>${d.hoAct ? `<div class="hoflag ${d.hoWarn ? 'warn' : ''}">伤官${d.hoWarn ? ' 见官⚠' : ''}</div>` : ''}${cur ? '<div class="nowflag">now</div>' : ''}
    </button>`;
  });
  h += `</div><div id="lpdetail"></div>`;
  $('#tab-bazi').innerHTML = baziCards() + techWrap(h, 'bazi');
  bindNayin(b);
  document.querySelectorAll('.lp').forEach(btn => btn.onclick = () => showLuck(+btn.dataset.i));
  const ci = b.daYun.findIndex(d => qYear >= d.startYear && qYear <= d.endYear);
  showLuck(ci >= 0 ? ci : 0);
}

function showLuck(i) {
  const {bazi: b, qYear} = STATE;
  const d = b.daYun[i];
  document.querySelectorAll('.lp').forEach(x => x.classList.toggle('sel', +x.dataset.i === i));
  const tot0 = b.scores.reduce((a, c) => a + c, 0), tot1 = d.shifted.reduce((a, c) => a + c, 0);
  let h = `<div class="card"><h4>${ch(d.gz[0])}${ch(d.gz[1])} Luck Pillar · age ${d.startAge}–${d.endAge} · ${d.rating}</h4>
    ${luckPlain(d)}
    <p>Stem ${godTag(d.stemGod)} (first ~5 yrs emphasis) · Branch ${godTag(d.branchGod)} (later ~5 yrs). </p>
    <div class="shift">${[0, 1, 2, 3, 4].map(e => { const a = b.scores[e] / tot0 * 100, c = d.shifted[e] / tot1 * 100; const df = c - a; return `<div class="srow">${elTag(e)}<div class="ebar"><div class="${EL_CLS[e]}-bg" style="width:${c.toFixed(1)}%"></div></div><span class="${df > 0.5 ? 'up' : df < -0.5 ? 'down' : ''}">${df > 0 ? '+' : ''}${df.toFixed(0)}%</span></div>`; }).join('')}</div>
    ${d.inter.length ? `<div class="small"><b>Interactions with natal chart:</b> ${d.inter.map(x => `<span class="int-inline ${x.type}">${esc(x.text)} <span class="muted">(${esc(x.pair)})</span></span>`).join(' ')}</div>` : ''}
    ${d.hoAct ? `<p class="note">伤官 activated this decade${d.hoWarn ? ' — natal Direct Officer present: watch conflicts with authority, contracts, reputation.' : ' — expressive, entrepreneurial, rule-challenging energy is switched on.'}</p>` : ''}
    <table class="ln"><tr><th>Year</th><th>Age</th><th>流年</th><th>Stem god</th><th>Branch god</th><th>Flags</th></tr>
    ${d.liuNian.map(y => `<tr class="${y.year === qYear ? 'cury' : ''}"><td>${y.year}</td><td>${y.age}</td><td>${ch(y.gz[0])}${ch(y.gz[1])}</td><td>${y.stemGod}</td><td>${y.branchGod}</td><td class="small">${y.suiYun ? '<b>岁运并临</b> ' : ''}${y.stemGod === '伤官' || y.branchGod === '伤官' ? '伤官 ' : ''}${y.clashes.map(esc).join('; ')}</td></tr>`).join('')}
    </table></div>`;
  $('#lpdetail').innerHTML = h;
  zhScope();
}

// ---------- Zi Wei ----------
const ZW_GRID = [['巳','午','未','申'],['辰',null,null,'酉'],['卯',null,null,'戌'],['寅','丑','子','亥']];
function starHtml(s, cls) {
  return `<span class="st ${cls}">${s.name}${s.b ? `<i>${s.b}</i>` : ''}${s.m ? `<em class="m-${s.m}">${s.m}</em>` : ''}</span>`;
}
function renderZiwei() {
  if (STATE.zw.unknown) { $('#tab-ziwei').innerHTML = NOHOUR_NOTE(); return; }
  const {zw} = STATE;
  const cur = zw.current;
  let h = `<div class="card meta"><div>Lunar ${esc(zw.lunarDate)} · ${esc(zw.chineseDate)} · ${esc(zw.time)} (${esc(zw.timeRange)})</div><div class="muted">Five Element Bureau 五行局: <b>${esc(zw.fiveClass)}</b> · Life master 命主: <b>${esc(zw.soul)}</b> · Body master 身主: <b>${esc(zw.body)}</b></div></div>`;
  h += ex('How to read the Zi Wei chart', ZW_HOWTO);
  h += `<div class="zwgrid">`;
  ZW_GRID.forEach((row, r) => row.forEach((br, c) => {
    if (br === null) {
      if (r === 1 && c === 1) h += `<div class="zwc center"><div class="ctitle">紫微斗数 Zi Wei</div><div>${esc(zw.fiveClass)}</div><div class="small">命主 ${esc(zw.soul)} · 身主 ${esc(zw.body)}</div>${cur ? `<div class="small">Now (age ${cur.nominalAge} 虚岁): decade in <b>${cur.decadal.name}</b>, year in <b>${cur.yearly.name}</b></div><div class="small">大限四化: ${cur.decadalMut.map((s, k) => s + '化' + '禄权科忌'[k]).join(' ')}</div>` : ''}<div class="legend small"><em class="m-禄">禄</em>Prosperity <em class="m-权">权</em>Power <em class="m-科">科</em>Fame <em class="m-忌">忌</em>Obstacle</div></div>`;
      return;
    }
    const p = zw.palaces.find(x => x.branch === br);
    const isDec = cur && cur.decadal.i === p.i, isYr = cur && cur.yearly.i === p.i;
    h += `<div class="zwc ${p.name === '命宫' ? 'life' : ''} ${isDec ? 'dec' : ''}" data-i="${p.i}">
      <div class="zmaj">${p.major.map(s => starHtml(s, 'maj')).join('') || '<span class="muted small">(empty — borrows opposite)</span>'}</div>
      <div class="zmin">${p.minor.map(s => starHtml(s, ZW_BAD.includes(s.name) ? 'bad' : 'min')).join('')}</div>
      <div class="zadj">${p.adj.slice(0, 4).join(' ')}</div>
      <div class="zfoot"><span class="zname">${p.name}${p.isBody ? '·身' : ''}</span><span class="small">${L(p.en, '')}</span><span class="small muted">${p.decadal[0]}–${p.decadal[1]}</span><span class="zgz">${p.stem}${p.branch}</span></div>
      ${isDec ? '<div class="zbadge">大限</div>' : ''}${isYr ? '<div class="zbadge yr">流年</div>' : ''}
    </div>`;
  }));
  h += `</div><p class="muted small">Grid follows the traditional layout (巳 top-left → 亥 bottom-right). Brightness: 庙/旺 strong, 得/利 fair, 平 neutral, 陷 weak. Tap a palace for details.</p><div id="zwdetail"></div>`;
  $('#tab-ziwei').innerHTML = zwCards() + techWrap(h, 'ziwei');
  document.querySelectorAll('.zwc[data-i]').forEach(el => el.onclick = () => showZwPalace(+el.dataset.i));
  showZwPalace(zw.palaces.find(p => p.name === '命宫').i);
}
function showZwPalace(i) {
  const {zw} = STATE;
  const p = zw.palaces[i];
  const ev = zw.evalPalace(p);
  document.querySelectorAll('.zwc[data-i]').forEach(x => x.classList.toggle('sel', +x.dataset.i === i));
  $('#zwdetail').innerHTML = `<div class="card"><h4>${p.name} ${L(p.en + ' Palace ', '')}${p.stem}${p.branch} ${tone(ev.tone)}</h4>
    <p class="plainline"><b>${L('This palace is about:', '这一宫看的是：')}</b> ${esc(palPlain(p.name))}${L('.', '。')}</p>
    ${ev.borrowed ? `<p class="muted small">${L(`No main star — borrows from opposite palace ${zw.opposite(p).name}.`, `没有主星——借对宫${zw.opposite(p).name}的星。`)}</p>` : ''}
    ${ev.stars.map(s => `<p><b>${s.name}</b>${s.b ? ` (${s.b})` : ''}${s.m ? ` · 化${s.m}` : ''} — ${esc(plainStar(s.name))}</p>`).join('')}
    ${[...p.major, ...p.minor].filter(s => s.m).map(s => `<p class="small"><em class="m-${s.m}">${s.m}</em> ${s.name}化${s.m}${L(': ', '：')}${mutPlain(s.m)}${L('.', '。')}</p>`).join('')}
    ${p.minor.length ? `<p class="small">${L('Supporting: ', '辅星：')}${p.minor.map(s => s.name + (s.m ? '化' + s.m : '')).join(' · ')}</p>` : ''}
    <p class="small muted">${L(`Decade ages ${p.decadal[0]}–${p.decadal[1]} (nominal 虚岁).`, `大限 ${p.decadal[0]}–${p.decadal[1]} 岁（虚岁）。`)}</p></div>`;
  zhScope();
}

// ---------- Qi Men ----------
const QM_GRID = [[4, 9, 2], [3, 5, 7], [8, 1, 6]];
function renderQimen() {
  const {qmBirth, qmNow, qmView} = STATE;
  const q = qmView === 'birth' && !qmBirth.unknown ? qmBirth : qmNow;
  let h = qmBirth.unknown ? `<div class="seg" hidden><button data-v="now"></button></div>` : `<div class="seg"><button data-v="birth" class="${qmView === 'birth' ? 'on' : ''}">Birth chart 命局</button><button data-v="now" class="${qmView === 'now' ? 'on' : ''}">Query time 时局</button></div>
  <div class="card meta"><div><b>${fmt(q.times.local)}</b> ${STATE.inp.useTST ? '(true solar)' : ''} · ${q.dayGZ}日 ${q.hourGZ}时 · ${q.jq} ${q.yuan} · <b>${q.yang ? '阳遁 Yang' : '阴遁 Yin'} ${q.ju}局</b></div>
  <div class="muted">旬首 ${q.xunName}(${q.xunYi}) · 值符 ${q.zfStar} → ${QM_PALACE[q.zfPalace]} · 值使 ${q.zsDoor} → ${QM_PALACE[q.zsPalace]} · 空亡 ${q.kongBr.join('')} · 驿马 ${q.maBr}</div></div>
  ${ex('How to read the Qi Men chart', QM_HOWTO)}
  <div class="qmgrid">`;
  QM_GRID.forEach(row => row.forEach(p => {
    const c = q.cells[p];
    if (p === 5) { h += `<div class="qmc center"><div class="qpal">${c.name}</div><div class="big2">${q.yang ? '阳' : '阴'}${q.ju}局</div><div class="qearth">地 ${ch(c.earth)}</div></div>`; return; }
    h += `<div class="qmc t-${c.tone}" data-p="${p}">
      <div class="qgod">${c.god}</div>
      <div class="qrow"><span class="qstar">${c.star}</span><span class="qheav">${ch(c.heaven)}${c.heaven2 ? ch(c.heaven2) : ''}</span></div>
      <div class="qrow"><span class="qdoor d${QM_DOOR_TONE[c.door]}">${c.door}</span><span class="qearth">${ch(c.earth)}</span></div>
      <div class="qpal">${c.name}${c.kong ? ' <b class="kong">空</b>' : ''}${c.ma ? ' <b class="ma">马</b>' : ''}</div>
    </div>`;
  }));
  h += `</div><p class="muted small">Rotating-plate 转盘 hour chart, 拆补 method. South at top. Each palace: Deity (top) · Star + Heaven-plate stem · Door + Earth-plate stem. Colour = rough palace tone (doors weighted most).</p>
  <div class="card"><h4>Doors 八门</h4>${Object.entries(QM_DOOR_EN).map(([d, t]) => `<div class="small"><b class="qdoor d${QM_DOOR_TONE[d]}">${d}</b> ${esc(L(t, QM_DOOR_ZH[d]))} — ${QM_PALACE[q.doorPalace(d).p]}</div>`).join('')}</div>`;
  h += `<div id="qmdetail"></div>`;
  $('#tab-qimen').innerHTML = qmCards() + techWrap(h, 'qimen');
  const showQ = p => { document.querySelectorAll('.qmc[data-p]').forEach(x => x.classList.toggle('sel', +x.dataset.p === p)); $('#qmdetail').innerHTML = qmPalacePlain(q.cells[p]); zhScope(); };
  document.querySelectorAll('.qmc[data-p]').forEach(el => el.onclick = () => showQ(+el.dataset.p));
  showQ(q.zsPalace);
  document.querySelectorAll('.seg button').forEach(b => b.onclick = () => { STATE.qmView = b.dataset.v; renderQimen(); });
}

// ---------- Cross reference ----------
function renderCross() {
  const {bazi: b, zw, qmBirth: qb, qmNow: qn, qYear, inp} = STATE;
  const dmE = b.dmEl, offE = (dmE + 3) % 5, wltE = (dmE + 2) % 5;
  const gs = b.groupScore;
  const CAREER_STYLE = {output:'creative, advisory or independent work — expertise you express', wealth:'business, sales, deal-making', officer:'organisations, government, management ladders', resource:'academia, professional credentials, consulting', peer:'partnerships, competitive or team-driven fields'};
  const rows = [];

  // Self
  const lifeP = zw.byName('命宫'), lifeE = zw.evalPalace(lifeP);
  const qSelf = qb.stemPalace(b.dm);
  rows.push({topic: 'Self & personality', items: [
    {sys: 'BaZi', t: 'info', txt: `${b.dm} ${EL_EN[dmE]} Day Master, ${b.label}. Dominant: ${GROUP_EN[b.dominant[0][0]]}. Favourable ${b.favourable.map(e => EL_EN[e]).join('/')}.`},
    {sys: 'Zi Wei', t: lifeE.tone, txt: `Life palace ${lifeE.stars.map(s => s.name).join('+') || '—'}${lifeE.borrowed ? ' (borrowed)' : ''}: ${lifeE.stars.map(s => (ZW_STAR_KW[s.name] || '').split('—')[1] || '').join('; ')}${lifeE.notes.length ? ' · ' + lifeE.notes.join(', ') : ''}`},
    {sys: 'Qi Men', t: qSelf ? qSelf.tone : 'mixed', txt: qSelf ? `Day stem ${b.dm} sits in ${qSelf.name}: ${qSelf.door || '—'}, ${qSelf.star}, ${qSelf.god || '—'}${qSelf.kong ? ', void' : ''}.` : 'Day stem not located.'},
  ]});

  // Career
  const hoWarn = b.ho.patterns.some(p => p.tone === 'warn' && p.name.includes('见官'));
  const offFav = b.favourable.includes(offE);
  let bc = hoWarn ? 'warn' : (offFav && gs.officer >= 1) ? 'good' : (!offFav && gs.officer >= 2.5) ? 'warn' : 'mixed';
  const carP = zw.byName('官禄'), carE = zw.evalPalace(carP);
  const qOpen = qb.doorPalace('开门');
  rows.push({topic: 'Career', items: [
    {sys: 'BaZi', t: bc, txt: `Structure ${b.structure}; Officer score ${gs.officer.toFixed(1)}, Officer element ${EL_EN[offE]} is ${offFav ? 'favourable' : 'not favourable'}. Leans to ${CAREER_STYLE[b.dominant[0][0]]}.${hoWarn ? ' 伤官见官 — friction with hierarchy.' : ''}`},
    {sys: 'Zi Wei', t: carE.tone, txt: `Career palace ${carE.stars.map(s => s.name + (s.m ? '化' + s.m : '')).join('+') || '—'}${carE.borrowed ? ' (borrowed)' : ''}${carE.notes.length ? ' · ' + carE.notes.join(', ') : ''}.`},
    {sys: 'Qi Men', t: qOpen.tone, txt: `开门 Open Door (career) in ${qOpen.name} with ${qOpen.star}, ${qOpen.god || '—'}${qOpen.kong ? ', void — delays' : ''}.`},
  ]});

  // Wealth
  const wFav = b.favourable.includes(wltE);
  let bw = (!b.strong && gs.wealth >= 2.5) ? 'warn' : (wFav && gs.wealth >= 1) ? 'good' : b.ho.patterns.some(p => p.name.includes('生财')) ? 'good' : 'mixed';
  const wP = zw.byName('财帛'), wE = zw.evalPalace(wP);
  const qLife = qb.doorPalace('生门'), qWu = qb.stemPalace('戊');
  rows.push({topic: 'Wealth', items: [
    {sys: 'BaZi', t: bw, txt: `Wealth score ${gs.wealth.toFixed(1)}, ${EL_EN[wltE]} ${wFav ? 'favourable' : 'not favourable'}.${(!b.strong && gs.wealth >= 2.5) ? ' 财多身弱 — more wealth than the DM can hold; partners/resources help.' : ''}${b.ho.patterns.some(p => p.name.includes('生财')) ? ' 伤官生财 — talent converts to income.' : ''}`},
    {sys: 'Zi Wei', t: wE.tone, txt: `Wealth palace ${wE.stars.map(s => s.name + (s.m ? '化' + s.m : '')).join('+') || '—'}${wE.borrowed ? ' (borrowed)' : ''}. 化禄 natal in ${zw.mutLoc['禄'] ? zw.mutLoc['禄'].palace.name : '—'}, 化忌 in ${zw.mutLoc['忌'] ? zw.mutLoc['忌'].palace.name : '—'}.`},
    {sys: 'Qi Men', t: qLife.tone, txt: `生门 Life Door (wealth) in ${qLife.name} (${qLife.star}, ${qLife.god || '—'}${qLife.kong ? ', void' : ''}); capital 戊 in ${qWu ? qWu.name : '—'}.`},
  ]});

  // Relationships
  const dayClash = b.interactions.some(x => x.type === 'clash' && x.pair.includes('Day') && x.text.includes('Branch'));
  const ssFav = b.favourable.includes(b.spouseStarGroup === 'wealth' ? wltE : offE);
  let br = dayClash ? 'warn' : (b.spouseStarCount && ssFav) ? 'good' : 'mixed';
  const sP = zw.byName('夫妻'), sE = zw.evalPalace(sP);
  const qHe = qb.godPalace('六合'), qPartner = qb.stemPalace(inp.gender ? '乙' : '庚');
  const qRelTone = [qHe, qPartner].filter(Boolean).reduce((a, c) => a + c.score, 0) / 2;
  rows.push({topic: 'Relationships', items: [
    {sys: 'BaZi', t: br, txt: `Spouse palace ${b.spousePalace}; spouse star ${b.spouseStarCount ? 'present' : 'not prominent'} and ${ssFav ? 'favourable' : 'not favourable'}.${dayClash ? ' Day branch is clashed — movement/tension in the spouse palace.' : ''}`},
    {sys: 'Zi Wei', t: sE.tone, txt: `Spouse palace ${sE.stars.map(s => s.name + (s.m ? '化' + s.m : '')).join('+') || '—'}${sE.borrowed ? ' (borrowed)' : ''}${sE.notes.length ? ' · ' + sE.notes.join(', ') : ''}.`},
    {sys: 'Qi Men', t: qRelTone >= 1 ? 'good' : qRelTone <= -0.6 ? 'warn' : 'mixed', txt: `六合 (union) in ${qHe.name} with ${qHe.door || '—'}; partner stem ${inp.gender ? '乙 (wife)' : '庚 (husband)'} in ${qPartner ? qPartner.name + ' (' + (qPartner.door || '—') + ')' : '—'}.`},
  ]});

  // Current
  const cd = b.daYun.find(d => qYear >= d.startYear && qYear <= d.endYear);
  const cy = cd && cd.liuNian.find(y => y.year === qYear);
  const cur = zw.current;
  const dE = cur ? zw.evalPalace(cur.decadal) : null;
  const qHour = qn.stemPalace(qn.hourGZ[0]);
  rows.push({topic: `Now (${qYear})`, items: [
    {sys: 'BaZi', t: cd ? (cd.rating === 'Favourable' ? 'good' : cd.rating === 'Challenging' ? 'warn' : 'mixed') : 'mixed', txt: cd ? `Luck ${cd.gz} (${cd.stemGod}/${cd.branchGod}, ${cd.rating})${cy ? `; year ${cy.gz} brings ${cy.stemGod}/${cy.branchGod}${cy.clashes.length ? '; ' + cy.clashes[0] : ''}` : ''}${cd.hoAct ? '; 伤官 decade' : ''}.` : 'Before first Luck Pillar.'},
    {sys: 'Zi Wei', t: dE ? dE.tone : 'mixed', txt: cur ? `Decade runs through natal ${cur.decadal.name} (${dE.stars.map(s => s.name).join('+') || '—'}); decadal 化禄 → ${cur.decadalLu ? cur.decadalLu.name : '—'}, 化忌 → ${cur.decadalJi ? cur.decadalJi.name : '—'}.` : '—'},
    {sys: 'Qi Men', t: qHour ? qHour.tone : 'mixed', txt: `Query-time chart: hour stem ${qn.hourGZ[0]} in ${qHour ? qHour.name + ' (' + (qHour.door || '—') + ', ' + qHour.star + ')' : '—'}; 值使 ${qn.zsDoor} → ${QM_PALACE[qn.zsPalace]}.`},
  ]});

  if (qb.unknown) rows.forEach(r => { r.items = r.items.filter(x => x.sys === 'BaZi' || (x.sys === 'Qi Men' && x.txt.startsWith('Query-time'))); });
  STATE.crossRows = rows;
  let h = ex('How to read the cross-reference', CROSS_HOWTO, true) + `<p class="muted small">Each row reads the same life area through three independent systems. Agreement across systems is the signal worth paying attention to; a lone result is a weaker hint. Qi Men natal rows use the birth-hour chart; "Now" uses the query time.</p>`;
  rows.forEach(r => {
    const g = r.items.filter(x => x.t === 'good').length, w = r.items.filter(x => x.t === 'warn').length;
    const verdict = g >= 2 ? `<span class="agree good">${g}/3 supportive</span>` : w >= 2 ? `<span class="agree warn">${w}/3 caution</span>` : `<span class="agree mixed">no consensus</span>`;
    h += `<div class="card xrow"><h4>${r.topic} ${verdict}</h4>${r.items.map(x => `<div class="xi"><span class="sys">${x.sys}</span>${tone(x.t)}<div>${esc(x.txt)}</div></div>`).join('')}</div>`;
  });

  // HO cross-check
  const hoStrength = b.ho.visible.length + b.ho.hidden.filter(x => x.where.includes('main')).length;
  const REBEL = ['破军','七杀','贪狼','廉贞','巨门','天机'];
  const lifeRebel = lifeE.stars.filter(s => REBEL.includes(s.name)).map(s => s.name);
  const quan = zw.mutLoc['权'] && ['命宫','官禄'].includes(zw.mutLoc['权'].palace.name);
  const qmExp = qSelf && (['伤门','惊门','景门'].includes(qSelf.door) || ['天冲','天英'].includes(qSelf.star.slice(0, 2)));
  const hits = [hoStrength >= 1, lifeRebel.length > 0 || quan, !!qmExp].filter(Boolean).length;
  h += `<div class="card ho"><h4>伤官 Hurting Officer signature — cross-check <span class="agree ${hits >= 2 ? 'good' : 'mixed'}">${hits}/3 systems</span></h4>
    <div class="xi"><span class="sys">BaZi</span><div>${hoStrength ? `Hurting Officer ${b.ho.visible.length ? 'visible' : 'hidden (main qi)'} ×${hoStrength}${b.ho.patterns.length ? ' — ' + b.ho.patterns.map(p => p.name.split(' ')[0]).join(', ') : ''}` : (b.ho.present ? 'Only residual/middle-qi Hurting Officer — mild.' : 'No natal Hurting Officer.')}</div></div>
    ${qb.unknown ? '' : `<div class="xi"><span class="sys">Zi Wei</span><div>${lifeRebel.length ? `Independent/outspoken stars in Life palace: ${lifeRebel.join(', ')}.` : 'No strongly rule-challenging star in Life palace.'}${quan ? ` 化权 in ${zw.mutLoc['权'].palace.name} — assertive drive.` : ''}</div></div>`}
    ${qb.unknown ? '' : `<div class="xi"><span class="sys">Qi Men</span><div>${qmExp ? `Day stem palace carries ${qSelf.door}/${qSelf.star} — expressive, confrontational or visibility-seeking energy.` : `Day stem palace (${qSelf ? qSelf.door + '/' + qSelf.star : '—'}) does not emphasise expression.`}</div></div>`}
    <p class="small muted">Analogy used: BaZi 伤官 (talent that defies rules) ↔ Zi Wei 破军/七杀/贪狼/廉贞/巨门 or 化权 in the Life/Career palace ↔ Qi Men 伤门/惊门/景门 or 天冲/天英 on the Day stem.</p></div>`;
  $('#tab-cross').innerHTML = crossCards() + techWrap(h, 'cross');
}

function showTab(name) {
  if (document.body.classList.contains('simple') && ['reading', 'bazi', 'ziwei', 'qimen', 'cross'].includes(name)) name = 'summary';
  if (!['summary', 'reading', 'bazi', 'ziwei', 'qimen', 'cross', 'pastlife', 'compat', 'guide'].includes(name)) name = 'bazi';
  document.querySelectorAll('.tabs button').forEach(b => b.classList.toggle('on', b.dataset.t === name));
  document.querySelectorAll('.tab').forEach(t => t.hidden = t.id !== 'tab-' + name);
  if (location.hash !== '#' + name) history.replaceState(null, '', '#' + name);
}

function setPreset() {
  const p = PRESETS[$('#place').value];
  if (p.lon !== null) $('#lon').value = p.lon;
  updateTz();
  $('#lon').readOnly = $('#place').value !== 'custom';
  if ($('#place').value === 'custom') $('#adv').open = true;
}
function updateTz() {
  const key = $('#place').value, p = PRESETS[key];
  if (p.tz === null) { $('#tznote').textContent = ''; return; }
  const v = $('#bdate').value.split('-').map(Number);
  const hz = v.length === 3 ? histTz(key, ...v) : null;
  const tz = hz !== null ? hz : p.tz;
  $('#tz').value = +tz.toFixed(3);
  $('#tznote').textContent = hz !== null && hz !== 8 ? (p.hist === 'cn' ? L('Auto-set: mainland China was on daylight saving (UTC+9) on this date.', '已自动设置：该日期中国大陆实行夏令时（UTC+9）。') : L(`Auto-set: ${p.name} used UTC+${+hz.toFixed(2)} on this date.`, `已自动设置：当时${CITY_ZH[key] || p.name}使用 UTC+${+hz.toFixed(2)}。`)) : '';
}

function setMode(m) {
  document.body.classList.toggle('simple', m === 'simple');
  document.querySelectorAll('.mode button').forEach(b => b.classList.toggle('on', b.dataset.m === m));
  try { localStorage.setItem('fp-mode', m); } catch (e) {}
  if (STATE) renderPastLife();
  const cur = (location.hash || '#summary').slice(1);
  showTab(cur);
}
function init() {
  document.querySelectorAll('.lang button').forEach(b => b.onclick = () => setLang(b.dataset.l));
  applyStaticText();
  document.querySelectorAll('.tab .ph').forEach(p => p.innerHTML = T('placeholder'));
  let mode = 'simple'; try { mode = localStorage.getItem('fp-mode') || 'simple'; } catch (e) {}
  document.querySelectorAll('.mode button').forEach(b => b.onclick = () => setMode(b.dataset.m));
  document.body.classList.toggle('simple', mode === 'simple');
  document.querySelectorAll('.mode button').forEach(b => b.classList.toggle('on', b.dataset.m === mode));
  const sel = $('#place');
  sel.innerHTML = placeOptions();
  $('#qauto').onchange = () => { syncQueryMode(); if (STATE) calculate(false); };
  syncQueryMode();
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem('fp-input') || 'null'); } catch (e) {}
  if (saved) {
    $('#bdate').value = saved.b; $('#btime').value = saved.t; $('#notime').checked = !!saved.nt; $('#btime').disabled = !!saved.nt; $('#gender').value = saved.g; sel.value = saved.p || 'sg';
    $('#tst').checked = saved.tst !== false; $('#zi').value = saved.zi || '23'; $('#pname').value = saved.n || '';
    setPreset(); if (saved.p === 'custom') { $('#lon').value = saved.lon; $('#tz').value = saved.tz; }
  } else { sel.value = 'sg'; setPreset(); }
  sel.onchange = setPreset;
  $('#notime').onchange = () => { $('#btime').disabled = $('#notime').checked; };
  $('#bdate').onchange = updateTz;
  // Auto "now": refresh every minute; re-render when the Chinese hour (and so the Qi Men chart) changes
  setInterval(() => {
    if (!$('#qauto').checked) return;
    syncQueryMode();
    if (!STATE) return;
    const n = deviceNow();
    const wall = [...n.date.split('-').map(Number), ...n.time.split(':').map(Number)];
    const q = computeQimen(wall, n.tz, STATE.inp.lon, STATE.inp.useTST, STATE.inp.ziRule);
    if (q.hourGZ !== STATE.qmNow.hourGZ || q.dayGZ !== STATE.qmNow.dayGZ) calculate(false);
  }, 60000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden && $('#qauto').checked && STATE) calculate(false); });
  $('#calc').onclick = e => { e.preventDefault(); calculate(); };
  document.querySelectorAll('.tabs button').forEach(b => b.onclick = () => showTab(b.dataset.t));
  window.addEventListener('hashchange', () => STATE && showTab(location.hash.slice(1)));
  $('#tab-guide').innerHTML = guideHtml();
  if (saved && saved.b && saved.t) calculate(false); else showTab(location.hash.slice(1) || 'guide');
}
document.addEventListener('DOMContentLoaded', init);
