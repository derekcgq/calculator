// ===== Simple view: plain language by life area (EN / 中文) =====
const PLAIN_THEME = {
  peer:['teamwork and confidence — but also competition','团队与自信——也有竞争'], output:['creativity, speaking up and new ideas','创意、发声与新想法'],
  wealth:['money opportunities and more responsibility','赚钱机会与更多责任'], officer:['career pressure, promotion and rules','事业压力、升迁与规矩'], resource:['learning, mentors and support','学习、贵人与支持']};
const PLAIN_STYLE = {
  peer:['You trust yourself and like to work with equals. You do well when you can run your own show.','你相信自己，喜欢和平起平坐的人合作。能自己做主时表现最好。'],
  output:['You are a natural communicator and creator — ideas, opinions and expertise are your currency.','你是天生的表达者和创造者——想法、观点和专业就是你的本钱。'],
  wealth:['You are practical and results-driven — you see opportunities and like tangible rewards.','你务实、重结果——善于发现机会，喜欢看得见的回报。'],
  officer:['You are responsible and structured — you do well in organisations with clear roles and recognition.','你负责任、有条理——在分工清晰、有认可的机构里表现出色。'],
  resource:['You are a learner and thinker — knowledge, qualifications and good mentors lift you.','你爱学习、善思考——知识、资历和好导师能托举你。']};
const PLAIN_CHIP = {peer:['independent','独立自主'], output:['expressive','善于表达'], wealth:['practical and results-driven','务实重结果'], officer:['responsible','有责任感'], resource:['thoughtful learner','好学深思']};
const PLAIN_WORK = {
  peer:['running your own team, partnerships, sales targets, competitive fields','带领自己的团队、合伙、销售指标、竞争性行业'],
  output:['advisory, consulting, teaching, creative, media, specialist expert roles','顾问、咨询、教学、创意、媒体、专业专家型角色'],
  wealth:['business, sales, trading, deal-making, managing budgets','经商、销售、贸易、谈判、管理预算'],
  officer:['large organisations, government, management, compliance, structured career ladders','大型机构、政府、管理岗、合规、有清晰晋升阶梯的职业'],
  resource:['research, education, professional services, roles that reward credentials','研究、教育、专业服务、看重资历的岗位']};
const ORGAN = [['liver, eyes, tendons','肝、眼睛、筋腱'],['heart, circulation, sleep','心脏、血液循环、睡眠'],['stomach, digestion','脾胃、消化'],['lungs, skin, breathing','肺、皮肤、呼吸'],['kidneys, bladder, hormones','肾、膀胱、内分泌']];
const P2 = a => a[LANG === 'zh' ? 1 : 0];
const VERDICT = {good:['🟢',['Looks good','良好']], mixed:['🟡',['Mixed — depends on your effort','好坏参半——看你的努力']], warn:['🟠',['Needs extra care','需要多加留意']], info:['🔵',['Your style','你的风格']]};
const plainStar = n => L(((ZW_STAR_KW[n] || '').split('—')[1] || '').trim(), ZW_STAR_ZH[n] || '');
const plainStarShort = n => plainStar(n).split(LANG === 'zh' ? '、' : ',')[0];
const plainDoor = d => L(((QM_DOOR_EN[d] || '').split('—')[1] || '').trim(), QM_DOOR_ZH[d] || '');
const dirName = p => L(({1:'North',2:'South-West',3:'East',4:'South-East',6:'North-West',7:'West',8:'North-East',9:'South'})[p] || 'Centre', DIR_ZH[p] || '中宫');
const SEP = () => L('; ', '；');

function agreeTag(tones) {
  const g = tones.filter(t => t === 'good').length, w = tones.filter(t => t === 'warn').length, n = tones.length;
  if (g >= 2) return `<span class="agree good">${L(`${g} of ${n} methods agree: positive`, `${n} 种方法中有 ${g} 种一致：正面`)}</span>`;
  if (w >= 2) return `<span class="agree warn">${L(`${w} of ${n} methods agree: be careful`, `${n} 种方法中有 ${w} 种一致：需谨慎`)}</span>`;
  return `<span class="agree mixed">${L('methods differ — a mixed picture', '各方法看法不一——好坏参半')}</span>`;
}
function overall(tones) {
  const s = tones.reduce((a, t) => a + (t === 'good' ? 1 : t === 'warn' ? -1 : 0), 0);
  return s >= 1 ? 'good' : s <= -1 ? 'warn' : 'mixed';
}
function card(icon, title, verdictTone, headline, body, tip, tones, why) {
  const [dot, word] = VERDICT[verdictTone];
  return `<div class="scard v-${verdictTone}"><div class="shead"><span class="sicon">${icon}</span><div><div class="stitle">${title}</div><div class="sverd">${dot} ${headline || P2(word)}</div></div></div>
    <div class="sbody">${body}</div>${tip ? `<div class="stip">💡 ${tip}</div>` : ''}
    ${tones ? `<div class="sagree">${agreeTag(tones)}</div>` : ''}
    ${why ? `<details class="swhy"><summary>${L('Why? (technical details)', '为什么？（技术细节）')}</summary><div class="small">${why}</div></details>` : ''}</div>`;
}

function simpleHtml() {
  const {bazi: b, zw, qmBirth: qb, qmNow: qn, qYear} = STATE;
  const rows = STATE.crossRows || [];
  const row = name => rows.find(r => r.topic.startsWith(name));
  const Tn = r => r ? r.items.map(x => x.t === 'info' ? 'mixed' : x.t) : [];
  const W = r => r ? r.items.map(x => `<b>${x.sys}:</b> ${esc(x.txt)}`).join('<br>') : '';
  const dom = b.dominant[0][0];
  const P = n => zw.byName(n);
  const ZWT = t => zw.unknown ? '' : t;
  const zh = LANG === 'zh';
  let h = '';
  const glance = [];
  const C = (icon, title, vt, ...rest) => { const id = 'sa-' + glance.length; glance.push({icon, title, vt, id}); return `<div id="${id}" class="sanchor">${card(icon, title, vt, ...rest)}</div>`; };

  // Hero
  const life = zw.evalPalace(P('命宫'));
  const [img, desc] = DMT(b.dm).split(' — ');
  h += `<div class="hero"><div class="hero-img">${ch(b.dm, 1)}</div><div><div class="hero-t">${L('You are like ' + img, '你就像' + img)}</div>
    <div class="hero-s">${desc || ''}</div>
    <div class="chips">${[P2(PLAIN_CHIP[dom]), ...life.stars.slice(0, 2).map(s => plainStarShort(s.name))].filter(Boolean).map(c => `<span class="chip on">${esc(c)}</span>`).join('')}</div></div></div>`;
  h += `<p class="muted small">${L('Each card below is one area of life. 🟢 good · 🟡 mixed · 🟠 needs care. "Methods agree" counts how many of the three Chinese systems (BaZi, Zi Wei, Qi Men) point the same way.',
    '下面每张卡片代表一个人生领域。🟢 良好 · 🟡 好坏参半 · 🟠 需要留意。“方法一致”表示八字、紫微、奇门三种方法中有几种指向相同结论。')}</p>`;

  h += '%%GLANCE%%';
  // Who you are
  h += C('🙂', L('Who you are', '你是怎样的人'), 'info', L('Your natural style', '你的天性'),
    `<p>${P2(PLAIN_STYLE[dom])}</p><p>${life.stars.length ? L(`Your personality star${life.stars.length > 1 ? 's say' : ' says'}: `, '你的性格星显示：') + life.stars.map(s => plainStar(s.name)).join(SEP()) + L('.', '。') : ''}</p>
     <p>${b.strong ? L('Energy level: high — you need challenges and outlets, or you get restless.', '精力：充沛——你需要挑战和发挥空间，否则会坐立不安。')
       : L('Energy level: you work best with a solid support base — rest, good people around you and steady routines recharge you.', '精力：你需要稳固的支持——充足休息、身边有好人、规律的生活能帮你充电。')}</p>
     ${b.ho.present ? `<p>${b.ho.visible.length ? L('You have a sharp, independent mind that questions rules — and people notice it.', '你思维敏锐、独立，敢于质疑规矩——而且别人看得出来。')
       : L('You have a sharp, independent mind that questions rules, though you often keep it to yourself.', '你思维敏锐、独立，敢于质疑规矩，但常常放在心里不说。')}</p>` : ''}`,
    b.strong ? L('Pick goals big enough to use your energy.', '定下够大的目标，好好发挥你的能量。') : L('Protect your energy — say no to things that drain you.', '保护好你的能量——对消耗你的事情学会说不。'), null, W(row('Self')));

  // Career
  const cr = row('Career'), ct = Tn(cr), carE = zw.evalPalace(P('官禄'));
  const kd = qb.doorPalace('开门');
  const hoWarn = b.ho.patterns.some(p => p.name.includes('见官'));
  h += C('💼', L('Career & work', '事业与工作'), overall(ct), null,
    `<p>${L('Best-fit work: ', '最适合的工作：')}<b>${P2(PLAIN_WORK[dom])}</b>${L('.', '。')}</p>
     <p>${L('Industries that suit your elements: ', '适合你五行的行业：')}${b.favourable.map(e => ELP(e).i).join(SEP())}${L('.', '。')}</p>
     ${carE.stars.length ? `<p>${L('At work you come across as: ', '你在工作中给人的印象：')}${carE.stars.map(s => plainStar(s.name)).join(SEP())}${L('.', '。')}</p>` : ''}
     ${hoWarn ? `<p>${L('You may clash with rigid bosses or rules — you work best where your ideas are valued.', '你可能会和死板的上司或规定起冲突——在重视你想法的地方表现最好。')}</p>` : ''}`,
    L(`For interviews or important work meetings, your natural "career direction" is the <b>${dirName(kd.p)}</b> — sit or travel facing it when you can.`,
      `面试或重要工作会议时，你天生的“事业方位”是<b>${dirName(kd.p)}</b>——尽量面向或朝这个方向。`), ct, W(cr));

  // Money
  const wr = row('Wealth'), wt = Tn(wr), wE = zw.evalPalace(P('财帛'));
  const sd = qb.doorPalace('生门');
  const heavyWealth = !b.strong && b.groupScore.wealth >= 2.5;
  h += C('💰', L('Money & wealth', '金钱与财富'), overall(wt), null,
    `<p>${b.groupScore.wealth >= 1.5 ? L('Money opportunities show up readily in your life.', '你的生活中不缺赚钱机会。') : L('Money comes more through skill and steady effort than luck.', '你的钱主要靠本事和稳定努力，而不是运气。')}
       ${heavyWealth ? L(' But there can be more opportunity than you can handle alone — partners, systems and help make the difference.', '但机会可能多到一个人接不住——找伙伴、建制度、借助他人是关键。') : ''}</p>
     ${b.ho.patterns.some(p => p.name.includes('生财')) ? `<p>${L('Your talents and ideas can be turned directly into income — expertise, content or a side business.', '你的才华和想法可以直接变现——专业服务、内容创作或副业。')}</p>` : ''}
     ${wE.notes.some(n => n.includes('忌')) ? `<p>${L('Money is an area where you tend to worry or work harder than others — keep a buffer and avoid impulsive bets.', '钱是你比较容易操心、要比别人更努力的领域——留好储备，避免冲动投资。')}</p>`
       : wE.notes.some(n => n.includes('禄')) ? `<p>${L('Money flows relatively easily for you.', '你的财运相对顺畅。')}</p>` : ''}`,
    L(`Money matters tend to go better facing the <b>${dirName(sd.p)}</b>. `, `处理钱财事务时，面向<b>${dirName(sd.p)}</b>较为有利。`) +
      (heavyWealth ? L("Don't take on every opportunity — choose the best ones.", '不要每个机会都接——挑最好的。') : L('Build steadily; your gains compound over time.', '稳步累积，收获会随时间放大。')), wt, W(wr));

  // Love
  const rr = row('Relationships'), rt = Tn(rr), sE = zw.evalPalace(P('夫妻'));
  const dayClash = b.interactions.some(x => x.type === 'clash' && x.pair.includes('Day') && x.text.includes('Branch'));
  h += C('❤️', L('Love & marriage', '感情与婚姻'), overall(rt), null,
    `${sE.stars.length ? `<p>${L('Your ideal partner energy: ', '适合你的伴侣特质：')}${sE.stars.map(s => plainStar(s.name)).join(SEP())}${L('.', '。')}</p>` : ''}
     <p>${b.spouseStarCount ? L('Partnership is a clear theme in your chart.', '伴侣关系是你命盘中明显的主题。') : L('Partnership is less emphasised — relationships grow from shared activities more than instant attraction.', '命盘中伴侣主题较淡——感情更多从共同经历中慢慢培养，而非一见钟情。')}
       ${dayClash ? L(' Your "relationship corner" has some built-in tension — space, movement and honest talk keep things healthy.', '你的“婚姻宫”自带一些张力——给彼此空间、多沟通，关系会更健康。') : ''}</p>`,
    L('Use the Compatibility tab to check a specific person.', '可在“合盘”页查看与特定对象的配对。'), rt, W(rr));

  // Family
  const parE = zw.evalPalace(P('父母')), kidE = zw.evalPalace(P('子女'));
  const yearClash = b.interactions.some(x => x.type === 'clash' && x.pair.includes('Year'));
  const hourClash = b.interactions.some(x => x.type === 'clash' && x.pair.includes('Hour'));
  const famT = [parE.tone, kidE.tone, (yearClash || hourClash) ? 'warn' : 'mixed'];
  const tw = (t, en, zhs) => t === 'good' ? P2(en[0] ? [en[0], zhs[0]] : en) : t === 'warn' ? P2([en[1], zhs[1]]) : P2([en[2], zhs[2]]);
  const starsShort = e => e.stars.length ? L(` (${e.stars.map(s => plainStarShort(s.name)).join(', ')})`, `（${e.stars.map(s => plainStarShort(s.name)).join('、')}）`) : '';
  h += C('👨‍👩‍👧', L('Family — parents & children', '家庭——父母与子女'), overall(famT), null,
    `<p><b>${L('Parents / elders:', '父母／长辈：')}</b> ${tw(parE.tone, ['generally supportive','a relationship that needs patience','a mixed, normal relationship'], ['大体支持你','需要多些耐心的关系','好坏参半、正常的关系'])}${starsShort(parE)}${yearClash ? L('; some distance or differences with family background', '；与家庭背景有些距离或分歧') : ''}${L('.', '。')}</p>
     <p><b>${L('Children:', '子女：')}</b> ${tw(kidE.tone, ['a source of joy and pride','parenting takes extra effort and patience','a balanced, normal picture'], ['带来快乐与骄傲','养育需要更多心力与耐心','平稳、正常'])}${starsShort(kidE)}${hourClash ? L('; differences of opinion with children are likely — give them independence', '；与子女容易有意见分歧——给他们独立空间') : ''}${L('.', '。')}</p>`,
    null, null, ZWT(`Zi Wei 父母: ${parE.stars.map(s => s.name).join('+') || '—'} (${parE.tone}); 子女: ${kidE.stars.map(s => s.name).join('+') || '—'} (${kidE.tone}). BaZi Year pillar = parents, Hour pillar = children${yearClash || hourClash ? '; clashes present' : ''}.`));

  // Friends
  const frE = zw.evalPalace(P('仆役'));
  const compet = b.groupScore.peer >= 2;
  h += C('🤝', L('Friends & colleagues', '朋友与同事'), frE.tone, null,
    `<p>${tw(frE.tone, ['Friends and teammates tend to help you.','Choose your circle carefully — not everyone has your interests at heart.','A mixed circle — some helpers, some drainers.'], ['朋友和队友多半会帮你。','慎选身边的人——不是每个人都为你着想。','圈子好坏参半——有贵人，也有消耗你的人。'])}
       ${compet ? L(' You have a competitive streak with peers; it pushes you, but watch shared money with friends.', '你和同辈之间有好胜心，能激励你，但和朋友之间的金钱往来要小心。') : ''}</p>
     ${frE.stars.length ? `<p>${L('Your circle tends to be: ', '你的圈子多是：')}${frE.stars.map(s => plainStar(s.name)).join(SEP())}${L('.', '。')}</p>` : ''}`,
    compet ? L('Keep money and friendship separate.', '钱和友情要分开。') : null, null, ZWT(`Zi Wei 仆役: ${frE.stars.map(s => s.name).join('+') || '—'}${frE.notes.length ? ' · ' + frE.notes.join(', ') : ''}. BaZi Companion ${b.groupScore.peer.toFixed(1)}.`));

  // Health
  const tot = b.scores.reduce((a, c) => a + c, 0);
  const hi = b.scores.map((s, e) => [s / tot, e]).filter(([s]) => s > 0.33).map(([, e]) => e);
  const lo = b.scores.map((s, e) => [s / tot, e]).filter(([s]) => s < 0.08).map(([, e]) => e);
  const hE = zw.evalPalace(P('疾厄'));
  const healthT = [hE.tone, (hi.length || lo.length) ? 'warn' : 'good'];
  const organs = [...new Set([...hi, ...lo])].map(e => P2(ORGAN[e])).join(SEP());
  h += C('🩺', L('Health & energy', '健康与精力'), overall(healthT), null,
    `<p>${hi.length || lo.length ? L(`Areas to look after: <b>${organs}</b> (from elements that are ${hi.length ? 'very strong' : ''}${hi.length && lo.length ? ' or ' : ''}${lo.length ? 'very weak' : ''} in your chart).`,
        `需要多照顾：<b>${organs}</b>（因为命盘中有五行${hi.length ? '过旺' : ''}${hi.length && lo.length ? '或' : ''}${lo.length ? '过弱' : ''}）。`)
      : L('Your elements are fairly balanced — no single body area stands out.', '你的五行比较平衡——没有特别需要担心的身体部位。')}</p>
     <p>${hE.tone === 'warn' ? L('Stress tends to show up physically — build in rest.', '压力容易反映在身体上——要安排休息。') : L('Your general constitution reads as steady.', '整体体质较为稳定。')}</p>`,
    L('Traditional indications only — not medical advice.', '仅为传统命理参考，不构成医疗建议。'), null, `${b.scores.map((s, e) => EL[e] + ' ' + Math.round(s / tot * 100) + '%').join(', ')}${ZWT(`. Zi Wei 疾厄: ${hE.stars.map(s => s.name).join('+') || '—'} (${hE.tone}).`)}`);

  // Home
  const homeE = zw.evalPalace(P('田宅'));
  h += C('🏠', L('Home & property', '家宅与房产'), homeE.tone, null,
    `<p>${tw(homeE.tone, ['Property and home are a source of stability and gains for you.','Home and property decisions need extra care — check details twice.','Home and property are a normal, mixed area.'], ['房产和家庭能为你带来稳定与收获。','买房、搬家等决定要格外谨慎——细节多核对。','家宅方面属于正常、好坏参半。'])}
      ${b.groupScore.resource >= 2 ? L(' Owning a base matters to your sense of security.', '有自己的房子对你的安全感很重要。') : ''}</p>`,
    null, null, ZWT(`Zi Wei 田宅: ${homeE.stars.map(s => s.name + (s.m ? '化' + s.m : '')).join('+') || '—'}${homeE.notes.length ? ' · ' + homeE.notes.join(', ') : ''}.`));

  // Timeline
  const cd = b.daYun.findIndex(d => qYear >= d.startYear && qYear <= d.endYear);
  const W3 = {Favourable:['☀️',['Good years','顺利的年份']], Mixed:['⛅',['Mixed years','起伏的年份']], Challenging:['🌧',['Harder years','较辛苦的年份']]};
  const tl = b.daYun.slice(0, 9).map((d, i) => `<div class="tl ${i === cd ? 'now' : ''}"><span class="tl-ic">${W3[d.rating][0]}</span><div><b>${L(`Age ${d.startAge}–${d.endAge}`, `${d.startAge}–${d.endAge} 岁`)}</b> <span class="muted small">(${d.startYear}–${d.endYear})</span>${i === cd ? ` <span class="chip on">${L('now', '现在')}</span>` : ''}<br>
    <span class="small">${P2(W3[d.rating][1])}${L(': ', '：')}${P2(PLAIN_THEME[TG_GROUP[d.stemGod]])}${L(', then ', '，之后转为')}${P2(PLAIN_THEME[TG_GROUP[d.branchGod]])}${L('.', '。')}${d.inter.some(x => x.type === 'clash' && x.pair.includes('Day')) ? L(' Expect a big change (move, new role or relationship shift).', '可能有大变动（搬家、换岗位或感情变化）。') : ''}</span></div></div>`).join('');
  h += C('📅', L('Your life in 10-year seasons', '人生的十年季节'), 'info', L('Good, mixed and harder decades', '顺利、起伏与较辛苦的十年'), `<div class="tlwrap">${tl}</div>`,
    L('Every life has all three kinds of seasons — plan big moves for the sunny ones, and build skills in the cloudy ones.', '每个人的人生都有这三种季节——在晴天做大决定，在阴天积累本领。'), null, L("Each decade is a BaZi Luck Pillar, rated by whether its elements help your chart's balance.", '每个十年即八字大运，依其五行是否有助命局平衡来评分。'));

  // Zi Wei labels + era (needs the birth hour)
  {
    const F = zwFoundation();
    const hb = hourBoundary(); if (hb) h += hb;
    if (F) {
      h += C('🧬', L('Your Zi Wei labels, explained', '你的紫微标签白话解释'), 'info', L('Bureau, Life Star, Body Star', '五行局、命主、身主'), zwFoundationBody(F),
        L('Treat these as style tendencies. Many people share each label.', '把它们当作风格倾向。很多人与你有相同标签。'));
      h += C('🌐', L('The 20-year era you live in', '你所处的 20 年大运'), 'info', L('Background weather, not personal luck', '背景大环境，不是个人运气'), eraBody(F));
    }
  }
  // Zi Wei 10-year palaces in plain words (needs the birth hour)
  if (!zw.unknown && zw.palaces.length) {
    const curZ = zw.current, TI = {good: '☀️', warn: '🌧', mixed: '⛅'};
    const rowsZ = [...zw.palaces].sort((a, c) => a.decadal[0] - c.decadal[0]).map(p => {
      const ev = zw.evalPalace(p), now = curZ && curZ.decadal.i === p.i;
      return `<div class="tl ${now ? 'now' : ''}"><span class="tl-ic">${TI[ev.tone] || '⛅'}</span><div><b>${L(`Age ${p.decadal[0]}–${p.decadal[1]}`, `${p.decadal[0]}–${p.decadal[1]} 岁`)}</b> <span class="muted small">${now ? L('← you are here', '← 你现在在这里') : ''}</span><br>
        <span class="small">${L('Spotlight on', '重心在')} <b>${esc(palPlain(p.name).toLowerCase ? (LANG === 'zh' ? palPlain(p.name) : palPlain(p.name).toLowerCase()) : palPlain(p.name))}</b>${L(' — ', '——')}${ev.tone === 'good' ? L('things tend to flow here.', '这方面比较顺。') : ev.tone === 'warn' ? L('expect to work harder here.', '这方面需要多下功夫。') : L('a mix of ups and downs.', '有起有落。')}</span></div></div>`;
    }).join('');
    const nowTxt = curZ ? L(`Right now (ages ${curZ.decadal.decadal[0]}–${curZ.decadal.decadal[1]}) your life's spotlight is on <b>${palPlain(curZ.decadal.name).toLowerCase()}</b>; this year it moves to <b>${palPlain(curZ.yearly.name).toLowerCase()}</b>.`, `你现在（${curZ.decadal.decadal[0]}–${curZ.decadal.decadal[1]} 岁）人生的重心在<b>${palPlain(curZ.decadal.name)}</b>；今年的重点转到<b>${palPlain(curZ.yearly.name)}</b>。`) : '';
    h += C('🔭', L('Which part of life each decade focuses on', '每个十年人生的重心'), curZ ? zw.evalPalace(curZ.decadal).tone : 'info', L('Zi Wei 10-year palaces', '紫微大限'),
      `${nowTxt ? `<p>${nowTxt}</p>` : ''}<div class="tlwrap">${rowsZ}</div>`,
      L('Use it as a theme guide: each decade puts one area of life centre stage — career, money, family, health and so on.', '把它当作主题指南：每个十年会让人生的某一个领域成为主角——事业、财运、家庭、健康等。'), null,
      L('Zi Wei 大限: the 12 palaces take turns as the 10-year stage, starting from the Life palace.', '紫微大限：十二宫依序各管十年，从命宫起算。'));
  }

  // This year / next
  const yr = y => {
    const d = b.daYun.find(x => y >= x.startYear && y <= x.endYear); if (!d) return '';
    const ln = d.liuNian.find(x => x.year === y);
    const se = stemEl(ln.gz[0]), be = brEl(ln.gz[1]);
    const fav = [se, be].filter(e => b.favourable.includes(e)).length, unf = [se, be].filter(e => b.unfavourable.includes(e)).length;
    const v = fav === 2 ? ['🟢', L('A strong year', '强运之年')] : fav >= 1 && !unf ? ['🟢', L('A positive year', '顺利之年')] : unf === 2 ? ['🟠', L('A testing year', '考验之年')] : ['🟡', L('A mixed year', '起伏之年')];
    const g1 = TG_GROUP[ln.stemGod], g2 = TG_GROUP[ln.branchGod];
    return `<div class="yr"><b>${v[0]} ${y}${L(' — ', '年（' + ln.gz + '）— ')}${v[1]}</b><br><span class="small">${L('Themes: ', '主题：')}${P2(PLAIN_THEME[g1])}${g1 !== g2 ? SEP() + P2(PLAIN_THEME[g2]) : ''}${L('.', '。')}
      ${ln.clashes.length ? L(' Some sudden changes or friction likely — keep plans flexible.', '可能有突发变化或摩擦——计划保留弹性。') : ''}
      ${d.startYear === y ? L(' A new 10-year season begins — good for fresh starts.', '新的十年大运开始——适合重新出发。') : d.endYear === y ? L(' The last year of a 10-year season — finish what you started.', '十年大运的最后一年——把手上的事做完。') : ''}</span></div>`;
  };
  h += C('🗓', L('This year & next', '今年与明年'), 'info', L('What to expect', '会有什么变化'), yr(qYear) + yr(qYear + 1), null, null, L('Annual pillars compared with your favourable elements and checked for clashes with your chart.', '以流年五行对照你的喜用神，并检查与命盘的冲合。'));

  // Right now
  const cells = Object.values(qn.cells).filter(c => c.p !== 5);
  const best = [...cells].sort((a, c) => c.score - a.score)[0], worst = [...cells].sort((a, c) => a.score - c.score)[0];
  const be = qmBlockEnd(qn);
  const me = qn.stemPalace(b.dm);
  const mins = L(`${Math.floor(be.remain / 60) ? Math.floor(be.remain / 60) + 'h ' : ''}${be.remain % 60} min`, `${Math.floor(be.remain / 60) ? Math.floor(be.remain / 60) + ' 小时 ' : ''}${be.remain % 60} 分钟`);
  const sdNow = qn.doorPalace('生门');
  h += C('🧭', L("Right now — today's decisions", '此刻——今天的决定'), me ? me.tone : 'mixed',
    me && me.tone === 'good' ? L('A good window to act', '适合行动的时段') : me && me.tone === 'warn' ? L('Better to prepare than commit right now', '此刻宜准备，不宜拍板') : L('An okay window', '还可以的时段'),
    `<p>${L(`For the next <b>${mins}</b> (until about ${be.end}):`, `接下来 <b>${mins}</b>（约到 ${be.end}）：`)}</p>
     <ul><li>${L('Best direction to face or head towards: ', '最适合面向或前往的方向：')}<b>${dirName(best.p)}</b>${L(' — good for ', '——利于')}${plainDoor(best.door) || L('action', '行动')}${L('.', '。')}</li>
     <li>${L('Avoid starting important things facing ', '避免面向这个方向开始重要的事：')}<b>${dirName(worst.p)}</b>${L('.', '。')}</li>
     <li>${L('Meetings with bosses / launches: ', '见上司／发布新项目：')}<b>${dirName(qn.doorPalace('开门').p)}</b>${L('. Money matters: ', '。钱财事务：')}<b>${dirName(sdNow.p)}</b>${sdNow.kong ? L(' (but expect delays)', '（但可能有延误）') : ''}${L('.', '。')}</li></ul>`,
    L('This changes every 2 hours — check again before an important meeting.', '每两小时会变化——重要会面前请再查看一次。'), null, `Qi Men ${qn.hourGZ} ${qn.yang ? '阳遁' : '阴遁'}${qn.ju}局: ${me ? QM_PALACE[me.p] + ' ' + me.door : '—'}; best ${QM_PALACE[best.p]} ${best.door}/${best.star}/${best.god}.`);

  // Lucky picks
  h += C('🍀', L('Your lucky picks', '你的幸运元素'), 'good', L('Colours, directions & fields that support you', '对你有帮助的颜色、方位与行业'),
    `<table class="gloss"><tr><th></th><th>${L('Colours', '颜色')}</th><th>${L('Directions', '方位')}</th><th>${L('Fields', '行业')}</th></tr>${b.favourable.map(e => `<tr><td>${elTag(e)}</td><td>${ELP(e).c}</td><td>${ELP(e).d}</td><td>${ELP(e).i}</td></tr>`).join('')}</table>
     ${b.climate ? `<p class="small">${L(`Also helpful: <b>${EL_EN[b.climate.need]}</b> (${ELP(b.climate.need).c}) to balance the season you were born in.`, `另外也有帮助：<b>${EL[b.climate.need]}</b>（${ELP(b.climate.need).c}），可调和你出生季节的寒暖。`)}</p>` : ''}`,
    L('Use them in small ways — clothing, desk position, workspace colours.', '可以在小地方运用——衣着、座位方向、办公环境的颜色。'), null, L(`Favourable elements from Day Master strength (${b.label}).`, `喜用神依日主强弱（${b.label}）判断。`));
  const chip = g => `<button class="gchip" data-go="${g.id}">${g.icon} ${g.title}</button>`;
  const good = glance.filter(g => g.vt === 'good' && g.id !== 'sa-' + (glance.length - 1)), care = glance.filter(g => g.vt === 'warn'), mix = glance.filter(g => g.vt === 'mixed');
  const gl = `<div class="glance"><div class="gl-t">${L('At a glance', '一眼看重点')}</div>
    ${good.length ? `<div class="gl-row"><span class="gl-l">🟢 ${L('Going well', '顺利')}</span><div>${good.map(chip).join('')}</div></div>` : ''}
    ${care.length ? `<div class="gl-row"><span class="gl-l">🟠 ${L('Take care', '需留意')}</span><div>${care.map(chip).join('')}</div></div>` : ''}
    ${mix.length ? `<div class="gl-row"><span class="gl-l">🟡 ${L('Mixed', '好坏参半')}</span><div>${mix.map(chip).join('')}</div></div>` : ''}
    <div class="small muted">${L('Tap any item to jump to it.', '点任一项可跳到该卡片。')}</div></div>`;
  return h.replace('%%GLANCE%%', gl);
}
function renderSimple() {
  if (!STATE) return;
  $('#tab-summary').innerHTML = simpleHtml();
  document.querySelectorAll('.gchip').forEach(b => b.onclick = () => { const el = document.getElementById(b.dataset.go); if (el) el.scrollIntoView({behavior: 'smooth', block: 'start'}); });
}
