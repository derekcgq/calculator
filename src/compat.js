// ===== Compatibility 合盘 =====
const SIHUA = {甲:['廉贞','破军','武曲','太阳'],乙:['天机','天梁','紫微','太阴'],丙:['天同','天机','文昌','廉贞'],丁:['太阴','天同','天机','巨门'],戊:['贪狼','太阴','右弼','天机'],
  己:['武曲','贪狼','天梁','文曲'],庚:['太阳','武曲','太阴','天同'],辛:['巨门','太阳','文曲','文昌'],壬:['天梁','紫微','左辅','武曲'],癸:['破军','巨门','太阴','贪狼']};
const QM_PAL_EL = {1:4,2:2,3:0,4:0,6:3,7:3,8:2,9:1};
const PEACH = b => '申子辰'.includes(b) ? '酉' : '寅午戌'.includes(b) ? '卯' : '巳酉丑'.includes(b) ? '午' : '子';
const GOD_ROLE = {
  比肩:'an equal — mirror, peer, same wavelength',劫财:'a competitor-ally — energising but competes for the same resources',
  食神:'someone you nurture and enjoy — easy, generous flow from you to them',伤官:'someone who draws out your expression — stimulating, but you give more than you get',
  偏财:'someone you are drawn to and want to steer — dynamic, opportunistic',正财:'someone you take steady responsibility for — loyal, practical',
  七杀:'someone who pushes and pressures you — drives growth, can feel controlling',正官:'someone who gives you structure and standards — respect, rules',
  偏印:'an unconventional supporter — insight and protection, sometimes aloof',正印:'a nurturing supporter — care, backing, mentoring',
};
// pairs: [A pillar index, B pillar index, weight]; 0 year 1 month 2 day 3 hour
const PURPOSES = {
  spouse: {label:'Spouse 配偶', you:'spouse', pal:['夫妻'], pairs:[[2,2,2],[0,0,1],[1,1,0.5]], w:{dm:.25,el:.25,br:.25,zw:.15,qm:.10},
    ideal: (A, B) => A.gender ? {best:['正财'], good:['偏财','正印','食神'], bad:['劫财','七杀']} : {best:['正官'], good:['七杀','正印','正财'], bad:['伤官','劫财']},
    yong: (A) => ({god: '六合', stem: A.gender ? '乙' : '庚'})},
  lover: {label:'Lover / dating 恋人', you:'partner', pal:['夫妻','福德'], pairs:[[2,2,2],[0,0,1]], w:{dm:.25,el:.15,br:.25,zw:.2,qm:.15}, peach:true,
    ideal: (A, B) => A.gender ? {best:['正财','偏财'], good:['食神','伤官'], bad:['劫财']} : {best:['正官','七杀'], good:['食神','伤官'], bad:['劫财']},
    yong: (A) => ({god: '六合', stem: A.gender ? '乙' : '庚'})},
  friend: {label:'Friend 朋友', you:'friend', pal:['仆役','兄弟'], pairs:[[0,0,1.5],[2,2,1]], w:{dm:.25,el:.2,br:.25,zw:.2,qm:.10},
    ideal: () => ({best:['比肩','食神'], good:['正印','偏印','正财'], bad:['劫财','七杀']}), yong: () => ({god: '六合'})},
  boss: {label:'Boss / superior 上司', you:'boss', pal:['官禄','父母'], pairs:[[1,1,1.5],[2,2,1],[0,0,0.5]], w:{dm:.3,el:.2,br:.2,zw:.15,qm:.15}, hoCheck:true,
    ideal: () => ({best:['正官','正印'], good:['偏印','七杀'], bad:['劫财','伤官']}), yong: () => ({god: '值符', door: '开门'})},
  report: {label:'Subordinate / team member 下属', you:'team member', pal:['仆役','官禄'], pairs:[[1,1,1.5],[2,2,1]], w:{dm:.3,el:.2,br:.2,zw:.15,qm:.15},
    ideal: () => ({best:['正财','食神'], good:['偏财','比肩'], bad:['七杀','劫财']}), yong: () => ({door: '开门', god: '六合'})},
  partner: {label:'Business partner 合伙人', you:'partner', pal:['财帛','仆役'], pairs:[[1,1,1],[2,2,1],[0,0,0.5]], w:{dm:.2,el:.35,br:.2,zw:.15,qm:.10},
    ideal: () => ({best:['正财','食神'], good:['偏财','比肩','正印'], bad:['劫财','七杀']}), yong: () => ({door: '生门', god: '六合'})},
  child: {label:'Child 子女', you:'child', pal:['子女'], pairs:[[3,0,2],[0,0,1],[2,2,0.5]], w:{dm:.25,el:.25,br:.25,zw:.15,qm:.10},
    ideal: (A) => A.gender ? {best:['正官','七杀'], good:['食神','正财'], bad:['劫财']} : {best:['食神','伤官'], good:['正财','比肩'], bad:['偏印']},
    yong: () => ({god: '六合', door: '生门'})},
  parent: {label:'Parent 父母', you:'parent', pal:['父母'], pairs:[[0,3,2],[0,0,1],[1,1,0.5]], w:{dm:.25,el:.25,br:.25,zw:.15,qm:.10},
    ideal: (A, B) => B.gender ? {best:['偏财'], good:['正印','偏印','正官'], bad:['伤官']} : {best:['正印'], good:['偏印','正官'], bad:['伤官','劫财']},
    yong: () => ({star: '天心', god: '值符'})},
  sibling: {label:'Sibling 兄弟姐妹', you:'sibling', pal:['兄弟'], pairs:[[1,1,1.5],[0,0,1],[2,2,0.5]], w:{dm:.25,el:.25,br:.25,zw:.15,qm:.10},
    ideal: () => ({best:['比肩'], good:['劫财','食神','正印'], bad:['七杀']}), yong: () => ({god: '六合'})},
};

function pairInteraction(a, b) {
  // returns {score, notes[]} for two pillars
  const r = analyseInteractions([{label:'You', gan:a.gan, zhi:a.zhi}, {label:'Them', gan:b.gan, zhi:b.zhi}]);
  let s = 0; const notes = [];
  r.forEach(x => {
    if (x.text.includes('Stem combination')) { s += 0.5; notes.push({t:'good', x:x.text}); }
    else if (x.text.includes('Stem clash')) { s -= 0.4; notes.push({t:'warn', x:x.text}); }
    else if (x.text.includes('Six harmony') || x.text.includes('Half Three')) { s += 1; notes.push({t:'good', x:x.text}); }
    else if (x.text.includes('Branch clash')) { s -= 1; notes.push({t:'warn', x:x.text}); }
    else { s -= 0.5; notes.push({t:'warn', x:x.text}); }
  });
  if (a.zhi === b.zhi && !r.length) { s += 0.3; notes.push({t:'good', x:`${a.zhi}${b.zhi} Same branch — shared rhythm`}); }
  return {score: Math.max(-1, Math.min(1, s)), notes};
}
function elementFit(giver, taker, hourKnown) {
  const ps = hourKnown ? giver.pillars : giver.pillars.slice(0, 3);
  const sc = elementScores(ps); const tot = sc.reduce((a, c) => a + c, 0);
  let f = 0; const top = [];
  sc.forEach((v, e) => { const sh = v / tot; f += sh * (taker.favourable.includes(e) ? 1 : taker.unfavourable.includes(e) ? -1 : 0); });
  const dom = sc.map((v, e) => [v, e]).sort((a, b) => b[0] - a[0]).slice(0, 2).map(x => x[1]);
  return {f: Math.max(-1, Math.min(1, f * 1.6)), dom};
}
function zwFly(fromStem, toZw, pals) {
  // fromStem's 四化 flying into toZw chart
  const stars = SIHUA[fromStem]; const res = []; let s = 0;
  stars.forEach((st, k) => {
    const p = toZw.palaces.find(pp => [...pp.major, ...pp.minor].some(x => x.name === st));
    if (!p) return;
    const key = '禄权科忌'[k];
    const rel = pals.includes(p.name) || p.name === '命宫';
    if (rel) {
      const v = key === '禄' ? 1 : key === '忌' ? -1 : 0.5;
      s += v;
      res.push({t: v > 0 ? 'good' : 'warn', x: `${st}化${key} lands in your ${p.name} (${p.en}) palace`});
    } else res.push({t: 'info', x: `${st}化${key} → ${p.name}`});
  });
  return {s: Math.max(-1, Math.min(1, s)), res};
}

function computeCompat(A, Azw, qmNow, B, Bzw, purposeKey, hourKnown) {
  if (Azw && Azw.unknown) Azw = null;
  const P = PURPOSES[purposeKey];
  const id = P.ideal(A, B);
  const comp = {}; const notes = [];
  // 1. Day Master relationship
  const gAB = tenGod(A.dm, B.dm), gBA = tenGod(B.dm, A.dm);
  let dm = id.best.includes(gAB) ? 1 : id.good.includes(gAB) ? 0.6 : id.bad.includes(gAB) ? -0.6 : 0;
  const dmInt = analyseInteractions([{label:'A', gan:A.dm, zhi:'子'}, {label:'B', gan:B.dm, zhi:'午'}]).filter(x => x.text.includes('Stem'));
  dmInt.forEach(x => { if (x.text.includes('combination')) dm += (purposeKey === 'spouse' || purposeKey === 'lover') ? 0.5 : 0.25; else dm -= 0.4; });
  if (P.hoCheck && A.ho.present && gAB === '正官') {
    const hoV = A.ho.visible.length + A.ho.hidden.filter(x => x.where.includes('main')).length;
    if (hoV) { dm -= 0.6; notes.push({t:'warn', sec:'dm', x:`伤官见官 in the relationship: your chart carries Hurting Officer and their Day Master is your Direct Officer. Expect push-back on rules and hierarchy — works best when they give you autonomy or credit for ideas.`}); }
  }
  if (P.hoCheck && gAB === '七杀' && A.ho.present) notes.push({t:'good', sec:'dm', x:`伤官驾杀 dynamic: their pressure (七杀) is something your Hurting Officer can handle — a demanding boss who respects bold results.`});
  comp.dm = Math.max(-1, Math.min(1, dm));
  notes.unshift({t: comp.dm > 0.3 ? 'good' : comp.dm < -0.2 ? 'warn' : 'mixed', sec:'dm', x:`They are your ${gAB} ${TG_EN[gAB]} — ${GOD_ROLE[gAB]}. You are their ${gBA} ${TG_EN[gBA]}. Ideal for a ${P.you}: ${id.best.join('/')}${id.good.length ? ' (also good: ' + id.good.join('/') + ')' : ''}.`});
  dmInt.forEach(x => notes.push({t: x.text.includes('combination') ? 'good' : 'warn', sec:'dm', x:`Day Masters ${x.text}`}));

  // 2. Element exchange
  const ba = elementFit(B, A, hourKnown), ab = elementFit(A, B, true);
  comp.el = (ba.f + ab.f) / 2;
  notes.push({t: ba.f > 0.15 ? 'good' : ba.f < -0.15 ? 'warn' : 'mixed', sec:'el', x:`They bring mostly ${ba.dom.map(e => EL_EN[e]).join(' & ')} — ${ba.f > 0.15 ? 'which you need' : ba.f < -0.15 ? 'which overloads what you already have too much of' : 'neutral for you'}.`});
  notes.push({t: ab.f > 0.15 ? 'good' : ab.f < -0.15 ? 'warn' : 'mixed', sec:'el', x:`You bring mostly ${ab.dom.map(e => EL_EN[e]).join(' & ')} — ${ab.f > 0.15 ? 'which they need' : ab.f < -0.15 ? 'which works against their balance' : 'neutral for them'}.`});

  // 3. Branch / palace interactions
  let tw = 0, ts = 0;
  P.pairs.forEach(([ai, bi, w]) => {
    if ((ai === 3 || bi === 3) && !hourKnown && bi === 3) return;
    const a = A.pillars[ai], b = B.pillars[bi];
    if (!a || !b) return;
    const r = pairInteraction(a, b);
    tw += w; ts += r.score * w;
    const lab = `Your ${a.en} (${a.gz}) × their ${b.en} (${b.gz})`;
    if (r.notes.length) r.notes.forEach(n => notes.push({t:n.t, sec:'br', x:`${lab}: ${n.x}`}));
    else notes.push({t:'mixed', sec:'br', x:`${lab}: no strong interaction`});
  });
  if (P.peach) {
    const yp = PEACH(A.pillars[0].zhi), dp = PEACH(A.pillars[2].zhi);
    const hits = [B.pillars[0].zhi, B.pillars[2].zhi].filter(z => z === yp || z === dp);
    if (hits.length) { ts += 0.8 * tw * 0.4; notes.push({t:'good', sec:'br', x:`Peach Blossom 桃花: their ${hits.join('/')} is your romance star — strong attraction.`}); }
  }
  const na = A.pillars[0].nayin, nb = B.pillars[0].nayin;
  if (NY[na] && NY[nb]) {
    const r1 = nayinRelation(na, nb), r2 = nayinRelation(nb, na);
    const v = x => x.t === 'good' ? 1 : x.t === 'warn' ? -1 : 0;
    const w = (purposeKey === 'spouse' || purposeKey === 'lover') ? 1 : 0.5;
    tw += w; ts += (v(r1) + v(r2)) / 2 * w;
    notes.push({t: v(r1) + v(r2) > 0 ? 'good' : v(r1) + v(r2) < 0 ? 'warn' : 'mixed', sec:'br', x:`Year Na Yin 纳音合婚: you ${na} (${NY[na].en}) × them ${nb} (${NY[nb].en}) — ${r1.x}; ${r2.x}.`});
  }
  comp.br = tw ? Math.max(-1, Math.min(1, ts / tw)) : 0;

  // 4. Zi Wei — their year-stem 四化 flying into your chart, and yours into theirs
  if (Azw) {
    const bStem = B.pillars[0].gan, aStem = A.pillars[0].gan;
    const f1 = zwFly(bStem, Azw, P.pal);
    let s = f1.s;
    f1.res
      .filter(r => r.t !== 'info' || /化[禄忌]/.test(r.x)).forEach(r => notes.push({t:r.t, sec:'zw', x:`Their year stem ${bStem}: ${r.x}`}));
    if (Bzw) {
      const f2 = zwFly(aStem, Bzw, ['命宫']);
      s = (s + f2.s * 0.6) / 1.6;
      f2.res.filter(r => r.t !== 'info').forEach(r => notes.push({t:r.t, sec:'zw', x:`Your year stem ${aStem} into their chart: ${r.x.replace('your', 'their')}`}));
      const bLife = Bzw.palaces.find(p => p.name === '命宫');
      const aPal = Azw.palaces.find(p => p.branch === bLife.branch);
      if (P.pal.includes(aPal.name)) { s += 0.3; notes.push({t:'good', sec:'zw', x:`Their Life palace (${bLife.branch}) sits on your ${aPal.name} palace — they naturally fit the ${P.you} role in your chart.`}); }
      else notes.push({t:'info', sec:'zw', x:`Their Life palace branch ${bLife.branch} falls on your ${aPal.name} (${aPal.en}) palace — they tend to show up in your ${aPal.en.toLowerCase()} matters.`});
    }
    const ev = P.pal.map(n => Azw.evalPalace(Azw.byName(n)));
    const pt = ev.reduce((a, e) => a + e.score, 0) / ev.length;
    notes.push({t: pt >= 0.8 ? 'good' : pt <= -0.6 ? 'warn' : 'mixed', sec:'zw', x:`Your own ${P.pal.join(' & ')} palace${P.pal.length > 1 ? 's' : ''}: ${ev.map(e => e.stars.map(s => s.name + (s.m ? '化' + s.m : '')).join('+') || '—').join(' | ')}.`});
    comp.zw = Math.max(-1, Math.min(1, s + pt * 0.2));
  } else comp.zw = 0;

  // 5. Qi Men (query time = now)
  const pa = qmNow.stemPalace(A.dm), pb = qmNow.stemPalace(B.dm);
  let qm = 0;
  if (pa && pb) {
    const ea = QM_PAL_EL[pa.p], eb = QM_PAL_EL[pb.p];
    let rel;
    if (pa.p === pb.p) { rel = 'you share the same palace — closely aligned right now'; qm += 0.5; }
    else if (ea === undefined || eb === undefined) rel = 'you sit in neutral positions';
    else {
      const d = (ea - eb + 5) % 5;
      if (d === 0) { rel = 'your palaces share an element — peers right now'; qm += 0.3; }
      else if (d === 1) { rel = 'their palace produces yours — they support you right now'; qm += 0.6; }
      else if (d === 4) { rel = 'your palace produces theirs — you are the giver right now'; qm += 0.1; }
      else if (d === 3) { rel = 'their palace controls yours — they hold the upper hand right now'; qm += (purposeKey === 'boss' || purposeKey === 'parent') ? 0 : -0.5; }
      else { rel = 'your palace controls theirs — you hold the upper hand right now'; qm += (purposeKey === 'report' || purposeKey === 'child') ? 0.1 : -0.2; }
    }
    qm += ((pa.score + pb.score) / 2) * 0.25;
    notes.push({t: qm > 0.3 ? 'good' : qm < -0.2 ? 'warn' : 'mixed', sec:'qm', x:`Your stem ${A.dm} in ${pa.name} (${pa.door || '—'}), their stem ${B.dm} in ${pb.name} (${pb.door || '—'}) — ${rel}.`});
  }
  const y = P.yong(A);
  const ys = [];
  if (y.god) { const c = qmNow.godPalace(y.god); if (c) ys.push(c); }
  if (y.door) { const c = qmNow.doorPalace(y.door); if (c) ys.push(c); }
  if (y.stem) { const c = qmNow.stemPalace(y.stem); if (c) ys.push(c); }
  if (y.star) { const c = Object.values(qmNow.cells).find(c => c.star.startsWith(y.star)); if (c) ys.push(c); }
  if (ys.length) {
    const avg = ys.reduce((a, c) => a + c.score, 0) / ys.length;
    qm += avg * 0.3;
    notes.push({t: avg >= 1 ? 'good' : avg <= -0.6 ? 'warn' : 'mixed', sec:'qm', x:`Relationship indicator${ys.length > 1 ? 's' : ''} (${[y.god, y.door, y.stem, y.star].filter(Boolean).join(', ')}) ${ys.map(c => `in ${c.name}: ${c.door || '—'}/${c.star}${c.kong ? ' void' : ''}`).join('; ')}.`});
  }
  comp.qm = Math.max(-1, Math.min(1, qm));

  const W = {...P.w};
  if (!Azw) { W.zw = 0; }
  const wt = Object.values(W).reduce((a, c) => a + c, 0);
  const raw = Object.keys(W).reduce((a, k) => a + comp[k] * W[k], 0) / wt;
  const score = Math.round(Math.max(5, Math.min(95, 50 + raw * 50)));
  const verdict = score >= 75 ? 'Strong match' : score >= 60 ? 'Good match' : score >= 45 ? 'Workable — needs awareness' : 'Challenging — high friction';
  return {P, purposeKey, comp, W, score, verdict, notes, gAB, gBA};
}

// ---------- UI ----------
const SEC_LABEL = {dm:'Day Master roles 日主', el:'Element exchange 五行互补', br:'Pillar interactions 合冲', zw:'Zi Wei 飞化', qm:'Qi Men now 奇门'};
function compatFormHtml() {
  const opts = Object.keys(PURPOSES).map(k => `<option value="${k}">${purposeLabel(k)}</option>`).join('');
  const places = placeOptions();
  return `<div class="card"><h4>${L('Compare with another person', '与另一个人合盘')}</h4>
  <div class="grid cgrid">
    <label>${L('They are my…', '对方是我的…')}<select id="c-purpose">${opts}</select></label>
    <label>${L('Name', '姓名')}<input id="c-name" placeholder="${L('e.g. Manager', '例如：上司')}"></label>
    <label>${L('Birth date', '出生日期')}<input type="date" id="c-date"></label>
    <label>${L('Birth time', '出生时间')}<input type="time" id="c-time"></label>
    <label class="chk"><input type="checkbox" id="c-notime"> ${L('Time unknown', '时间不详')}</label>
    <label>${L('Gender', '性别')}<select id="c-gender"><option value="m">${T('male')}</option><option value="f">${T('female')}</option></select></label>
    <label>${L('Birthplace', '出生地')}<select id="c-place">${places}</select></label>
    <label>${L('Longitude °E', '经度 °E')}<input type="number" step="0.01" id="c-lon"></label>
    <label>${L('UTC offset at birth', '出生时区')}<input type="number" step="0.25" id="c-tz"></label>
  </div>
  <button class="btn" id="c-go">${L('Check compatibility', '查看合盘')}</button> <button class="btn ghost" id="c-swap" type="button" title="${L('Make them the main chart and put yourself in this form', '把对方设为主盘，并把你自己放入此表单')}">⇄ ${L('Swap you ↔ them', '互换 你↔对方')}</button> <span id="c-err" class="small" style="color:var(--warn)"></span>
  <p class="muted small">${L('The same two people score differently for different roles — e.g. someone who gives you structure is ideal as a husband or boss, but can feel restrictive as a friend. Switch "They are my…" to compare.', '同样两个人在不同关系中的分数会不同——例如给你规矩的人很适合当丈夫或上司，当朋友却可能让你觉得拘束。切换“对方是我的…”即可比较。')}</p></div><div id="c-out"></div>`;
}
function initCompat() {
  $('#tab-compat').innerHTML = compatFormHtml();
  const cp = () => { const p = PRESETS[$('#c-place').value]; if (p.lon !== null) $('#c-lon').value = p.lon;
    if (p.tz !== null) { const v = $('#c-date').value.split('-').map(Number); const hz = v.length === 3 ? histTz($('#c-place').value, ...v) : null; $('#c-tz').value = +(hz !== null ? hz : p.tz).toFixed(3); }
    $('#c-lon').readOnly = $('#c-place').value !== 'custom'; };
  $('#c-place').onchange = cp; $('#c-date').onchange = cp;
  $('#c-notime').onchange = () => { $('#c-time').disabled = $('#c-notime').checked; };
  let s = null; try { s = JSON.parse(localStorage.getItem('fp-compat') || 'null'); } catch (e) {}
  if (s) { ['purpose','name','date','time','gender','place'].forEach(k => { if (s[k] !== undefined) $('#c-' + k).value = s[k]; }); $('#c-notime').checked = !!s.notime; $('#c-time').disabled = !!s.notime; }
  else $('#c-place').value = 'sg';
  cp(); if (s && s.place === 'custom') { $('#c-lon').value = s.lon; $('#c-tz').value = s.tz; }
  $('#c-go').onclick = runCompat;
  $('#c-swap').onclick = swapCompat;
  $('#c-purpose').onchange = () => { if (STATE && STATE.compatB) runCompat(); };
  if (s && s.date && STATE) runCompat();
}
function swapCompat() {
  if (!STATE) return;
  const d = $('#c-date').value, notime = $('#c-notime').checked;
  if (!d || (!notime && !$('#c-time').value)) { $('#c-err').textContent = L('Enter their birth details first, then swap.', '请先填写对方的出生信息，再互换。'); return; }
  // snapshot both people
  const them = {name: $('#c-name').value, date: d, time: $('#c-time').value, notime, gender: $('#c-gender').value, place: $('#c-place').value, lon: $('#c-lon').value, tz: $('#c-tz').value};
  const me = {name: $('#pname').value, date: $('#bdate').value, time: $('#btime').value, notime: $('#notime').checked, gender: $('#gender').value, place: $('#place').value, lon: $('#lon').value, tz: $('#tz').value};
  // their details become the main form
  $('#pname').value = them.name; $('#bdate').value = them.date; $('#btime').value = them.time; $('#notime').checked = them.notime; $('#btime').disabled = them.notime;
  $('#gender').value = them.gender; $('#place').value = them.place;
  setPreset();
  if (them.place === 'custom') { $('#lon').value = them.lon; $('#tz').value = them.tz; }
  // yours go into the compare form (initCompat reloads it from storage after calculate)
  try { localStorage.setItem('fp-compat', JSON.stringify({purpose: $('#c-purpose').value, name: me.name, date: me.date, time: me.time, notime: me.notime, gender: me.gender, place: me.place, lon: me.lon, tz: me.tz})); } catch (e) {}
  calculate(false);
}
function runCompat() {
  if (!STATE) return;
  const d = $('#c-date').value, notime = $('#c-notime').checked, t = notime ? '12:00' : $('#c-time').value;
  if (!d || !t) { $('#c-err').textContent = L('Enter their birth date (and time, or tick "Time unknown").', '请输入对方的出生日期（和时间，或勾选“时间不详”）。'); return; }
  $('#c-err').textContent = '';
  const v = {purpose: $('#c-purpose').value, name: $('#c-name').value, date: d, time: $('#c-time').value, notime, gender: $('#c-gender').value, place: $('#c-place').value, lon: $('#c-lon').value, tz: $('#c-tz').value};
  try { localStorage.setItem('fp-compat', JSON.stringify(v)); } catch (e) {}
  const inB = {wall: [...d.split('-').map(Number), ...t.split(':').map(Number)], tz: parseFloat(v.tz), lon: parseFloat(v.lon), useTST: STATE.inp.useTST, gender: v.gender === 'm' ? 1 : 0, ziRule: STATE.inp.ziRule};
  const B = computeBazi(inB);
  let Bzw = null;
  if (!notime) { try { Bzw = computeZiwei(inB, B, new Date()); } catch (e) {} }
  STATE.compatB = {B, Bzw, v};
  const r = computeCompat(STATE.bazi, STATE.zw, STATE.qmNow, B, Bzw, v.purpose, !notime);
  // all-purpose summary
  const all = Object.keys(PURPOSES).map(k => ({k, s: computeCompat(STATE.bazi, STATE.zw, STATE.qmNow, B, Bzw, k, !notime).score}));
  let slots = null;
  if (notime) {
    slots = [];
    HR_SLOTS.forEach(sl => {
      try {
        const I = {...inB, wall: [inB.wall[0], inB.wall[1], inB.wall[2], sl.mid[0], sl.mid[1]], useTST: false};
        const Bs = computeBazi(I); let Zs = null; try { Zs = computeZiwei(I, Bs, new Date()); } catch (e) {}
        slots.push({sl, score: computeCompat(STATE.bazi, STATE.zw, STATE.qmNow, Bs, Zs, v.purpose, true).score, hz: Bs.pillars[3].gz});
      } catch (e) {}
    });
  }
  renderCompat(r, B, v, all, notime, slots);
}
function renderCompat(r, B, v, all, notime, slots) {
  const A = STATE.bazi;
  const nm = esc(v.name || L('Them', '对方'));
  const mini = (X, who) => `<div class="cmini"><div class="lbl">${who}</div><div>${X.pillars.map((p, i) => (i === 3 && notime && who === nm) ? '<span class="muted">??</span>' : `${ch(p.gan)}${ch(p.zhi)}`).join(' ')}</div><div class="small x-expert">DM ${ch(X.dm)} ${EL_EN[X.dmEl]} · ${X.label.split(' ')[0]} ${X.label.split(' ').slice(1).join(' ')} · needs ${X.favourable.map(e => EL_EN[e]).join('/')}</div></div>`;
  let h = `<div class="card"><div class="cpair">${mini(A, L('You', '你'))}${mini(B, nm)}</div>
    <div class="cscore"><div class="ring" style="--p:${r.score}"><span>${r.score}</span></div><div><div class="big2">${L(r.verdict, VERDICT_TXT[r.verdict])}</div><div class="muted">${L(`${nm} as your <b>${purposeLabel(r.purposeKey)}</b>`, `${nm}作为你的<b>${purposeLabel(r.purposeKey)}</b>`)}</div>
    ${notime ? `<div class="small muted">${L('Their birth time unknown — hour pillar and Zi Wei palaces for them are skipped.', '对方出生时间不详——不计算其时柱与紫微宫位。')}</div>` : ''}
    ${STATE.zw.unknown ? `<div class="small muted">${L('Your own birth time is unknown — your Hour pillar and Zi Wei palaces are left out, so this score rests on BaZi and Qi Men only.', '你自己的出生时间不详——不计算你的时柱与紫微宫位，此分数仅基于八字与奇门。')}</div>` : ''}</div></div>
    <div class="cbars x-expert">${Object.keys(SEC_LABEL).map(k => r.W[k] ? `<div class="cbar"><span>${secLabel(k)} <small class="muted">${Math.round(r.W[k] / Object.values(r.W).reduce((a, c) => a + c, 0) * 100)}%</small></span><div class="dbar"><div style="${r.comp[k] >= 0 ? `left:50%;width:${r.comp[k] * 50}%` : `left:${50 + r.comp[k] * 50}%;width:${-r.comp[k] * 50}%`}" class="${r.comp[k] >= 0 ? 'pos' : 'neg'}"></div></div></div>` : '').join('')}</div></div>`;
  if (slots && slots.length) {
    const sc = slots.map(x => x.score), lo = Math.min(...sc), hi = Math.max(...sc);
    h += `<div class="card"><h4>${L('Score by their possible birth hour', '按对方可能的出生时辰看分数')}</h4>
      <p class="small muted">${L(`Since their birth time is unknown, the score above leaves their Hour pillar and Zi Wei out. If you add each possible hour, the score ranges from <b>${lo}</b> to <b>${hi}</b>.`, `由于对方出生时间不详，上方分数不含其时柱与紫微。若逐个加入可能的时辰，分数范围为 <b>${lo}</b> 至 <b>${hi}</b>。`)}</p>
      <div class="roles">${slots.map(x => `<span class="role"><span>${HR_BR[x.sl.bi]}${x.sl.from === 0 ? L(' (late)', '晚') : x.sl.from === 23 ? L(' (early)', '早') : ''} ${hrPad(x.sl.from)}–${hrPad(x.sl.to % 24)}h</span><b class="${x.score >= 60 ? 'up' : x.score < 45 ? 'down' : ''}">${x.score}</b></span>`).join('')}</div></div>`;
  }
  h += compatPlain(r, nm) + `<div class="x-expert">${ex('How the score is calculated', COMPAT_HOWTO)}</div>`;
  h += `<div class="card"><h4>${L('Same pair, different roles', '同一对人，不同关系')}</h4><div class="roles">${all.sort((a, b) => b.s - a.s).map(x => `<button class="role ${x.k === v.purpose ? 'on' : ''}" data-k="${x.k}"><span>${purposeLabel(x.k)}</span><b class="${x.s >= 60 ? 'up' : x.s < 45 ? 'down' : ''}">${x.s}</b></button>`).join('')}</div></div>`;
  Object.keys(SEC_LABEL).forEach(sec => {
    const ns = r.notes.filter(n => n.sec === sec);
    if (!ns.length) return;
    h += `<div class="card x-expert"><h4>${secLabel(sec)}</h4>${ns.map(n => `<div class="cnote">${tone(n.t === 'info' ? 'info' : n.t)}<div>${esc(n.x)}</div></div>`).join('')}</div>`;
  });
  h += `<p class="muted small x-expert">${L('Method: BaZi 合婚 essentials (Day Master Ten-God role, element exchange, palace-to-palace combinations/clashes weighted by role), Zi Wei year-stem 飞化 between charts, and the Qi Men chart for the current time. Weights shift per role; scores are heuristic.', '方法：八字合婚要点（日主十神角色、五行互补、依关系加权的柱位合冲）、两盘之间的紫微年干飞化，以及此刻的奇门盘。权重随关系而变；分数为经验估算。')}</p>`;
  $('#c-out').innerHTML = h;
  zhScope();
  document.querySelectorAll('.role').forEach(b => b.onclick = () => { $('#c-purpose').value = b.dataset.k; runCompat(); });
}

const SEC_ZH = {dm:'日主角色', el:'五行互补', br:'柱位合冲', zw:'紫微飞化', qm:'奇门此刻'};
const secLabel = k => L(SEC_LABEL[k], SEC_ZH[k]);
