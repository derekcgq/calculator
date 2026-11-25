// ===== Summary-style cards for every tab (EN / 中文) =====
const ZW_PALACE_PLAIN_ZH = {命宫:'你是怎样的人——性格与人生主轴',兄弟:'兄弟姐妹、亲近的同辈、现金流',夫妻:'配偶／伴侣与你的爱情方式',子女:'子女、学生、创造力、亲密关系',财帛:'你怎么赚钱、怎么理财',疾厄:'身体、健康倾向、压力点',
  迁移:'出外、旅行、外界如何看你',仆役:'朋友、团队成员、社交圈',交友:'朋友、团队成员、社交圈',官禄:'事业、工作风格、成就',田宅:'家庭、房产、家族资产',福德:'内心快乐、心态、兴趣、精神生活',父母:'父母、上司、权威人物、文书'};
const MUT_PLAIN_ZH = {禄:'化禄——机会、顺利与收获流入这个领域',权:'化权——在这个领域有冲劲、掌控力和企图心',科:'化科——在这个领域有名声、认可与贵人相助',忌:'化忌——在这个领域容易执着、操心，是需要多下功夫的功课'};
const ZW_MINOR_ZH = {左辅:'同事与助手的稳定支持',右弼:'他人灵活的帮忙',文昌:'读书、写作与资历',文曲:'口才、艺术与人脉',天魁:'年长的贵人',天钺:'贵人与及时的帮助（多为女性）',禄存:'稳定收入与储蓄',天马:'奔波、旅行与变动',
  擎羊:'正面冲突与激烈竞争',陀罗:'拖延与纠缠的问题',火星:'突然爆发与急躁',铃星:'隐藏的压力与挥之不去的担忧',地空:'想法独特，但计划容易落空',地劫:'意外损失或突发挫折'};
const QM_STAR_ZH = {天蓬:'胆大、冒险、大计划——也有暗藏风险',天芮:'问题浮现、从错误中学习、健康事项',天冲:'行动快、勇气、向前冲',天辅:'教育、文化、有益的建议',天禽:'居中稳定、公正',天心:'领导、规划、疗愈、判断准',天柱:'口舌、批评、拆解',天任:'耐心、稳重、房产、可靠',天英:'名声、曝光、热情——也急躁'};
const QM_GOD_ZH = {值符:'贵人权威——有力的靠山',螣蛇:'焦虑、虚幻、多变',太阴:'暗中帮助、秘密、幕后',六合:'合作、伙伴、婚姻、交易',白虎:'强硬、压力、受伤风险',玄武:'欺骗、暗中损失',九地:'稳定、耐心、长期守成',九天:'扩张、雄心、放大格局'};
const NY_ZH = {海中金:'藏在海底的黄金——深藏不露，大器晚成',炉中火:'铁匠的炉火——勤奋，能把原料炼成器',大林木:'茂密的森林——胸怀宽广，愿意庇护他人',路旁土:'路边的田土——务实可靠，服务众人',剑锋金:'锋利的宝剑——果断、有原则、勇于担当',
  山头火:'山顶的火光——耀眼、有野心，远处可见',涧下水:'山涧的清泉——头脑清晰，默默坚持',城头土:'城墙的土——守护、忠诚、有条理',白蜡金:'尚未成形的软金——温和细腻，需要磨练',杨柳木:'随风摇曳的杨柳——温柔、优雅、能屈能伸',
  泉中水:'源源不断的泉水——资源丰富，点子多',屋上土:'屋顶的瓦片——为家人遮风挡雨，有责任感',霹雳火:'暴风中的闪电——灵光乍现、有魅力、性子急',松柏木:'霜雪中常青的松柏——坚韧正直、经得起考验',长流水:'源远流长的河流——有耐心、眼光长远',
  沙中金:'沙中的金粒——价值待发掘，越磨越亮',山下火:'山脚的夕阳——温暖、体贴、内敛',平地木:'平原上的草木——谦和、稳健、人缘广',壁上土:'墙上的灰泥——默默支撑，善于配合',金箔金:'薄薄的金箔——优雅、有艺术感、重外表',
  覆灯火:'夜里的灯火——好学、为人指路、稳定不张扬',天河水:'银河降下的雨水——慷慨、理想高远、惠及众人',大驿土:'四通八达的大道——包容、善连结、爱奔走',钗钏金:'精美的首饰——精致、细心、重品味',
  桑柘木:'养蚕的桑树——务实、勤劳、能创造价值',大溪水:'奔流的溪水——精力充沛、爱冒险、口才好',沙中土:'松软的沙土——随和、适应力强、多才多艺',天上火:'天上的太阳——光芒四射、慷慨、有领导力',
  石榴木:'秋天结果的石榴——坚持不懈、大器晚成、重家庭',大海水:'浩瀚的大海——包容、深沉、有大志'};
const HO_PLAIN = {
  伤官格:['Your chart is built around talent and self-expression — you are wired to create, perform and question.','你的命局以才华和表达为核心——天生爱创造、表现与质疑。'],
  伤官见官:['Your sharp opinions can collide with bosses, rules or contracts — pick your battles.','你的锋芒容易和上司、规矩或合约起冲突——要挑对战场。'],
  金水伤官喜见官:['A rare exception: your outspoken side works well with authority — structure helps you.','少见的例外：你的直言反而能与权威相处融洽——规矩对你是助力。'],
  伤官配印:['Your talent is disciplined by learning — you shine as a respected expert or professional.','你的才华有学识约束——能成为受尊重的专家或专业人士。'],
  伤官生财:['Your ideas turn into money — expertise, content or a business of your own.','你的点子能变现——专业、内容或自己的生意。'],
  伤官驾杀:['You handle pressure with wit and courage — tough situations bring out your best.','你能以机智和胆识应对压力——越难的局面越能发挥。'],
  伤官伤尽:['Your independence is unchallenged — you do best working on your own terms.','你的独立性很强——按自己的方式做事最好。'],
  身弱伤官重:['You give out more energy than you take in — guard against overcommitting.','你付出的能量多于补充——小心承诺太多。'],
};
const AREA2 = {Year:['family background & society','家庭背景与社会'], Month:['career & parents','事业与父母'], Day:['self & partner','自己与伴侣'], Hour:['children & later life','子女与晚年'], Luck:['this decade','这个大运']};
const SEASON2 = {2:['early spring','初春'],3:['mid spring','仲春'],4:['late spring','暮春'],5:['early summer','初夏'],6:['mid summer','仲夏'],7:['late summer','季夏'],8:['early autumn','初秋'],9:['mid autumn','仲秋'],10:['late autumn','深秋'],11:['early winter','初冬'],0:['mid winter','仲冬'],1:['late winter','季冬']};
const brightPlain = b => ['庙','旺'].includes(b) ? L('at full strength', '力量十足') : ['得','利'].includes(b) ? L('in decent form', '状态不错') : b === '平' ? L('average', '表现平平') : ['陷','不'].includes(b) ? L('weakened', '力量较弱') : '';
const palPlain = n => L(ZW_PALACE_PLAIN[n] || '', ZW_PALACE_PLAIN_ZH[n] || '');
const mutPlain = m => L(MUT_PLAIN[m], MUT_PLAIN_ZH[m]);
const minorPlain = n => L(ZW_MINOR_PLAIN[n], ZW_MINOR_ZH[n]);
const qStar = s => L(QM_STAR_PLAIN[s.slice(0, 2)] || '', QM_STAR_ZH[s.slice(0, 2)] || '');
const qGod = g => L(QM_GOD_PLAIN[g] || '', QM_GOD_ZH[g] || '');
const dot = L('.', '。');

function techWrap(h, key) {
  const open = STATE && STATE.techOpen && STATE.techOpen[key];
  return `<details class="techwrap" data-k="${key}"${open ? ' open' : ''}><summary>🔬 ${L('Full technical detail', '完整技术细节')}</summary>${h}</details>`;
}
const cardsIntro = (en, zh) => `<p class="muted small">${L(en, zh)}</p>`;

// ---------- BaZi ----------
function baziCards() {
  const {bazi: b, qYear} = STATE;
  let h = cardsIntro('Your Four Pillars chart, explained card by card. Technical tables are below.', '逐张卡片解读你的八字。技术表格在下方。');
  const [img, desc] = DMT(b.dm).split(' — ');
  const mb = BRANCHES.indexOf(b.pillars[1].zhi);
  h += card('🕯', L('Your core self (Day Master)', '你的本质（日主）'), 'info', L(`${b.dm} ${stemYang(b.dm) ? 'Yang' : 'Yin'} ${EL_EN[b.dmEl]} — like ${img}`, `${b.dm}${EL[b.dmEl]}（${stemYang(b.dm) ? '阳' : '阴'}）——像${img}`),
    `<p>${(desc || '').replace(/[.。]$/, '')}${dot}</p><p>${L(`Born in ${SEASON2[mb][0]} (${b.pillars[1].zhi} month), which sets the "temperature" of your chart.`, `生于${SEASON2[mb][1]}（${b.pillars[1].zhi}月），这决定了命局的“温度”。`)}</p>`,
    L('Everything else in the chart is read in relation to this character.', '命盘中其他字，都是以它为中心来解读。'), null,
    `${b.pillars.map(p => p.zh + ' ' + p.gz).join(' · ')}`);
  // balance
  const tot = b.scores.reduce((a, c) => a + c, 0);
  const sorted = b.scores.map((s, e) => [s / tot, e]).sort((a, c) => c[0] - a[0]);
  const bal = b.label.startsWith('Balanced') ? 'good' : (b.ratio < 0.33 || b.ratio > 0.67) ? 'warn' : 'mixed';
  const strengthZh = {Weak:'身弱', 'Slightly weak':'偏弱', Balanced:'中和', 'Slightly strong':'偏强', Strong:'身强'};
  const sLabel = b.label.replace(/\s*[一-鿿]+$/, '');
  h += card('⚖️', L('Energy balance', '五行能量平衡'), bal, L(`${sLabel} (${(b.ratio * 100).toFixed(0)}% support)`, `${strengthZh[sLabel] || sLabel}（支持度 ${(b.ratio * 100).toFixed(0)}%）`),
    `<p>${L(`Strongest element: <b>${EL_EN[sorted[0][1]]}</b> (${Math.round(sorted[0][0] * 100)}%). Weakest: <b>${EL_EN[sorted[4][1]]}</b> (${Math.round(sorted[4][0] * 100)}%).`, `最旺：<b>${EL[sorted[0][1]]}</b>（${Math.round(sorted[0][0] * 100)}%）。最弱：<b>${EL[sorted[4][1]]}</b>（${Math.round(sorted[4][0] * 100)}%）。`)}</p>
     <p>${b.strong ? L('You have plenty of energy — you do best when you spend it on output, money-making and responsibility.', '你能量充足——把力气花在表现、赚钱和承担责任上最好。') : L('You need support more than challenges — learning, allies and rest refill you.', '你更需要支持而非挑战——学习、伙伴和休息能为你充电。')}</p>
     <p>${L('Helpful elements: ', '对你有帮助的五行：')}${b.favourable.map(e => `${elTag(e)} <span class="small">${ELP(e).c}</span>`).join(' ')}</p>
     ${b.climate ? `<p class="small">${L(b.climate.text, b.climate.need === 1 ? '生于冬季，命局偏寒，需要火来调候。' : '生于夏季，命局偏燥热，需要水来调候。')}</p>` : ''}`,
    L('Bring helpful elements into daily life — colours, directions, the type of work you choose.', '把有利的五行带进生活——颜色、方位、选择的工作类型。'), null,
    `${b.scores.map((s, e) => EL[e] + ' ' + s.toFixed(1)).join(', ')} · 得令 ${b.deLing ? '✓' : '✗'} 得地 ${b.deDi ? '✓' : '✗'} 得势 ${b.deShi ? '✓' : '✗'}`);
  // how you operate
  const d1 = b.dominant[0][0], d2 = b.dominant[1][0];
  h += card('🎭', L('How you operate', '你的行事风格'), 'info', L(`Mainly ${GROUP_EN[d1].split(' (')[0]}, then ${GROUP_EN[d2].split(' (')[0]}`, `以${GROUP_EN[d1].match(/\((.+)\)/)[1]}为主，其次${GROUP_EN[d2].match(/\((.+)\)/)[1]}`),
    `<p>${P2(PLAIN_STYLE[d1])}</p><p>${L('Second influence: ', '第二影响：')}${P2(PLAIN_STYLE[d2])}</p>
     <p>${L('Chart structure: ', '格局：')}<b>${b.structure}</b>${dot}</p>`,
    L('Play to your main style; use the second for balance.', '发挥主要风格，以第二风格作平衡。'), null, b.dominant.map(([g, v]) => GROUP_EN[g] + ' ' + v.toFixed(1)).join(' · '));
  // HO
  const pats = b.ho.patterns;
  const hoT = pats.some(p => p.tone === 'warn') ? 'warn' : pats.some(p => p.tone === 'good') ? 'good' : 'info';
  const pBody = pats.map(p => { const k = p.name.split(' ')[0]; return `<li>${HO_PLAIN[k] ? P2(HO_PLAIN[k]) : esc(p.text)}</li>`; }).join('');
  h += card('✨', L('Talent & rebellion (Hurting Officer)', '才华与叛逆（伤官）'), hoT,
    b.ho.present ? (b.ho.visible.length ? L('Visible — part of how people see you', '透出——别人看得到的特质') : L('Hidden — talent you show selectively', '藏而不露——有选择地展现')) : L('Not in your birth chart', '原局没有伤官'),
    b.ho.present ? (pBody ? `<ul>${pBody}</ul>` : `<p>${L('Present, without a classical pattern — a sharp mind used quietly.', '有伤官但未成格——敏锐的头脑低调运用。')}</p>`)
      : `<p>${L('This energy arrives in certain decades and years — watch for the flags in your timeline.', '这种能量会在某些大运或流年出现——留意时间线中的标记。')}</p>`,
    hoT === 'warn' ? L('Channel criticism into proposals and results.', '把批评转化为方案与成果。') : null, null, pats.map(p => p.name).join(' · ') || '—');
  // tensions
  const ints = b.interactions;
  const cl = ints.filter(x => x.type === 'clash'), co = ints.filter(x => x.type === 'combo');
  const areaTxt = x => x.pair.split(/ × |, /).map(a => P2(AREA2[a] || [a, a])).join(L(' ↔ ', ' ↔ '));
  h += card('🔗', L('Inner tensions & bonds', '命局中的冲与合'), cl.length >= 2 ? 'warn' : cl.length ? 'mixed' : 'good',
    L(`${cl.length} tension${cl.length === 1 ? '' : 's'}, ${co.length} bond${co.length === 1 ? '' : 's'}`, `${cl.length} 个冲，${co.length} 个合`),
    `${cl.length ? `<p><b>${L('Tension between:', '有张力：')}</b></p><ul>${cl.map(x => `<li>${areaTxt(x)}</li>`).join('')}</ul>` : ''}
     ${co.length ? `<p><b>${L('Natural bonds between:', '自然相合：')}</b></p><ul>${co.map(x => `<li>${areaTxt(x)}</li>`).join('')}</ul>` : ''}
     ${!ints.length ? `<p>${L('No major built-in tensions.', '命局没有明显的冲突。')}</p>` : ''}`,
    cl.length ? L('Tension = movement. These areas change more often in your life.', '冲代表变动——这些领域在你生命中变化较多。') : null, null, ints.map(x => x.text).join(' · ') || '—');
  // decade
  const cd = b.daYun.find(d => qYear >= d.startYear && qYear <= d.endYear), nd = cd && b.daYun[b.daYun.indexOf(cd) + 1];
  if (cd) {
    const rt = cd.rating === 'Favourable' ? 'good' : cd.rating === 'Challenging' ? 'warn' : 'mixed';
    const rz = {Favourable:'顺利', Mixed:'起伏', Challenging:'较辛苦'};
    h += card('📅', L('Your current 10-year season', '目前的十年大运'), rt, L(`${cd.gz} · age ${cd.startAge}–${cd.endAge} · ${cd.rating}`, `${cd.gz} · ${cd.startAge}–${cd.endAge} 岁 · ${rz[cd.rating]}`),
      `<p>${L('Early years: ', '前五年：')}${P2(PLAIN_THEME[TG_GROUP[cd.stemGod]])}${dot} ${L('Later years: ', '后五年：')}${P2(PLAIN_THEME[TG_GROUP[cd.branchGod]])}${dot}</p>
       ${cd.hoAct ? `<p>${L('A "speak up and stand out" decade (Hurting Officer active).', '这是“敢说敢秀”的十年（伤官被引动）。')}</p>` : ''}
       ${nd ? `<p>${L(`Next: <b>${nd.gz}</b> from ${nd.startYear} (age ${nd.startAge}) — ${nd.rating.toLowerCase()}: ${P2(PLAIN_THEME[TG_GROUP[nd.stemGod]])}.`, `下一个：<b>${nd.gz}</b>，${nd.startYear} 年起（${nd.startAge} 岁）——${rz[nd.rating]}：${P2(PLAIN_THEME[TG_GROUP[nd.stemGod]])}。`)}</p>` : ''}`,
      L('Tap any decade in the technical section to see its year-by-year flags.', '在下方技术区点任何一个大运，可看逐年提示。'), null, `${cd.stemGod}/${cd.branchGod} · score ${cd.score.toFixed(1)}`);
  }
  // nayin
  const yn = b.pillars[0].nayin;
  if (NY[yn]) h += card('🎐', L('Your life image (Na Yin)', '你的生命意象（纳音）'), 'info', `${yn} · ${L(NY[yn].en, EL[NY[yn].e])}`,
    `<p>${L(NY[yn].img, NY_ZH[yn])}</p>${LANG === 'en' ? `<p>${NY[yn].traits}</p>` : ''}`,
    L(`Likes: ${NY[yn].likes.split(';')[0]}`, null), null, `${L('Year pillar', '年柱')} ${b.pillars[0].gz}`);
  return h;
}

// ---------- Zi Wei ----------
function zwCards() {
  const {zw} = STATE;
  let h = cardsIntro('Your Zi Wei chart: one card per area of life. The 12-palace grid is in the technical section below.', '紫微斗数：每个人生领域一张卡片。十二宫盘在下方技术区。');
  h += hourBoundary() || '';
  const F = zwFoundation();
  if (F) {
    h += card('🧬', L('Your Zi Wei labels explained', '你的紫微标签解释'), 'info', L('Bureau, Life Star, Body Star', '五行局、命主、身主'), zwFoundationBody(F), L('These are lookup labels from your Life palace and birth year, so many people share each one. They describe tendencies, not outcomes.', '这些标签是由命宫和出生年查出来的，很多人与你相同。它们描述倾向，不是结果。'));
    h += card('🌐', L('The 20-year era you live in', '你所处的 20 年大运'), 'info', L('Period 9 and your birth period', '九运与你出生的运'), eraBody(F));
  }
  const ICON = {命宫:'🙂',官禄:'💼',财帛:'💰',夫妻:'❤️',子女:'👶',父母:'👴',仆役:'🤝',交友:'🤝',兄弟:'👫',疾厄:'🩺',田宅:'🏠',迁移:'✈️',福德:'🧘'};
  const ORDER = ['命宫','官禄','财帛','夫妻','子女','父母','仆役','兄弟','疾厄','田宅','迁移','福德'];
  const TIP = {good:['A strength — lean into this area.','这是你的强项——可以多发挥。'], warn:['Go slowly here and double-check decisions.','这方面慢慢来，决定前多核对。'], mixed:['Results depend on your effort and timing.','结果取决于你的努力与时机。']};
  ORDER.forEach(n => {
    const p = zw.byName(n); if (!p) return;
    const ev = zw.evalPalace(p);
    const stars = ev.stars.map(s => `<li><b>${s.name}</b> — ${plainStar(s.name)}${brightPlain(s.b) ? ` <span class="muted small">(${brightPlain(s.b)})</span>` : ''}</li>`).join('');
    const muts = [...p.major, ...p.minor].filter(s => s.m).map(s => `<li><em class="m-${s.m}">${s.m}</em> ${s.name}: ${mutPlain(s.m)}</li>`).join('');
    const helpers = p.minor.filter(s => ZW_GOOD.includes(s.name) || s.name === '天马'), bad = p.minor.filter(s => ZW_BAD.includes(s.name));
    h += card(ICON[n] || '•', `${L(ZW_PALACE_EN[n] || n, '')}${L(' ', '')}${n}`, ev.tone, palPlain(n),
      `${stars ? `<ul>${stars}</ul>` : `<p>${L('No main star.', '没有主星。')}</p>`}${ev.borrowed ? `<p class="small muted">${L(`Empty palace — borrows the stars of ${zw.opposite(p).name}; this area is shaped by circumstances.`, `空宫——借对宫${zw.opposite(p).name}的星曜；这方面受外在环境影响较大。`)}</p>` : ''}
       ${muts ? `<ul>${muts}</ul>` : ''}
       ${helpers.length ? `<p>👍 ${helpers.map(s => `${s.name}（${minorPlain(s.name)}）`).join(L(', ', '、'))}</p>` : ''}
       ${bad.length ? `<p>⚠️ ${bad.map(s => `${s.name}（${minorPlain(s.name)}）`).join(L(', ', '、'))}</p>` : ''}`,
      P2(TIP[ev.tone] || TIP.mixed), null, `${p.stem}${p.branch} · ${L('decade ages', '大限')} ${p.decadal[0]}–${p.decadal[1]}`);
  });
  const mut = Object.entries(zw.mutLoc).map(([k, v]) => `<li><em class="m-${k}">${k}</em> ${v.star} → <b>${L(v.palace.en, v.palace.name)}</b>: ${mutPlain(k).split('——')[1] || mutPlain(k).split('—')[1] || ''}</li>`).join('');
  h += card('🔮', L('Four themes you were born with', '与生俱来的四个主题（生年四化）'), 'info', L('Where life flows, pushes, shines and sticks', '顺、冲、亮、卡在哪里'), `<ul>${mut}</ul>`, null, null, '生年四化');
  const cur = zw.current;
  if (cur) {
    const ev = zw.evalPalace(cur.decadal);
    h += card('📅', L('Your current decade & year', '目前的大限与流年'), ev.tone, L(`Decade in ${cur.decadal.en}, year in ${cur.yearly.en}`, `大限在${cur.decadal.name}，流年在${cur.yearly.name}`),
      `<p>${L(`This decade plays out in <b>${palPlain(cur.decadal.name).toLowerCase()}</b>.`, `这十年的舞台是<b>${palPlain(cur.decadal.name)}</b>。`)}</p>
       <p>${cur.decadalLu ? L(`Opportunity flows into <b>${cur.decadalLu.en}</b>`, `机会流向<b>${cur.decadalLu.name}</b>`) : ''}${cur.decadalJi ? L(`; extra effort needed in <b>${cur.decadalJi.en}</b>.`, `；<b>${cur.decadalJi.name}</b>需要多下功夫。`) : ''}</p>
       <p>${L(`This year's focus: <b>${palPlain(cur.yearly.name).toLowerCase()}</b>.`, `今年的重点：<b>${palPlain(cur.yearly.name)}</b>。`)}</p>`,
      null, null, `大限四化 ${cur.decadalMut.join(' ')} · 流年四化 ${cur.yearlyMut.join(' ')}`);
  }
  return h;
}

// ---------- Qi Men ----------
function qmCards() {
  const {qmBirth: qb, qmNow: qn, bazi: b} = STATE;
  const cellLine = c => c ? `${L('Door', '门')}: <b>${c.door || '—'}</b> — ${plainDoor(c.door) || '—'}<br>${L('Star', '星')}: <b>${c.star}</b> — ${qStar(c.star)}<br>${L('Spirit', '神')}: <b>${c.god || '—'}</b> — ${qGod(c.god)}${c.kong ? `<br>⚠️ ${L('Void — delays, less solid than it looks', '空亡——容易延误，不如表面稳固')}` : ''}${c.ma ? `<br>🐎 ${L('Horse — movement and speed', '驿马——动、快')}` : ''}` : '—';
  let h = cardsIntro('Qi Men is a map of directions and timing. First your birth "strategy", then what\'s favourable right now.', '奇门是方位与时机的地图。先看你出生时的“策略”，再看此刻的吉凶。');
  if (!qb.unknown) {
  const self = qb.stemPalace(b.dm);
  h += card('🧭', L('Your natural strategy (birth chart)', '你的天生策略（命局）'), self ? self.tone : 'mixed', qb.yang ? L('Proactive — you like to move first', '主动型——喜欢先出手') : L('Strategic — you like to choose the moment', '谋定型——喜欢等待时机'),
    `<p>${L(`Your position: <b>${dirName(self && self.p)}</b>`, `你的位置：<b>${dirName(self && self.p)}</b>`)}</p><p class="small">${cellLine(self)}</p>`,
    self && self.tone === 'warn' ? L('You grow by turning friction into leverage.', '你在把阻力化为助力中成长。') : self && self.tone === 'good' ? L('Trust your instincts — they tend to put you in the right place.', '相信直觉——它常把你带到对的位置。') : L('Timing is your edge — choose when, not just what.', '时机是你的优势——不只选做什么，也要选何时做。'), null, qmCellText(self));
  [['💼', '开门', ['Career direction', '事业方位']], ['💰', '生门', ['Wealth direction', '财富方位']]].forEach(([ic, d, t]) => {
    const c = qb.doorPalace(d);
    h += card(ic, P2(t), c.tone, `${dirName(c.p)}`, `<p class="small">${cellLine(c)}</p>`, L(`Face or head ${dirName(c.p)} for ${d === '开门' ? 'career moves' : 'money matters'} when you can.`, `${d === '开门' ? '事业' : '钱财'}相关的事，尽量面向或前往${dirName(c.p)}。`), null, qmCellText(c));
  });
  const he = qb.godPalace('六合');
  h += card('🤝', L('Partnerships', '合作与伴侣'), he.tone, dirName(he.p), `<p class="small">${cellLine(he)}</p>`, null, null, qmCellText(he));
  const good = Object.values(qb.cells).filter(c => c.p !== 5 && c.tone === 'good' && !c.kong).map(c => dirName(c.p));
  h += card('🍀', L('Your supportive directions', '对你有利的方位'), good.length ? 'good' : 'mixed', good.join(L(', ', '、')) || L('None stand out', '没有特别突出'),
    `<p>${L('Good directions for your desk, bed head or travel.', '适合书桌、床头朝向或出行的方向。')}</p>`, null, null, '命局吉门吉星吉神且不空亡');
  }
  // now
  const be = qmBlockEnd(qn);
  const cells = Object.values(qn.cells).filter(c => c.p !== 5);
  const best = [...cells].sort((a, c) => c.score - a.score)[0], worst = [...cells].sort((a, c) => a.score - c.score)[0];
  const me = qn.stemPalace(b.dm);
  const mins = L(`${Math.floor(be.remain / 60) ? Math.floor(be.remain / 60) + 'h ' : ''}${be.remain % 60} min`, `${Math.floor(be.remain / 60) ? Math.floor(be.remain / 60) + ' 小时 ' : ''}${be.remain % 60} 分钟`);
  h += card('⏱', L('Right now', '此刻'), me ? me.tone : 'mixed', L(`Valid for ${mins} (until ~${be.end})`, `有效 ${mins}（约到 ${be.end}）`),
    `<p>${L('Your position now: ', '你此刻的位置：')}<b>${dirName(me && me.p)}</b></p><p class="small">${cellLine(me)}</p>
     <p>✅ ${L('Best direction: ', '最佳方向：')}<b>${dirName(best.p)}</b> · ⛔ ${L('Avoid: ', '避开：')}<b>${dirName(worst.p)}</b></p>`,
    L('Re-check before an important meeting — the board resets every 2 hours.', '重要会面前再查一次——每两小时会重新排盘。'), null, `${qn.dayGZ}日 ${qn.hourGZ}时 ${qn.yang ? '阳' : '阴'}遁${qn.ju}局`);
  const uses = [['开门', ['Interviews, bosses, launches', '面试、见上司、发布']], ['生门', ['Money, sales, property', '钱财、销售、房产']], ['休门', ['Rest, networking, favours', '休息、人脉、求助']], ['景门', ['Presentations, exams, documents', '简报、考试、文书']]];
  h += card('🚪', L('Where to go for what — now', '此刻做什么事往哪走'), 'info', L('Doors by purpose', '按用途选门'),
    `<ul>${uses.map(([d, u]) => { const c = qn.doorPalace(d); return `<li><b>${P2(u)}</b>: ${dirName(c.p)} ${c.kong ? L('(void — delays)', '（空亡——易延误）') : ''} ${tone(c.tone)}</li>`; }).join('')}</ul>`, null, null, uses.map(([d]) => d + '→' + QM_PALACE[qn.doorPalace(d).p]).join(' · '));
  return h;
}

// ---------- Cross-reference ----------
function crossCards() {
  const rows = STATE.crossRows || [];
  const ICON = {Self:'🙂', Career:'💼', Wealth:'💰', Relationships:'❤️', Now:'⏱'};
  const TOPIC = {Self:['Self & personality','自我与性格'], Career:['Career','事业'], Wealth:['Wealth','财富'], Relationships:['Relationships','感情'], Now:['Now','此刻']};
  const SYS = {BaZi:['BaZi','八字'], 'Zi Wei':['Zi Wei','紫微'], 'Qi Men':['Qi Men','奇门']};
  const TW = {good:['positive','正面'], warn:['be careful','需谨慎'], mixed:['neutral','中性'], info:['describes your style','描述风格']};
  let h = cardsIntro('Each card asks the same question of three different systems. When two or three agree, take it seriously.', '每张卡片用三种方法回答同一个问题。两三种一致时，值得重视。');
  rows.forEach(r => {
    const key = Object.keys(ICON).find(k => r.topic.startsWith(k));
    const tones = r.items.map(x => x.t === 'info' ? 'mixed' : x.t);
    h += card(ICON[key] || '•', P2(TOPIC[key] || [r.topic, r.topic]) + (key === 'Now' ? ` (${STATE.qYear})` : ''), overall(tones), null,
      `<ul>${r.items.map(x => `<li><b>${P2(SYS[x.sys])}</b>: ${x.t === 'good' ? '🟢' : x.t === 'warn' ? '🟠' : x.t === 'info' ? '🔵' : '🟡'} ${P2(TW[x.t])}</li>`).join('')}</ul>`,
      null, key === 'Self' ? null : tones, r.items.map(x => `<b>${x.sys}:</b> ${esc(x.txt)}`).join('<br>'));
  });
  return h;
}
document.addEventListener('toggle', e => { if (e.target.classList && e.target.classList.contains('techwrap') && STATE) { STATE.techOpen = STATE.techOpen || {}; STATE.techOpen[e.target.dataset.k] = e.target.open; } }, true);

// ===== Zi Wei foundation: Bureau 五行局, Life Star 命主, Body Star 身主, 20-year Period 九运 =====
const ZW_BUREAU = {
  '水二局': {n: 2, py: 'shuǐ èr jú', el: ['Water', '水'],
    en: 'Water Two: the first 10-year stage starts at age 2. Traditionally read as an early starter — quick, adaptable, flows around obstacles. Watch-out: staying power. Example: a child who picks up skills fast and takes on responsibility early.',
    zh: '水二局：第一个大限从 2 岁开始。传统上视为起步早——反应快、善变通、遇阻能绕。留意：持久力。例：小时候学东西快、很早就担起责任。'},
  '木三局': {n: 3, py: 'mù sān jú', el: ['Wood', '木'],
    en: 'Wood Three: the first stage starts at age 3. Read as steady growth — learning, building, reaching upward. Watch-out: rigidity when plans are blocked. Example: someone who keeps adding skills and promotions year after year.',
    zh: '木三局：第一个大限从 3 岁开始。传统上视为稳步成长——学习、积累、向上。留意：计划受阻时较固执。例：每年都在增加技能、一步步晋升。'},
  '金四局': {n: 4, py: 'jīn sì jú', el: ['Metal', '金'],
    en: 'Metal Four: the first stage starts at age 4. Read as structured and decisive — standards, discipline, clean cuts. Watch-out: being too hard on yourself and others. Example: a manager who sets clear rules and sticks to them.',
    zh: '金四局：第一个大限从 4 岁开始。传统上视为有条理、果断——重标准、讲纪律、干脆利落。留意：对自己和他人太严。例：规则清楚、说到做到的主管。'},
  '土五局': {n: 5, py: 'tǔ wǔ jú', el: ['Earth', '土'],
    en: 'Earth Five: the first stage starts at age 5. Read as stable and slow-and-steady, often a later bloomer. Watch-out: sticking too long to the familiar. Example: someone who builds a career and home carefully and peaks in mid-life.',
    zh: '土五局：第一个大限从 5 岁开始。传统上视为稳重、慢热，常大器晚成。留意：太久守着熟悉的东西。例：一步一脚印建立事业和家，中年才开花。'},
  '火六局': {n: 6, py: 'huǒ liù jú', el: ['Fire', '火'],
    en: 'Fire Six: the first stage starts at age 6, the latest start. Read as a slower take-off but strong inner drive and passion once going. Watch-out: burning out or flaring up. Example: someone who finds their direction later, then pursues it with intensity.',
    zh: '火六局：第一个大限从 6 岁开始，是起步最晚的一局。传统上视为起步较慢，但一旦上路，内在动力与热情很强。留意：燃尽或爆发。例：较晚找到方向，之后全力投入。'},
};
const ZW_SOUL = {
  '贪狼': {py: 'tān láng', br: '子', en: 'Wolf of Greed: appetite for experience, charm, many interests. Strength: sociable and resourceful. Watch-out: scattered focus, indulgence. Example: the person who is good at everything from golf to networking but must choose.', zh: '贪狼：对体验有胃口、有魅力、兴趣广。优点：善交际、点子多。留意：精力分散、放纵。例：什么都会、人缘好，但需要学会取舍的人。'},
  '巨门': {py: 'jù mén', br: '丑、亥', en: 'Giant Gate: the star of speech and scrutiny. Strength: spots flaws and details others miss; argues and persuades well. Watch-out: friction in conversation, suspicion, overthinking. Example: a lawyer cross-examining a witness, or an engineer who finds the hole in a design.', zh: '巨门：口才与审视之星。优点：看得出别人漏掉的细节和破绽，会分析、会说服。留意：言语摩擦、多疑、想太多。例：盘问证人的律师，或一眼看出设计漏洞的工程师。'},
  '禄存': {py: 'lù cún', br: '寅、戌', en: 'Stored Salary: careful and protective of resources. Strength: thrifty, reliable, builds security. Watch-out: over-cautious, reluctant to share. Example: the saver who always has a reserve.', zh: '禄存：谨慎、守护资源。优点：节俭、可靠、会建立安全感。留意：太保守、舍不得分享。例：总有一笔备用金的人。'},
  '文曲': {py: 'wén qǔ', br: '卯、酉', en: 'Literary Melody: artistic, articulate, sensitive. Strength: expressive, good with words and music. Watch-out: moodiness. Example: someone who explains a complex idea through a perfect story.', zh: '文曲：有艺术感、能言善表达、细腻敏感。优点：善用文字与音乐表达。留意：情绪起伏。例：能用一个故事把复杂道理讲清楚的人。'},
  '廉贞': {py: 'lián zhēn', br: '辰、申', en: 'Integrity-and-Passion star: principled, intense, ambitious, strong feelings. Strength: drive and conviction. Watch-out: stubborn pride. Example: a founder who will not compromise on the standard.', zh: '廉贞：有原则、强烈、有野心、感情浓。优点：有冲劲、有信念。留意：固执好胜。例：绝不降低标准的创业者。'},
  '武曲': {py: 'wǔ qǔ', br: '巳、未', en: 'Martial Melody: decisive, practical, money-minded. Strength: determination and execution. Watch-out: bluntness, hardness. Example: the person who just gets it done and handles the budget.', zh: '武曲：果断、务实、重财。优点：有决心、执行力强。留意：直接、偏硬。例：把事情办成、又管得好预算的人。'},
  '破军': {py: 'pò jūn', br: '午', en: 'Breaker of Armies: pioneer and disruptor who rebuilds. Strength: courage to start over. Watch-out: restlessness, breaking what works. Example: someone who changes industry twice and thrives.', zh: '破军：开拓者、破旧立新。优点：敢于重来。留意：不安分、破坏原本好的东西。例：换过两次行业、每次都做得起来的人。'},
};
const ZW_BODY = {
  '火星': {py: 'huǒ xīng', br: '子、午', en: 'Fire Star: fast, intense reactions and bursts of energy. Strength: quick to act under pressure. Watch-out: impulsiveness, a short temper that cools fast. Example: you reply sharply in a meeting, then ten minutes later you have moved on.', zh: '火星：反应快、来势猛、爆发力强。优点：压力下行动迅速。留意：冲动、脾气来得快去得也快。例：开会时回得很冲，十分钟后就放下了。'},
  '天相': {py: 'tiān xiàng', br: '丑、未', en: 'Minister Star: fair, diplomatic, helpful. Strength: keeps order and supports others. Watch-out: indecision, being used as a go-between. Example: the colleague everyone trusts to mediate.', zh: '天相：公正、圆融、乐于帮人。优点：维持秩序、辅佐他人。留意：犹豫、被当成调解人。例：同事都信任的调解者。'},
  '天梁': {py: 'tiān liáng', br: '寅、申', en: 'Beam Star: protective, elder-like, advisory. Strength: calm and caring. Watch-out: lecturing, taking on others\' burdens. Example: the one people go to for advice when things go wrong.', zh: '天梁：有保护心、像长辈、爱指点。优点：沉稳、关怀。留意：爱说教、替别人扛事。例：出事时大家来找的人。'},
  '天同': {py: 'tiān tóng', br: '卯、酉', en: 'Harmony Star: easygoing, gentle, comfort-loving. Strength: relaxed and kind. Watch-out: avoiding effort and conflict. Example: someone who stays calm in a crisis but needs a push to start.', zh: '天同：随和、温柔、爱舒适。优点：放松、善良。留意：回避费力与冲突。例：危机中很稳，但需要有人推一把才开始。'},
  '文昌': {py: 'wén chāng', br: '辰、戌', en: 'Literary Star: orderly, educated, careful with detail. Strength: clear thinking and documents. Watch-out: perfectionism. Example: someone who writes the cleanest report in the team.', zh: '文昌：有条理、有文化、细致。优点：思路清晰、文书强。留意：完美主义。例：团队里报告写得最清楚的人。'},
  '天机': {py: 'tiān jī', br: '巳、亥', en: 'Mechanism Star: clever planner, quick thinker, changeable. Strength: strategy and adaptation. Watch-out: overthinking and changing course. Example: someone who always has plan B and plan C ready.', zh: '天机：聪明、爱谋划、思路快、多变。优点：策略与应变。留意：想太多、常改变方向。例：永远备有 B 计划和 C 计划的人。'},
};
const PERIODS = {
  6: {n: '六运', py: 'liù yùn', tri: ['Qian 乾 (Heaven, Metal)', '乾（天·金）'], en: 'authority, institutions, discipline', zh: '权威、制度、纪律'},
  7: {n: '七运', py: 'qī yùn', tri: ['Dui 兑 (Lake, Metal)', '兑（泽·金）'], en: 'communication, finance, entertainment', zh: '沟通、金融、娱乐'},
  8: {n: '八运', py: 'bā yùn', tri: ['Gen 艮 (Mountain, Earth)', '艮（山·土）'], en: 'property, stability, accumulation', zh: '房产、稳定、积累'},
  9: {n: '九运', py: 'jiǔ yùn', tri: ['Li 离 (Fire)', '离（火）'], en: 'technology and AI, visibility, education, reputation', zh: '科技与人工智能、曝光度、教育、名声'},
};
// Periods run 20 years from Lichun: 1864 = Period 1 ... 2024 = Period 9
function periodOf(y, m = 12, d = 1) {
  const ly = (m < 2 || (m === 2 && d < 4)) ? y - 1 : y;
  return {no: (Math.floor((ly - 1864) / 20) % 9) + 1, start: ly - ((ly - 1864) % 20)};
}
function zwFoundation() {
  const {zw, inp, qYear} = STATE;
  if (zw.unknown) return null;
  const bu = ZW_BUREAU[zw.fiveClass] || null, so = ZW_SOUL[zw.soul] || null, bo = ZW_BODY[zw.body] || null;
  const bp = periodOf(inp.wall[0], inp.wall[1], inp.wall[2]);
  const cy = qYear || new Date().getFullYear(), cp = periodOf(cy, 6, 1);
  return {bu, so, bo, bp, cp, cy, ag: cy - cp.start + 1};
}
const pyTag = py => LANG === 'zh' ? '' : ` <span class="muted small">(${py})</span>`;
function zwFoundationBody(f) {
  const zw = STATE.zw, item = (title, name, py, extra, txt) => `<p><b>${title}</b> ${name}${pyTag(py)}${extra ? ` <span class="muted small">${extra}</span>` : ''}<br>${txt}</p>`;
  let h = '';
  if (f.bu) h += item(L('Bureau', '五行局'), zw.fiveClass, f.bu.py, '', L(f.bu.en, f.bu.zh));
  if (f.so) h += item(L('Life Star 命主 — your inner style', '命主——内在风格'), zw.soul, f.so.py, L(`(from Life palace branch ${f.so.br})`, `（由命宫地支 ${f.so.br} 而来）`), L(f.so.en, f.so.zh));
  if (f.bo) h += item(L('Body Star 身主 — your style in action', '身主——行动风格'), zw.body, f.bo.py, L(`(from birth-year branch ${f.bo.br})`, `（由出生年支 ${f.bo.br} 而来）`), L(f.bo.en, f.bo.zh));
  return h;
}
function eraBody(f) {
  const bp = PERIODS[f.bp.no], cp = PERIODS[f.cp.no];
  let h = '';
  if (cp) h += `<p>${L(`The current 20-year era is <b>Period ${f.cp.no} (${cp.n}</b>${pyTag(cp.py)}<b>, ${cp.tri[0]})</b>, running ${f.cp.start}–${f.cp.start + 19}. This year, ${f.cy}, is year ${f.ag} of 20. Its themes in tradition: ${cp.en}.`,
    `当前的 20 年大运是<b>${cp.n}（${cp.tri[1]}）</b>，${f.cp.start}–${f.cp.start + 19} 年。${f.cy} 年是第 ${f.ag} 年（共 20 年）。传统上的主题：${cp.zh}。`)}</p>`;
  if (bp) h += `<p>${L(`You were born in <b>Period ${f.bp.no} (${bp.n}</b>${pyTag(bp.py)}<b>, ${bp.tri[0]})</b>, ${f.bp.start}–${f.bp.start + 19}: ${bp.en}.`, `你出生在<b>${bp.n}（${bp.tri[1]}）</b>，${f.bp.start}–${f.bp.start + 19} 年：${bp.zh}。`)}</p>`;
  h += `<p class="small muted">${L('An era is shared by everyone alive in it — it is the background weather, not your personal luck. Eras change at Lichun (about 4 February) of the start year.', '大运是同时代所有人共享的背景，不是你个人的运气。大运在起始年的立春（约 2 月 4 日）换运。')}</p>`;
  return h;
}
// Warn when the Chinese hour differs between clock time and true solar time
function hourBoundary() {
  const {inp, bazi: b} = STATE;
  if (inp.noHour) return null;
  const hi = h => Math.floor(((h + 1) % 24) / 2), pad = n => String(n).padStart(2, '0');
  const clockH = inp.wall[3], tst = b.times.tst;
  if (hi(clockH) === hi(tst[3])) return null;
  let alt = null;
  try {
    const altInp = {...inp, useTST: !inp.useTST};
    const altB = computeBazi(altInp), altZ = computeZiwei(altInp, altB, new Date());
    alt = {pillars: altB.pillars.map(p => p.gz).join(' '), bureau: altZ.fiveClass, soul: altZ.soul, hour: altZ.time};
  } catch (e) { alt = null; }
  const using = inp.useTST ? L('true solar time', '真太阳时') : L('clock time', '钟表时间');
  const cur = {pillars: b.pillars.map(p => p.gz).join(' '), bureau: STATE.zw.fiveClass, soul: STATE.zw.soul, hour: STATE.zw.time};
  return `<div class="card"><b>⚠️ ${L('Your birth hour depends on the method', '你的出生时辰取决于所用方法')}</b>
    <p class="small">${L(`By the clock you were born at ${pad(clockH)}:${pad(inp.wall[4])} (${BRANCHES[hi(clockH)]} hour). By true solar time at your birthplace it was ${pad(tst[3])}:${pad(tst[4])} (${BRANCHES[hi(tst[3])]} hour). The Hour pillar and the whole Zi Wei chart depend on this. This page is using <b>${using}</b>.`,
      `按钟表时间，你出生于 ${pad(clockH)}:${pad(inp.wall[4])}（${BRANCHES[hi(clockH)]}时）。按出生地的真太阳时是 ${pad(tst[3])}:${pad(tst[4])}（${BRANCHES[hi(tst[3])]}时）。时柱和整个紫微命盘都取决于此。本页现在使用的是<b>${using}</b>。`)}</p>
    ${alt ? `<p class="small">${L('Now', '当前')}: ${cur.pillars} · ${cur.bureau} · ${L('Life Star', '命主')} ${cur.soul}<br>${L('Other method', '另一种方法')}: ${alt.pillars} · ${alt.bureau} · ${L('Life Star', '命主')} ${alt.soul}</p>` : ''}
    <p class="small muted">${L('Most online tools use clock time; the stricter tradition uses true solar time. If the recorded birth time is only approximate, ask family which hour is right. Change it under Advanced options → "Use true solar time".', '大多数网站用钟表时间；较严格的传统用真太阳时。若出生时间只是大概，请向家人确认时辰。可在「高级选项」→「使用真太阳时」中切换。')}</p></div>`;
}

// ===== Animal archetype: derived from the chart (Day Master + birth-year zodiac + energy level) =====
const AN_STEM = {
  '甲': {e: '🐉', en: 'Azure Dragon', zh: '青龙', py: 'qīng lóng', el: 'Yang Wood', t: ['Like a tall tree growing straight up: a natural leader with principles and a long-term vision.', 'Watch-out: stiff when asked to bend.', 'Example: a founder who sets the vision and will not compromise on the standard.'], z: ['像一棵笔直向上的大树：天生的领导者，有原则、有长远眼光。', '留意：被要求变通时较僵硬。', '例：定下愿景、绝不降低标准的创办人。']},
  '乙': {e: '🦌', en: 'Deer', zh: '鹿', py: 'lù', el: 'Yin Wood', t: ['Like a vine or flower: gentle, flexible, finds a way around obstacles and wins by building goodwill.', 'Watch-out: leans on a supportive environment, avoids confrontation.', 'Example: someone who quietly gets their way because everyone likes working with them.'], z: ['像藤蔓和花草：温柔、有弹性，遇阻能绕过去，靠人缘取胜。', '留意：需要支持性的环境，回避正面冲突。', '例：因为大家都喜欢和他合作，而悄悄把事情办成的人。']},
  '丙': {e: '🔥', en: 'Phoenix', zh: '凤凰', py: 'fèng huáng', el: 'Yang Fire', t: ['Like the sun: warm, generous and visible; lights up a room and inspires people.', 'Watch-out: burning out, or needing the spotlight.', 'Example: the colleague who energises every meeting.'], z: ['像太阳：温暖、慷慨、醒目，能点亮一个房间、鼓舞别人。', '留意：燃尽，或太需要聚光灯。', '例：让每场会议都活起来的同事。']},
  '丁': {e: '🦊', en: 'Fox', zh: '狐狸', py: 'hú li', el: 'Yin Fire', t: ['Like a candle flame: perceptive and warm with those close to you; reads people and rooms well.', 'Watch-out: overthinking, and flickering under pressure.', 'Example: sensing the real worry behind what a client says.'], z: ['像烛火：敏锐，对亲近的人很温暖，善于读懂人和场合。', '留意：想太多，压力下容易摇曳不定。', '例：听出客户话语背后真正的担忧。']},
  '戊': {e: '🐻', en: 'Bear', zh: '熊', py: 'xióng', el: 'Yang Earth', t: ['Like a mountain: steady, dependable and protective; slow to start but hard to stop.', 'Watch-out: stubborn, slow to change course.', 'Example: the one who carries the team through a long project.'], z: ['像一座山：稳重、可靠、有保护心；起步慢，但一旦行动就很难被阻止。', '留意：固执，转向较慢。', '例：带着团队走完一个长项目的人。']},
  '己': {e: '🌿', en: 'Capybara', zh: '水豚', py: 'shuǐ tún', el: 'Yin Earth', t: ['Like fertile fields: nurturing, calm, gets along with everyone and absorbs stress for others.', 'Watch-out: over-accommodating; your own needs get lost.', 'Example: the friend everyone relaxes around.'], z: ['像肥沃的田野：滋养、平静、与谁都合得来，替别人承受压力。', '留意：太迁就别人，忽略自己的需要。', '例：大家在他身边都能放松的朋友。']},
  '庚': {e: '🐺', en: 'Wolf', zh: '狼', py: 'láng', el: 'Yang Metal', t: ['Like a steel axe: decisive, direct, brave, and fiercely loyal to your own pack.', 'Watch-out: bluntness that hurts.', 'Example: the one who makes the hard call and then backs the team.'], z: ['像一把钢斧：果断、直接、勇敢，对自己人极其忠诚。', '留意：太直接，容易伤人。', '例：做出艰难决定，然后全力支持团队的人。']},
  '辛': {e: '🦚', en: 'Peacock', zh: '孔雀', py: 'kǒng què', el: 'Yin Metal', t: ['Like a jewel: refined, quality-minded, with an eye for beauty and detail.', 'Watch-out: perfectionism and sensitivity to criticism.', 'Example: someone with impeccable taste who spots every flaw in a presentation.'], z: ['像一颗宝石：精致、讲品质，对美和细节有眼光。', '留意：完美主义，对批评敏感。', '例：品味出众、一眼挑出简报所有瑕疵的人。']},
  '壬': {e: '🐬', en: 'Dolphin', zh: '海豚', py: 'hǎi tún', el: 'Yang Water', t: ['Like a great river or ocean: expansive, sociable, curious and quick-flowing.', 'Watch-out: scattered focus.', 'Example: the networker who connects people and ideas.'], z: ['像大江大海：开阔、爱交际、好奇、思路流动快。', '留意：注意力分散。', '例：把人和想法连起来的人脉高手。']},
  '癸': {e: '🐈‍⬛', en: 'Black Cat', zh: '黑猫', py: 'hēi māo', el: 'Yin Water', t: ['Like rain or mist: quiet, intuitive, independent, with a touch of mystery.', 'Watch-out: withdrawing, over-sensitivity.', 'Example: someone who says little but notices everything.'], z: ['像雨露和薄雾：安静、直觉强、独立，带点神秘感。', '留意：爱退缩，过于敏感。', '例：话不多但什么都看在眼里的人。']},
};
const ZOD_PY = ['shǔ', 'niú', 'hǔ', 'tù', 'lóng', 'shé', 'mǎ', 'yáng', 'hóu', 'jī', 'gǒu', 'zhū'];
const ZOD_LOOK = [
  ['quick-witted and resourceful', '机灵、点子多'], ['dependable and hard-working', '可靠、勤奋'], ['bold and confident', '大胆、自信'], ['gentle and tactful', '温和、得体'],
  ['impressive and ambitious', '有气势、有抱负'], ['calm, observant and private', '沉静、观察入微、有点神秘'], ['energetic and independent', '精力旺盛、独立'], ['kind and artistic', '善良、有艺术感'],
  ['playful and clever', '风趣、聪明'], ['neat, precise and outspoken', '利落、精准、直言'], ['loyal and straightforward', '忠诚、坦率'], ['easygoing and generous', '随和、大方'],
];
function animalBody() {
  const {bazi: b} = STATE, a = AN_STEM[b.dm];
  if (!a) return '';
  const zi = BRANCHES.indexOf(b.pillars[0].zhi);
  const t = LANG === 'zh' ? a.z : a.t;
  return `<p style="font-size:1.15em"><span style="font-size:1.8em">${a.e}</span> <b>${L(a.en, a.zh)}</b>${pyTag(a.py + ' · ' + a.zh)}</p>
    <p class="small muted">${L(`Core animal — from your Day Master 日主 ${b.dm} (${a.el})`, `核心动物——来自日主 ${b.dm}（${a.el.replace('Yang', '阳').replace('Yin', '阴').replace('Wood', '木').replace('Fire', '火').replace('Earth', '土').replace('Metal', '金').replace('Water', '水')}）`)}</p>
    <p>${t[0]}</p><p>${t[1]}</p><p>${t[2]}</p>
    <p><b>${L('Outer image', '外在形象')}</b> — ${L(`birth-year zodiac: ${ZODIAC[zi]} 生肖${ZODIAC_ZH[zi]}`, `出生年生肖：${ZODIAC_ZH[zi]}`)}${pyTag(ZOD_PY[zi])}: ${L('others first see you as', '别人第一眼觉得你')} ${L(ZOD_LOOK[zi][0], ZOD_LOOK[zi][1])}.</p>
    <p><b>${L('Energy', '能量')}</b> — ${b.strong ? L('runs strong: you need challenges and outlets.', '偏强：需要挑战和发挥空间。') : L('needs support: you thrive with good people, rest and routine.', '偏需要支持：有好的人际、休息和规律才发挥得好。')}</p>
    <p class="small muted">${L('How this was chosen: each of the ten Day Master stems is a nature image (tree, vine, sun, flame, mountain, field, axe, jewel, ocean, rain), and each is matched to an animal that fits that image, inspired by the Four Symbols (青龙, 朱雀, 白虎, 玄武). It is a modern, playful mapping, not a classical rule. Unlike social-media quizzes there are no tiers: no animal is better than another.', '选择方式：十个日主天干各对应一种自然意象（树、藤、太阳、烛火、山、田、斧、宝石、海、雨），再配上契合该意象的动物，灵感来自四象（青龙、朱雀、白虎、玄武）。这是现代的趣味对应，不是古法规则。和社交媒体上的测验不同，这里没有等级之分：没有哪种动物比另一种更好。')}</p>`;
}
