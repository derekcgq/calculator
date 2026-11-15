// ===== Plain-language explanations =====
const ex = (title, body, open) => {
  if (LANG === 'zh' && typeof EX_ZH !== 'undefined' && EX_ZH[title]) { const z = EX_ZH[title]; title = z[0]; body = typeof z[1] === 'function' ? z[1]() : z[1]; }
  return `<details class="explain"${open ? ' open' : ''}><summary>ⓘ ${title}</summary><div>${body}</div></details>`;
};

const DM_TEXT = {
  甲:'a tall tree — upright, principled, a natural leader who grows steadily; can be stubborn and hard to bend.',
  乙:'a vine or flower — flexible, diplomatic and resilient; succeeds through networks and adapting rather than force.',
  丙:'the sun — warm, generous, expressive and visible; lights up a room, can burn out or overshare.',
  丁:'a candle flame — thoughtful, refined and intuitive; quietly intense, a guiding light for a few people.',
  戊:'a mountain — steady, reliable and protective; people lean on you; slow to change course.',
  己:'fertile field soil — nurturing, practical and detail-minded; makes things grow, may over-worry.',
  庚:'raw metal or an axe — decisive, direct and righteous; tough under pressure, can come across as blunt.',
  辛:'a jewel — refined, perfectionist and image-conscious; sensitive, shines when polished by challenges.',
  壬:'a river or ocean — big-thinking, adventurous and resourceful; dislikes being contained.',
  癸:'rain or dew — perceptive, imaginative and gentle; works subtly and strategically behind the scenes.',
};
const GOD_MEANING = {
  比肩:{p:'Independence, self-reliance, confidence', l:'Peers, siblings, colleagues of equal standing'},
  劫财:{p:'Competitive drive, boldness, risk-taking; can mean spending or losses', l:'Rivals, competitors, friends who share (or take) resources'},
  食神:{p:'Creativity, enjoyment, gentle self-expression, good taste', l:'Food, leisure, students; children (for women)'},
  伤官:{p:'Brilliance, wit, performance, rebellion against rules', l:'Talent shown publicly, innovation, criticism of authority; children (for women)'},
  偏财:{p:'Generosity, deal-making, opportunism, sociability', l:'Windfalls, business income, investments; father; girlfriend (for men)'},
  正财:{p:'Diligence, thrift, responsibility, practicality', l:'Salary, savings, steady assets; wife (for men)'},
  七杀:{p:'Ambition, courage, intensity, ability to handle crises', l:'Pressure, tough bosses, competition, power; son (for men)'},
  正官:{p:'Discipline, integrity, respect for rules, status-awareness', l:'Career rank, reputation, authority, law; husband (for women); daughter (for men)'},
  偏印:{p:'Intuition, unconventional thinking, independence of mind', l:'Specialist skills, metaphysics, research; step-mother; can bring isolation'},
  正印:{p:'Kindness, learning, patience, desire for security', l:'Education, credentials, mentors, mother, protection, property documents'},
};
const GROUP_PLAIN = {
  peer:'You draw strength from yourself and your peers — independent, self-driven, competitive.',
  output:'You are wired to express — ideas, creativity, performance and speaking up (this is the Hurting Officer / Eating God family).',
  wealth:'You are wired to manage and acquire — practical, results- and money-oriented.',
  officer:'You are wired for structure — duty, career rank, rules and responsibility shape your life.',
  resource:'You are wired to learn and be supported — study, mentors, credentials and security matter to you.',
};
const EL_PRACTICAL = [
  {c:'green', d:'East', i:'education, publishing, design, wellness, agriculture'},
  {c:'red / purple', d:'South', i:'technology, media, energy, F&B, entertainment'},
  {c:'yellow / brown', d:'Centre, NE, SW', i:'property, construction, administration, insurance'},
  {c:'white / gold / silver', d:'West, NW', i:'finance, law, engineering, security, machinery'},
  {c:'black / blue', d:'North', i:'logistics, trade, communication, travel, consulting'},
];
const STAGE_PLAIN = ['new beginnings, vitality','learning, vulnerability, romance','growing confidence','self-made strength','peak power','gradual wind-down','low energy','stillness','storage, accumulation','emptiness, reset','new seeds forming','nurtured, protected'];

const ZW_PALACE_PLAIN = {命宫:'Who you are — personality, core life direction',兄弟:'Siblings, close peers, and your cash flow',夫妻:'Spouse / partner and how you love',子女:'Children, students, creativity, intimacy',
  财帛:'How you earn and handle money',疾厄:'Body, health tendencies, stress points',迁移:'Travel, outside world, how others see you',仆役:'Friends, team members, social circle',交友:'Friends, team members, social circle',
  官禄:'Career, work style, achievements',田宅:'Home, property, family assets',福德:'Inner happiness, mindset, hobbies, spiritual life',父母:'Parents, bosses, authority figures, documents'};
const MUT_PLAIN = {禄:'Prosperity — opportunity, ease and gain flow into this area',权:'Power — drive, control and ambition in this area',科:'Fame — reputation, recognition and smooth help in this area',忌:'Obstacle — attachment, worry or karmic lessons in this area; where you must work harder'};
const QM_STAR_PLAIN = {天蓬:'boldness, risk, big plans — and hidden dangers',天芮:'problems surfacing, learning from mistakes, health matters',天冲:'fast action, courage, pushing forward',天辅:'education, culture, helpful advice',天禽:'stability at the centre, fairness',
  天心:'leadership, planning, healing, sound judgement',天柱:'speech, criticism, breaking things down',天任:'patience, steadiness, property, reliability',天英:'fame, visibility, passion — and impatience'};
const QM_GOD_PLAIN = {值符:'noble authority — powerful backing',螣蛇:'anxiety, illusion, things changing shape',太阴:'quiet help, secrets, behind-the-scenes',六合:'cooperation, partnerships, marriage, deals',
  白虎:'force, pressure, injury risk',玄武:'deception, hidden loss, theft',九地:'stability, patience, long-term holding',九天:'expansion, ambition, going big'};

const BAZI_HOWTO = {
  pillars: `<p>Read each column top to bottom:</p><ul>
    <li><b>Small label on top</b> — the stem's Ten God: what that character <i>is to you</i> (e.g. 正官 = authority/structure). The Day column shows <b>日主 Day Master</b> — that is <b>you</b>.</li>
    <li><b>Big characters</b> — Heavenly Stem (top) and Earthly Branch (bottom). Colour = element (green Wood, red Fire, ochre Earth, grey Metal, blue Water).</li>
    <li><b>Hidden stems 藏干</b> — each branch contains 1–3 stems; their influence is real but quieter. The first one is the strongest ("main qi").</li>
    <li><b>Life stage</b> — how strong your Day Master feels in that branch (Birth → Peak → Tomb…). <b>Na Yin</b> is a poetic element name for the pair.</li>
    <li>Each pillar governs both a life area and an age band — trouble or luck in a pillar shows up in that area.</li></ul>`,
  elements: `<p>The bars show how much of each element your chart holds. Balance is the goal.</p><ul>
    <li><b>Favourable 用神</b> elements are what your chart needs more of — years, careers, colours and directions carrying them tend to feel easier.</li>
    <li><b>Unfavourable 忌神</b> elements are already excessive or harmful to your balance.</li>
    <li><b>Day Master strength</b>: a strong Day Master needs to <i>spend</i> energy (Output, Wealth, Officer); a weak one needs <i>support</i> (Resource, Companions).</li>
    <li>得令 season = born in a month that supports you · 得地 rooted = your element hides in the branches · 得势 allies = supportive stems around you.</li></ul>`,
  gods: `<table class="gloss"><tr><th>Ten God</th><th>Personality</th><th>Life area / people</th></tr>${Object.entries(GOD_MEANING).map(([g, m]) => `<tr><td><b class="g-${TG_GROUP[g]}">${g}</b><br><small>${TG_EN[g]}</small></td><td>${m.p}</td><td>${m.l}</td></tr>`).join('')}</table>
    <p class="small">Each pair is the same relationship in yang/yin form — the first of each pair is the "partial/indirect" (more intense, irregular) version, the second the "direct" (steady, conventional) version.</p>`,
  ho: `<p>The Hurting Officer is the element you produce, with opposite polarity. It is raw talent pushing outward — wit, performance, innovation, critique. It "hurts" the Direct Officer (rules, bosses, reputation).</p><ul>
    <li><b>Good pairings</b>: with Resource (discipline, credentials), with Wealth (talent → income), against Seven Killings (boldness tames pressure).</li>
    <li><b>Classic warning</b>: Hurting Officer meeting Direct Officer (伤官见官) — clashes with authority, contracts or reputation, especially when a Luck Pillar or year brings the missing piece.</li></ul>`,
  inter: `<ul><li><b>Combinations 合</b> (green) — attraction, cooperation, things binding together. They can also "tie up" an element so it works less.</li>
    <li><b>Clashes 冲</b> (red) — movement, conflict, change. A clash between pillars means tension between the life areas those pillars represent (e.g. Year × Month = family background vs career/parents).</li>
    <li><b>Harms & punishments 害刑</b> — subtler friction, misunderstandings, self-inflicted difficulties.</li></ul>`,
  luck: `<p>Every 10 years a new pillar of "external weather" overlays your chart. Its Ten Gods tell you <i>what theme</i> arrives; its elements tell you whether it <i>helps your balance</i>.</p><ul>
    <li><b>Favourable</b> — brings elements you need. <b>Challenging</b> — adds what you already have too much of. <b>Mixed</b> — some of each.</li>
    <li>The stem dominates roughly the first 5 years, the branch the last 5.</li>
    <li>Inside each decade, annual pillars 流年 add a second layer. A year that clashes your Day branch often marks moves, relationship shifts or health watch-points.</li></ul>`,
};

function baziSummary(b, qYear) {
  const dom = b.dominant[0][0];
  const cd = b.daYun.find(d => qYear >= d.startYear && qYear <= d.endYear);
  const fav = b.favourable.map(e => `<b>${EL_EN[e]}</b> (${EL_PRACTICAL[e].c}; ${EL_PRACTICAL[e].i})`).join(', ');
  let s = `<p>Your Day Master is <b>${b.dm} ${stemYang(b.dm) ? 'Yang' : 'Yin'} ${EL_EN[b.dmEl]}</b> — ${DM_TEXT[b.dm]}</p>`;
  s += `<p>It is <b>${b.label.split(' ').slice(0, -1).join(' ').toLowerCase()}</b>, so you ${b.strong ? 'do best when you have outlets to spend energy — output, money-making and responsibility' : 'do best with support — learning, mentors, allies and a solid base'}. ${GROUP_PLAIN[dom]}</p>`;
  s += `<p>Elements that help you: ${fav}.</p>`;
  if (b.ho.present) {
    const p = b.ho.patterns[0];
    s += `<p>Hurting Officer is ${b.ho.visible.length ? '<b>visible</b> — openly part of how you operate' : 'present but <b>hidden</b> — talent and critique you show selectively'}${p ? `; key pattern: <b>${p.name}</b>` : ''}.</p>`;
  }
  if (cd) s += `<p><b>Right now (${qYear})</b> you are in the ${cd.gz} decade (age ${cd.startAge}–${cd.endAge}): ${GOD_MEANING[cd.stemGod].l.split(';')[0].toLowerCase()} / ${GOD_MEANING[cd.branchGod].p.split(',')[0].toLowerCase()} themes, rated <b>${cd.rating.toLowerCase()}</b> for your balance.</p>`;
  return `<div class="card plain"><h4>📖 Your chart in plain words</h4>${s}</div>`;
}
function luckPlain(d) {
  if (LANG === 'zh') { const sg = GOD_MEANING_ZH[d.stemGod], bg = GOD_MEANING_ZH[d.branchGod];
    return `<p class="plainline"><b>简单来说：</b>这十年前段的主题是<b>${d.stemGod}</b>——${sg[0]}；${sg[1]}。后段转为<b>${d.branchGod}</b>——${bg[0]}。整体评为<b>${RATING_ZH[d.rating]}</b>，因为它${d.rating === 'Favourable' ? '带来命局需要的五行' : d.rating === 'Challenging' ? '加重了命局已经过多的五行' : '带来的五行有利有弊'}。</p>`; }
  const sm = GOD_MEANING[d.stemGod], bm = GOD_MEANING[d.branchGod];
  return `<p class="plainline"><b>In plain words:</b> early in this decade the theme is <b>${TG_EN[d.stemGod]}</b> — ${sm.p.toLowerCase()}; ${sm.l.toLowerCase()}. Later it shifts to <b>${TG_EN[d.branchGod]}</b> — ${bm.p.toLowerCase()}. Overall it is <b>${d.rating.toLowerCase()}</b> because it ${d.rating === 'Favourable' ? 'brings elements your chart needs' : d.rating === 'Challenging' ? 'adds elements you already have too much of' : 'brings a mix of helpful and unhelpful elements'}.</p>`;
}

const ZW_HOWTO = `<ul>
  <li>The 12 boxes are the 12 <b>palaces</b> — each is one area of life (name at the bottom of each box). Your <b>命宫 Life palace</b> is outlined.</li>
  <li><b>Purple bold stars</b> are the 14 main stars — the personality of that life area. <b>Blue</b> stars are helpers; <b>red</b> stars are troublemakers (擎羊, 陀罗, 火星, 铃星, 地空, 地劫).</li>
  <li>Small grey letter after a star = brightness: 庙/旺 strong and positive, 得/利 decent, 平 neutral, 陷 weak (the star struggles).</li>
  <li>Coloured tags are the <b>Four Transformations 四化</b>: <em class="m-禄">禄</em> prosperity, <em class="m-权">权</em> power, <em class="m-科">科</em> fame, <em class="m-忌">忌</em> obstacle.</li>
  <li>The age range in each box is that palace's 10-year period. <b>大限</b> marks your current decade; <b>流年</b> the current year's palace.</li>
  <li>An empty palace "borrows" the stars of the opposite box.</li></ul>
  <table class="gloss">${Object.entries(ZW_PALACE_PLAIN).filter(([k]) => k !== '交友').map(([k, v]) => `<tr><td><b>${k}</b><br><small>${ZW_PALACE_EN[k]}</small></td><td>${v}</td></tr>`).join('')}</table>`;

function zwSummary(zw) {
  const life = zw.byName('命宫'), le = zw.evalPalace(life);
  const stars = le.stars.map(s => `<b>${s.name}</b> (${(ZW_STAR_KW[s.name] || '').split('—')[0].trim()}: ${(ZW_STAR_KW[s.name] || '').split('—')[1] || ''})`).join(' and ');
  const mut = Object.entries(zw.mutLoc).map(([k, v]) => `${'禄权科忌'.includes(k) ? `<em class="m-${k}">${k}</em>` : k} ${v.star} → <b>${v.palace.en}</b>`).join(' · ');
  const cur = zw.current;
  return `<div class="card plain"><h4>📖 Your Zi Wei chart in plain words</h4>
    <p>Your Life palace holds ${stars || 'no main star'}${le.borrowed ? ' (borrowed from the opposite palace)' : ''} — this is the core of your personality in Zi Wei.</p>
    <p>Birth-year transformations: ${mut}. Prosperity (禄) shows where life flows easily for you; Obstacle (忌) shows where you invest the most worry or effort.</p>
    ${cur ? `<p><b>Now:</b> your 10-year period runs through the <b>${cur.decadal.en}</b> palace — ${(ZW_PALACE_PLAIN[cur.decadal.name] || '').toLowerCase()} is the stage this decade plays out on. This year highlights <b>${cur.yearly.en}</b>.</p>` : ''}</div>`;
}

const QM_HOWTO = `<p>Qi Men is a map of the moment: the 9 boxes are 9 directions (South at top, like a Chinese compass). Each box stacks four layers:</p><ul>
  <li><b>Deity</b> (top line) — the spiritual mood: ${Object.entries(QM_GOD_PLAIN).slice(0, 4).map(([k, v]) => `${k} ${v}`).join('; ')}…</li>
  <li><b>Star</b> + <b>Heaven stem</b> — the timing/climate and what's "arriving".</li>
  <li><b>Door</b> + <b>Earth stem</b> — the human action and what's already in place. Doors matter most: <span class="qdoor d1">开 休 生</span> are lucky, <span class="qdoor d-1">伤 惊 死</span> unlucky, <span class="qdoor d0">景 杜</span> neutral.</li>
  <li><b>空</b> void = things fall through or are delayed; <b>马</b> = movement, travel, speed.</li></ul>
  <p><b>Birth chart</b> describes your innate strategy. <b>Query time</b> (now) is used for decisions: find the box with the door that matches your goal (开门 career, 生门 money, 六合 partnerships) and that box's direction is favourable for action now. Tap any box for its meaning.</p>`;

function qmPalacePlain(c) {
  if (!c || c.p === 5) return '';
  const d = dirName(c.p);
  const verdict = c.tone === 'good' ? L(`the ${d} is supportive at this time — good for ${plainDoor(c.door) || 'action'}.`, `${d}此时有利——适合${plainDoor(c.door) || '行动'}。`)
    : c.tone === 'warn' ? L(`the ${d} carries friction right now — avoid starting important things facing this way.`, `${d}此时有阻力——避免面向这个方向开始重要的事。`)
    : L(`the ${d} is mixed — usable with care.`, `${d}吉凶参半——可用，但要小心。`);
  return `<div class="card plain"><h4>${L(QM_PALACE[c.p] + ' palace', QM_PALACE[c.p].split(' ')[0] + '宫 · ' + d)} ${tone(c.tone)}</h4>
    <p><b>${L('Door', '门')} ${c.door}</b> — ${plainDoor(c.door)}${L('.', '。')}</p>
    <p><b>${L('Star', '星')} ${c.star}</b> — ${qStar(c.star)}${L('.', '。')}</p>
    <p><b>${L('Deity', '神')} ${c.god}</b> — ${qGod(c.god)}${L('.', '。')}</p>
    <p class="small">${L(`Heaven stem ${c.heaven}${c.heaven2 ? '/' + c.heaven2 : ''} over Earth stem ${c.earth}.`, `天盘干 ${c.heaven}${c.heaven2 ? '/' + c.heaven2 : ''}，地盘干 ${c.earth}。`)}${c.kong ? L(' Void 空 — plans here tend to be delayed or empty.', ' 空亡——这里的计划容易延误或落空。') : ''}${c.ma ? L(' Horse 马 — movement and speed.', ' 驿马——动、快。') : ''}</p>
    <p class="plainline"><b>${L('In plain words:', '简单来说：')}</b> ${verdict}</p></div>`;
}

const CROSS_HOWTO = `<p>Each life area is read independently by three systems that use different maths:</p><ul>
  <li><b>BaZi</b> — elemental balance and Ten Gods from your four pillars.</li>
  <li><b>Zi Wei</b> — stars placed in 12 life palaces from your lunar birth date and hour.</li>
  <li><b>Qi Men</b> — the "energy map" of your birth hour (or now, for the Now row).</li></ul>
  <p><span class="tone good">Supportive</span> = this system sees ease/opportunity. <span class="tone warn">Caution</span> = friction or extra effort. <span class="tone mixed">Mixed</span> = neither stands out. When <b>2–3 systems agree</b>, take it seriously; a single system on its own is a weak hint.</p>`;

const COMPAT_HOWTO = `<ul>
  <li><b>Day Master roles</b> — who they are to you in Ten-God terms. Each relationship has an "ideal" role: e.g. a boss ideally gives structure (正官) or support (正印); a friend ideally is an equal (比肩).</li>
  <li><b>Element exchange</b> — does their chart supply what yours lacks, and vice versa? The most practical measure of "feeling good together".</li>
  <li><b>Pillar interactions</b> — combinations (bond) or clashes (friction) between the pillars that matter for this relationship.</li>
  <li><b>Zi Wei 飞化</b> — their birth-year transformations "fly" into your chart: Prosperity 禄 into a relevant palace = they bring benefit; Obstacle 忌 = a karmic lesson or burden.</li>
  <li><b>Qi Men now</b> — the present dynamic only: who has the upper hand or is supporting whom <i>at this moment</i>. It changes every two hours.</li></ul>
  <p>The bars show each factor from −(red, friction) to +(green, support). The score is a weighted blend — weights change per role.</p>`;

const ROLE_TIP = {
  比肩:'Treat them as an equal; agree on who leads what to avoid "two captains".',
  劫财:'Great energy, but keep money, credit and resources clearly separated.',
  食神:'Easy and pleasant — you naturally give; make sure the giving is noticed and returned.',
  伤官:'They bring out your sharp side — channel it into ideas and results, not criticism.',
  偏财:'Dynamic and opportunistic — keep expectations explicit so it stays a win-win.',
  正财:'Steady and loyal — reliability builds it; avoid treating it as purely transactional.',
  七杀:'They push you hard — set boundaries, and use the pressure to grow rather than resist it.',
  正官:'They provide structure — earn trust through consistency; push back via proposals, not defiance.',
  偏印:'Original, insightful support — give them space; don\'t expect constant warmth.',
  正印:'Nurturing and protective — accept the support without becoming dependent.',
};
function compatPlain(r, nm) {
  const keys = Object.keys(r.W).filter(k => r.W[k]);
  const best = keys.reduce((a, k) => r.comp[k] > r.comp[a] ? k : a, keys[0]);
  const worst = keys.reduce((a, k) => r.comp[k] < r.comp[a] ? k : a, keys[0]);
  const lbl = {dm:['how your roles fit','彼此角色是否合适'], el:['how your elements complement each other','五行能否互补'], br:['how your key pillars interact','关键柱位的合冲'], zw:['your deeper "star" connections (Zi Wei)','更深层的星曜联系（紫微）'], qm:['the timing right now','此刻的时机']};
  const lb = k => L(lbl[k][0], lbl[k][1]);
  const role = purposeLabel(r.purposeKey);
  const fit = r.score >= 60 ? L('🟢 Good fit for this role.', '🟢 这个关系很合适。') : r.score >= 45 ? L('🟡 Workable — it needs awareness and communication.', '🟡 可以相处——需要多留意、多沟通。') : L('🟠 Expect friction in this role — clear boundaries help.', '🟠 这个关系中容易有摩擦——划清界线会有帮助。');
  return `<div class="card plain"><h4>📖 ${L('In plain words', '简单来说')}</h4>
    <p>${L(`As your <b>${role.toLowerCase()}</b>, ${nm} scores <b>${r.score}/100 — ${r.verdict.toLowerCase()}</b>.`, `作为你的<b>${role}</b>，${nm}的分数是 <b>${r.score}/100——${VERDICT_TXT[r.verdict]}</b>。`)}</p>
    <p>${L(`To you, ${nm} is ${GOD_ROLE[r.gAB]}`, `对你来说，${nm}是${GOD_ROLE_ZH[r.gAB]}`)}<span class="x-expert"> (${r.gAB}${L(' ' + TG_EN[r.gAB], '')})</span>${L('. To them, you are ', '。对对方来说，你是')}${L(GOD_ROLE_REV[r.gBA][0], GOD_ROLE_REV[r.gBA][1])}<span class="x-expert"> (${r.gBA}${L(' ' + TG_EN[r.gBA], '')})</span>${L('.', '。')}</p>
    <p class="small">${fit} ${L('Tap other roles below — the same person can suit one role better than another.', '点下面其他关系看看——同一个人可能更适合某种关系。')}</p>
    <p>${L('Strongest point: ', '最大优点：')}<b>${lb(best)}</b>${r.comp[best] > 0.2 ? '' : L(' (only mildly positive)', '（只是略为正面）')}${L('. Main friction: ', '。主要摩擦：')}<b>${lb(worst)}</b>${r.comp[worst] < -0.2 ? '' : L(' (minor)', '（轻微）')}${L('.', '。')}</p>
    <p class="plainline"><b>${L('Tip:', '建议：')}</b> ${L(ROLE_TIP[r.gAB], ROLE_TIP_ZH[r.gAB])}</p></div>`;
}
