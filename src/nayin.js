// ===== Na Yin 纳音 encyclopedia (30 entries, paraphrased from classical sources such as 三命通会) =====
const NY = {
  海中金:{e:3,en:'Sea Gold',alias:'',img:'A pearl in the Dragon King\'s palace — gold lying at the bottom of the sea.',
    origin:'子 is the strongest Water and 丑 is wet earth. Metal "dies" in 子 and is "stored" in 丑, so the gold is hidden underwater: valuable but not yet seen.',
    traits:'Deep, reserved and self-contained. Real talent that only shows when circumstances bring it to the surface; often a late bloomer. Values security; dislikes showing off.',
    likes:'Clashes or a void (空亡) that "dredge" it up and expose its value; open water. It does not need Fire to be forged; it is already formed.',
    fears:'Being buried deeper by heavy Earth; staying hidden too long.'},
  炉中火:{e:1,en:'Furnace Fire',img:'The blacksmith\'s furnace — heaven and earth as the forge, yin and yang as the charcoal.',
    origin:'Fire is "born" in 寅 and Wood in 寅卯 is fuel, so the fire is contained and purposeful, like a furnace.',
    traits:'Hard-working, transformative, purposeful. Turns raw material into something useful; warm to insiders, intense under pressure.',
    likes:'Wood to fuel it (especially 大林木, 平地木); Metal to work on, since a forge exists to shape metal.',
    fears:'Large water (大海水, 天河水) that puts out the furnace.'},
  大林木:{e:0,en:'Great Forest Wood',img:'A vast forest on open land.',
    origin:'辰 is the open wilds and 巳 is when the six yang are complete: branches and leaves at their fullest.',
    traits:'Broad-minded, generous, protective, likes to shelter others. Thinks big; can be slow to move once established.',
    likes:'Water to nourish, Earth to root; space to grow.',
    fears:'Sharp metal such as 剑锋金 (the axe); fire on the mountain.'},
  路旁土:{e:2,en:'Roadside Earth',img:'Soil by the roadside — it grows the crops that feed travellers.',
    origin:'Fire in 午 produces Earth that is still unformed in 未; the soil is fertile but needs rain.',
    traits:'Practical, dependable, of service to many people, modest. Steady rather than glamorous.',
    likes:'Rain (天河水) to make it fertile; Wood to work and plough it (folk rule: roadside earth "gets made" by wood).',
    fears:'Too much fire, which dries it into dust.'},
  剑锋金:{e:3,en:'Sword-Edge Metal',img:'A sharpened sword blade.',
    origin:'申 and 酉 are where Metal is at its height (临官, 帝旺), and Water stems temper it, giving the sharpest edge.',
    traits:'Sharp, decisive, courageous, principled; protective of justice. Can be cutting or uncompromising.',
    likes:'Water to temper it; some Fire to forge it (folk rule: a sword is made by fire).',
    fears:'Overwhelming fire that melts the blade; being kept sheathed with no purpose.'},
  山头火:{e:1,en:'Mountain-Top Fire',img:'A wildfire or beacon on the mountain top at dusk.',
    origin:'戌 and 亥 are "heaven\'s gate" at the end of the day; the fire burns high on the mountain, seen from afar.',
    traits:'Bright, ambitious, visible, expansive; inspires others from a distance. Burns fast and can scatter.',
    likes:'Wood to fuel it; wind and space to spread.',
    fears:'Large water; lack of fuel, which leads to burn-out.'},
  涧下水:{e:4,en:'Stream Water',img:'A clear stream running down a ravine.',
    origin:'Water is at its peak in 子 and is held by 丑 earth banks: a narrow, clear and fast stream.',
    traits:'Clear-minded, intelligent, pure, quietly persistent. Finds a way around obstacles.',
    likes:'Metal at its source (金生水); mountains to give it direction.',
    fears:'Heavy Earth that blocks or muddies it.'},
  城头土:{e:2,en:'City-Wall Earth',img:'Earth piled into the walls of a city.',
    origin:'寅 is the mountains (艮) and 卯 brings the earth together into ramparts that protect the city.',
    traits:'Protective, loyal, structured, dependable; a guardian. Conservative, slow to let people in.',
    likes:'Fire and Earth to strengthen it; a mission to defend.',
    fears:'Strong Wood breaking the walls; floods that wash them away.'},
  白蜡金:{e:3,en:'White Wax Metal',img:'Soft white-wax metal, still malleable.',
    origin:'Metal is "raised" in 辰 and "born" in 巳; it is still forming and not yet hard.',
    traits:'Refined, gentle, adaptable, artistic; a strong potential that needs polishing through experience.',
    likes:'Fire to refine it (炉中火); good mentors.',
    fears:'Too much water, which leaves it unformed.'},
  杨柳木:{e:0,en:'Willow Wood',img:'Willow branches swaying in the wind.',
    origin:'Wood "dies" in 午 and is stored in 未; the wood is soft and pliant.',
    traits:'Gentle, graceful, adaptable, artistic and sensitive; bends without breaking.',
    likes:'Water and gentle earth (riverbanks).',
    fears:'Metal cutting it; harsh environments.'},
  泉中水:{e:4,en:'Spring Water',img:'Water bubbling from a spring.',
    origin:'申 and 酉 are Metal at full strength producing Water at the source, so the supply is endless.',
    traits:'Resourceful, pure, generous with ideas, reliable supplier. Quietly abundant.',
    likes:'Metal (its source); open channels.',
    fears:'Earth sealing the spring.'},
  屋上土:{e:2,en:'Roof-Tile Earth',img:'Fired roof tiles sheltering a house.',
    origin:'Fire stems 丙 and 丁 bake the earth of 戌 and 亥 into tiles that sit high on the house.',
    traits:'Protective, responsible, family-minded; provides shelter and standards.',
    likes:'Wood (the beams that hold it up) and Fire (the kiln).',
    fears:'Being without support; strong shocks.'},
  霹雳火:{e:1,en:'Thunderbolt Fire',img:'Lightning in a storm.',
    origin:'Fire appears in the Water months 子 and 丑, so it is a flash within the storm.',
    traits:'Sudden brilliance, charisma, quick decisions; bursts of energy and temper.',
    likes:'Water (folk rule: thunderbolt fire meeting water brings fortune); wind and thunder.',
    fears:'Being contained; long periods without stimulation.'},
  松柏木:{e:0,en:'Pine & Cypress Wood',img:'Pines and cypresses green through the frost.',
    origin:'Wood is strong in 寅 and 卯 while Metal stems press on it, like evergreens standing in snow.',
    traits:'Resilient, upright, enduring, principled; associated with long life and integrity.',
    likes:'Earth and Water; challenges ("frost") that prove its strength.',
    fears:'Fire.'},
  长流水:{e:4,en:'Long-River Water',img:'A long river flowing east.',
    origin:'辰 is the Water storage and Metal is born in 巳 to feed it, so the river never runs dry.',
    traits:'Persistent, far-reaching, long-term thinker; adaptable and patient.',
    likes:'Metal to feed it; a clear course.',
    fears:'Earth damming it.'},
  沙中金:{e:3,en:'Sand Gold',alias:'砂石金',img:'Gold dust mixed in sand and stone.',
    origin:'Metal is at "bath" in 午 and weak in 未; the gold is scattered in sand and must be panned.',
    traits:'Hidden worth that must be discovered; diligent, detail-oriented, improves with effort.',
    likes:'Water to wash it; Fire to refine it (folk rule: sand gold needs fire).',
    fears:'Heavy Earth burying it.'},
  山下火:{e:1,en:'Foot-of-Mountain Fire',img:'The evening sun or a fire at the foot of the mountain.',
    origin:'Fire is weak in 申 and 酉 (sunset), so the light is low and warm.',
    traits:'Gentle warmth, nurturing, introspective; a quiet light for those nearby.',
    likes:'Wood to keep it going; Water is tolerated (folk rule: it meets water and finds fortune).',
    fears:'Being smothered by Earth.'},
  平地木:{e:0,en:'Flat-Land Wood',img:'Plants and young trees growing across the plains.',
    origin:'戌 is open land and Wood is "born" in 亥, so new growth spreads across the plain.',
    traits:'Humble, steady, sociable, grows broadly through networks; practical.',
    likes:'Earth and Water; sunshine (Fire in moderation).',
    fears:'Metal cutting it; harsh frost.'},
  壁上土:{e:2,en:'Wall Earth',img:'Plaster on a wall.',
    origin:'Water in 子 and 丑 mixes with earth into mud plaster, which needs a frame to cling to.',
    traits:'Supportive, holds things together, prefers working within a structure; reliable.',
    likes:'Wood (the frame, e.g. 平地木 or 大林木).',
    fears:'Big water washing it off.'},
  金箔金:{e:3,en:'Gold Leaf',img:'Gold beaten into thin leaf to decorate.',
    origin:'Metal is "absent" in Wood-strong 寅 and 卯, so there is only a thin layer of gold.',
    traits:'Elegant, image-conscious, artistic; adds beauty and value to things. Can be fragile.',
    likes:'Wood to be applied onto; refined settings.',
    fears:'Fire.'},
  覆灯火:{e:1,en:'Lamp Fire',alias:'灯头火',img:'A lamp lighting the room at night.',
    origin:'辰 and 巳 are the hours before noon; the small flame illuminates where the sun doesn\'t reach.',
    traits:'Illuminating, studious, a guide to others; steady rather than dramatic.',
    likes:'Wood (oil and wick); night-time (it shines when others are dark).',
    fears:'Wind and water.'},
  天河水:{e:4,en:'Milky Way Water',img:'Rain falling from the Milky Way.',
    origin:'Water appears in the hottest months 午 and 未, like rain from the sky that cools everything.',
    traits:'Generous, idealistic, benefits everyone; lofty and broad-minded.',
    likes:'Nourishing Earth and Wood. Folk rule: it is not harmed by Earth.',
    fears:'Little; it can feel detached from day-to-day matters.'},
  大驿土:{e:2,en:'Highway Earth',img:'The great post road linking cities.',
    origin:'戊 and 己 earth in 申 and 酉: a broad, flat road for travel and commerce.',
    traits:'Broad, connecting, tolerant; loves travel and networks; a facilitator.',
    likes:'Movement, travel (驿马), Wood to give it purpose (folk rule).',
    fears:'Stagnation.'},
  钗钏金:{e:3,en:'Hairpin & Bracelet Gold',img:'Gold made into jewellery.',
    origin:'Metal is stored in 戌 and weak in 亥: refined into small, beautiful ornaments.',
    traits:'Refined, beautiful, careful, comfort- and image-conscious; valued and kept close.',
    likes:'Water to polish it; appreciation.',
    fears:'Fire that melts the ornament.'},
  桑柘木:{e:0,en:'Mulberry Wood',img:'Mulberry trees whose leaves feed silkworms.',
    origin:'Water in 子 and 丑 nourishes wood that is practical rather than grand; it feeds silk-making.',
    traits:'Practical, productive, useful, diligent; creates value for others.',
    likes:'Water and Earth.',
    fears:'Metal axes.'},
  大溪水:{e:4,en:'Great Stream Water',img:'A rushing stream through valleys.',
    origin:'Water flows through the Wood-strong east (寅 and 卯), rushing and winding.',
    traits:'Energetic, adventurous, eloquent; roams widely and gathers experience.',
    likes:'Metal at its source; mountains to guide it.',
    fears:'Earth blocking it.'},
  沙中土:{e:2,en:'Sand Earth',img:'Sandy soil.',
    origin:'Earth is stored in 辰 and "born" in 巳 with Fire stems; it is loose, light earth.',
    traits:'Adaptable, versatile, unattached, easy-going; fits many settings.',
    likes:'Water to bind it; Wood (folk rule: sand earth is made by wood).',
    fears:'Wind scattering it.'},
  天上火:{e:1,en:'Sky Fire',img:'The sun in the sky.',
    origin:'Fire is at its peak in 午 and 未, so it sits high in the sky.',
    traits:'Radiant, generous, public-facing, leadership; can be domineering.',
    likes:'Wood; also Water (folk rule: sun with rain gives a rainbow, so sky fire meeting water is fortunate).',
    fears:'Little; mainly overdoing it.'},
  石榴木:{e:0,en:'Pomegranate Wood',img:'A pomegranate tree bearing fruit in autumn.',
    origin:'Wood is "extinct" in Metal-strong 申 and 酉, yet the pomegranate fruits in autumn: tenacity against the odds.',
    traits:'Perseverant, late-fruiting, many talents, family-oriented; sweetness inside a tough shell.',
    likes:'Metal season (it thrives under pressure); Water.',
    fears:'Fire.'},
  大海水:{e:4,en:'Great Ocean Water',img:'The vast ocean.',
    origin:'戌 and 亥 gather all waters into the sea.',
    traits:'Vast, tolerant, deep, ambitious; unpredictable moods.',
    likes:'Metal; folk rule: it is not harmed by Earth.',
    fears:'Little; it can overwhelm others.'},
};
// folk "controlled yet benefits" exceptions 相克反吉
const NY_EXCEPT = {1:['剑锋金','沙中金'], 4:['天上火','霹雳火','山下火'], 2:['天河水','大海水'], 0:['路旁土','大驿土','沙中土']};
const NY_PILLAR = {Year:'年命 Life Na Yin — the traditional "you" in Na Yin readings and in 合婚 matching', Month:'Career and parents environment', Day:'Your own nature and your marriage', Hour:'Children and later life'};

function nayinPairs(name) {
  const out = [];
  for (let i = 0; i < 60; i++) { const gz = STEMS[i % 10] + BRANCHES[i % 12]; if (nayin(gz) === name) out.push({gz, i}); }
  return out;
}
function nayinYears(gz) {
  const i = gzIndex(gz); const ys = [];
  for (let y = 1900; y <= 2060; y++) if (((y - 4) % 60 + 60) % 60 === i) ys.push(y);
  return ys;
}
function nayinRelation(a, b) {
  // effect of b on a
  const ea = NY[a].e, eb = NY[b].e;
  if (ea === eb) return {t:'mixed', x:'Same element: kindred, but can compete'};
  if ((eb + 1) % 5 === ea) return {t:'good', x:`${b} produces ${a}: supports it`};
  if ((ea + 1) % 5 === eb) return {t:'mixed', x:`${a} produces ${b}: it gives, which drains it`};
  if ((ea + 2) % 5 === eb) return {t:'mixed', x:`${a} controls ${b}: it leads`};
  // b controls a
  if ((NY_EXCEPT[eb] || []).includes(a)) return {t:'good', x:`${b} controls ${a}, but folk rule says ${a} benefits (相克反吉)`};
  return {t:'warn', x:`${b} controls ${a}: pressure on it`};
}
function nayinEntry(name, where) {
  const d = NY[name]; if (!d) return '';
  const pairs = nayinPairs(name);
  const rel = (fn) => Object.keys(NY).filter(fn).join(' · ');
  const e = d.e;
  return `<div class="nyentry">
    <div class="nyhead"><span class="nyname ${EL_CLS[e]}">${name}</span><span>${L(d.en, '')}${d.alias ? L(` · also called ${d.alias}`, `（又称${d.alias}）`) : ''}</span>${where ? `<span class="chip on">${where}</span>` : ''}</div>
    <table class="gloss nyinfo"><tr><td>${L('Element 五行', '五行')}</td><td>${elTag(e)}</td></tr>
      <tr><td>${L('Stem-branch pairs', '干支')}</td><td>${pairs.map(p => `<b>${p.gz}</b> (#${p.i + 1})`).join(' & ')}</td></tr>
      <tr><td>${L('Birth years', '出生年份')}</td><td>${pairs.map(p => nayinYears(p.gz).join(', ')).join(' / ')}</td></tr></table>
    <h5>${L('Imagery 意象', '意象')}</h5><p>${nyI(name)}</p>
    <h5>${L('Origin of the name 名称由来', '名称由来')}</h5><p>${nyO(name)}</p>
    <h5>${L('Character 性格特点', '性格特点')}</h5><p>${nyT(name)}</p>
    <h5>${L('Likes 喜 · Fears 忌', '喜忌')}</h5><p><b class="up">${L('Likes:', '喜：')}</b> ${nyL(name)}<br><b class="down">${L('Fears:', '忌：')}</b> ${nyF(name)}</p>
    <h5>${L('Relations with other Na Yin 生克', '与其他纳音的生克')}</h5>
    <p class="small"><b>${L('Supported by', '生我')}</b> (${ELN((e + 4) % 5)}): ${rel(k => NY[k].e === (e + 4) % 5)}<br>
    <b>${L('Supports', '我生')}</b> (${ELN((e + 1) % 5)}): ${rel(k => NY[k].e === (e + 1) % 5)}<br>
    <b>${L('Controlled by', '克我')}</b> (${ELN((e + 3) % 5)}): ${rel(k => NY[k].e === (e + 3) % 5).split(' · ').map(k => (NY_EXCEPT[(e + 3) % 5] || []).includes(name) ? k + '*' : k).join(' · ')}${(NY_EXCEPT[(e + 3) % 5] || []).includes(name) ? ` <span class="muted">${L(`(* folk rule: being controlled actually helps ${name})`, `（* 民间说法：被克反而有利于${name}，相克反吉）`)}</span>` : ''}<br>
    <b>${L('Controls', '我克')}</b> (${ELN((e + 2) % 5)}): ${rel(k => NY[k].e === (e + 2) % 5)}</p>
  </div>`;
}

const NY_HOWTO = `<p><b>Analogy:</b> the Five Elements say <i>what material</i> something is; Na Yin says <i>which form</i> of it. Two people can both be "Metal" in Na Yin, but one is a sword (剑锋金) and the other jewellery (钗钏金): same metal, very different life.</p><ul>
  <li><b>How it's calculated:</b> the 60 stem-branch pairs are grouped into 30 consecutive couples (甲子 and 乙丑 = 海中金, 丙寅 and 丁卯 = 炉中火…). Each couple gets one poetic element, traditionally derived from the 60 pitch-pipes of ancient music (纳音 means "received sound").</li>
  <li><b>The name explains the logic:</b> it describes what the element looks like in that branch environment, e.g. Metal "dies" in 子 and is "stored" in 丑, so 甲子 and 乙丑 give gold hidden in the sea.</li>
  <li><b>Which pillar matters:</b> the <b>Year</b> Na Yin (年命) is the classical "you" in Na Yin readings and in folk marriage matching; the <b>Day</b> Na Yin colours your own nature.</li>
  <li><b>Weight:</b> Na Yin is an older, descriptive layer. Modern BaZi (Day Master, Ten Gods, strength) takes priority; Na Yin adds imagery and is still used in compatibility (纳音合婚).</li>
  <li><b>Folk exceptions 相克反吉:</b> some Na Yin benefit from being "controlled", e.g. Sword-Edge Metal needs Fire to be forged, Sky Fire meeting Water makes a rainbow, Ocean and Milky Way Water are not harmed by Earth.</li></ul>`;

function renderNayinSection(b) {
  const tabs = b.pillars.map((p, i) => `<button class="nyt ${i === 0 ? 'on' : ''}" data-i="${i}">${p.zh}<br><b class="${EL_CLS[NY[p.nayin] ? NY[p.nayin].e : 0]}">${p.nayin}</b></button>`).join('');
  return `<h3>${L('Na Yin 纳音', '纳音')} <small>${L('the poetic element of each pillar', '每一柱的诗意五行')}</small></h3>${ex(L('What Na Yin is and how it\'s read', '什么是纳音、怎么看'), L(NY_HOWTO, NY_HOWTO_ZH))}
    <div class="card"><div class="nytabs">${tabs}</div><div id="nybody"></div>
    <div class="nyall"><label class="small muted">${L('Look up any Na Yin', '查询任一纳音')} <select id="nysel">${Object.keys(NY).map(k => `<option>${k}</option>`).join('')}</select></label></div></div>`;
}
function bindNayin(b) {
  const show = (name, where) => { $('#nybody').innerHTML = nayinEntry(name, where); };
  document.querySelectorAll('.nyt').forEach(btn => btn.onclick = () => {
    document.querySelectorAll('.nyt').forEach(x => x.classList.toggle('on', x === btn));
    const p = b.pillars[+btn.dataset.i]; show(p.nayin, L(`${p.en} pillar — ${NY_PILLAR[p.en]}`, `${p.zh}——${NY_PILLAR_ZH[p.en]}`));
  });
  $('#nysel').onchange = () => { document.querySelectorAll('.nyt').forEach(x => x.classList.remove('on')); show($('#nysel').value, ''); };
  const p = b.pillars[0]; show(p.nayin, L(`${p.en} pillar — ${NY_PILLAR[p.en]}`, `${p.zh}——${NY_PILLAR_ZH[p.en]}`));
}

const NY_PILLAR_ZH = {Year:'年命——传统纳音解读与合婚中代表“你”', Month:'事业与父母环境', Day:'你的本性与婚姻', Hour:'子女与晚年'};
const NY_HOWTO_ZH = `<p><b>比喻：</b>五行说的是“什么材料”，纳音说的是“什么形态”。两个人纳音都属金，一个是宝剑（剑锋金），一个是首饰（钗钏金）——同样是金，人生却很不一样。</p><ul>
  <li><b>怎么算：</b>六十甲子两两一组，共三十组（甲子乙丑 = 海中金，丙寅丁卯 = 炉中火……），每组对应一种诗意五行，传统上源自古代音律的六十律（“纳音”即“纳入音律”）。</li>
  <li><b>名称本身就是道理：</b>描述该五行在那个地支环境中的样子，如金死于子、墓于丑，所以甲子乙丑是藏在海里的金。</li>
  <li><b>看哪一柱：</b><b>年柱</b>纳音（年命）是传统纳音解读与民间合婚中的“你”；<b>日柱</b>纳音则为你的本性添色。</li>
  <li><b>分量：</b>纳音是较古老的描述层；现代八字（日主、十神、强弱）优先，纳音增添意象，合婚中仍常用。</li>
  <li><b>民间例外（相克反吉）：</b>有些纳音被克反而有利，如剑锋金需火锻造、天上火遇水成彩虹、大海水与天河水不怕土克。</li></ul>`;
