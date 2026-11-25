// ===== Language: English / 中文 =====
let LANG = 'en';
try { LANG = localStorage.getItem('fp-lang') || 'en'; } catch (e) {}
const L = (en, zh) => LANG === 'zh' ? zh : en;
const ELN = e => L(EL_EN[e], EL[e]);

const UI_TXT = {
  title: ['四柱 · 紫微 · 奇门 Destiny Calculator', '四柱 · 紫微 · 奇门 命理计算器'],
  sub: ['BaZi Four Pillars with Ten Gods, Five Elements and Luck Pillars — cross-referenced with Zi Wei Dou Shu and Qi Men Dun Jia.', '八字四柱（十神、五行、大运），并与紫微斗数、奇门遁甲交叉参照。'],
  notime: ['Birth time unknown', '不知道出生时间'], name: ['Name (optional)', '姓名（可选）'], bdate: ['Birth date', '出生日期'], btime: ['Birth time (clock)', '出生时间（钟表时间）'],
  gender: ['Gender', '性别'], place: ['Birthplace', '出生地'], lon: ['Longitude °E', '经度 °E'], tz: ['UTC offset at birth', '出生时的时区（UTC±）'],
  zi: ['Zi hour rule 子时', '子时规则'], zi23: ['Day changes at 23:00 (traditional)', '23:00 换日（传统）'], zi00: ['Day changes at 00:00', '00:00 换日'],
  tst: ['Use true solar time 真太阳时', '使用真太阳时'], qauto: ['Query time = now (auto-updates)', '查询时间 = 现在（自动更新）'],
  qdate: ['Query date', '查询日期'], qtime: ['Query time', '查询时间'], qtz: ['Query UTC offset', '查询时区'],
  dst: ['If daylight saving was in effect at birth, add 1 to the UTC offset. Singapore / Malaysia offsets before 1982 are set automatically.', '若出生时实行夏令时，请把时区加 1。新加坡／马来西亚 1982 年前的时区会自动设定。'],
  calc: ['Calculate chart', '开始排盘'],
  basic: ['Just fill in these — everything else is set for you. If you only know the rough birth time, enter your best guess.', '只需填写以上几项，其余会自动设定。若只知道大概的出生时间，填最接近的即可。'],
  adv: ['⚙ Advanced options (time zone, true solar time, Zi hour, query time)', '⚙ 进阶设置（时区、真太阳时、子时规则、查询时间）'], view: ['View:', '视图：'], simple: ['🙂 Simple', '🙂 简单'], expert: ['🔬 Expert', '🔬 专业'],
  male: ['Male 男', '男'], female: ['Female 女', '女'],
  t_summary: ['Summary', '总览'], t_reading: ['Reading 解读', '解读'], t_bazi: ['BaZi 八字', '八字'], t_ziwei: ['Zi Wei 紫微', '紫微'], t_qimen: ['Qi Men 奇门', '奇门'],
  t_cross: ['Cross-reference 合参', '合参'], t_pastlife: ['Past Life 前世', '前世'], t_compat: ['Compatibility 合盘', '合盘'], t_guide: ['Guide 指南', '指南'],
  placeholder: ['Enter birth details above and tap <b>Calculate chart</b>. New to this? Start with the <b>Guide 指南</b> tab.', '请在上方输入出生资料，然后点 <b>开始排盘</b>。第一次使用？可先看 <b>指南</b>。'],
  footer: ['Calculations: lunar-javascript (6tail) for calendar & pillars, iztro for Zi Wei Dou Shu, custom 时家奇门 转盘 拆补 engine. Strength, ratings and cross-reference tones are simplified rule-of-thumb heuristics — schools differ, so treat readings as reflection, not prediction.',
    '计算：历法与四柱用 lunar-javascript，紫微斗数用 iztro，时家奇门（转盘、拆补法）为自建引擎。身强弱、评分与合参结论均为简化的经验规则——各派说法不同，请作为自我反思参考，而非预言。'],
  expertNote: ['', ''],
};
const T = k => (UI_TXT[k] || [k, k])[LANG === 'zh' ? 1 : 0];

function applyStaticText() {
  document.documentElement.lang = LANG === 'zh' ? 'zh-Hans' : 'en';
  document.querySelectorAll('[data-i18n]').forEach(el => { el.innerHTML = T(el.dataset.i18n); });
  const g = document.getElementById('gender');
  if (g) { g.options[0].text = T('male'); g.options[1].text = T('female'); }
  const z = document.getElementById('zi');
  if (z) { z.options[0].text = T('zi23'); z.options[1].text = T('zi00'); }
  document.querySelectorAll('.tabs button').forEach(b => b.textContent = T('t_' + b.dataset.t));
  const pl = document.getElementById('place'); if (pl && pl.options.length && typeof PRESETS !== 'undefined') [...pl.options].forEach(o => { o.text = L(PRESETS[o.value].name, CITY_ZH[o.value] || PRESETS[o.value].name); }); if (pl) pl.querySelectorAll('optgroup').forEach(g => { const k = g.dataset.g; g.label = k === 'cn' ? L('China · by province / city', '中国 · 按省份/城市') : k === 'sea' ? L('Singapore / Malaysia', '新加坡 / 马来西亚') : L('Other places', '其他地区'); });
  document.querySelectorAll('.lang button').forEach(b => b.classList.toggle('on', b.dataset.l === LANG));
  document.querySelectorAll('.zhnote').forEach(el => { el.textContent = T('expertNote'); el.hidden = LANG !== 'zh'; });
}
function setLang(l) {
  LANG = l;
  try { localStorage.setItem('fp-lang', l); } catch (e) {}
  applyStaticText();
  const gd = document.getElementById('tab-guide'); if (gd) gd.innerHTML = guideHtml();
  if (typeof STATE !== 'undefined' && STATE) { render(); if (STATE.compatB) runCompat(); }
  else { document.querySelectorAll('.tab .ph').forEach(p => p.innerHTML = T('placeholder')); }
}

// ----- Chinese content dictionaries -----
const DM_ZH = {
  甲:'参天大树 — 正直、有原则、天生的领导者，稳步成长；有时固执、不易变通。',
  乙:'藤蔓花草 — 灵活、圆融、韧性强；靠人脉与适应取胜，而非硬拼。',
  丙:'太阳 — 热情、大方、善于表达、引人注目；能照亮全场，也容易透支或说得太多。',
  丁:'烛火 — 细腻、含蓄、直觉敏锐；内心热烈，是少数人的指路明灯。',
  戊:'高山 — 稳重、可靠、有保护力；别人愿意依靠你，但你不轻易改变方向。',
  己:'田园沃土 — 包容、务实、注重细节；能让事物成长，有时容易操心。',
  庚:'刀斧原矿 — 果断、直接、讲义气；抗压力强，说话有时太直。',
  辛:'珠宝首饰 — 精致、追求完美、重形象；心思敏感，经过磨练更能发光。',
  壬:'江河大海 — 胸怀大、爱冒险、足智多谋；不喜欢被束缚。',
  癸:'雨露 — 敏锐、富想象力、温和；善于在幕后细致运筹。',
};
const DMT = s => L(DM_TEXT[s], DM_ZH[s]);
const EL_PRACTICAL_ZH = [
  {c:'绿色', d:'东方', i:'教育、出版、设计、健康养生、农业'},
  {c:'红色／紫色', d:'南方', i:'科技、媒体、能源、餐饮、娱乐'},
  {c:'黄色／棕色', d:'中央、东北、西南', i:'房地产、建筑、行政、保险'},
  {c:'白色／金色／银色', d:'西方、西北', i:'金融、法律、工程、安全、机械'},
  {c:'黑色／蓝色', d:'北方', i:'物流、贸易、通讯、旅游、咨询'},
];
const ELP = e => LANG === 'zh' ? EL_PRACTICAL_ZH[e] : EL_PRACTICAL[e];
const ZW_STAR_ZH = {紫微:'领导力、尊贵、需要辅佐',天机:'聪明、善谋划、多变动',太阳:'慷慨、公众角色、曝光度',武曲:'果断、重财、刚强',天同:'随和、享受、重感情',
  廉贞:'复杂、懂权谋、强烈、守规矩也会破规矩',天府:'稳重、善守成、善管理',太阴:'温柔、顾家、重房产、细腻',贪狼:'多才多艺、有魅力、爱享受',
  巨门:'口才、辩论、是非、钻研',天相:'辅佐、公正、重形象',天梁:'庇护、提携后辈、化解麻烦',七杀:'开拓、有魄力、独立',破军:'破旧立新、变革、大胆改变'};
const QM_DOOR_ZH = {开门:'事业、开创、权威',休门:'休养、人脉、贵人',生门:'成长、财富、房产',伤门:'冲突、竞争、受伤',杜门:'隐藏、研究、受阻',景门:'名声、文书、曝光',死门:'结束、停滞',惊门:'惊扰、口舌是非'};
const DIR_ZH = {1:'北方',2:'西南方',3:'东方',4:'东南方',6:'西北方',7:'西方',8:'东北方',9:'南方'};
const GOD_ROLE_ZH = {
  比肩:'与你平起平坐的人——像镜子、像同伴，频率相近', 劫财:'亦敌亦友——给你动力，但会和你争资源',
  食神:'你乐于照顾、相处愉快的人——付出自然顺畅', 伤官:'激发你表达欲的人——很有刺激，但你付出多于得到',
  偏财:'吸引你、你想主导的人——灵活多变、讲机会', 正财:'你会稳定承担责任的人——忠诚、务实',
  七杀:'推动你、给你压力的人——促你成长，也可能让你觉得被控制', 正官:'给你规范与标准的人——尊重、守规矩',
  偏印:'另类的支持者——有洞见、有保护，但有时冷淡', 正印:'温暖的支持者——关怀、靠山、指导',
};
const GOD_ROLE_REV = {
  比肩:['an equal','与对方平起平坐的人'], 劫财:['a competitor-ally','对方亦敌亦友的伙伴'], 食神:['someone they enjoy looking after','对方乐于照顾的人'],
  伤官:['someone who brings out their sharp, outspoken side','激发对方锋芒、直言一面的人'], 偏财:['someone they are drawn to and want to steer','吸引对方、对方想主导的人'],
  正财:['someone they feel steadily responsible for','对方会稳定负责的人'], 七杀:['someone who pushes them hard','给对方压力、推动对方的人'],
  正官:['someone who gives them structure and standards','给对方规范与标准的人'], 偏印:['an unconventional source of support','对方另类的支持来源'], 正印:['a nurturing supporter','对方温暖的支持者'],
};
const ROLE_TIP_ZH = {
  比肩:'把对方当平等伙伴；先说好谁主导什么，避免“两个船长”。', 劫财:'很有能量，但金钱、功劳和资源要分清楚。',
  食神:'轻松愉快——你自然付出，也要让付出被看见、有回报。', 伤官:'对方会激发你犀利的一面——用在想法和成果上，而不是批评。',
  偏财:'灵活讲机会——把期望说清楚，才能双赢。', 正财:'稳定忠诚——靠可靠建立关系，别只当成交易。',
  七杀:'对方会逼你很紧——设好界线，把压力化为成长而非对抗。', 正官:'对方提供规矩——用稳定赢得信任；有不同意见就提方案，不要硬顶。',
  偏印:'原创而有洞见的支持——给对方空间，不要期待时时温暖。', 正印:'温暖有保护力——接受支持，但别变得依赖。',
};
const purposeLabel = k => { const lab = PURPOSES[k].label; const zh = (lab.match(/[一-鿿]+$/) || [lab])[0]; return L(lab.replace(/\s*[一-鿿]+$/, ''), zh); };
const VERDICT_TXT = {'Strong match':'非常契合','Good match':'比较契合','Workable — needs awareness':'可以相处——需要多加留意','Challenging — high friction':'有挑战——摩擦较大'};

const CITY_ZH = {sg:'新加坡', kl:'吉隆坡', hk:'香港（特别行政区）', bj:'北京', sh:'上海', tp:'台北（台湾）', tj:'天津', cq:'重庆', shijiazhuang:'石家庄（河北）', taiyuan:'太原（山西）', hohhot:'呼和浩特（内蒙古）', shenyang:'沈阳（辽宁）', dalian:'大连（辽宁）', changchun:'长春（吉林）', harbin:'哈尔滨（黑龙江）', nanjing:'南京（江苏）', suzhou:'苏州（江苏）', hangzhou:'杭州（浙江）', hefei:'合肥（安徽）', fuzhou:'福州（福建）', xiamen:'厦门（福建）', nanchang:'南昌（江西）', jinan:'济南（山东）', qingdao:'青岛（山东）', zhengzhou:'郑州（河南）', wuhan:'武汉（湖北）', changsha:'长沙（湖南）', guangzhou:'广州（广东）', shenzhen:'深圳（广东）', nanning:'南宁（广西）', haikou:'海口（海南）', chengdu:'成都（四川）', guiyang:'贵阳（贵州）', kunming:'昆明（云南）', lhasa:'拉萨（西藏）', xian:'西安（陕西）', lanzhou:'兰州（甘肃）', xining:'西宁（青海）', yinchuan:'银川（宁夏）', urumqi:'乌鲁木齐（新疆）', kashgar:'喀什（新疆）', mo:'澳门（特别行政区）', jk:'雅加达', bk:'曼谷', tk:'东京', sy:'悉尼', ld:'伦敦', ny:'纽约', custom:'自定义…'};
const placeOptions = () => { let g = null, out = '';
  const grpLabel = x => x === 'cn' ? L('China · by province / city', '中国 · 按省份/城市') : L('Other places', '其他地区');
  Object.entries(PRESETS).forEach(([k, v]) => { const gg = v.grp === 'cn' ? 'cn' : (k === 'sg' || k === 'kl' ? 'sea' : 'oth');
    if (gg !== g) { if (g) out += '</optgroup>'; g = gg; out += gg === 'sea' ? '<optgroup label="' + L('Singapore / Malaysia', '新加坡 / 马来西亚') + '" data-g="sea">' : '<optgroup label="' + grpLabel(gg) + '" data-g="' + gg + '">'; }
    out += `<option value="${k}">${L(v.name, CITY_ZH[k] || v.name)}</option>`; });
  return out + '</optgroup>'; };
