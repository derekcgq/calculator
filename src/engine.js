// ===== Core tables =====
const STEMS = '甲乙丙丁戊己庚辛壬癸'.split('');
const STEM_PY = ['Jia','Yi','Bing','Ding','Wu','Ji','Geng','Xin','Ren','Gui'];
const BRANCHES = '子丑寅卯辰巳午未申酉戌亥'.split('');
const BR_PY = ['Zi','Chou','Yin','Mao','Chen','Si','Wu','Wei','Shen','You','Xu','Hai'];
const ZODIAC = ['Rat','Ox','Tiger','Rabbit','Dragon','Snake','Horse','Goat','Monkey','Rooster','Dog','Pig'];
const ZODIAC_ZH = '鼠牛虎兔龙蛇马羊猴鸡狗猪'.split('');
const EL = ['木','火','土','金','水'];
const EL_EN = ['Wood','Fire','Earth','Metal','Water'];
const BR_EL = [4,2,0,0,2,1,1,2,3,3,2,4];
const HIDDEN = {子:'癸',丑:'己癸辛',寅:'甲丙戊',卯:'乙',辰:'戊乙癸',巳:'丙庚戊',午:'丁己',未:'己丁乙',申:'庚壬戊',酉:'辛',戌:'戊辛丁',亥:'壬甲'};
const HIDDEN_W = [[1],[0.7,0.3],[0.6,0.3,0.1]];
const TG_EN = {比肩:'Companion',劫财:'Rob Wealth',食神:'Eating God',伤官:'Hurting Officer',偏财:'Indirect Wealth',正财:'Direct Wealth',七杀:'Seven Killings',正官:'Direct Officer',偏印:'Indirect Resource',正印:'Direct Resource'};
const TG_GROUP = {比肩:'peer',劫财:'peer',食神:'output',伤官:'output',偏财:'wealth',正财:'wealth',七杀:'officer',正官:'officer',偏印:'resource',正印:'resource'};
const GROUP_EN = {peer:'Companion (比劫)',output:'Output (食伤)',wealth:'Wealth (财)',officer:'Officer (官杀)',resource:'Resource (印)'};
const LIFE_STAGES = ['长生','沐浴','冠带','临官','帝旺','衰','病','死','墓','绝','胎','养'];
const LIFE_STAGES_EN = ['Birth','Bath','Cap & Belt','Coming of Age','Peak','Decline','Sickness','Death','Tomb','Extinction','Conception','Nurture'];
const CHANGSHENG = {甲:11,乙:6,丙:2,丁:9,戊:2,己:9,庚:5,辛:0,壬:8,癸:3};

const PILLAR_INFO = [
  {key:'year', zh:'年柱', en:'Year', meaning:'Ancestry, early childhood, external environment & society', ages:'0–16'},
  {key:'month', zh:'月柱', en:'Month', meaning:'Career direction, work rhythm & relationship with parents', ages:'17–32'},
  {key:'day', zh:'日柱', en:'Day', meaning:'Core self (Day Master) & intimate / marital relationships', ages:'33–48'},
  {key:'hour', zh:'时柱', en:'Hour', meaning:'Children, private ambitions, hidden talents & later life', ages:'49+'},
];

const stemEl = s => Math.floor(STEMS.indexOf(s) / 2);
const stemYang = s => STEMS.indexOf(s) % 2 === 0;
const brEl = b => BR_EL[BRANCHES.indexOf(b)];
const mainHidden = b => HIDDEN[b][0];

function tenGod(dm, s) {
  const d = (stemEl(s) - stemEl(dm) + 5) % 5;
  const same = stemYang(s) === stemYang(dm);
  return [['比肩','劫财'],['食神','伤官'],['偏财','正财'],['七杀','正官'],['偏印','正印']][d][same ? 0 : 1];
}
function gzIndex(gz) {
  const s = STEMS.indexOf(gz[0]), b = BRANCHES.indexOf(gz[1]);
  for (let i = 0; i < 60; i++) if (i % 10 === s && i % 12 === b) return i;
  return -1;
}
function lifeStage(dm, br) {
  const start = CHANGSHENG[dm], b = BRANCHES.indexOf(br);
  const off = stemYang(dm) ? (b - start + 12) % 12 : (start - b + 12) % 12;
  return off;
}
function xunKong(gz) {
  const i = gzIndex(gz), x = i - i % 10;
  return [BRANCHES[(x + 10) % 12], BRANCHES[(x + 11) % 12]];
}
const nayin = gz => (window.LJ.LunarUtil.NAYIN || {})[gz] || '';

// ===== Time handling =====
function equationOfTime(ms) {
  const d = new Date(ms);
  const start = Date.UTC(d.getUTCFullYear(), 0, 0);
  const n = (ms - start) / 864e5;
  const B = 2 * Math.PI * (n - 81) / 364;
  return 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);
}
function comps(ms) {
  const d = new Date(ms);
  return [d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds()];
}
// wall: [y,m,d,h,mi]; tz hours; lon degrees
function resolveTimes(wall, tz, lon, useTST) {
  const utc = Date.UTC(wall[0], wall[1] - 1, wall[2], wall[3], wall[4]) - tz * 3600e3;
  const lonCorr = lon * 4; // minutes from UTC
  const eot = equationOfTime(utc);
  const tstMs = utc + (lonCorr + eot) * 60e3;
  const local = useTST ? tstMs : utc + tz * 3600e3;
  return {
    utc,
    bj: comps(utc + 8 * 3600e3),
    local: comps(local),
    correctionMin: Math.round(((tstMs - (utc + tz * 3600e3)) / 60e3) * 10) / 10,
    eot: Math.round(eot * 10) / 10,
    tst: comps(tstMs),
  };
}

// ===== BaZi =====
function elementScores(pillars, extra = []) {
  const sc = [0, 0, 0, 0, 0];
  const add = (p, mult) => {
    sc[stemEl(p.gan)] += 1 * mult;
    const hs = HIDDEN[p.zhi].split('');
    const w = HIDDEN_W[hs.length - 1];
    hs.forEach((h, k) => sc[stemEl(h)] += w[k] * mult * (p.monthCmd ? 2 : 1));
  };
  pillars.forEach(p => add(p, 1));
  extra.forEach(p => add(p, p.weight || 1));
  return sc;
}
function rawCounts(pillars) {
  const c = [0, 0, 0, 0, 0];
  pillars.forEach(p => { c[stemEl(p.gan)]++; c[brEl(p.zhi)]++; });
  return c;
}

function analyseInteractions(list) {
  // list: [{label, gan, zhi}]
  const out = [];
  const STEM_COMBO = {甲己:'Earth 土',乙庚:'Metal 金',丙辛:'Water 水',丁壬:'Wood 木',戊癸:'Fire 火'};
  const STEM_CLASH = ['甲庚','乙辛','丙壬','丁癸'];
  const CLASH = ['子午','丑未','寅申','卯酉','辰戌','巳亥'];
  const HARM6 = {子丑:'Earth 土',寅亥:'Wood 木',卯戌:'Fire 火',辰酉:'Metal 金',巳申:'Water 水',午未:'Fire/Earth'};
  const HAI = ['子未','丑午','寅巳','卯辰','申亥','酉戌'];
  const PO = ['子酉','午卯','巳申','寅亥','辰丑','戌未'];
  const has = (arr, a, b) => arr.includes(a + b) || arr.includes(b + a);
  const key = (obj, a, b) => obj[a + b] || obj[b + a];
  for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) {
    const A = list[i], B = list[j];
    const pair = `${A.label} × ${B.label}`;
    const c = key(STEM_COMBO, A.gan, B.gan);
    if (c) out.push({type:'combo', text:`${A.gan}${B.gan} Stem combination (天干合) → ${c}`, pair});
    if (has(STEM_CLASH, A.gan, B.gan)) out.push({type:'clash', text:`${A.gan}${B.gan} Stem clash (天干冲)`, pair});
    if (has(CLASH, A.zhi, B.zhi)) out.push({type:'clash', text:`${A.zhi}${B.zhi} Branch clash (六冲)`, pair});
    const h = key(HARM6, A.zhi, B.zhi);
    if (h) out.push({type:'combo', text:`${A.zhi}${B.zhi} Six harmony (六合) → ${h}`, pair});
    if (has(HAI, A.zhi, B.zhi)) out.push({type:'harm', text:`${A.zhi}${B.zhi} Harm (六害)`, pair});
    if (has(['子卯'], A.zhi, B.zhi)) out.push({type:'harm', text:`${A.zhi}${B.zhi} Punishment (子卯刑)`, pair});
    if (A.zhi === B.zhi && '辰午酉亥'.includes(A.zhi)) out.push({type:'harm', text:`${A.zhi}${B.zhi} Self-punishment (自刑)`, pair});
  }
  const brs = list.map(x => x.zhi);
  const labelsOf = chars => list.filter(x => chars.includes(x.zhi)).map(x => x.label).join(', ');
  const TRI = [['申子辰','Water 水'],['亥卯未','Wood 木'],['寅午戌','Fire 火'],['巳酉丑','Metal 金']];
  TRI.forEach(([t, e]) => {
    const n = t.split('').filter(c => brs.includes(c)).length;
    if (n === 3) out.push({type:'combo', text:`${t} Three Harmony (三合) → ${e} frame`, pair: labelsOf(t)});
    else if (n === 2 && brs.includes(t[1])) out.push({type:'combo', text:`${t.split('').filter(c => brs.includes(c)).join('')} Half Three-Harmony (半合) → ${e}`, pair: labelsOf(t)});
  });
  const MEET = [['寅卯辰','Wood 木'],['巳午未','Fire 火'],['申酉戌','Metal 金'],['亥子丑','Water 水']];
  MEET.forEach(([t, e]) => { if (t.split('').every(c => brs.includes(c))) out.push({type:'combo', text:`${t} Directional meeting (三会) → ${e}`, pair: labelsOf(t)}); });
  [['寅巳申','Ungrateful punishment (无恩之刑)'],['丑戌未','Bullying punishment (恃势之刑)']].forEach(([t, n]) => {
    const n2 = t.split('').filter(c => brs.includes(c)).length;
    if (n2 >= 2) out.push({type:'harm', text:`${t.split('').filter(c => brs.includes(c)).join('')} ${n}${n2 === 3 ? ' — full' : ' — partial'}`, pair: labelsOf(t)});
  });
  return out;
}

function computeBazi(input) {
  const {wall, tz, lon, useTST, gender, ziRule} = input; // gender 1 male 0 female
  const LJ = window.LJ;
  const t = resolveTimes(wall, tz, lon, useTST);
  const sect = ziRule === 'midnight' ? 2 : 1;
  const lunBJ = LJ.Solar.fromYmdHms(...t.bj).getLunar();
  const ecBJ = lunBJ.getEightChar(); ecBJ.setSect(sect);
  const lunL = LJ.Solar.fromYmdHms(...t.local).getLunar();
  const ecL = lunL.getEightChar(); ecL.setSect(sect);
  const gzs = [ecBJ.getYear(), ecBJ.getMonth(), ecL.getDay(), ecL.getTime()];
  const dm = gzs[2][0];
  const pillars = gzs.map((gz, i) => ({
    ...PILLAR_INFO[i], gz, gan: gz[0], zhi: gz[1], monthCmd: i === 1,
    jiazi: gzIndex(gz) + 1,
    stemGod: i === 2 ? '日主' : tenGod(dm, gz[0]),
    hidden: HIDDEN[gz[1]].split('').map(h => ({stem: h, god: tenGod(dm, h)})),
    stage: lifeStage(dm, gz[1]), nayin: nayin(gz),
  })).slice(0, input.noHour ? 3 : 4);

  // Elements & strength
  const scores = elementScores(pillars);
  const counts = rawCounts(pillars);
  const dmE = stemEl(dm), resE = (dmE + 4) % 5, outE = (dmE + 1) % 5, wltE = (dmE + 2) % 5, offE = (dmE + 3) % 5;
  const total = scores.reduce((a, b) => a + b, 0) - 1;
  const support = scores[dmE] - 1 + scores[resE];
  const ratio = support / total;
  let label;
  if (ratio < 0.33) label = 'Weak 身弱';
  else if (ratio < 0.45) label = 'Slightly weak 偏弱';
  else if (ratio <= 0.55) label = 'Balanced 中和';
  else if (ratio <= 0.67) label = 'Slightly strong 偏强';
  else label = 'Strong 身强';
  const strong = ratio > 0.5;
  const monthMain = mainHidden(pillars[1].zhi);
  const deLing = [dmE, resE].includes(stemEl(monthMain));
  const deDi = pillars.some((p, i) => HIDDEN[p.zhi].split('').some(h => stemEl(h) === dmE));
  const deShi = pillars.filter((p, i) => i !== 2 && [dmE, resE].includes(stemEl(p.gan))).length >= 2;
  const favourable = strong ? [outE, wltE, offE] : [resE, dmE];
  const unfavourable = strong ? [resE, dmE] : [outE, wltE, offE];
  const mb = pillars[1].zhi;
  let climate = null;
  if ('亥子丑'.includes(mb)) climate = {need: 1, text: 'Born in winter (亥子丑) — chart runs cold; Fire 火 is valued for warmth (调候) regardless of strength.'};
  if ('巳午未'.includes(mb)) climate = {need: 4, text: 'Born in summer (巳午未) — chart runs hot and dry; Water 水 is valued for moisture (调候).'};

  // Structure
  const mGod = tenGod(dm, monthMain);
  let structure = mGod + '格';
  if (mGod === '比肩') structure = '建禄格';
  if (mGod === '劫财') structure = stemYang(dm) ? '月刃格 (羊刃)' : '建禄格';

  // Ten God tallies
  const godsVisible = pillars.filter((p, i) => i !== 2).map(p => ({god: p.stemGod, where: p.en + ' stem'}));
  const godsHidden = [];
  pillars.forEach(p => p.hidden.forEach((h, k) => godsHidden.push({god: h.god, where: `${p.en} branch${k === 0 ? ' (main)' : ''}`, main: k === 0})));
  const groupScore = {peer:0, output:0, wealth:0, officer:0, resource:0};
  godsVisible.forEach(g => groupScore[TG_GROUP[g.god]] += 1);
  pillars.forEach(p => p.hidden.forEach((h, k) => groupScore[TG_GROUP[h.god]] += HIDDEN_W[p.hidden.length - 1][k] * (p.monthCmd ? 2 : 1)));
  const dominant = Object.entries(groupScore).sort((a, b) => b[1] - a[1]);

  // Hurting Officer analysis
  const find = (g, arr) => arr.filter(x => x.god === g);
  const hoV = find('伤官', godsVisible), hoH = find('伤官', godsHidden);
  const egV = find('食神', godsVisible);
  const zgV = find('正官', godsVisible), zgH = find('正官', godsHidden);
  const qsV = find('七杀', godsVisible), qsH = find('七杀', godsHidden);
  const yinV = godsVisible.filter(x => TG_GROUP[x.god] === 'resource');
  const yinAll = yinV.length + godsHidden.filter(x => TG_GROUP[x.god] === 'resource' && x.main).length;
  const caiV = godsVisible.filter(x => TG_GROUP[x.god] === 'wealth');
  const caiAll = caiV.length + godsHidden.filter(x => TG_GROUP[x.god] === 'wealth' && x.main).length;
  const hoPresent = hoV.length + hoH.length > 0;
  const patterns = [];
  const isMetalWater = (dm === '庚' || dm === '辛') && '亥子丑'.includes(mb);
  if (hoPresent) {
    if (mGod === '伤官') patterns.push({tone:'info', name:'伤官格 Hurting Officer Structure', text:'The month branch main qi is Hurting Officer — it defines the chart\'s structure. Expressive, talented, independent; tests rules and hierarchy.'});
    if ((hoV.length && (zgV.length || zgH.some(x => x.main))) || (zgV.length && hoH.some(x => x.main))) {
      if (isMetalWater) patterns.push({tone:'good', name:'金水伤官喜见官', text:'Metal Day Master in winter with Water Hurting Officer — the classic exception: Officer (Fire) warms the chart, so meeting Officer is favourable.'});
      else patterns.push({tone:'warn', name:'伤官见官 HO meets Officer', text:'Hurting Officer and Direct Officer both prominent. Classical warning: friction with authority, bosses, contracts or the law; for women, tension around partner.'});
    }
    if (hoV.length && yinV.length) patterns.push({tone:'good', name:'伤官配印 HO paired with Resource', text:'Resource restrains Hurting Officer — talent disciplined by learning, credentials, mentors. Often seen in professionals and scholars.'});
    if (caiAll && (hoV.length || hoH.some(x => x.main))) patterns.push({tone:'good', name:'伤官生财 HO produces Wealth', text:'Hurting Officer flows into Wealth — talent, ideas and expression convert into income. Suits entrepreneurship, sales, creative business.'});
    if (qsV.length || qsH.some(x => x.main)) patterns.push({tone:'good', name:'伤官驾杀 HO harnesses Killings', text:'Hurting Officer controls Seven Killings — boldness tames pressure; power through wit and courage.'});
    if (hoV.length && !zgV.length && !zgH.length) patterns.push({tone:'info', name:'伤官伤尽 (candidate)', text:'Hurting Officer visible with no Direct Officer anywhere — classical texts consider a "fully hurt" Officer acceptable; review strength before concluding.'});
    if (!strong && (hoV.length + hoH.filter(x => x.main).length) >= 2) patterns.push({tone:'warn', name:'身弱伤官重 Heavy HO, weak DM', text:'Strong output draining a weak Day Master — energy leakage, overcommitment; Resource years tend to help.'});
  }

  // Spouse
  const spousePalace = tenGod(dm, mainHidden(pillars[2].zhi));
  const spouseStarGroup = gender === 1 ? 'wealth' : 'officer';
  const spouseStarName = gender === 1 ? '正财 Direct Wealth (wife star)' : '正官 Direct Officer (husband star)';
  const spouseStarCount = godsVisible.filter(g => TG_GROUP[g.god] === spouseStarGroup).length + godsHidden.filter(g => TG_GROUP[g.god] === spouseStarGroup && g.main).length;

  const natalList = pillars.map(p => ({label: p.en, gan: p.gan, zhi: p.zhi}));
  const interactions = analyseInteractions(natalList);
  const kong = xunKong(pillars[2].gz);

  // Luck pillars
  const yun = ecBJ.getYun(gender, 2);
  const birthYear = wall[0];
  const daYun = yun.getDaYun(10).slice(1).map(d => {
    const gz = d.getGanZhi();
    const sg = tenGod(dm, gz[0]), bg = tenGod(dm, mainHidden(gz[1]));
    const se = stemEl(gz[0]), be = brEl(gz[1]);
    let score = 0;
    score += favourable.includes(se) ? 1 : unfavourable.includes(se) ? -1 : 0;
    score += (favourable.includes(be) ? 1 : unfavourable.includes(be) ? -1 : 0) * 1.2;
    if (climate && (se === climate.need || be === climate.need)) score += 0.4;
    const shifted = elementScores(pillars, [{gan: gz[0], zhi: gz[1], weight: 1.5}]);
    const inter = analyseInteractions([...natalList, {label: 'Luck', gan: gz[0], zhi: gz[1]}]).filter(x => x.pair.includes('Luck'));
    const hoAct = sg === '伤官' || bg === '伤官';
    const offNatal = zgV.length || zgH.some(x => x.main);
    return {
      gz, startYear: d.getStartYear(), endYear: d.getEndYear(), startAge: d.getStartYear() - birthYear, endAge: d.getEndYear() - birthYear,
      stemGod: sg, branchGod: bg, score, shifted,
      rating: score >= 1 ? 'Favourable' : score <= -1 ? 'Challenging' : 'Mixed',
      hoAct, hoWarn: hoAct && offNatal && !isMetalWater,
      inter,
      liuNian: d.getLiuNian().map(ln => {
        const g = ln.getGanZhi();
        const sgx = tenGod(dm, g[0]);
        const ints = analyseInteractions([...natalList, {label: 'Luck', gan: gz[0], zhi: gz[1]}, {label: '流年 Annual', gan: g[0], zhi: g[1]}]).filter(x => x.pair.includes('流年') && x.type === 'clash');
        return {year: ln.getYear(), gz: g, age: ln.getYear() - birthYear, stemGod: sgx, branchGod: tenGod(dm, mainHidden(g[1])), clashes: ints.map(x => x.text + ' (' + x.pair + ')'), suiYun: g === gz};
      }),
    };
  });

  return {
    times: t, pillars, dm, dmEl: dmE, scores, counts, ratio, label, strong, deLing, deDi, deShi,
    favourable, unfavourable, climate, structure, monthGod: mGod, groupScore, dominant,
    ho: {present: hoPresent, visible: hoV, hidden: hoH, eatingGod: egV, officerVisible: zgV, officerHidden: zgH, patterns, metalWater: isMetalWater},
    spousePalace, spouseStarName, spouseStarCount, spouseStarGroup, interactions, kong, daYun,
    yunStart: {y: yun.getStartYear(), m: yun.getStartMonth(), d: yun.getStartDay()},
    lunar: lunL, jieqi: lunBJ.getPrevJieQi().getName(),
    gender, sect, hourKnown: !input.noHour,
  };
}

// ===== Zi Wei Dou Shu =====
const ZW_PALACE_EN = {命宫:'Life',兄弟:'Siblings',夫妻:'Spouse',子女:'Children',财帛:'Wealth',疾厄:'Health',迁移:'Travel',仆役:'Friends',交友:'Friends',官禄:'Career',田宅:'Property',福德:'Fortune / Mind',父母:'Parents'};
const ZW_STAR_KW = {
  紫微:'Emperor — leadership, dignity, needs support',天机:'Strategist — intellect, planning, change',太阳:'Sun — generosity, public role, visibility',
  武曲:'Finance general — decisive, money-minded, tough',天同:'Contentment — ease, enjoyment, emotional',廉贞:'Complex — politics, intensity, rules & breaking them',
  天府:'Treasury — stability, conservation, management',太阴:'Moon — nurturing, property, refined',贪狼:'Desire — versatile, charismatic, pleasure',
  巨门:'Great Gate — speech, debate, disputes, research',天相:'Minister — assistance, fairness, image',天梁:'Elder — protection, mentoring, resolving trouble',
  七杀:'General — pioneering, forceful, independent',破军:'Vanguard — disruption, renewal, bold change',
};
const ZW_GOOD = ['左辅','右弼','文昌','文曲','天魁','天钺','禄存'];
const ZW_BAD = ['擎羊','陀罗','火星','铃星','地空','地劫'];
const MUT_EN = {禄:'化禄 Prosperity',权:'化权 Power',科:'化科 Fame',忌:'化忌 Obstacle'};

function zwTimeIndex(h, mi) { if (h === 23) return 12; if (h === 0) return 0; return Math.floor((h + 1) / 2); }

function computeZiwei(input, bazi, queryDate) {
  const l = bazi.times.local;
  const idx = zwTimeIndex(l[3], l[4]);
  const a = window.astro.bySolar(`${l[0]}-${l[1]}-${l[2]}`, idx, input.gender === 1 ? '男' : '女', true, 'zh-CN');
  let hz = null;
  try { hz = a.horoscope(queryDate); } catch (e) {}
  const palaces = a.palaces.map((p, i) => ({
    i, name: p.name, en: ZW_PALACE_EN[p.name] || p.name, stem: p.heavenlyStem, branch: p.earthlyBranch, isBody: p.isBodyPalace,
    major: p.majorStars.map(s => ({name: s.name, b: s.brightness, m: s.mutagen})),
    minor: p.minorStars.map(s => ({name: s.name, b: s.brightness, m: s.mutagen})),
    adj: p.adjectiveStars.map(s => s.name),
    decadal: p.decadal.range,
  }));
  const byName = n => palaces.find(p => p.name === n || (n === '仆役' && p.name === '交友'));
  const opposite = p => palaces.find(q => q.branch === BRANCHES[(BRANCHES.indexOf(p.branch) + 6) % 12]);
  function evalPalace(p) {
    let s = 0; const notes = [];
    let stars = p.major; let borrowed = false;
    if (!stars.length) { stars = opposite(p).major; borrowed = true; }
    [...p.major, ...p.minor].forEach(st => {
      if (st.m === '禄' || st.m === '权' || st.m === '科') { s += 1; notes.push(`${st.name}${MUT_EN[st.m]}`); }
      if (st.m === '忌') { s -= 1.2; notes.push(`${st.name}${MUT_EN[st.m]}`); }
    });
    p.major.forEach(st => { if (['庙','旺'].includes(st.b)) s += 0.4; if (st.b === '陷') s -= 0.4; });
    p.minor.forEach(st => { if (ZW_GOOD.includes(st.name)) s += 0.4; if (ZW_BAD.includes(st.name)) s -= 0.4; });
    const tone = s >= 0.8 ? 'good' : s <= -0.6 ? 'warn' : 'mixed';
    return {score: s, tone, stars, borrowed, notes};
  }
  let current = null;
  if (hz) {
    const dp = palaces[hz.decadal.index];
    current = {decadal: dp, decadalMut: hz.decadal.mutagen, yearly: palaces[hz.yearly.index], yearlyMut: hz.yearly.mutagen, nominalAge: hz.age && hz.age.nominalAge};
    // where decadal mutagens land
    const findStar = n => palaces.find(p => [...p.major, ...p.minor].some(s => s.name === n));
    current.decadalLu = findStar(hz.decadal.mutagen[0]);
    current.decadalJi = findStar(hz.decadal.mutagen[3]);
  }
  const mutLoc = {};
  palaces.forEach(p => [...p.major, ...p.minor].forEach(s => { if (s.m) mutLoc[s.m] = {star: s.name, palace: p}; }));
  return {
    raw: a, palaces, byName, evalPalace, opposite, current, mutLoc,
    fiveClass: a.fiveElementsClass, soul: a.soul, body: a.body, lunarDate: a.lunarDate, chineseDate: a.chineseDate, time: a.time, timeRange: a.timeRange, sign: a.sign, zodiac: a.zodiac,
  };
}

// ===== Qi Men Dun Jia (时家奇门, 转盘, 拆补法) =====
const QM_JU = {冬至:[1,7,4],小寒:[2,8,5],大寒:[3,9,6],立春:[8,5,2],雨水:[9,6,3],惊蛰:[1,7,4],春分:[3,9,6],清明:[4,1,7],谷雨:[5,2,8],立夏:[4,1,7],小满:[5,2,8],芒种:[6,3,9],
  夏至:[9,3,6],小暑:[8,2,5],大暑:[7,1,4],立秋:[2,5,8],处暑:[1,4,7],白露:[9,3,6],秋分:[7,1,4],寒露:[6,9,3],霜降:[5,8,2],立冬:[6,9,3],小雪:[5,8,2],大雪:[4,7,1]};
const QM_YANG = '冬至小寒大寒立春雨水惊蛰春分清明谷雨立夏小满芒种';
const QM_STAR = {1:'天蓬',2:'天芮',3:'天冲',4:'天辅',5:'天禽',6:'天心',7:'天柱',8:'天任',9:'天英'};
const QM_DOOR = {1:'休门',2:'死门',3:'伤门',4:'杜门',6:'开门',7:'惊门',8:'生门',9:'景门'};
const QM_GODS = ['值符','螣蛇','太阴','六合','白虎','玄武','九地','九天'];
const QM_RING = [1,8,3,4,9,2,7,6];
const QM_PALACE = {1:'坎 N',2:'坤 SW',3:'震 E',4:'巽 SE',5:'中 Centre',6:'乾 NW',7:'兑 W',8:'艮 NE',9:'离 S'};
const QM_DOOR_TONE = {开门:1,休门:1,生门:1,景门:0,杜门:0,伤门:-1,惊门:-1,死门:-1};
const QM_STAR_TONE = {天心:1,天任:1,天辅:1,天禽:1,天冲:0.5,天蓬:-1,天芮:-1,天柱:-0.5,天英:0};
const QM_GOD_TONE = {值符:1,太阴:1,六合:1,九地:0.5,九天:0.5,螣蛇:-1,白虎:-1,玄武:-1};
const QM_DOOR_EN = {休门:'Rest — recovery, networking, nobles',生门:'Life — growth, wealth, property',伤门:'Harm — conflict, competition, injury',杜门:'Block — hiding, research, stuck',
  景门:'Scenery — fame, documents, visibility',死门:'Death — endings, stagnation',惊门:'Shock — alarm, disputes, speech',开门:'Open — career, launch, authority'};
const BR_PALACE = {子:1,丑:8,寅:8,卯:3,辰:4,巳:4,午:9,未:2,申:2,酉:7,戌:6,亥:6};

function computeQimen(wall, tz, lon, useTST, ziRule) {
  const LJ = window.LJ;
  const t = resolveTimes(wall, tz, lon, useTST);
  const sect = ziRule === 'midnight' ? 2 : 1;
  const lunBJ = LJ.Solar.fromYmdHms(...t.bj).getLunar();
  const jq = lunBJ.getPrevJieQi().getName();
  const ec = LJ.Solar.fromYmdHms(...t.local).getLunar().getEightChar(); ec.setSect(sect);
  const dayGZ = ec.getDay(), hourGZ = ec.getTime();
  const yang = QM_YANG.includes(jq);
  const di = gzIndex(dayGZ), fu = di - di % 5, fb = fu % 12;
  const yuan = [0, 6, 3, 9].includes(fb) ? 0 : [2, 8, 5, 11].includes(fb) ? 1 : 2;
  const ju = QM_JU[jq][yuan];
  const yi = '戊己庚辛壬癸丁丙乙'.split('');
  const earth = {};
  for (let k = 0; k < 9; k++) {
    const p = yang ? ((ju - 1 + k) % 9) + 1 : ((ju - 1 - k + 90) % 9) + 1;
    earth[p] = yi[k];
  }
  const palOf = s => +Object.keys(earth).find(p => earth[p] === s);
  const hi = gzIndex(hourGZ), xun = hi - hi % 10;
  const xunYi = {0:'戊',10:'己',20:'庚',30:'辛',40:'壬',50:'癸'}[xun];
  const xunName = '甲' + BRANCHES[xun % 12];
  const xunPal = palOf(xunYi);
  const zfStar = QM_STAR[xunPal];
  const zsDoor = QM_DOOR[xunPal === 5 ? 2 : xunPal];
  const hs = hourGZ[0];
  let target = hs === '甲' ? xunPal : palOf(hs);
  if (target === 5) target = 2;
  const rp = p => QM_RING.indexOf(p === 5 ? 2 : p);
  const shift = (rp(target) - rp(xunPal) + 8) % 8;
  const heaven = {}, stars = {}, heaven2 = {};
  QM_RING.forEach(P => {
    const np = QM_RING[(rp(P) + shift) % 8];
    stars[np] = QM_STAR[P] + (P === 2 ? '·禽' : '');
    heaven[np] = earth[P];
    if (P === 2) heaven2[np] = earth[5];
  });
  const steps = hi - xun;
  let dp = xunPal;
  for (let i = 0; i < steps; i++) dp = yang ? (dp % 9) + 1 : ((dp + 7) % 9) + 1;
  if (dp === 5) dp = 2;
  const doors = {};
  const dShift = (rp(dp) - rp(xunPal) + 8) % 8;
  QM_RING.forEach((P, i) => { doors[QM_RING[(i + dShift) % 8]] = QM_DOOR[P]; });
  const gods = {};
  const g0 = rp(target);
  QM_GODS.forEach((g, i) => { gods[QM_RING[(g0 + (yang ? i : -i) + 80) % 8]] = g; });
  const kongBr = [BRANCHES[(xun + 10) % 12], BRANCHES[(xun + 11) % 12]];
  const kongPal = [...new Set(kongBr.map(b => BR_PALACE[b]))];
  const hb = hourGZ[1];
  const maBr = '申子辰'.includes(hb) ? '寅' : '寅午戌'.includes(hb) ? '申' : '巳酉丑'.includes(hb) ? '亥' : '巳';
  const maPal = BR_PALACE[maBr];
  const cells = {};
  for (let p = 1; p <= 9; p++) {
    const c = {p, name: QM_PALACE[p], earth: earth[p], heaven: heaven[p] || '', heaven2: heaven2[p] || '', star: stars[p] || '', door: doors[p] || '', god: gods[p] || '', kong: kongPal.includes(p), ma: maPal === p};
    let s = 0;
    if (c.door) s += QM_DOOR_TONE[c.door];
    if (c.star) s += QM_STAR_TONE[c.star.slice(0, 2)] * 0.6;
    if (c.god) s += QM_GOD_TONE[c.god] * 0.6;
    if (c.kong) s -= 0.5;
    c.score = s; c.tone = s >= 1 ? 'good' : s <= -0.6 ? 'warn' : 'mixed';
    cells[p] = c;
  }
  const stemPalace = s => {
    if (s === '甲') s = xunYi;
    const p = Object.keys(cells).find(k => cells[k].heaven === s || cells[k].heaven2 === s);
    return p ? cells[p] : null;
  };
  const doorPalace = d => cells[Object.keys(cells).find(k => cells[k].door === d)];
  const godPalace = g => cells[Object.keys(cells).find(k => cells[k].god === g)];
  return {
    jq, yang, yuan: ['上元','中元','下元'][yuan], ju, dayGZ, hourGZ, xunName, xunYi, zfStar, zsDoor, zfPalace: target, zsPalace: dp,
    cells, kongBr, maBr, stemPalace, doorPalace, godPalace, times: t,
  };
}

if (typeof module !== 'undefined') module.exports = {computeBazi, computeZiwei, computeQimen, tenGod, gzIndex, STEMS, BRANCHES};
