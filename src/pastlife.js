// ===== Past Life 前世 tab — a modern, plain-language reading inspired by 三世书 =====
// Classical 三世书 (attributed to 袁天罡) looks up a past-life verse from the birth pillars. Printed editions
// differ, so this module does NOT reproduce any edition's verses. It writes original readings from parts of
// the chart that the tool already calculates, and labels them as a modern interpretation.
//   1. Who you were       ← Year pillar Na Yin 年命纳音 (the "life" element used in classical lookups)
//   2. The gift you kept  ← Day Master 日主
//   3. Unfinished lesson  ← weakest of the Five Elements in the chart
//   4. Why you came back  ← Hour branch 时支 (only when the birth time is known)

const PL_ROLE = {
  海中金:{en:['a pearl diver or keeper of a hidden treasury','You guarded something valuable that few people ever saw.'],zh:['采珠人或宝库的看守者','你守护着珍贵之物，却少有人见过它的光彩。'],
    tr:['Your talent tends to stay hidden until circumstances pull it to the surface, and people take time to earn your trust.','你的才华往往要等时机把它“捞”上来才显露；别人也需要时间才能赢得你的信任。']},
  炉中火:{en:['a blacksmith or kiln master','You spent long days at the furnace turning raw ore into tools people relied on.'],zh:['铁匠或窑师','你在炉火旁日复一日，把原料锻造成人们离不开的器具。'],
    tr:['You have a strong work ethic and like turning rough ideas into something useful. Under pressure you get more intense, not less.','你做事勤奋，喜欢把粗糙的想法打磨成有用的成果；压力越大，你越投入。']},
  大林木:{en:['a forest ranger or village elder','Many families lived under your shelter and came to you for judgement.'],zh:['护林人或村中长老','许多人家在你的庇护下生活，有事都来找你评理。'],
    tr:['You instinctively protect people and think on a large scale, but once you have settled somewhere you are slow to move.','你天生想保护身边的人，眼光放得远；但一旦扎根，就不容易挪动。']},
  路旁土:{en:['a farmer or innkeeper on a busy road','You fed travellers you would never see again, and asked for little in return.'],zh:['大路边的农夫或客栈主人','你款待过无数萍水相逢的旅人，从不求太多回报。'],
    tr:['You are dependable and service-minded, more steady than showy. Remember that your own needs count too.','你可靠、乐于服务，踏实而不张扬；别忘了自己的需要也同样重要。']},
  剑锋金:{en:['a swordsman, guard or magistrate','You enforced the rules and stood between the weak and those who would harm them.'],zh:['剑客、侍卫或判官','你执行规矩，挡在弱者与加害者之间。'],
    tr:['You have a sharp sense of right and wrong and make decisions quickly. The lesson is knowing when to keep the blade sheathed.','你是非分明、决断快；功课是懂得何时收剑入鞘。']},
  山头火:{en:['a signal-fire watchman or travelling preacher','Your light was seen from far away and people found their way by it.'],zh:['山顶烽火的守望者或四处宣讲的人','你的火光远远可见，人们循着它找到方向。'],
    tr:['You inspire people even from a distance, but you burn fast. Pacing yourself is part of this life.','你即使隔着距离也能鼓舞别人，但燃烧得快；这一生要学会调节节奏。']},
  涧下水:{en:['a hermit scholar or herbalist by a mountain stream','You lived simply, studied deeply, and treated villagers who walked up the path.'],zh:['山涧边的隐士书生或草药师','你生活简朴、潜心钻研，替走上山路求助的村民看病。'],
    tr:['Your mind is clear and quietly persistent, and you find a way around obstacles rather than through them.','你头脑清楚、默默坚持，遇到阻碍时会绕道而行，而不是硬碰。']},
  城头土:{en:['a guard on the city walls or a garrison officer','The whole city slept safely because you kept watch.'],zh:['守城的士兵或驻军将官','整座城能安心入睡，是因为你在城头守望。'],
    tr:['You are loyal and like clear structure. You let people in slowly, but once they are in, you defend them.','你忠诚、喜欢清楚的秩序；你慢慢才让人走近，一旦接纳就会全力维护。']},
  白蜡金:{en:['a silversmith or court artisan','You refined metal by candlelight until it was fit for the palace.'],zh:['银匠或宫廷工匠','你在烛光下一遍遍提炼金属，直到它配得上宫廷。'],
    tr:['You have refined taste and high standards. Like soft metal, you become stronger and brighter through experience.','你品味细致、标准很高；像尚未成形的金属，经历越多越坚韧、越发光。']},
  杨柳木:{en:['a poet, musician or boatman on a willow-lined river','You lived by moods and seasons, and people remembered your songs.'],zh:['诗人、乐师，或柳岸河边的船夫','你随四季与心情而活，人们记得你的歌。'],
    tr:['You are graceful, adaptable and sensitive to atmosphere. You bend in storms rather than break.','你柔和、适应力强、能感受气氛；风雨来时你会弯腰，而不是折断。']},
  泉中水:{en:['a well keeper or village healer','Your spring never ran dry, and the whole village drew from it.'],zh:['守井人或村中的医者','你的泉水从不干涸，整个村子都靠它。'],
    tr:['You have deep inner reserves and nourish people steadily. Make sure someone refills you, too.','你内在储备深厚，能稳定地滋养别人；也要确保有人为你补水。']},
  屋上土:{en:['a builder or roof-tile maker, head of a household','You put a roof over many heads and carried the household on your shoulders.'],zh:['建屋匠或烧瓦人，一家之主','你为许多人遮风挡雨，一肩扛起整个家。'],
    tr:['You are a natural provider who thinks about shelter and security first. Let others share the load.','你天生是供养者，凡事先想安全与保障；也要让别人分担一些。']},
  霹雳火:{en:['a herald, drummer or sudden reformer','You arrived like thunder, delivered the message and changed things overnight.'],zh:['传令官、鼓手或雷厉风行的改革者','你像雷声一样出现，传完消息，一夜之间改变局面。'],
    tr:['You have bursts of energy and make sudden, bold moves, and people notice. The lesson is following through after the flash.','你精力爆发、行动大胆，很引人注目；功课是闪光之后还要坚持到底。']},
  松柏木:{en:['a mountain monk or a teacher of discipline','You stood through many winters and taught others to endure.'],zh:['山中僧人或严格的师长','你熬过许多寒冬，也教别人如何坚持。'],
    tr:['You have endurance and integrity, and you tend to age well and grow stronger in later life.','你有耐力、有原则，往往越老越稳、后劲越足。']},
  长流水:{en:['a river trader or ferryman','You moved goods and people along the river and knew someone in every port.'],zh:['河上的商人或摆渡人','你沿河运货载人，每个码头都有熟人。'],
    tr:['You build networks naturally and keep going for the long haul. You feel stuck when life stops moving.','你天生会建立人脉、能长久坚持；生活一停滞，你就会觉得闷。']},
  沙中金:{en:['a gold panner or prospector','You sifted endless sand to find the few grains worth keeping.'],zh:['淘金人或探矿者','你淘过无数的沙，只为找到几粒值得留下的金子。'],
    tr:['You are patient and spot value other people miss. Success often comes later, after a lot of sifting.','你有耐心，能发现别人忽略的价值；成功往往来得较晚，要经过一番淘洗。']},
  山下火:{en:['a hearth keeper or cook in a mountain village','When night fell, people gathered around your fire for food and warmth.'],zh:['山村里守灶的人或厨子','天一黑，人们就围到你的火边取暖、吃饭。'],
    tr:['You are warm to your close circle rather than to crowds, and you create comfort quietly.','你的温暖给身边的小圈子，而不是给大众；你默默营造让人安心的地方。']},
  平地木:{en:['an orchard farmer or village schoolteacher','You planted trees you would never sit under and taught children you would never see grow up.'],zh:['果园农夫或乡村教书先生','你种下自己乘不到凉的树，教着自己看不到长大的孩子。'],
    tr:['You nurture people and projects with steady patience. Your best results come from slow, consistent growth.','你用稳定的耐心培养人和事；最好的成果来自缓慢而持续的成长。']},
  壁上土:{en:['a plasterer, mural painter or household manager','You held the house together from behind the scenes.'],zh:['泥水匠、壁画师或管家','你在幕后把整个家打理得井井有条。'],
    tr:['You support others quietly and well. The lesson is letting yourself be seen and credited.','你默默而周到地支持别人；功课是让自己被看见、被肯定。']},
  金箔金:{en:['a gilder or decorator at court','You made things look magnificent, and you learned how much of status is display.'],zh:['宫廷里的贴金匠或装饰师','你让一切看起来金碧辉煌，也看透了地位有多少只是门面。'],
    tr:['You have a gift for presentation and image. This life asks you to build substance underneath it.','你擅长包装与形象；这一生要你在门面之下建立真正的实力。']},
  覆灯火:{en:['a scholar studying by lamplight or a temple lamp keeper','You kept a small light burning through long nights so others could read and pray.'],zh:['挑灯夜读的书生或寺庙的守灯人','你在长夜里守着一盏灯，让别人能读书、祈祷。'],
    tr:['You love learning and guide people quietly, especially when things are dark for them.','你爱学习，会在别人最低落的时候默默为他们引路。']},
  天河水:{en:['a rainmaker, astronomer or court diviner','You read the sky and brought rain to fields that badly needed it.'],zh:['祈雨师、观星者或朝廷的占卜官','你观天象，为干旱的田地求来甘霖。'],
    tr:['You see the big picture and are generous and idealistic. Keep a foot on the ground.','你眼界开阔、慷慨而理想主义；记得脚要踩在地上。']},
  大驿土:{en:['a post-station master or caravan leader on the imperial highway','Every traveller and every message passed through your hands.'],zh:['官道驿站的驿丞或商队首领','每个旅人、每封信件都经过你的手。'],
    tr:['You are good at logistics and connecting people, and you like travel. You are the bridge others cross.','你擅长统筹、联系人脉，也爱出行；你是别人通过的那座桥。']},
  钗钏金:{en:['a jeweller, or a member of an elegant household','You lived among beautiful things and were valued for your refinement.'],zh:['首饰匠，或高雅人家里的一员','你生活在美好的事物之间，因优雅而受人珍视。'],
    tr:['You have taste and an eye for beauty. Under heavy pressure you can feel fragile, so protect your environment.','你有品味、懂得欣赏美；压力过重时会觉得脆弱，要照顾好自己的环境。']},
  桑柘木:{en:['a silk farmer or weaver','Your patient daily routine of leaves, worms and looms turned into cloth fit for others to wear.'],zh:['蚕农或织工','你每天采桑、养蚕、织布，耐心的日常最后变成别人身上的衣裳。'],
    tr:['You are diligent and create value through routine. Small steps done every day are your superpower.','你勤奋，靠日常的积累创造价值；每天的小步前进就是你的超能力。']},
  大溪水:{en:['a fisherman or boat pilot through rapids','You read the water, took risks and brought the boat home.'],zh:['渔夫或在急流中撑船的人','你会看水势、敢冒险，总能把船带回家。'],
    tr:['You are adventurous and resourceful, and you stay calm in turbulence.','你爱冒险、足智多谋，在动荡中也能保持冷静。']},
  沙中土:{en:['a land surveyor or desert trader','The ground kept shifting under you, and you learned to work with it.'],zh:['土地测量员或沙漠商人','脚下的土地总在变动，你学会了顺势而为。'],
    tr:['You are practical and comfortable with change. You rebuild quickly after setbacks.','你务实、能适应变化；遇到挫折后能很快重新站起来。']},
  天上火:{en:['an astrologer or official in the public eye','Your work was done in full view, and many people depended on your warmth.'],zh:['观星者或众所瞩目的官员','你的一举一动都在众人眼前，许多人依赖你的温暖。'],
    tr:['You are drawn to visibility and a sense of mission, and you warm many people at once.','你喜欢被看见、有使命感，能同时温暖很多人。']},
  石榴木:{en:['a gardener or the head of a large family','Your table was always full, and your house was never quiet.'],zh:['园丁或大家族的家长','你的饭桌总是坐满，家里从不冷清。'],
    tr:['You bring abundance and keep many connections, and you are a generous host. Choose quality over quantity.','你带来丰盛，人缘广，是慷慨的主人；要懂得重质不重量。']},
  大海水:{en:['a sea captain, maritime trader or explorer','You sailed past the edge of the known map.'],zh:['船长、海上商人或探险家','你驶过已知地图的边缘。'],
    tr:['You have big ambitions and a broad tolerance for others, and small ponds make you restless.','你志向远大、胸怀宽广，待在小池塘里会坐立不安。']},
};

const PL_GIFT = {
  甲:['Leadership and the will to build something that lasts.','领导力，以及建立长久事业的意志。'],
  乙:['Diplomacy: getting things done through relationships rather than force.','圆融：靠人际关系而不是硬碰来成事。'],
  丙:['Inspiring people and speaking so that others listen.','鼓舞人心，说话让人愿意听。'],
  丁:['Insight and one-to-one teaching. You notice what others miss.','洞察力与一对一的指导；你能看到别人忽略的东西。'],
  戊:['Reliability. People feel safe leaning on you.','可靠；别人依靠你时感到安心。'],
  己:['Nurturing and handling details so things can grow.','照顾与打理细节，让事物得以成长。'],
  庚:['Courage and decisiveness when others hesitate.','别人犹豫时，你有勇气、能果断。'],
  辛:['Refinement and precision, with an eye for quality.','精致与严谨，对品质有眼光。'],
  壬:['Strategy and vision, seeing where the current is going.','谋略与远见，看得出大势往哪里走。'],
  癸:['Intuition and quiet influence behind the scenes.','直觉，以及在幕后的潜移默化。'],
};

const PL_LESSON = [
  ['Wood','Growth and kindness: planning ahead, starting new things, and being gentle with people who are still learning.','成长与仁慈：提早规划、敢于开始新事物，对还在学习的人多一分宽容。'],
  ['Fire','Expression and joy: letting yourself be seen, saying what you feel, and enjoying the work, not just finishing it.','表达与喜悦：让自己被看见、说出感受，享受过程而不只是把事做完。'],
  ['Earth','Stability and trust: committing, keeping promises, and building a base you can stand on.','稳定与信任：做出承诺、守信，建立一个能站稳的根基。'],
  ['Metal','Boundaries and letting go: saying no, making clean decisions, and ending what has run its course.','界线与放手：学会说不、干脆地做决定，结束已经走到尽头的事。'],
  ['Water','Rest and flexibility: listening before acting, going with the flow, and recharging before you run dry.','休息与灵活：先听再行动、顺势而为，在耗尽之前先充电。'],
];

const PL_RETURN = {
  子:['To start something new. You came back at the beginning of a cycle.','为了开始新的事情——你在一个循环的起点回来。'],
  丑:['To finish slow, patient work you left half done.','为了完成上一世做到一半、需要耐心的工作。'],
  寅:['To be braver. Last time you held back from a fight that mattered.','为了更勇敢——上一世你在重要的事上退缩了。'],
  卯:['To repair a relationship and learn gentleness.','为了修复一段关系，学会温柔。'],
  辰:['To use power well. You carry ambition that needs a worthy goal.','为了善用力量——你带着需要好目标的雄心。'],
  巳:['To turn knowledge into wisdom and share it.','为了把知识化为智慧，并分享出去。'],
  午:['To live fully and openly, not only for duty.','为了活得热烈而坦然，不只是为了责任。'],
  未:['To care for family and be cared for in return.','为了照顾家人，也接受被照顾。'],
  申:['To use your cleverness to help others, not only yourself.','为了用聪明去帮助别人，而不只是自己。'],
  酉:['To refine your craft and stand by your standards.','为了精进手艺，坚持自己的标准。'],
  戌:['To keep faith: loyalty, protecting others, and finishing what you promised.','为了守住信义——忠诚、保护别人，兑现承诺。'],
  亥:['To close a chapter with peace and generosity before a new cycle.','为了在新循环之前，带着平和与慷慨结束一个篇章。'],
};

function pastLifeData() {
  const b = STATE.bazi;
  const yp = b.pillars[0];
  const role = PL_ROLE[yp.nayin];
  const weak = b.scores.reduce((m, s, e) => (s < b.scores[m] ? e : m), 0);
  const hp = b.pillars[3];
  return {yp, role, gift: PL_GIFT[b.dm], weak, lesson: PL_LESSON[weak], hp, ret: hp ? PL_RETURN[hp.zhi] : null};
}

function renderPastLife() {
  if (!STATE) return;
  const b = STATE.bazi, d = pastLifeData();
  const nm = STATE.inp.name;
  const zh = LANG === 'zh';
  const roleName = d.role ? (zh ? d.role.zh[0] : d.role.en[0]) : '';
  let h = `<div class="card plain"><h4>🕯 ${L('Past life 前世 — a modern reading', '前世——现代解读')}</h4>
    <p class="small muted">${L('Inspired by the classical <b>三世书</b> (Book of Three Lives), which reads a past life from the birth pillars. Printed editions differ, so this tab doesn\'t copy any edition\'s verses. It writes original, plain-language readings from your chart. Treat it as a story for reflection, not a fact.',
      '灵感来自古籍<b>《三世书》</b>，它从出生的干支推看前世。各版本内容不一，所以这里不照抄任何版本的诗句，而是根据你的命盘写出原创的白话解读。请当作一个帮助自我反思的故事，而不是事实。')}</p></div>`;

  if (d.role) {
    h += `<div class="hero"><div class="hero-img"><span class="ch big ${EL_CLS[NY[d.yp.nayin].e]}">${d.yp.nayin}</span></div><div>
      <div class="hero-t">${L(`${nm ? nm + ', in' : 'In'} a past life you were ${roleName}`, `${nm ? nm + '，' : ''}前世的你是${roleName}`)}</div>
      <div class="hero-s">${zh ? d.role.zh[1] : d.role.en[1]}</div>
      <div class="small muted">${L(`From your Year pillar ${d.yp.gz} → Na Yin ${d.yp.nayin} (${NY[d.yp.nayin].en})`, `依据：年柱 ${d.yp.gz} → 纳音 ${d.yp.nayin}`)}</div></div></div>`;
  }

  const sec = (icon, title, body, src, ex) => `<div class="scard v-info"><div class="shead"><span class="sicon">${icon}</span><div><div class="stitle">${title}</div><div class="sverd small muted">${src}</div></div></div><div class="sbody"><p>${body}</p></div>${plEx(ex)}</div>`;
  if (d.role) h += sec('👣', L('What still shows in this life', '今生仍留下的痕迹'), zh ? d.role.tr[1] : d.role.tr[0], L(`Year pillar Na Yin ${d.yp.nayin}`, `年柱纳音 ${d.yp.nayin}`), PL_EX_ROLE[d.yp.nayin]);
  if (d.role) h += `<details class="swhy card x-expert"><summary>${L(`Na Yin detail: ${d.yp.nayin}`, `纳音详解：${d.yp.nayin}`)}</summary>${nayinEntry(d.yp.nayin, L('Year pillar', '年柱'))}</details>`;
  h += sec('🎁', L('The gift you carried over', '你带过来的天赋'), L(d.gift[0], d.gift[1]), L(`Day Master ${b.dm} (${EL_EN[b.dmEl]})`, `日主 ${b.dm}（${EL[b.dmEl]}）`), PL_EX_GIFT[b.dm]);
  h += sec('📖', L('The lesson left unfinished', '尚未完成的功课'), L(d.lesson[1], d.lesson[2]), L(`Weakest element in your chart: ${EL_EN[d.weak]} ${EL[d.weak]}`, `命盘中最弱的五行：${EL[d.weak]}`), PL_EX_LESSON[d.weak]);
  if (d.ret) h += sec('🔁', L('Why you came back', '你为什么回来'), L(d.ret[0], d.ret[1]), L(`Hour branch ${d.hp.zhi}`, `时支 ${d.hp.zhi}`), PL_EX_RETURN[d.hp.zhi]);
  else h += `<div class="card small muted">${L('Add your birth time to see the fourth part, "Why you came back", which uses the Hour pillar.', '填入出生时间，即可看到第四部分“你为什么回来”（依据时柱）。')}</div>`;

  h += `<div class="stip">💡 ${L('A useful way to read this: the "past life" is a mirror. Ask which parts feel true about you now, and whether the unfinished lesson points at something worth working on this year.',
    '一个有用的读法：把“前世”当作一面镜子。问问自己哪些描述现在仍然符合你，而那门“未完成的功课”是否正指向今年值得努力的方向。')}</div>`;

  const steps = [
    L(`<b>Who you were</b> comes from the Na Yin 纳音 of your Year pillar (${d.yp.gz} → ${d.yp.nayin}). Classical texts treat the year Na Yin as your "life element" 年命, which is also the anchor of past-life lookups in 三世书.`, `<b>前世身份</b>取自年柱纳音（${d.yp.gz} → ${d.yp.nayin}）。古法把年柱纳音视为“年命”，也是《三世书》推前世的依据。`),
    L(`<b>The gift</b> comes from your Day Master ${b.dm}: the core self you brought with you.`, `<b>天赋</b>取自日主 ${b.dm}：你带来的核心自我。`),
    L(`<b>The unfinished lesson</b> is your weakest element (${b.scores.map((s, e) => EL_EN[e] + ' ' + s.toFixed(1)).join(', ')}). What is missing in the chart is read as what you still need to learn.`, `<b>未完成的功课</b>是最弱的五行（${b.scores.map((s, e) => EL[e] + ' ' + s.toFixed(1)).join('，')}）。命盘缺什么，就当作还需要学什么。`),
    L('<b>Why you came back</b> comes from the Hour branch, the pillar of later life and private ambitions.', '<b>为什么回来</b>取自时支——代表晚年与内心志向的一柱。'),
  ];
  h += `<details class="swhy card x-expert"${document.body.classList.contains('simple') ? '' : ' open'}><summary>${L('How this is worked out', '推算方法')}</summary><ol class="steps small">${steps.map(s => `<li>${s}</li>`).join('')}</ol>
    <p class="small muted">${L('This is a modern interpretation written for this tool, not a classical text. There is no evidence that birth data reveals past lives.', '以上为本工具撰写的现代解读，并非古籍原文。没有证据显示出生资料能揭示前世。')}</p></details>`;
  h += numerologyHtml();
  h += plRefsHtml();
  $('#tab-pastlife').innerHTML = h;
}

function pastLifeGuide() {
  return G('pastlife', L('Past life 前世 & the Book of Three Lives 三世书', '前世与《三世书》'),
    L('A <b>family photo album you never saw</b>. You can\'t prove who is in it, but looking at it can still tell you something about where your habits came from.', '<b>一本你没见过的家族相册</b>。你无法证明里面是谁，但翻一翻，也许能看出自己的习惯从何而来。'),
    `<p>${L('三世书 (attributed to the Tang-dynasty astrologer 袁天罡) is a folk text that describes your past, present and future lives from your birth pillars. Many editions exist and their verses differ, so this tool writes its own modern readings instead of copying one.', '《三世书》相传为唐代袁天罡所作，依出生干支描述前世、今生与来世。版本众多、诗句各异，所以本工具不照抄任何一版，而是写出自己的现代解读。')}</p>` +
    STEPS([
      L('Year pillar Na Yin 纳音 → who you were (30 possible roles).', '年柱纳音 → 前世身份（30 种）。'),
      L('Day Master → the gift you carried over (10).', '日主 → 带来的天赋（10 种）。'),
      L('Weakest of the Five Elements → the lesson left unfinished (5).', '最弱的五行 → 未完成的功课（5 种）。'),
      L('Hour branch → why you came back (12; needs the birth time).', '时支 → 为什么回来（12 种；需要出生时间）。'),
    ]) +
    `<p>${L('<b>Numerology</b> works from the calendar date instead. Reduce the month, day and year to single digits (keeping the master numbers 11, 22 and 33), add them, and reduce again to get the Life Path. Example: 30 Oct 1984 → 1 + 3 + 22 = 26 → 8. Totals that pass through 13, 14, 16 or 19 are called karmic debts. Digits missing from the date are read as lessons to pick up.', '<b>数字命理</b>则用公历日期：把月、日、年各自化为个位数（保留大师数 11、22、33），相加后再化简，就是生命灵数。例：1984 年 10 月 30 日 → 1 + 3 + 22 = 26 → 8。过程中出现 13、14、16、19 称为业债；日期里缺少的数字代表要补上的功课。')}</p>` +
    MATTERS([L('Everyone born in the same two-year Na Yin span shares the same past-life role, so the personal part comes from the other three pieces.', '同一纳音的两年内出生的人前世身份相同，个人差异来自其余三部分。'), L('Read it as reflection, not fact.', '请当作反思，而非事实。')]));
}

// ===== Numerology 数字命理 (Pythagorean, from the calendar birth date) =====
const NUM_LP = {
  1:['The Pioneer','开拓者','Independence and starting things. Past-life theme: you followed others, so now you learn to lead.','独立、开创。前世主题：你曾追随别人，今生要学会带头。'],
  2:['The Peacemaker','调和者','Partnership, tact and patience. Past-life theme: you stood alone; now you learn to cooperate.','合作、圆融、耐心。前世主题：你曾独自承担，今生要学会合作。'],
  3:['The Communicator','表达者','Creativity, words and joy. Past-life theme: your voice was held back; now you learn to express it.','创意、言语与快乐。前世主题：你曾压抑声音，今生要学会表达。'],
  4:['The Builder','建设者','Structure, discipline and hard work. Past-life theme: things fell apart; now you learn to build them to last.','秩序、纪律与勤奋。前世主题：事情曾半途而废，今生要学会建得长久。'],
  5:['The Explorer','探索者','Freedom, change and experience. Past-life theme: you were confined; now you learn to use freedom well.','自由、变化与体验。前世主题：你曾受困，今生要学会善用自由。'],
  6:['The Nurturer','守护者','Family, responsibility and care. Past-life theme: you neglected home or were neglected; now you learn balanced care.','家庭、责任与关怀。前世主题：你曾忽略家或被忽略，今生要学会平衡的照顾。'],
  7:['The Seeker','求道者','Study, depth and inner truth. Past-life theme: you lived on the surface; now you look for meaning.','钻研、深度与内在真理。前世主题：你曾活在表面，今生要寻找意义。'],
  8:['The Achiever','成就者','Power, money and authority. Past-life theme: you either misused power or had none; now you learn to hold it fairly.','权力、财富与权威。前世主题：你曾滥用权力或毫无权力，今生要学会公正地掌握它。'],
  9:['The Humanitarian','博爱者','Compassion, endings and service. Past-life theme: you are closing a long cycle; now you learn to let go and give back.','慈悲、结束与奉献。前世主题：你正在结束一个长循环，今生要学会放手与回馈。'],
  11:['The Intuitive (master 11)','直觉者（大师数 11）','Inspiration and sensitivity, a higher octave of 2. It is often read as an old soul with a message to share.','灵感与敏感，是 2 的高阶。常被视为带着讯息而来的老灵魂。'],
  22:['The Master Builder (master 22)','大建筑师（大师数 22）','Big practical vision, a higher octave of 4: turning dreams into structures that serve many people.','宏大而务实的愿景，是 4 的高阶：把梦想化为服务众人的实体。'],
  33:['The Master Teacher (master 33)','大导师（大师数 33）','Compassionate teaching, a higher octave of 6: guiding and healing others.','慈悲的教导，是 6 的高阶：引导并疗愈别人。'],
};
const NUM_DEBT = {
  13:['Karmic debt 13: past laziness or shortcuts. This life asks for steady effort.','业债 13：前世偷懒或走捷径，今生需要踏实努力。'],
  14:['Karmic debt 14: past misuse of freedom. This life asks for moderation and commitment.','业债 14：前世滥用自由，今生需要节制与承诺。'],
  16:['Karmic debt 16: past ego or broken trust in love. This life brings humbling lessons that rebuild you.','业债 16：前世自负或在感情上失信，今生会有让你谦卑、重建自我的功课。'],
  19:['Karmic debt 19: past misuse of power over others. This life teaches you to accept help.','业债 19：前世以权力压人，今生要学会接受别人的帮助。'],
};
const NUM_MISS = {
  1:['self-confidence and speaking up for yourself','自信，为自己发声'], 2:['patience, intuition and cooperation','耐心、直觉与合作'],
  3:['expressing yourself and trusting your imagination','表达自己，相信想象力'], 4:['order, planning and follow-through','条理、规划与坚持到底'],
  5:['flexibility and staying calm through change','灵活，在变化中保持冷静'], 6:['home, responsibility and accepting care','家庭、责任，以及接受照顾'],
  7:['reflection and learning from experience','反思，从经验中学习'], 8:['handling money and authority','管理金钱与权力'],
  9:['compassion and finishing what you start','慈悲，有始有终'],
};

const digitSum = n => String(n).split('').reduce((a, c) => a + +c, 0);
function numReduce(n, keepMaster = true) {
  const seen = [n];
  while (n > 9 && !(keepMaster && [11, 22, 33].includes(n))) { n = digitSum(n); seen.push(n); }
  return {v: n, seen};
}
function numerology(y, m, d) {
  const rm = numReduce(m), rd = numReduce(d), ry = numReduce(y);
  const compound = rm.v + rd.v + ry.v;
  const lp = numReduce(compound);
  const debts = [...new Set([d, ...rd.seen, ...ry.seen, ...lp.seen].filter(x => NUM_DEBT[x]))];
  const digits = `${y}${m}${d}`;
  const missing = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(k => !digits.includes(String(k)));
  const counts = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(k => digits.split('').filter(c => +c === k).length);
  return {rm, rd, ry, compound, lp, debts, missing, counts, bd: numReduce(d)};
}

function numerologyHtml() {
  const [y, m, d] = STATE.inp.wall;
  const n = numerology(y, m, d);
  const lp = NUM_LP[n.lp.v];
  const chain = r => r.seen.join(' → ');
  const grid = [[4, 9, 2], [3, 5, 7], [8, 1, 6]].map(row => `<tr>${row.map(k => `<td style="text-align:center;width:33%;${n.counts[k - 1] ? '' : 'color:var(--muted)'}">${n.counts[k - 1] ? String(k).repeat(n.counts[k - 1]) : '·'}</td>`).join('')}</tr>`).join('');
  let h = `<h3>🔢 ${L('Numerology 数字命理', '数字命理')}<small>${L('Pythagorean, from your calendar birth date', '毕达哥拉斯法，依公历出生日期')}</small></h3>`;
  h += `<div class="hero"><div class="hero-img"><span class="ch big" style="color:var(--accent)">${n.lp.v}</span></div><div>
    <div class="hero-t">${L('Life Path ' + n.lp.v + ': ' + lp[0], '生命灵数 ' + n.lp.v + '：' + lp[1])}</div>
    <div class="hero-s">${L(lp[2], lp[3])}</div>
    <div class="small">🧭 <b>${L('In everyday life:', '生活中的例子：')}</b> ${L(NUM_EX[n.lp.v][0], NUM_EX[n.lp.v][1])}</div>
    <div class="small muted x-expert">${L('Month', '月')} ${chain(n.rm)} · ${L('Day', '日')} ${chain(n.rd)} · ${L('Year', '年')} ${chain(n.ry)} → ${n.rm.v} + ${n.rd.v} + ${n.ry.v} = ${chain(n.lp)}</div></div></div>`;
  h += `<div class="scard v-${n.debts.length ? 'warn' : 'good'}"><div class="shead"><span class="sicon">⚖️</span><div><div class="stitle">${L('Karmic debt numbers', '业债数')}</div><div class="sverd small muted">${L('13, 14, 16 or 19 appearing in your day or totals', '13、14、16、19 是否出现在出生日或总和中')}</div></div></div>
    <div class="sbody">${n.debts.length ? n.debts.map(k => `<p>${L(NUM_DEBT[k][0], NUM_DEBT[k][1])}</p>`).join('') : `<p>${L('None. Your day and totals don\'t pass through 13, 14, 16 or 19, so numerology reads no karmic debt carried over.', '没有。你的出生日与各总和都没有经过 13、14、16、19，数字命理认为没有带来业债。')}</p>`}</div></div>`;
  h += `<div class="scard v-info"><div class="shead"><span class="sicon">🧩</span><div><div class="stitle">${L('Missing numbers: lessons to pick up', '缺失的数字：需要补上的功课')}</div><div class="sverd small muted">${L('Digits 1–9 that never appear in your birth date (Lo Shu grid)', '出生日期中没有出现的 1–9（洛书九宫格）')}</div></div></div>
    <div class="sbody"><table class="gloss x-expert" style="max-width:220px;font:600 18px 'Noto Serif SC',serif">${grid}</table>
    ${n.missing.length ? `<ul>${n.missing.map(k => `<li><b>${k}</b> · ${L(NUM_MISS[k][0], NUM_MISS[k][1])}</li>`).join('')}</ul>` : `<p>${L('None missing. Every number 1–9 appears.', '没有缺失，1–9 全部出现。')}</p>`}</div></div>`;
  h += `<p class="small muted x-expert">${L('Numerologists differ on method. Some add all the digits in one go, and some read missing numbers from your name instead of your birth date. Like the rest of this tab, it\'s for reflection, not fact.', '各派算法不同：有人把所有数字一次相加，有人用姓名而非生日来看缺失的数字。和本页其他内容一样，仅供反思，并非事实。')}</p>`;
  return h;
}

// ===== Everyday-life examples (shown under each card) =====
const PL_EX_ROLE = {
  海中金:['A colleague finds out years later that you quietly built the system the whole team relies on.','同事多年后才发现，整个团队依赖的那套系统原来是你默默建起来的。'],
  炉中火:['Handed a messy, half-finished project, you are the one who stays late and turns it into something that ships.','接手一个半途而废的烂摊子，你会留下来加班，把它做成能交付的成果。'],
  大林木:['At family gatherings, relatives bring their problems to you, and you end up organising help for everyone.','家庭聚会时，亲戚都把难题拿来问你，最后由你张罗大家的事。'],
  路旁土:['You are the friend who always drives people home after dinner, even when it is out of your way.','你是那个聚餐后总是顺路（甚至不顺路）送大家回家的朋友。'],
  剑锋金:['In a meeting where everyone avoids the hard truth, you are the one who says it out loud.','开会时大家都回避问题，你是那个直接点破的人。'],
  山头火:['You give one talk or post one idea and people you have never met reach out to you about it.','你只讲了一次分享、发了一个想法，就有素未谋面的人来联系你。'],
  涧下水:['When a plan is blocked by policy, you quietly find another route that still gets it done.','计划卡在规定上时，你会悄悄找到另一条能达成目标的路。'],
  城头土:['New team members take months to get close to you, but once they do, you defend them in every review.','新同事要好几个月才能和你熟，可一旦熟了，你在每次评审中都会替他们说话。'],
  白蜡金:['Your first drafts are rough, but by the third revision your work is the most polished in the room.','你的初稿不怎么样，但改到第三版时，往往是全场最精致的。'],
  杨柳木:['When a team is tense, you read the mood and change your approach before anyone says anything.','团队气氛紧张时，你在别人开口前就察觉，并调整做法。'],
  泉中水:['Friends call you when they are drained, and leave the conversation calmer than they arrived.','朋友累垮时会打给你，聊完总比开始时平静。'],
  屋上土:['You are the first to check that everyone has insurance, a roof and a plan B.','你总是第一个确认大家有保险、有住处、有后路的人。'],
  霹雳火:['You decide on a new direction over a weekend and have it moving by Monday.','你一个周末就决定新方向，周一已经开始行动。'],
  松柏木:['You stay with a hard project or relationship long after others have given up, and it pays off later.','别人早已放弃的难事或关系，你还在坚持，后来往往有回报。'],
  长流水:['Wherever you go, you seem to know someone who can help, from a former colleague to a friend of a friend.','无论去哪里，你似乎都认识能帮忙的人，从旧同事到朋友的朋友。'],
  沙中金:['You notice the one good idea buried in a long, messy discussion that everyone else skimmed.','一场又长又乱的讨论里，别人一扫而过，你却挑出唯一的好点子。'],
  山下火:['You would rather host six close friends at home than attend a party of two hundred.','比起两百人的派对，你更愿意在家招待六个好友。'],
  平地木:['You mentor a junior quietly for years, and one day they become your peer.','你默默带一个新人好几年，有一天他成了与你平起平坐的同事。'],
  壁上土:['The event runs smoothly because of you, but your name is not on the thank-you slide.','活动顺利全靠你，但感谢名单上却没有你的名字。'],
  金箔金:['Your slides look excellent. The lesson is making sure the numbers behind them are just as strong.','你的简报做得很漂亮；功课是确保背后的数据同样扎实。'],
  覆灯火:['When a friend is going through a hard time, you are the one sending articles, books and quiet encouragement.','朋友低潮时，你会默默传来文章、书和鼓励。'],
  天河水:['You are the one in the room describing what the industry will look like in ten years.','会议室里描绘十年后行业样貌的人往往是你。'],
  大驿土:['You become the person who connects two teams, two clients or two friends who should have met long ago.','你常常成为牵线的人，把早该认识的两个团队、客户或朋友连起来。'],
  钗钏金:['A cluttered desk or a rude environment drains you faster than long hours do.','比起长时间工作，杂乱的桌面或粗鲁的环境更让你耗神。'],
  桑柘木:['Your savings, fitness or skills grow from small daily habits rather than big bursts.','你的储蓄、体能或技能，靠的是每天的小习惯，而不是一时冲刺。'],
  大溪水:['When a crisis hits at work, you are oddly calm and start steering while others panic.','工作出现危机时，你出奇地冷静，在别人慌乱时开始掌舵。'],
  沙中土:['After a restructure or a move, you settle in and rebuild faster than most.','经历重组或搬迁后，你比大多数人更快适应、重新站稳。'],
  天上火:['You are comfortable on stage or in front of a big audience, and you feel it is part of your purpose.','你在台上或面对大批观众时很自在，觉得这是使命的一部分。'],
  石榴木:['Your phone has hundreds of contacts you actually talk to, and your home is often full of guests.','你的手机里有几百个真正会联系的人，家里也常常宾客满堂。'],
  大海水:['A stable job feels like a small pond to you, and you keep looking at overseas roles or bigger ventures.','安稳的工作对你像个小池塘，你总在留意海外职位或更大的事业。'],
};
const PL_EX_GIFT = {
  甲:['You are often asked to lead a new team or start a project from scratch.','你常被请去带新团队，或从零开始一个项目。'],
  乙:['You get a deal done over coffee that formal meetings could not.','正式会议谈不拢的事，你一杯咖啡就谈成了。'],
  丙:['When you present, people stop looking at their phones.','你一上台讲，大家都放下手机。'],
  丁:['In a one-to-one chat you spot what is really bothering someone before they say it.','一对一聊天时，你能在对方开口前看出他真正的困扰。'],
  戊:['In a crisis people call you first, because they know you will not panic.','出事时大家先打给你，因为知道你不会慌。'],
  己:['You remember the details everyone else forgets: deadlines, birthdays, the small print.','别人忘掉的细节你都记得：截止日期、生日、合约细则。'],
  庚:['When a decision has stalled for weeks, you are the one who makes the call.','一个拖了几周的决定，最后由你拍板。'],
  辛:['You notice the typo, the misaligned logo or the cheap material that others miss.','你能看出别人忽略的错字、歪掉的标志或廉价的材质。'],
  壬:['You see where a market or an organisation is heading before others do, and position early.','你比别人先看出市场或组织的走向，并提早布局。'],
  癸:['You change a decision without ever being the loudest voice in the room.','你从来不是会议上最大声的人，却能改变最后的决定。'],
};
const PL_EX_LESSON = [
  ['Try planning one new thing a quarter, such as a course or a side project, and stick with it past the awkward start.','试着每季规划一件新事，比如一门课或一个副业，并熬过起步时的不顺。'],
  ['Try sharing your work in a team meeting or on social media before it feels "perfect".','试着在作品还没“完美”前，就在团队会议或社交媒体上分享。'],
  ['Try keeping one routine or promise for a full year, such as a weekly call with family.','试着把一个习惯或承诺坚持整整一年，比如每周和家人通一次电话。'],
  ['Try saying no to one request a week that you would normally accept out of guilt.','试着每周拒绝一件你平常出于愧疚而答应的请求。'],
  ['Try booking real rest into your calendar, the same way you book meetings.','试着像安排会议一样，把真正的休息排进日程。'],
];
const PL_EX_RETURN = {
  子:['A career change or a new venture feels more natural to you than polishing the old one.','转行或创业，对你来说比修补旧事更自然。'],
  丑:['You go back to finish a degree, a book or a renovation you started years ago.','你会回头完成多年前开始的学位、书稿或装修。'],
  寅:['You finally raise the issue with your boss or family that you have avoided for years.','你终于向上司或家人提出那件回避多年的事。'],
  卯:['You reconnect with an old friend or relative and repair what went wrong.','你重新联系旧友或亲人，修补过去的裂痕。'],
  辰:['You are given authority, and the test is using it for a goal bigger than yourself.','你被赋予权力，考验在于是否用于比自己更大的目标。'],
  巳:['You turn what you know into teaching, writing or mentoring.','你把所学化为教学、写作或带人。'],
  午:['You take the trip, the hobby or the risk you kept postponing for duty.','你终于去走那趟旅程、培养那个爱好，或冒那个一直因责任而延后的险。'],
  未:['Family becomes the centre: caring for parents or children, and letting them care for you.','家庭成为重心：照顾父母或孩子，也让他们照顾你。'],
  申:['You use your problem-solving to help a community, not only your own career.','你把解决问题的本事用在帮助社群上，而不只是自己的事业。'],
  酉:['You become known for one craft done properly, and you refuse to cut corners.','你因把一门手艺做到位而出名，也坚持不偷工减料。'],
  戌:['You are the one who keeps a promise others have forgotten, years later.','多年后，别人早已忘记的承诺，你仍然兑现。'],
  亥:['Later in life you give away time, money or knowledge freely, and end chapters without bitterness.','人生后段，你会慷慨地付出时间、金钱或知识，并平静地结束各个篇章。'],
};
const NUM_EX = {
  1:['You are happiest running your own project, team or business.','你最开心的时候是主导自己的项目、团队或生意。'],
  2:['You are the one who keeps a partnership or a team working together.','你是让合作关系或团队保持团结的人。'],
  3:['People remember your stories, posts or presentations.','别人会记得你讲的故事、发的文章或做的分享。'],
  4:['You build the process, budget or system that keeps everything running.','你建立让一切运作的流程、预算或系统。'],
  5:['You change jobs, cities or hobbies more than most, and learn from each one.','你换工作、城市或爱好比多数人频繁，并从中学习。'],
  6:['Friends and family turn to you to look after them, sometimes too much.','亲友常依赖你照顾，有时太多了。'],
  7:['You would rather read deeply on one topic than skim many.','你宁愿深入研读一个主题，也不愿浅尝许多。'],
  8:['Money, property and leadership roles keep showing up as the big themes in your life.','金钱、房产与领导角色，一再成为你人生的大主题。'],
  9:['You are drawn to causes, volunteering or work that helps many people.','你会被公益、志愿或能帮助众人的工作吸引。'],
  11:['People say you "just knew" something before it happened.','别人常说你事先就“感觉到”了。'],
  22:['You think in large projects, such as companies, buildings or systems that outlast you.','你想的是大工程，比如能比你活得更久的公司、建筑或系统。'],
  33:['You are the person others come to for guidance and healing.','你是别人寻求指引与疗愈的对象。'],
};

const PL_REFS = [
  ['Palmer, M., Kwok, M.-H. & Brown, K. <i>Three Lives: A Practical Chinese Guide to Reincarnation</i>. An English translation of 三世书 tables with background on the folk tradition.', 'Palmer、Kwok、Brown：《Three Lives: A Practical Chinese Guide to Reincarnation》，三世书表格的英译本，附民间传统背景。'],
  ['万民英 Wan Minying, <i>三命通会</i> (Ming dynasty). The classical source for the 30 Na Yin 纳音 images used for "who you were".', '万民英《三命通会》（明代）：“前世身份”所用三十纳音意象的古典出处。'],
  ['徐升 Xu Sheng, <i>渊海子平</i> (Song dynasty). The foundation text for the Day Master 日主 and Ten Gods.', '徐升《渊海子平》（宋代）：日主与十神的奠基之作。'],
  ['Campbell, F. <i>Your Days Are Numbered: A Manual of Numerology for Everybody</i> (1931). An early modern numerology textbook, often credited with the karmic debt numbers.', 'Campbell, F.《Your Days Are Numbered》（1931）：早期现代数字命理教材，业债数常归功于此书一派。'],
  ['Javane, F. & Bunker, D. <i>Numerology and the Divine Triangle</i> (1979). Covers Life Path, master numbers and karmic numbers.', 'Javane、Bunker《Numerology and the Divine Triangle》（1979）：讲述生命灵数、大师数与业债数。'],
  ['The Lo Shu 洛书 square (the 4-9-2 / 3-5-7 / 8-1-6 magic square from the 河图洛书 tradition) is the grid used for missing numbers.', '洛书九宫（4-9-2 / 3-5-7 / 8-1-6 幻方，出自河图洛书传统）即“缺失数字”所用的格子。'],
];
function plRefsHtml() {
  return `<details class="swhy card"><summary>📚 ${L('References and further reading', '参考资料与延伸阅读')}</summary><ul class="small">${PL_REFS.map(r => `<li>${L(r[0], r[1])}</li>`).join('')}</ul>
    <p class="small muted">${L('The readings on this page are original text written for this tool. These sources describe the traditions they draw on; none of the wording is copied from them.', '本页解读为本工具原创撰写；以上资料说明其所依据的传统，文字并非从中抄录。')}</p></details>`;
}
const plEx = (ex) => ex ? `<div class="stip">🧭 <b>${L('In everyday life:', '生活中的例子：')}</b> ${L(ex[0], ex[1])}</div>` : '';
