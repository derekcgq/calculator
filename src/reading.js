// ===== Narrative reading 解读 (EN / 中文) =====
const ROLE_PHRASE = {peer:'self-reliance, confidence and allies', output:'creativity, expression and turning ideas into tangible output', wealth:'wealth and opportunities', officer:'authority, career structure and pressure', resource:'vital fuel, learning and strategic backing'};
const ROLE_PHRASE_ZH = {peer:'自信、独立与伙伴', output:'创意、表达，把想法化为实际成果', wealth:'财富与机会', officer:'权威、事业架构与压力', resource:'能量来源、学习与策略后援'};
const RP = r => L(ROLE_PHRASE[r], ROLE_PHRASE_ZH[r]);
const ROLE_SHORT = {peer:'Companion', output:'Output', wealth:'Wealth', officer:'Officer', resource:'Resource'};
const ROLE_SHORT_ZH = {peer:'比劫', output:'食伤', wealth:'财星', officer:'官杀', resource:'印星'};
const RS = r => L(ROLE_SHORT[r], ROLE_SHORT_ZH[r]);
const SEASON = b => { const i = BRANCHES.indexOf(b); return P2(SEASON2[i]); };
const BR_EL_QUALITY = [['growth and new initiatives','成长与新的开始'],['drive, visibility and warmth','冲劲、曝光与热情'],['stability and grounding','稳定与踏实'],['decisiveness and precision','果断与精准'],['intuition, strategic patience and keeping plans close to your chest','直觉、策略性的耐心，以及把计划藏在心里']];
const CLASH_AREA = {Year:'your social circle, family background or outside environment', Month:'career direction, workplace or relationship with parents', Day:'relationships, home base or how you work — relocation, restructuring or a change of role', Hour:'children, long-term plans or private projects'};
const CLASH_AREA_ZH = {Year:'社交圈、家庭背景或外在环境', Month:'事业方向、职场或与父母的关系', Day:'感情、家庭或工作方式——搬迁、重组或换岗', Hour:'子女、长远计划或私人项目'};
const CA = a => L(CLASH_AREA[a] || a, CLASH_AREA_ZH[a] || a);
const CA_SHORT = a => L((CLASH_AREA[a] || a).split(',')[0].replace(/^your /, ''), (CLASH_AREA_ZH[a] || a).split('、')[0]);
const PILLAR_ZH = {Year:'年柱', Month:'月柱', Day:'日柱', Hour:'时柱'};
const PN = a => L(`${a} pillar`, PILLAR_ZH[a] || a);
const gzName = gz => L(`${EL_EN[stemEl(gz[0])]} ${ZODIAC[BRANCHES.indexOf(gz[1])]}`, `${EL[stemEl(gz[0])]}${ZODIAC_ZH[BRANCHES.indexOf(gz[1])]}`);
const roleOf = (dm, el) => { const d = (el - stemEl(dm) + 5) % 5; return ['peer','output','wealth','officer','resource'][d]; };
const RATING_ZH = {Favourable:'顺', Mixed:'起伏', Challenging:'较辛苦'};

// Chinese Na Yin details (traits / likes / fears / origin)
const NY_ZH_FULL = {
  海中金:{t:'深沉内敛、自成一格；真本事要等时机才显露，多大器晚成；重安全感，不爱张扬。',l:'喜冲或空亡把它“捞”出水面、展现价值；本身已成形，不必火炼。',f:'怕被厚土埋得更深，长期不见天日。',o:'子为水旺之地，丑为湿土；金死于子、墓于丑，所以是沉在水中的金——有价值却还未被看见。'},
  炉中火:{t:'勤奋、能把原料化为有用之物、目标明确；对自己人温暖，压力下很拼。',l:'喜木作燃料（大林木、平地木）；喜有金可炼。',f:'怕大海水、天河水浇熄炉火。',o:'寅为火之长生，寅卯木旺可作燃料，火被收束在炉中，有目的地燃烧。'},
  大林木:{t:'胸怀宽广、慷慨、爱庇护他人；格局大，一旦扎根就不轻易移动。',l:'喜水滋养、土扎根、有成长空间。',f:'怕剑锋金之类的利斧；怕山火。',o:'辰为原野，巳为六阳齐备，枝叶最为茂盛，故称大林。'},
  路旁土:{t:'务实可靠、乐于服务众人、谦逊；稳定而不张扬。',l:'喜天河水滋润成良田；喜木来耕作。',f:'怕火太多，晒成尘土。',o:'午火生土，未中土尚未成形，土质肥沃但需要雨水。'},
  剑锋金:{t:'锋利果断、勇敢、讲原则、守护正义；有时太尖锐、不肯妥协。',l:'喜水淬炼；也需适度的火来锻造。',f:'怕烈火熔剑；怕宝剑藏鞘无用武之地。',o:'申酉为金之临官、帝旺，加上壬癸水淬炼，锋芒最利。'},
  山头火:{t:'光明、有野心、显眼、格局大；能远远激励别人，但烧得快、易分散。',l:'喜木助燃；喜风与空间。',f:'怕大水；怕后继无力而燃尽。',o:'戌亥为天门，日落时火在高山之上，远处可见。'},
  涧下水:{t:'头脑清晰、聪明、纯净、默默坚持；遇阻能绕道而行。',l:'喜金为源头；喜山势为它指路。',f:'怕厚土阻塞或弄浊。',o:'子为水之帝旺，丑土为岸，水窄而清、流得急。'},
  城头土:{t:'有保护力、忠诚、有条理、可靠，是守护者；较保守，不轻易让人靠近。',l:'喜火与土加固；喜有守护的使命。',f:'怕强木破墙；怕洪水冲垮。',o:'寅为艮山，卯把土聚成城墙，守护城池。'},
  白蜡金:{t:'细腻温和、灵活、有艺术感；潜力大，需要经验磨练成形。',l:'喜火来炼（炉中火）；喜好导师。',f:'怕水太多，难以成形。',o:'金养于辰、长生于巳，尚在形成，还不坚硬。'},
  杨柳木:{t:'温柔优雅、适应力强、有艺术气质、敏感；能弯不能折。',l:'喜水与温和的土（河岸）。',f:'怕金砍伐；怕恶劣环境。',o:'木死于午、墓于未，木质柔软易弯。'},
  泉中水:{t:'资源丰富、纯净、点子多、可靠的供应者；低调而充沛。',l:'喜金为源；喜渠道畅通。',f:'怕土封住泉眼。',o:'申酉金旺而生水于源头，所以源源不绝。'},
  屋上土:{t:'有保护力、负责任、顾家；为人遮风挡雨、立下标准。',l:'喜木（梁柱）与火（窑烧）。',f:'怕失去支撑；怕强烈震荡。',o:'丙丁火把戌亥之土烧成瓦片，高居屋顶。'},
  霹雳火:{t:'灵光乍现、有魅力、决断快；能量与脾气都来得突然。',l:'喜水（民间说法：霹雳火遇水反吉）；喜风雷。',f:'怕被困住；怕长期缺乏刺激。',o:'火出现在子丑水旺之月，像暴风雨中的闪光。'},
  松柏木:{t:'坚韧正直、经得起考验、有原则；象征长寿与气节。',l:'喜土与水；喜霜雪般的挑战来证明自己。',f:'怕火。',o:'木在寅卯得旺，又受庚辛金压，如雪中常青的松柏。'},
  长流水:{t:'有恒心、眼光长远、能适应、有耐心。',l:'喜金生水；喜河道清楚。',f:'怕土筑坝阻挡。',o:'辰为水库，巳为金之长生来生水，河流永不干涸。'},
  沙中金:{t:'价值待发掘；勤奋细心，越磨越亮。',l:'喜水淘洗；喜火提炼（民间说法：沙中金需火）。',f:'怕厚土掩埋。',o:'金沐浴于午、衰于未，金粒散在沙中，需要淘洗。'},
  山下火:{t:'温暖体贴、内敛；是身边人的一盏小灯。',l:'喜木续火；遇水亦可（民间说法：山下火遇水反吉）。',f:'怕被土闷熄。',o:'火在申酉病死之地（日落），光低而暖。'},
  平地木:{t:'谦和稳健、人缘好、靠人脉广泛成长、务实。',l:'喜土与水；喜适度阳光。',f:'怕金砍伐；怕严霜。',o:'戌为平原，木长生于亥，新芽遍布平地。'},
  壁上土:{t:'默默支撑、把事物凝聚在一起；喜欢在体制内发挥，可靠。',l:'喜木作框架（平地木、大林木）。',f:'怕大水冲刷。',o:'子丑之水与土和成泥，需要框架才能附着。'},
  金箔金:{t:'优雅、重形象、有艺术感；能为事物增添光彩与价值，但较脆弱。',l:'喜木作依附；喜精致的环境。',f:'怕火。',o:'金在寅卯木旺之地无力，只剩薄薄一层。'},
  覆灯火:{t:'照亮他人、好学、为人指路；稳定而不张扬。',l:'喜木（灯油与灯芯）；喜夜晚——别人暗时它才亮。',f:'怕风与水。',o:'辰巳为近午之时，小小灯火照亮阳光照不到的地方。'},
  天河水:{t:'慷慨、理想高远、惠及众人；胸襟开阔。',l:'滋润土与木；民间说法：不怕土克。',f:'少有所惧；有时离日常琐事较远。',o:'水出现在最热的午未之月，像天上降下的雨，清凉万物。'},
  大驿土:{t:'宽厚、善连结、包容；爱旅行与人脉，是促成者。',l:'喜动、出行（驿马）；喜木赋予目标。',f:'怕停滞。',o:'戊己之土在申酉，成为宽平的大道，利于交通与商贸。'},
  钗钏金:{t:'精致美丽、细心、重舒适与形象；被珍惜、放在身边。',l:'喜水打磨；喜被欣赏。',f:'怕火熔化。',o:'金墓于戌、病于亥，被打造成小巧精美的饰物。'},
  桑柘木:{t:'务实、有生产力、有用、勤劳；能为他人创造价值。',l:'喜水与土。',f:'怕金斧。',o:'子丑之水滋养实用的木，用来养蚕织丝。'},
  大溪水:{t:'精力充沛、爱冒险、口才好；四处闯荡，阅历丰富。',l:'喜金为源；喜山势引导。',f:'怕土阻挡。',o:'水流经寅卯东方木旺之地，奔腾曲折。'},
  沙中土:{t:'适应力强、多才多艺、不执着、随和；在很多场合都能融入。',l:'喜水来凝聚；喜木（民间说法）。',f:'怕风吹散。',o:'土墓于辰、长生于巳，配丙丁火，成为松软的沙土。'},
  天上火:{t:'光芒四射、慷慨、面向公众、有领导力；有时过于强势。',l:'喜木；也喜水（民间说法：日照雨成彩虹）。',f:'少有所惧；主要怕过度。',o:'火在午帝旺、未仍旺，高挂天空。'},
  石榴木:{t:'坚持不懈、大器晚成、多才、重家庭；外硬内甜。',l:'喜金秋季节（压力下反而茁壮）；喜水。',f:'怕火。',o:'木在申酉金旺之地本应绝，石榴却在秋天结果——逆境中的坚韧。'},
  大海水:{t:'浩瀚包容、深沉、有大志；情绪难以捉摸。',l:'喜金；民间说法：不怕土克。',f:'少有所惧；可能让人难以招架。',o:'戌亥为百川归海之处。'},
};
const nyT = n => L(NY[n].traits, NY_ZH_FULL[n].t), nyL = n => L(NY[n].likes, NY_ZH_FULL[n].l), nyF = n => L(NY[n].fears, NY_ZH_FULL[n].f), nyO = n => L(NY[n].origin, NY_ZH_FULL[n].o), nyI = n => L(NY[n].img, NY_ZH[n]);
const nyName = n => L(NY[n] ? NY[n].en : n, n);

function hourLabel(b) {
  if (!b.hourKnown) return L('Birth time unknown 时辰不详', '出生时间不详');
  const l = b.times.local, z = b.pillars[3].zhi;
  const range = z === '子' ? (l[3] === 23 ? '23:00–23:59' : '00:00–00:59') : `${pad((BRANCHES.indexOf(z) * 2 - 1 + 24) % 24)}:00–${pad((BRANCHES.indexOf(z) * 2 + 1) % 24)}:00`;
  if (z === '子') return l[3] === 23 ? L(`Late Zi Hour 晚子时 (${range})`, `晚子时（${range}）`) : L(`Early Zi Hour 早子时 (${range})`, `早子时（${range}）`);
  return L(`${z} hour ${z}时 (${range})`, `${z}时（${range}）`);
}

function readingData() {
  const {bazi: b, inp, qYear} = STATE;
  const dm = b.dm, dmE = b.dmEl;
  const P = b.pillars;
  const out = {sections: []};
  const clock = `${inp.wall[0]}-${pad(inp.wall[1])}-${pad(inp.wall[2])} ${pad(inp.wall[3])}:${pad(inp.wall[4])}`;
  out.head = L(`Born ${clock} (${inp.gender ? 'Male' : 'Female'})${inp.useTST ? `, true solar time ${fmt(b.times.tst)}` : ''} — this places you in the <b>${hourLabel(b)}</b>, locking in your complete BaZi chart and 10-year Luck Pillars.`,
    `出生于 ${clock}（${inp.gender ? '男' : '女'}）${inp.useTST ? `，真太阳时 ${fmt(b.times.tst)}` : ''}——属于<b>${hourLabel(b)}</b>，由此确定你完整的八字与十年大运。`);
  if (!b.hourKnown) out.head = L(`Born ${clock.slice(0, 10)} (${inp.gender ? 'Male' : 'Female'}) — birth time unknown, so this reading uses the Year, Month and Day pillars only. The Hour pillar (children, later life) is left out rather than guessed.`,
    `出生于 ${clock.slice(0, 10)}（${inp.gender ? '男' : '女'}）——出生时间不详，本解读仅依据年柱、月柱、日柱，不猜测时柱（子女与晚年）。`);
  const clockHour = inp.wall[3], solarHour = b.times.local[3];
  const zNote = [];
  if (inp.useTST && (clockHour === 0 || clockHour === 23 || solarHour === 23 || solarHour === 0) && (clockHour !== solarHour))
    zNote.push(L(`By the clock this is ${clockHour === 0 ? 'the Early Zi hour (after midnight)' : 'the Late Zi hour'}, but by true solar time it is ${solarHour === 23 ? 'the Late Zi hour of the previous day' : 'the Early Zi hour'}.`,
      `按钟表时间是${clockHour === 0 ? '早子时（午夜后）' : '晚子时'}，但按真太阳时则是${solarHour === 23 ? '前一天的晚子时' : '早子时'}。`));
  if (P[3] && P[3].zhi === '子') zNote.push(L(`Zi-hour rule in use: ${b.sect === 1 ? 'the day changes at 23:00, so a Late Zi birth takes the next day\'s pillar' : 'the day changes at midnight (夜子时 school): a Late Zi birth keeps the current day pillar but takes the next day\'s hour stem'}. Switch the "Zi hour rule" above to see the alternative chart.`,
    `目前采用的子时规则：${b.sect === 1 ? '23:00 换日，所以晚子时出生取次日的日柱' : '午夜换日（夜子时派）：晚子时出生保留当天日柱，但时干取次日'}。可在上方切换“子时规则”查看另一种排法。`));
  out.zNote = zNote;

  // 1. Chart
  const pl = P.map(p => `<li><b>${L(`${p.zh.replace('柱', '')} ${p.en} Pillar (${p.zh})`, p.zh)}${L(':', '：')}</b> ${p.gz}${L(` (${gzName(p.gz)} — ${nyName(p.nayin)} / ${p.nayin})`, `（${gzName(p.gz)}——${p.nayin}）`)}</li>`).join('');
  const els = b.scores.map((s, e) => ({e, s: e === dmE ? s - 1 : s})).sort((a, c) => c.s - a.s);
  const carriers = e => {
    const c = [];
    P.forEach((p, i) => {
      if (i !== 2 && stemEl(p.gan) === e) c.push(L(`${p.gan}${EL[e]} (${p.en} stem)`, `${PILLAR_ZH[p.en].replace('柱', '')}干${p.gan}${EL[e]}`));
      if (stemEl(mainHidden(p.zhi)) === e || brEl(p.zhi) === e) c.push(L(`${p.zhi}${EL[e]} (${p.en} branch)`, `${PILLAR_ZH[p.en].replace('柱', '')}支${p.zhi}${EL[e]}`));
    });
    return c;
  };
  const top = els.filter(x => x.s > 0.5).slice(0, 2);
  const [dmImg, dmDesc] = DMT(dm).split(' — ');
  let overview = L(`You are a <b>${STEM_PY[STEMS.indexOf(dm)]} ${EL_EN[dmE]} (${dm}${EL[dmE]}) Day Master</b> born in ${SEASON(P[1].zhi)} (${P[1].zhi}月) — ${DM_TEXT[dm]} `,
    `你是<b>${dm}${EL[dmE]}日主</b>，生于${SEASON(P[1].zhi)}（${P[1].zhi}月）——${dmImg}：${dmDesc} `);
  overview += top.map((x, k) => {
    const r = roleOf(dm, x.e), cs = carriers(x.e);
    return L(`${k === 0 ? 'Your chart features strong' : 'it is supported by'} <b>${EL_EN[x.e]}</b>${cs.length ? ' (' + cs.slice(0, 3).join(', ') + ')' : ''} — your ${RS(r)} element, representing ${RP(r)}`,
      `${k === 0 ? '命局中' : '同时有'}<b>${EL[x.e]}</b>${k === 0 ? '很旺' : '相助'}${cs.length ? '（' + cs.slice(0, 3).join('、') + '）' : ''}——是你的${RS(r)}，代表${RP(r)}`);
  }).join(L('; ', '；')) + L('. ', '。');
  const sl = b.label.replace(/\s*[一-鿿]+$/, '');
  overview += L(`Overall the Day Master is <b>${sl.toLowerCase()}</b> (${(b.ratio * 100).toFixed(0)}% support), so ${b.favourable.map(e => EL_EN[e]).join(' and ')} are your helpful elements.`,
    `整体来说日主<b>${(b.label.match(/[一-鿿]+$/) || [''])[0]}</b>（支持度 ${(b.ratio * 100).toFixed(0)}%），所以${b.favourable.map(e => EL[e]).join('、')}是对你有帮助的五行。`);
  if (b.climate) overview += ' ' + L(b.climate.text, b.climate.need === 1 ? '生于冬季，命局偏寒，需要火来调候。' : '生于夏季，命局燥热，需要水来调候。');
  out.sections.push({title: L('1. Complete BaZi Chart (八字四柱)', '一、完整八字四柱'), html: `<ul>${pl}</ul><p><b>${L('Chart overview:', '命局概览：')}</b> ${overview}</p>`});

  // 2. Year Na Yin
  const yn = P[0].nayin;
  if (NY[yn]) {
    const brCount = {}; P.forEach(p => brCount[p.zhi] = (brCount[p.zhi] || 0) + 1);
    const rep = Object.entries(brCount).filter(([, n]) => n >= 2);
    const bullets = [];
    const tr = nyT(yn), trFirst = tr.split(/[.。；]/)[0];
    let b1 = `<b>${trFirst}${L(':', '：')}</b> ${nyI(yn)}${L(' ', '。')}`;
    if (rep.length) b1 += rep.map(([z, n]) => L(`Your chart has ${n === 2 ? 'two' : n} ${z} (${ZODIAC[BRANCHES.indexOf(z)]}) branches — ${P.filter(p => p.zhi === z).map(p => p.en).join(' and ')} pillars — which amplifies ${EL_EN[brEl(z)]}: ${P2(BR_EL_QUALITY[brEl(z)])}.`,
      `命局中有${n === 2 ? '两' : n}个${z}（${ZODIAC_ZH[BRANCHES.indexOf(z)]}）——${P.filter(p => p.zhi === z).map(p => PILLAR_ZH[p.en]).join('和')}——加强了${EL[brEl(z)]}的力量：${P2(BR_EL_QUALITY[brEl(z)])}。`)).join(' ');
    else b1 += tr.split(/[.。；]/).slice(1).join(L('.', '；')).trim();
    bullets.push(b1);
    const goodDec = b.daYun.filter(d => d.score > -0.5).sort((a, c) => c.score - a.score).slice(0, 2).sort((a, c) => a.startAge - c.startAge);
    const decades = [...new Set(goodDec.map(d => Math.floor(d.startAge / 10) * 10))];
    const rest = (tr.split(/[.。；]/).slice(1, 3).join(L('.', '；')).trim() || tr).replace(/[.。]?$/, L('.', '。'));
    bullets.push(`<b>${L('How it plays out:', '如何展现：')}</b> ${rest} ${goodDec.length ? L(`The most supportive decades in your chart (by element balance) are ${goodDec.map(d => `${d.gz} (age ${d.startAge}–${d.endAge})`).join(' and ')}, so effort invested earlier tends to pay off in your ${decades.map(x => x + 's').join(' and ')}.`,
      `按五行平衡，你最有利的大运是${goodDec.map(d => `${d.gz}（${d.startAge}–${d.endAge} 岁）`).join('和')}，所以早期的努力多在${decades.map(x => x + '多岁').join('和')}开花结果。`) : ''}`);
    bullets.push(`<b>${L('What it likes:', '喜：')}</b> ${nyL(yn)} <b>${L('What to avoid:', '忌：')}</b> ${nyF(yn)}`);
    const dn = P[2].nayin;
    if (dn !== yn && NY[dn]) {
      const rel = nayinRelation(yn, dn);
      const relZh = {good:`${dn}生扶${yn}`, warn:`${dn}克${yn}，带来压力`, mixed:'两者为同类或彼此相耗'}[rel.t];
      bullets.push(L(`<b>Your Day Na Yin ${dn} (${NY[dn].en})</b> colours your personal nature: ${NY[dn].traits.split('.')[0].toLowerCase()}. ${rel.x}.`,
        `<b>你的日柱纳音${dn}</b>为你的个人特质添色：${NY_ZH_FULL[dn].t.split('；')[0]}。${relZh}。`));
    }
    out.sections.push({title: L(`2. How "${NY[yn].en}" (${yn}) Shapes Your Life Path`, `二、“${yn}”如何塑造你的人生`), html: `<ul>${bullets.map(x => `<li>${x}</li>`).join('')}</ul>`});
  }

  // 3. Luck Pillars
  const yang = stemYang(P[0].gan);
  const fwd = (yang ? 1 : 0) === b.gender;
  const ci = Math.max(0, b.daYun.findIndex(d => qYear >= d.startYear && qYear <= d.endYear));
  const decs = b.daYun.slice(ci, ci + 3);
  const decText = d => {
    const se = stemEl(d.gz[0]), be = brEl(d.gz[1]);
    const sr = roleOf(dm, se), br = roleOf(dm, be);
    const head = d.rating === 'Favourable' ? L('A supportive cycle', '有利的十年') : d.rating === 'Challenging' ? L('A demanding cycle', '较辛苦的十年') : L('A mixed cycle', '起伏的十年');
    const zb = ZODIAC[BRANCHES.indexOf(d.gz[1])], zbz = ZODIAC_ZH[BRANCHES.indexOf(d.gz[1])];
    let t = `<b>${head}${L('.', '。')}</b> ` + L(`The ${zb} (${d.gz[1]}) brings ${EL_EN[be]} — your ${RS(br)} (${d.branchGod} ${TG_EN[d.branchGod]}): ${RP(br)}${b.favourable.includes(be) ? ', which your chart welcomes' : b.unfavourable.includes(be) ? ', which adds to what you already have plenty of' : ''}. `,
      `${d.gz[1]}${zbz}带来${EL[be]}——你的${RS(br)}（${d.branchGod}）：${RP(br)}${b.favourable.includes(be) ? '，正是命局所需' : b.unfavourable.includes(be) ? '，但命局中已经够多了' : ''}。`);
    t += L(`The ${d.gz[0]} stem brings ${EL_EN[se]} (${d.stemGod} ${TG_EN[d.stemGod]}): ${RP(sr)}${b.favourable.includes(se) ? ' — helpful' : b.unfavourable.includes(se) ? ' — more demanding' : ''}. `,
      `天干${d.gz[0]}带来${EL[se]}（${d.stemGod}）：${RP(sr)}${b.favourable.includes(se) ? '——有帮助' : b.unfavourable.includes(se) ? '——较费力' : ''}。`);
    const cl = d.inter.filter(x => x.type === 'clash'), co = d.inter.filter(x => x.type === 'combo');
    const byArea = {};
    cl.forEach(x => { const area = x.pair.split(/ × |, /).find(a => a !== 'Luck'); (byArea[area] = byArea[area] || []).push(x.text.split(' ')[0]); });
    Object.entries(byArea).forEach(([area, cs]) => { t += L(`It clashes with your ${area} pillar (${[...new Set(cs)].join(', ')}) — signalling shifts in ${CA(area)}. `, `与你的${PN(area)}相冲（${[...new Set(cs)].join('、')}）——预示${CA(area)}方面的变动。`); });
    co.slice(0, 2).forEach(x => { const areas = x.pair.split(/ × |, /).filter(a => a !== 'Luck');
      t += L(`${x.text.split(' ')[0]} forms a bond with your ${areas.join(' & ')} pillar${areas.length > 1 ? 's' : ''} — cooperation and opportunities in ${areas.map(CA_SHORT).join(' and ')}. `,
        `${x.text.split(' ')[0]}与你的${areas.map(PN).join('、')}相合——在${areas.map(CA_SHORT).join('、')}方面带来合作与机会。`); });
    if (d.hoAct) t += d.hoWarn ? L('Hurting Officer is activated against your natal Officer — guard reputation and contracts. ', '伤官被引动且原局有正官——注意名声与合约。') : L('Hurting Officer is activated — a decade for bold expression and independent moves. ', '伤官被引动——适合大胆表达、独立行动的十年。');
    return t;
  };
  const lp = decs.map(d => `<li><b>${L(`Ages ${d.startAge}–${d.endAge} (${d.startYear}–${d.endYear}) — ${d.gz} (${gzName(d.gz)})`, `${d.startAge}–${d.endAge} 岁（${d.startYear}–${d.endYear}）——${d.gz}（${gzName(d.gz)}）`)}${L(':', '：')}</b> ${decText(d)}</li>`).join('');
  out.sections.push({title: L('3. 10-Year Luck Pillars (大运走势)', '三、十年大运走势'),
    html: `<p>${L(`As a ${yang ? 'Yang' : 'Yin'}-year (${P[0].gz}) ${b.gender ? 'Male' : 'Female'}, your Luck Pillars move <b>${fwd ? 'forward' : 'backward'}</b> from your month pillar ${P[1].gz}, starting about ${b.yunStart.y} years ${b.yunStart.m} months after birth.`,
      `你是${yang ? '阳' : '阴'}年（${P[0].gz}）${b.gender ? '男' : '女'}命，大运从月柱 ${P[1].gz} <b>${fwd ? '顺排' : '逆排'}</b>，约出生后 ${b.yunStart.y} 年 ${b.yunStart.m} 个月起运。`)}</p><ul>${lp}</ul>`});

  // 4. Outlook
  const yearText = y => {
    const d = b.daYun.find(x => y >= x.startYear && y <= x.endYear);
    if (!d) return '';
    const ln = d.liuNian.find(x => x.year === y);
    const se = stemEl(ln.gz[0]), be = brEl(ln.gz[1]);
    const sr = roleOf(dm, se), br = roleOf(dm, be);
    const fav = [se, be].filter(e => b.favourable.includes(e)).length, unf = [se, be].filter(e => b.unfavourable.includes(e)).length;
    const kind = fav === 2 ? L('A strong year', '强运之年') : fav === 1 && !unf ? L('A positive year', '顺利之年') : unf === 2 ? L('A testing year', '考验之年') : L('A mixed year', '起伏之年');
    let t = L(`${kind} that ${se === be ? `doubles up ${EL_EN[se]}` : `brings ${EL_EN[se]} and ${EL_EN[be]}`} — ${RP(sr)}${sr !== br ? '; ' + RP(br) : ''}. `,
      `${kind}，${se === be ? `双重${EL[se]}` : `带来${EL[se]}与${EL[be]}`}——${RP(sr)}${sr !== br ? '；' + RP(br) : ''}。`);
    if (ln.stemGod === '伤官' || ln.branchGod === '伤官') t += L('Hurting Officer year: favours speaking up, creative launches and visibility; be careful with criticism of authority. ', '伤官之年：利于发声、创意发布与曝光；批评权威时要小心。');
    if (ln.suiYun) t += L('岁运并临 — the year repeats your decade pillar, intensifying its themes. ', '岁运并临——流年与大运相同，主题加倍。');
    if (ln.clashes.length) {
      const parts = ln.clashes.map(c => { const m = c.match(/\(([^()]*×[^()]*)\)$/); const area = m ? m[1].split(' × ')[0] : ''; return {k: c.split(' ')[0], area}; });
      const grouped = {}; parts.forEach(p => (grouped[p.k] = grouped[p.k] || []).push(p.area));
      t += L(`Watch for friction or sudden changes: ${Object.entries(grouped).map(([k, as]) => `the ${k} clash with your ${as.join(' and ')} pillar${as.length > 1 ? 's' : ''} (${as.map(CA_SHORT).join('; ')})`).join('; ')}. `,
        `留意摩擦或突发变化：${Object.entries(grouped).map(([k, as]) => `${k}冲你的${as.map(PN).join('和')}（${as.map(CA_SHORT).join('；')}）`).join('；')}。`);
    }
    if (d.startYear === y && b.daYun.indexOf(d) > 0) t += L(`It marks your transition into the <b>${d.gz} (${gzName(d.gz)})</b> Luck Pillar — a good year to plant seeds for the next decade: a new venture, a role change, or a financial reset. `,
      `这一年你将交入<b>${d.gz}（${gzName(d.gz)}）</b>大运——适合为下一个十年播种：新事业、换岗位或重新规划财务。`);
    else if (d.endYear === y) t += L(`It is the final year of your ${d.gz} cycle — a time to wrap up and push projects over the finish line. `, `这是 ${d.gz} 大运的最后一年——适合收尾，把手上的项目完成。`);
    return `<li><b>${L(`${y} (${ln.gz} — ${gzName(ln.gz)})`, `${y} 年（${ln.gz}，${gzName(ln.gz)}）`)}${L(':', '：')}</b> ${t}</li>`;
  };
  out.sections.push({title: L(`4. Outlook for ${qYear}–${qYear + 1}`, `四、${qYear}–${qYear + 1} 年展望`), html: `<ul>${yearText(qYear)}${yearText(qYear + 1)}</ul>`});
  return out;
}

function renderReading() {
  if (!STATE) return;
  const r = readingData();
  const copyLbl = L('Copy as text', '复制文字');
  let h = `<div class="reading"><div class="scard v-good"><div class="sbody"><p>${r.head}</p>${r.zNote.length ? `<p class="note">${r.zNote.join(' ')}</p>` : ''}</div></div>
    ${[...r.sections, ...zwReadingData(), ...qmReadingData()].map((s, i) => `<div class="scard v-info rcard"><div class="shead"><span class="sicon">${['🀄','🎐','📅','🗓','🌌','🏛','⏳','🧭','⏱'][i] || '•'}</span><div class="stitle">${s.title}</div></div><div class="sbody">${s.html}</div></div>`).join('')}
    <div class="rbtns"><button class="ghost" id="rcopy">${copyLbl}</button><span id="rcopied" class="small muted"></span></div></div>
    <p class="muted small">${L("This narrative is generated from the same calculations as the other tabs (Day Master strength, favourable elements, Na Yin, Luck Pillars and annual interactions) using rule-based templates. A human practitioner would weigh nuances these templates can't capture.",
      '这段解读与其他页面使用相同的计算（日主强弱、喜用神、纳音、大运与流年合冲），以规则模板生成。资深命理师会考虑模板无法涵盖的细节。')}</p>`;
  $('#tab-reading').innerHTML = h;
  $('#rcopy').onclick = async () => {
    const txt = $('#tab-reading .reading').innerText.replace(copyLbl, '').trim();
    const ok = L('Copied.', '已复制。');
    try { await navigator.clipboard.writeText(txt); $('#rcopied').textContent = ok; }
    catch (e) { const ta = document.createElement('textarea'); ta.value = txt; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); $('#rcopied').textContent = ok; } catch (e2) { $('#rcopied').textContent = L('Copy not allowed here — select the text manually.', '此处无法复制——请手动选取文字。'); } ta.remove(); }
  };
}

// ===== Zi Wei reading =====
const ZW_MINOR_PLAIN = {左辅:'steady support from colleagues and helpers',右弼:'flexible help from others',文昌:'study, writing and credentials',文曲:'eloquence, arts and networking',天魁:'senior benefactors (by day)',天钺:'benefactors and timely help (often female)',
  禄存:'steady income and savings',天马:'movement, travel and change',擎羊:'direct conflict and sharp competition',陀罗:'delays and dragging problems',火星:'sudden flare-ups and impatience',铃星:'hidden stress and lingering worry',地空:'unconventional ideas, but plans can come to nothing',地劫:'unexpected losses or sudden setbacks'};
const BRIGHT_PLAIN = b => ['庙','旺'].includes(b) ? L('at full strength, showing its best side', '力量十足，发挥最好的一面') : ['得','利'].includes(b) ? L('in decent form', '状态不错') : b === '平' ? L('in neutral form', '表现平平') : ['陷','不'].includes(b) ? L('weakened, so its harder side tends to show', '力量较弱，较易显出缺点') : '';
const zwStarKw = n => L(`${(ZW_STAR_KW[n] || '').split('—')[0].trim()}: ${((ZW_STAR_KW[n] || '').split('—')[1] || '').trim()}`, ZW_STAR_ZH[n] || '');
const palEn = p => L(`${p.name} (${p.en})`, p.name);
function zwPalaceText(zw, p) {
  const ev = zw.evalPalace(p);
  let t = ev.stars.length ? ev.stars.map(s => `<b>${s.name}</b>${L(' (', '（')}${zwStarKw(s.name)}${BRIGHT_PLAIN(s.b) ? L('; ', '；') + BRIGHT_PLAIN(s.b) : ''}${L(')', '）')}`).join(L(' with ', '，搭配 ')) : L('no main star', '没有主星');
  if (ev.borrowed) t += L(` — borrowed from the opposite ${zw.opposite(p).name} palace, so this area is shaped by outside circumstances`, `——借对宫${zw.opposite(p).name}的星曜，这方面较受外在环境影响`);
  t += L('. ', '。');
  [...p.major, ...p.minor].filter(s => s.m).forEach(s => t += `${s.name}化${s.m}${L(': ', '：')}${mutPlain(s.m)}${L('. ', '。')}`);
  const good = p.minor.filter(s => ZW_GOOD.includes(s.name) || s.name === '天马'), bad = p.minor.filter(s => ZW_BAD.includes(s.name));
  if (good.length) t += L('Helpers: ', '助力：') + good.map(s => `${s.name}${L(' (', '（')}${minorPlain(s.name)}${L(')', '）')}`).join(L(', ', '、')) + L('. ', '。');
  if (bad.length) t += L('Watch: ', '留意：') + bad.map(s => `${s.name}${L(' (', '（')}${minorPlain(s.name)}${L(')', '）')}`).join(L(', ', '、')) + L('. ', '。');
  return {t, tone: ev.tone};
}
function zwReadingData() {
  const {zw} = STATE;
  if (zw.unknown) return [];
  const P = n => zw.byName(n);
  const life = P('命宫');
  const sec = [];
  const bodyP = zw.palaces.find(p => p.isBody);
  const bi = BRANCHES.indexOf(life.branch);
  const sanfang = [4, 8, 6].map(k => zw.palaces.find(p => p.branch === BRANCHES[(bi + k) % 12]));
  let h = `<p>${L(`Lunar birth date ${esc(zw.lunarDate)}, ${esc(zw.time)}. Your Life palace sits in <b>${life.stem}${life.branch}</b>, with the <b>${esc(zw.fiveClass)}</b> Five Element Bureau, so your first 10-year period starts at nominal age ${life.decadal[0]}. `,
    `农历生日 ${esc(zw.lunarDate)}，${esc(zw.time)}。命宫在<b>${life.stem}${life.branch}</b>，为<b>${esc(zw.fiveClass)}</b>，第一个大限从虚岁 ${life.decadal[0]} 岁开始。`)}`;
  { const so = ZW_SOUL[zw.soul], bo = ZW_BODY[zw.body];
    if (so && bo) h += L(` Your Life Star (命主) is <b>${zw.soul}</b> — ${so.en.split(': ')[1].split('. ')[0]}. Your Body Star (身主) is <b>${zw.body}</b> — ${bo.en.split(': ')[1].split('. ')[0]}. `,
      ` 命主为<b>${zw.soul}</b>——${so.zh.split('：')[1].split('。')[0]}。身主为<b>${zw.body}</b>——${bo.zh.split('：')[1].split('。')[0]}。`); }
  h += bodyP.name === '命宫' ? L('Your Body palace (身宫) coincides with your Life palace (命身同宫): what you see is what you get — your core personality stays the central theme throughout life.', '身宫与命宫同宫（命身同宫）：表里如一——你的核心性格终身都是人生主轴。')
    : L(`Your Body palace (身宫, the area that grows in importance after about 35) falls in <b>${bodyP.name} (${bodyP.en})</b>: ${palPlain(bodyP.name).toLowerCase()} becomes a central theme of your later life.`, `身宫（约 35 岁后愈显重要的领域）落在<b>${bodyP.name}</b>：${palPlain(bodyP.name)}会成为你后半生的重心。`);
  h += '</p>';
  const lt = zwPalaceText(zw, life);
  const sfTone = sanfang.filter(p => zw.evalPalace(p).tone === 'good').length >= 2 ? L('Most of these are well supported, which strengthens your core chart.', '这几宫大多得到支持，能加强你的命宫。')
    : sanfang.filter(p => zw.evalPalace(p).tone === 'warn').length >= 2 ? L('Several carry obstacles, so you build success by working through friction.', '其中几宫有阻碍，你的成功多来自克服摩擦。') : L('They are mixed: strengths in some areas, effort needed in others.', '有好有坏：某些方面是强项，某些方面需要努力。');
  h += `<ul><li><b>${L('Core personality (命宫):', '核心性格（命宫）：')}</b> ${lt.t}</li>`;
  h += `<li><b>${L('Supporting palaces 三方四正:', '三方四正：')}</b> ${L('your Life palace is read together with ', '命宫要与以下宫位一起看：')}${sanfang.map(p => `${palEn(p)}${L(': ', '：')}${zw.evalPalace(p).stars.map(s => s.name).join('+') || '—'}`).join(L(', ', '；'))}${L('. ', '。')}${sfTone}</li></ul>`;
  sec.push({title: L('5. Zi Wei Dou Shu Reading (紫微斗数)', '五、紫微斗数解读'), html: h});
  const areas = [['官禄', ['Career', '事业']], ['财帛', ['Wealth', '财富']], ['夫妻', ['Relationships', '感情']], ['田宅', ['Home & property', '家宅房产']], ['疾厄', ['Health tendencies', '健康倾向']], ['福德', ['Inner life & happiness', '内心与福气']]];
  let a = '<ul>' + areas.map(([n, en]) => { const r = zwPalaceText(zw, P(n)); return `<li><b>${L(`${en[0]} (${n})`, `${en[1]}（${n}）`)}${L(':', '：')}</b> ${tone(r.tone)} ${r.t}</li>`; }).join('') + '</ul>';
  const mut = Object.entries(zw.mutLoc).map(([k, v]) => `<li><em class="m-${k}">${k}</em> <b>${L(`${v.star}化${k} in ${v.palace.name} (${v.palace.en})`, `${v.star}化${k}在${v.palace.name}`)}</b>${L(': ', '：')}${(mutPlain(k).split(/——|—/)[1] || '').trim()}${L(' — in ', '——在')}${palPlain(v.palace.name)}${L('.', '。')}</li>`).join('');
  a += `<p><b>${L('Birth-year Four Transformations (生年四化)', '生年四化')}</b>${L(' — the four themes you were born with:', '——你与生俱来的四个主题：')}</p><ul>${mut}</ul>`;
  sec.push({title: L('5a. Life Areas in Zi Wei', '五之一、紫微各人生领域'), html: a});
  const cur = zw.current;
  if (cur) {
    const dp = cur.decadal, dt = zwPalaceText(zw, dp);
    let c = `<ul><li><b>${L(`Current 10-year period (大限, nominal ages ${dp.decadal[0]}–${dp.decadal[1]}):`, `目前大限（虚岁 ${dp.decadal[0]}–${dp.decadal[1]}）：`)}</b> ${L(`runs through your natal <b>${palEn(dp)}</b> palace — ${palPlain(dp.name).toLowerCase()} is the stage for this decade.`, `走在本命<b>${dp.name}</b>——${palPlain(dp.name)}是这十年的舞台。`)} ${dt.t}</li>`;
    c += `<li><b>${L('Decade transformations:', '大限四化：')}</b> ${cur.decadalMut.map((s, k) => { const pl = zw.palaces.find(p => [...p.major, ...p.minor].some(x => x.name === s)); return `${s}化${'禄权科忌'[k]} → ${pl ? pl.name : '—'}`; }).join(' · ')}${L('. ', '。')}${cur.decadalLu ? L(`Opportunity flows into <b>${cur.decadalLu.en}</b>`, `机会流向<b>${cur.decadalLu.name}</b>`) : ''}${cur.decadalJi ? L(`; pressure or lessons gather in <b>${cur.decadalJi.en}</b>`, `；压力或功课集中在<b>${cur.decadalJi.name}</b>`) : ''}${L('.', '。')}</li>`;
    c += `<li><b>${L('This year (流年):', '今年（流年）：')}</b> ${L(`the year's focus palace is your <b>${palEn(cur.yearly)}</b>; year transformations: `, `今年的重点宫位是<b>${cur.yearly.name}</b>；流年四化：`)}${cur.yearlyMut.map((s, k) => s + '化' + '禄权科忌'[k]).join(' · ')}${L('.', '。')}</li></ul>`;
    sec.push({title: L('5b. Zi Wei Timing — Now', '五之二、紫微时运——现在'), html: c});
  }
  return sec;
}

// ===== Qi Men reading =====
const DUN_PLAIN = {true:['Yang Dun 阳遁 (energy rising, between the winter solstice and early summer): your default mode is proactive — initiating, expanding, moving first.','阳遁（冬至到芒种，能量上升）：你的默认模式是主动——开创、扩张、先出手。'],
  false:['Yin Dun 阴遁 (energy receding, between the summer solstice and early winter): your default mode is strategic and receptive — observing, consolidating, choosing the moment.','阴遁（夏至到大雪，能量收敛）：你的默认模式是谋定而后动——观察、巩固、选择时机。']};
const palZh = p => `${QM_PALACE[p].split(' ')[0]}宫（${DIR_ZH[p] || '中宫'}）`;
function qmCellText(c) {
  if (!c) return '—';
  return L(`${QM_PALACE[c.p]} — ${c.door || 'no door'} (${((QM_DOOR_EN[c.door] || '').split('—')[1] || '').trim()}), star ${c.star} (${QM_STAR_PLAIN[c.star.slice(0, 2)] || ''}), deity ${c.god || '—'} (${QM_GOD_PLAIN[c.god] || ''})${c.kong ? '; <b>void</b> — delays or things not as solid as they look' : ''}${c.ma ? '; horse — movement and speed' : ''}`,
    `${palZh(c.p)}——${c.door || '无门'}（${QM_DOOR_ZH[c.door] || ''}），${c.star}（${QM_STAR_ZH[c.star.slice(0, 2)] || ''}），${c.god || '—'}（${QM_GOD_ZH[c.god] || ''}）${c.kong ? '；<b>空亡</b>——易延误、不如表面稳固' : ''}${c.ma ? '；驿马——动、快' : ''}`);
}
function qmBlockEnd(q) {
  const t = q.times; const h = t.local[3], m = t.local[4];
  const nextOdd = h % 2 === 1 ? h + 2 : h + 1;
  const remain = (nextOdd - h) * 60 - m;
  const end = new Date(t.utc + (STATE.inp.qtz * 60 + remain) * 60e3);
  return {remain, end: `${pad(end.getUTCHours())}:${pad(end.getUTCMinutes())}`};
}
function qmReadingData() {
  const {qmBirth: qb, qmNow: qn, bazi: b} = STATE;
  if (qb.unknown) return [];
  const sec = [];
  const self = qb.stemPalace(b.dm), hourS = qb.stemPalace(b.pillars[3].gan), yearS = qb.stemPalace(b.pillars[0].gan);
  const dun = (q) => L(`${q.yang ? 'Yang' : 'Yin'} Dun ${q.ju}局`, `${q.yang ? '阳' : '阴'}遁${q.ju}局`);
  let h = `<p>${L(`Your birth-hour chart is <b>${dun(qb)}</b> (${qb.jq} ${qb.yuan}). `, `你的出生时盘为<b>${dun(qb)}</b>（${qb.jq}${qb.yuan}）。`)}${P2(DUN_PLAIN[qb.yang])}</p><ul>`;
  const selfMsg = self ? (self.tone === 'good' ? L('You were born in a well-supported position — your instincts tend to lead you to the right place.', '你生在有支持的位置——直觉常把你带到对的地方。')
    : self.tone === 'warn' ? L('Your starting position carries friction — you grow by turning challenges into leverage.', '你的起点带有阻力——你在把挑战化为助力中成长。') : L('Your position is mixed — your results depend on choosing the right timing.', '你的位置好坏参半——成果取决于选对时机。')) : '';
  h += `<li><b>${L(`You (day stem ${b.dm}):`, `你（日干 ${b.dm}）：`)}</b> ${qmCellText(self)}${L('. ', '。')}${selfMsg}</li>`;
  h += `<li><b>${L(`Your goals & later life (hour stem ${b.pillars[3].gan}):`, `目标与晚年（时干 ${b.pillars[3].gan}）：`)}</b> ${qmCellText(hourS)}${L('.', '。')}</li>`;
  h += `<li><b>${L(`Family background (year stem ${b.pillars[0].gan}):`, `家庭背景（年干 ${b.pillars[0].gan}）：`)}</b> ${qmCellText(yearS)}${L('.', '。')}</li>`;
  const kd = qb.doorPalace('开门'), sd = qb.doorPalace('生门'), lh = qb.godPalace('六合');
  h += `<li><b>${L('Career (开门 Open Door):', '事业（开门）：')}</b> ${qmCellText(kd)}${L(`. Your natural career direction is <b>${dirName(kd.p)}</b>.`, `。你天生的事业方位是<b>${dirName(kd.p)}</b>。`)}</li>`;
  h += `<li><b>${L('Wealth (生门 Life Door):', '财富（生门）：')}</b> ${qmCellText(sd)}${L(`. Money tends to come from the <b>${dirName(sd.p)}</b>.`, `。财多从<b>${dirName(sd.p)}</b>而来。`)}</li>`;
  h += `<li><b>${L('Partnerships (六合):', '合作（六合）：')}</b> ${qmCellText(lh)}${L('.', '。')}</li>`;
  const good = Object.values(qb.cells).filter(c => c.p !== 5 && c.tone === 'good' && !c.kong).map(c => dirName(c.p));
  h += `<li><b>${L('Your supportive directions (birth chart):', '对你有利的方位（命局）：')}</b> ${good.join(L(', ', '、')) || L('none stand out — use the live chart for timing', '没有特别突出——用即时盘看时机')}${L('.', '。')}</li></ul>`;
  sec.push({title: L('6. Qi Men Dun Jia — Birth Chart Reading (命局)', '六、奇门遁甲——命局解读'), html: h});

  const be = qmBlockEnd(qn);
  const cells = Object.values(qn.cells).filter(c => c.p !== 5);
  const best = [...cells].sort((a, c) => c.score - a.score)[0], worst = [...cells].sort((a, c) => a.score - c.score)[0];
  const meNow = qn.stemPalace(b.dm);
  const dur = L(`${Math.floor(be.remain / 60) ? Math.floor(be.remain / 60) + 'h ' : ''}${be.remain % 60}min`, `${Math.floor(be.remain / 60) ? Math.floor(be.remain / 60) + ' 小时 ' : ''}${be.remain % 60} 分钟`);
  let n = `<p>${L(`Right now it is a <b>${qn.dayGZ} day, ${qn.hourGZ} hour</b> — <b>${dun(qn)}</b>. This chart is valid for about another <b>${dur}</b> (until ~${be.end}), then the board resets.`,
    `此刻是<b>${qn.dayGZ}日 ${qn.hourGZ}时</b>——<b>${dun(qn)}</b>。这盘约还有效 <b>${dur}</b>（到 ${be.end} 左右），之后重新排盘。`)}</p><ul>`;
  const nowMsg = meNow ? (meNow.tone === 'good' ? L('A good window to act on your own plans.', '适合推进自己计划的时段。') : meNow.tone === 'warn' ? L('Not your strongest hour — prepare rather than commit.', '不是你最强的时辰——宜准备，不宜拍板。') : L('Workable — proceed with care.', '可以行动——但要小心。')) : '';
  n += `<li><b>${L(`Your position now (${b.dm}):`, `你此刻的位置（${b.dm}）：`)}</b> ${qmCellText(meNow)}${L('. ', '。')}${nowMsg}</li>`;
  n += `<li><b>${L('Best direction now:', '此刻最佳方向：')}</b> ${qmCellText(best)}${L('.', '。')}</li>`;
  n += `<li><b>${L('Direction to avoid now:', '此刻应避开的方向：')}</b> ${qmCellText(worst)}${L('.', '。')}</li>`;
  const uses = [['开门', ['Job interviews, meetings with management, launches', '面试、见上司、发布']], ['生门', ['Money matters, sales, property, investments', '钱财、销售、房产、投资']], ['休门', ['Rest, networking, asking favours', '休息、人脉、求助']], ['景门', ['Presentations, exams, documents, publicity', '简报、考试、文书、宣传']]];
  n += uses.map(([d, u]) => { const c = qn.doorPalace(d); return `<li><b>${P2(u)}${L(':', '：')}</b> ${L(`face or travel <b>${dirName(c.p)}</b> (${d}${c.kong ? ', void — expect delays' : ''})`, `面向或前往<b>${dirName(c.p)}</b>（${d}${c.kong ? '，空亡——易延误' : ''}）`)} ${tone(c.tone)}</li>`; }).join('');
  const he = qn.godPalace('六合');
  n += `<li><b>${L('Negotiations & partnerships:', '谈判与合作：')}</b> ${L(`六合 is in the <b>${dirName(he.p)}</b> with ${he.door || '—'}`, `六合在<b>${dirName(he.p)}</b>，配${he.door || '—'}`)} ${tone(he.tone)}</li></ul>`;
  sec.push({title: L(`6a. Qi Men — Right Now (${fmt(qn.times.local)} solar)`, `六之一、奇门——此刻（真太阳时 ${fmt(qn.times.local)}）`), html: n});
  return sec;
}
