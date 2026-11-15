// ===== Chinese pass over technical sections (text nodes only) =====
const ZE = {Wood:'木', Fire:'火', Earth:'土', Metal:'金', Water:'水'};
const ZP = {Year:'年柱', Month:'月柱', Day:'日柱', Hour:'时柱', Luck:'大运', You:'你', Them:'对方', '流年 Annual':'流年'};
const ZZ = {Rat:'鼠', Ox:'牛', Tiger:'虎', Rabbit:'兔', Dragon:'龙', Snake:'蛇', Horse:'马', Goat:'羊', Monkey:'猴', Rooster:'鸡', Dog:'狗', Pig:'猪'};
const STAGE_ZH = ['新生、有活力','学习期、易受影响、桃花','渐有自信','自立有成','巅峰','逐渐走下坡','能量低','沉寂','收藏、积累','归零、重启','新种子萌芽','受滋养、受保护'];
const GROUP_PLAIN_ZH = {peer:'你的力量来自自己和同辈——独立、自驱、好胜。', output:'你天生要表达——想法、创意、表现与敢言（食神伤官一族）。', wealth:'你天生善于经营与获取——务实、重结果、重财。', officer:'你天生重规矩——责任、职位、规则塑造你的人生。', resource:'你天生爱学习、需要支持——读书、贵人、资历与安全感对你很重要。'};
const CAREER_ZH = {'creative, advisory or independent work — expertise you express':'创意、顾问或独立工作——靠专业表达', 'business, sales, deal-making':'经商、销售、谈判', 'organisations, government, management ladders':'机构、政府、管理阶梯', 'academia, professional credentials, consulting':'学术、专业资历、咨询', 'partnerships, competitive or team-driven fields':'合伙、竞争性或团队型行业'};
const YOU_ZH = {spouse:'配偶', partner:'伴侣／合伙人', friend:'朋友', boss:'上司', 'team member':'下属', child:'子女', parent:'父母', sibling:'兄弟姐妹'};
const QREL_ZH = {
  'you share the same palace — closely aligned right now':'你们同宫——此刻步调一致',
  'you sit in neutral positions':'你们的位置互不影响',
  'your palaces share an element — peers right now':'你们所在宫位五行相同——此刻平起平坐',
  'their palace produces yours — they support you right now':'对方的宫生你的宫——此刻对方在支持你',
  'your palace produces theirs — you are the giver right now':'你的宫生对方的宫——此刻你是付出的一方',
  'their palace controls yours — they hold the upper hand right now':'对方的宫克你的宫——此刻对方占上风',
  'your palace controls theirs — you hold the upper hand right now':'你的宫克对方的宫——此刻你占上风',
};
const ZX = { // exact (trimmed) text nodes
  Year:'年份', Age:'年龄', 'Stem god':'天干十神', 'Branch god':'地支十神', Flags:'提示', weak:'弱', balanced:'中和', strong:'强', now:'现在', DM:'日主',
  Favourable:'顺', Mixed:'起伏', Challenging:'较辛苦', none:'无', BaZi:'八字', 'Zi Wei':'紫微', 'Qi Men':'奇门', You:'你', Them:'对方',
  'Self & personality':'自我与性格', Career:'事业', Wealth:'财富', Relationships:'感情', Prosperity:'', Power:'', Fame:'', Obstacle:'',
  'Ancestry, early childhood, external environment & society':'祖上、童年、外在环境与社会', 'Career direction, work rhythm & relationship with parents':'事业方向、工作节奏、与父母的关系',
  'Core self (Day Master) & intimate / marital relationships':'自己（日主）与亲密／婚姻关系', 'Children, private ambitions, hidden talents & later life':'子女、内心抱负、潜藏才能与晚年',
  'Hidden stems 藏干':'藏干', 'no consensus':'看法不一', 'Day stem not located.':'找不到日干。', 'Before first Luck Pillar.':'尚未起运。',
  'No major natal interactions.':'原局没有明显的合冲。', 'Birth chart 命局':'命局', 'Query time 时局':'时局', 'Doors 八门':'八门',
};
const ZR = [
  // --- meta lines
  [/Male 乾造/g, '乾造（男）'], [/Female 坤造/g, '坤造（女）'], [/Lunar /g, '农历 '], [/([鼠牛虎兔龙蛇马羊猴鸡狗猪]) (Rat|Ox|Tiger|Rabbit|Dragon|Snake|Horse|Goat|Monkey|Rooster|Dog|Pig)\b/g, '$1'],
  [/Clock /g, '钟表时间 '], [/True solar time /g, '真太阳时 '], [/ min incl\. equation of time ([\d.-]+) min/g, ' 分钟，含均时差 $1 分钟'], [/clock time used \(true solar time off\)/g, '使用钟表时间（未启用真太阳时）'],
  [/Solar term: /g, '节气：'], [/Zi hour: day changes (\d\d:00)/g, '子时：$1 换日'], [/\(true solar\)/g, '（真太阳时）'],
  // --- pillars
  [/Four Pillars 四柱/g, '四柱'], [/8 characters · 60 Jiazi cycle/g, '八个字 · 六十甲子'], [/(年柱|月柱|日柱|时柱) (Year|Month|Day|Hour)\b/g, '$1'],
  [/^(\s*)(\w+) · (Yang|Yin) (Wood|Fire|Earth|Metal|Water)(\s*)$/, (m, a, py, y, e, z) => `${a}${py} · ${y === 'Yang' ? '阳' : '阴'}${ZE[e]}${z}`],
  [/^(\s*)(\w+) · (Rat|Ox|Tiger|Rabbit|Dragon|Snake|Horse|Goat|Monkey|Rooster|Dog|Pig) · (Wood|Fire|Earth|Metal|Water)(\s*)$/, (m, a, py, zd, e, z) => `${a}${py} · ${ZZ[zd]} · ${ZE[e]}${z}`],
  [/ · ages /g, ' · 年龄 '],
  [/Day pillar void \(空亡\): (\S+) · Palace ages are the classical guide \(year 0–16, month 17–32, day 33–48, hour 49\+\)\./, '日柱空亡：$1 · 各柱年龄段为传统说法（年柱 0–16、月柱 17–32、日柱 33–48、时柱 49 岁起）。'],
  // --- elements
  [/Five Elements 五行 balance/g, '五行平衡'], [/用 favourable/g, '喜用'], [/忌 unfavourable/g, '忌'],
  [/Weighted with hidden stems \(main\/middle\/residual qi\) and month command 月令 ×2\. Right column = raw count of the 8 visible characters\./, '已计入藏干（本气／中气／余气）权重，月令 ×2。右栏为八个明字的简单计数。'],
  [/(Weak|Slightly weak|Balanced|Slightly strong|Strong) (身弱|偏弱|中和|偏强|身强)/g, '$2'],
  [/得令 season/g, '得令'], [/得地 rooted/g, '得地'], [/得势 allies/g, '得势'], [/Favourable \(用\/喜神\): /g, '喜用神：'], [/Unfavourable \(忌神\): /g, '忌神：'],
  [/Born in winter.*$/, '生于冬季（亥子丑）——命局偏寒，不论强弱都喜火来调候。'], [/Born in summer.*$/, '生于夏季（巳午未）——命局燥热，喜水来调候。'],
  [/Strength is a rule-of-thumb score \(support ÷ total = (\d+)%\)\. Special "Follow" structures \(从格\) are not auto-detected — treat extreme scores \(<20% or >80%\) with care\./, '强弱为经验分数（支持 ÷ 总数 = $1%）。不会自动判断从格——极端分数（<20% 或 >80%）请谨慎看待。'],
  // --- structure / ten gods
  [/Structure & Ten Gods 格局 · 十神/g, '格局 · 十神'], [/ The structure /g, '格局 '], [/ is named after the Ten God in your month branch — the "engine" of the chart \(.*\)\./, ' 以月支的十神命名——它是命局的“引擎”。'],
  [/Structure \(by month branch main qi\): /g, '格局（月支本气）：'], [/ · Spouse palace \(day branch\): /g, ' · 婚姻宫（日支）：'], [/ · Spouse star (正财|正官) Direct \w+ \((?:wife|husband) star\): /g, ' · 配偶星 $1：'],
  [/present ×(\d+)/g, '有 ×$1'], [/not prominent/g, '不明显'], [/(?:Companion|Output|Wealth|Officer|Resource) \((比劫|食伤|财|官杀|印)\)/g, '$1'],
  [/(比肩|劫财|食神|伤官|偏财|正财|七杀|正官|偏印|正印) (?:Companion|Rob Wealth|Eating God|Hurting Officer|Indirect Wealth|Direct Wealth|Seven Killings|Direct Officer|Indirect Resource|Direct Resource)/g, '$1'],
  // --- hurting officer
  [/Hurting Officer 伤官 focus/g, '伤官重点'], [/伤官(?: Hurting Officer)? signature — cross-check/g, '伤官特征——三法对照'],
  [/No Hurting Officer in the natal chart \(visible or hidden\)\. Its themes arrive when a Luck Pillar or year brings /, '原局没有伤官（透干或藏支都没有）。当大运或流年带来'], [/ of (Yin|Yang) polarity\./, (m, y) => `（${y === 'Yin' ? '阴' : '阳'}）时，伤官的主题才会出现。`],
  [/Hurting Officer for /g, ''], [/ Day Master is /g, ' 日主的伤官是 '], [/\. Visible: /g, '。透干：'], [/ · Hidden: /g, ' · 藏支：'], [/ · Direct Officer: /g, ' · 正官：'],
  [/^(\s*)((?:伤官|金水|身弱)[一-鿿]+) [A-Za-z(].*$/, '$1$2'],
  [/Present but no classical pairing triggered — read it through Day Master strength: (a strong DM uses it well as an outlet|a weak DM finds it draining)\./, (m, v) => `有伤官但未成古典格局——以日主强弱来看：${v[2] === 's' ? '身强者能把它当作出口，运用得好' : '身弱者会觉得它耗能'}。`],
  [/Hurting Officer (visible|hidden \(main qi\)) ×(\d+)/, (m, v, n) => `伤官${v === 'visible' ? '透干' : '藏支（本气）'} ×${n}`], [/Only residual\/middle-qi Hurting Officer — mild\./, '只有余气／中气伤官——作用轻微。'], [/No natal Hurting Officer\./, '原局没有伤官。'],
  [/Independent\/outspoken stars in Life palace: /, '命宫有独立、敢言的星曜：'], [/No strongly rule-challenging star in Life palace\./, '命宫没有明显挑战规矩的星曜。'], [/ 化权 in (\S+) — assertive drive\./, ' 化权在$1——有主见、有冲劲。'],
  [/Day stem palace carries (\S+) — expressive, confrontational or visibility-seeking energy\./, '日干所在宫带有 $1——有表达欲、敢对抗或求曝光的能量。'], [/Day stem palace \((\S+)\) does not emphasise expression\./, '日干所在宫（$1）不强调表达。'],
  [/Analogy used: BaZi 伤官 \(talent that defies rules\) ↔ Zi Wei (\S+) or 化权 in the Life\/Career palace ↔ Qi Men (\S+) or (\S+) on the Day stem\./, '对应关系：八字伤官（不守成规的才华）↔ 紫微 $1 或化权在命宫／官禄宫 ↔ 奇门日干临 $2 或 $3。'],
  [/(\d)\/3 systems/, '三法中 $1 法'], [/(\d)\/3 supportive/, '$1/3 有利'], [/(\d)\/3 caution/, '$1/3 留意'],
  // --- interactions
  [/Combinations & Clashes 合冲刑害/g, '合冲刑害'],
  [/(?:Stem combination|Stem clash|Branch clash|Six harmony|Harm|Punishment|Self-punishment|Three Harmony|Half Three-Harmony|Directional meeting|Ungrateful punishment|Bullying punishment) \(([^)]+)\)/g, '$1'],
  [/(?:Wood|Fire|Earth|Metal|Water) ([木火土金水])/g, '$1'], [/Fire\/Earth/g, '火土'], [/ frame\b/g, '局'], [/ — full/g, '（全）'], [/ — partial/g, '（半）'],
  [/(Tension \/ change between|Bond \/ cooperation between|Subtle friction between) (.+?) and (.+?)\.$/, (m, k, a, b) => { const A = {'family background & society':'家庭背景与社会', 'career & parents':'事业与父母', 'self & partner':'自己与伴侣', 'children & later life':'子女与晚年', Luck:'大运'}; return `${A[a] || a}与${A[b] || b}之间${k[0] === 'T' ? '有张力／变动' : k[0] === 'B' ? '相合／合作' : '有隐性摩擦'}。`; }],
  // --- luck
  [/10-Year Luck Pillars 大运/g, '十年大运'],
  [/Luck starts (\d+)y (\d+)m (\d+)d after birth · direction (?:forward|backward) (顺|逆)\. Tap a pillar for its annual pillars \(流年\) and element shift\./, '出生后 $1 年 $2 个月 $3 天起运 · $4排。点任一步大运可看流年与五行变化。'],
  [/ Luck Pillar · age (\d+)–(\d+) · (Favourable|Mixed|Challenging)/, (m, a, b, r) => ` 大运 · ${a}–${b} 岁 · ${RATING_ZH[r]}`],
  [/^(\s*)Stem (\s*)$/, '$1天干 $2'], [/ \(first ~5 yrs emphasis\) · Branch /, '（前五年为主）· 地支 '], [/ \(later ~5 yrs\)\. /, '（后五年为主）。'], [/Interactions with natal chart:/, '与原局的合冲：'],
  [/伤官 activated this decade — natal Direct Officer present: watch conflicts with authority, contracts, reputation\./, '这步大运引动伤官——原局有正官：注意与权威、合约、名声相关的冲突。'], [/伤官 activated this decade — expressive, entrepreneurial, rule-challenging energy is switched on\./, '这步大运引动伤官——表达、创业、挑战规矩的能量被打开。'],
  // --- zi wei
  [/Five Element Bureau 五行局: /g, '五行局：'], [/ · Life master 命主: /g, ' · 命主：'], [/ · Body master 身主: /g, ' · 身主：'], [/紫微斗数 Zi Wei/g, '紫微斗数'],
  [/Now \(age (\d+) 虚岁\): decade in /, '现在（虚岁 $1）：大限在 '], [/^, year in $/, '，流年在 '], [/\(empty — borrows opposite\)/g, '（空宫——借对宫）'],
  [/Grid follows the traditional layout \((.+?)\)\. Brightness: 庙\/旺 strong, 得\/利 fair, 平 neutral, 陷 weak\. Tap a palace for details\./, '宫位按传统排列（巳在左上 → 亥在右下）。亮度：庙／旺强，得／利尚可，平普通，陷弱。点任一宫看详情。'],
  // --- qi men
  [/阳遁 Yang/g, '阳遁'], [/阴遁 Yin/g, '阴遁'], [/([坎坤震巽乾兑艮离]) (?:NW|NE|SW|SE|N|S|E|W)\b/g, '$1宫'], [/中 Centre/g, '中宫'],
  [/Rotating-plate 转盘 hour chart, 拆补 method\. South at top\. Each palace: Deity \(top\) · Star \+ Heaven-plate stem · Door \+ Earth-plate stem\. Colour = rough palace tone \(doors weighted most\)\./, '转盘时家奇门，拆补法。上方为南。每宫：八神（上）· 九星 + 天盘干 · 八门 + 地盘干。颜色 = 该宫大致吉凶（以门为重）。'],
  // --- cross-reference
  [/Each row reads the same life area through three independent systems\..*$/, '每一行用三种独立方法看同一个人生领域。多法一致才是值得留意的信号，单一结果只是较弱的提示。奇门的本命各行用出生时盘，“此刻”用查询时间。'],
  [/^(\s*)Now \((\d+)\)/, '$1此刻（$2）'], [/ Day Master, /g, '日主，'], [/Dominant: /g, '主导：'], [/Favourable ((?:Wood|Fire|Earth|Metal|Water)(?:\/(?:Wood|Fire|Earth|Metal|Water))*)\./g, (m, e) => `喜用 ${e.split('/').map(x => ZE[x]).join('、')}。`],
  [/Life palace /g, '命宫 '], [/Career palace /g, '官禄宫 '], [/Wealth palace /g, '财帛宫 '], [/Spouse palace /g, '夫妻宫 '], [/ \(borrowed\)/g, '（借星）'], [/化(禄|权|科|忌) (?:Prosperity|Power|Fame|Obstacle)/g, '化$1'],
  [/Day stem (.) sits in /, '日干$1落 '], [/, void — delays/g, '，空亡——易延误'], [/, void/g, '，空亡'], [/ void\b/g, ' 空亡'],
  [/Structure /g, '格局 '], [/Officer score ([\d.]+), Officer element (\w+) is (not )?favourable\./, (m, s, e, n) => `官杀分数 ${s}，官星五行${ZE[e]}${n ? '非喜用' : '为喜用'}。`],
  [/ Leans to (.+?)\.(?= |$)/, (m, s) => ` 倾向：${CAREER_ZH[s] || s}。`], [/ 伤官见官 — friction with hierarchy\./, ' 伤官见官——与上级易有摩擦。'],
  [/开门 Open Door \(career\) in (\S+) with /, '开门（事业）在 $1，配 '], [/生门 Life Door \(wealth\) in (\S+) \(/, '生门（财）在 $1（'], [/; capital 戊 in /, '；资本戊在 '],
  [/Wealth score ([\d.]+), (\w+) (not )?favourable\./, (m, s, e, n) => `财星分数 ${s}，${ZE[e]}${n ? '非喜用' : '为喜用'}。`], [/ 财多身弱 — more wealth than the DM can hold; partners\/resources help\./, ' 财多身弱——财多到日主扛不住；需要伙伴与印星帮扶。'], [/ 伤官生财 — talent converts to income\./, ' 伤官生财——才华能变现。'],
  [/化禄 natal in /, '生年化禄在 '], [/, 化忌 in /, '，化忌在 '],
  [/; spouse star (present|not prominent|不明显) and (not )?favourable\./, (m, p, n) => `；配偶星${p === 'present' ? '明显' : '不明显'}，${n ? '非喜用' : '为喜用'}。`], [/ Day branch is clashed — movement\/tension in the spouse palace\./, ' 日支被冲——婚姻宫有变动或张力。'],
  [/六合 \(union\) in (\S+) with /, '六合（结合）在 $1，配 '], [/; partner stem (乙|庚) \((wife|husband)\) in /, (m, s, w) => `；伴侣之干 ${s}（${w === 'wife' ? '妻' : '夫'}）在 `],
  [/Luck (\S\S) \((.+?), (Favourable|Mixed|Challenging)\)/, (m, g, t, r) => `大运 ${g}（${t}，${RATING_ZH[r]}）`], [/; year (\S\S) brings /, '；流年 $1 带来 '], [/; 伤官 decade/, '；伤官大运'],
  [/Decade runs through natal /, '大限走本命 '], [/; decadal 化禄 → /, '；大限化禄 → '], [/Query-time chart: hour stem (.) in /, '查询盘：时干 $1 在 '],
  // --- card "why" lines
  [/BaZi Year pillar = parents, Hour pillar = children/, '八字年柱看父母，时柱看子女'], [/; clashes present/, '；有冲'], [/BaZi Companion /, '八字比劫 '], [/ · score /, ' · 分数 '],
  // --- compatibility detail
  [/^(\s*)They are your (\S+)(?: [A-Za-z ]+)? — .*?\. You are their (\S+)(?: [A-Za-z ]+)?\. Ideal for a ([a-z ]+): ([^ .]+)(?: \(also good: ([^)]+)\))?\./, (m, sp, g1, g2, y, best, good) => `${sp}对方是你的${g1}——${GOD_ROLE_ZH[g1]}。你是对方的${g2}。作为${YOU_ZH[y] || y}，理想的角色是：${best}${good ? `（也不错：${good}）` : ''}。`],
  [/伤官见官 in the relationship: .*$/, '这段关系中有伤官见官：你的命盘带伤官，而对方的日主是你的正官。在规矩和层级上容易顶撞——对方给你自主权或肯定你的想法时最顺。'],
  [/伤官驾杀 dynamic: .*$/, '伤官驾杀的互动：对方给的压力（七杀）是你的伤官应付得来的——要求高、但欣赏大胆成果的上司。'],
  [/Day Masters /, '日主 '],
  [/They bring mostly (.+?) — (which you need|which overloads what you already have too much of|neutral for you)\./, (m, e, v) => `对方带来的主要是${e.split(' & ').map(x => ZE[x] || x).join('、')}——${v[0] === 'n' ? '对你影响中性' : v.includes('need') ? '正是你需要的' : '而你这方面已经太多'}。`],
  [/You bring mostly (.+?) — (which they need|which works against their balance|neutral for them)\./, (m, e, v) => `你带来的主要是${e.split(' & ').map(x => ZE[x] || x).join('、')}——${v[0] === 'n' ? '对对方影响中性' : v.includes('need') ? '正是对方需要的' : '不利于对方的平衡'}。`],
  [/Your (Year|Month|Day|Hour) \((\S\S)\) × their (Year|Month|Day|Hour) \((\S\S)\): /, (m, a, g1, b, g2) => `你的${ZP[a]}（${g1}）× 对方的${ZP[b]}（${g2}）：`], [/no strong interaction/, '没有明显的合冲'], [/Same branch — shared rhythm/, '同支——节奏相近'],
  [/Peach Blossom 桃花: their (.+?) is your romance star — strong attraction\./, '桃花：对方的 $1 是你的桃花星——吸引力强。'],
  [/Year Na Yin 纳音合婚: you (\S+) \([^)]+\) × them (\S+) \([^)]+\) — /, '年命纳音合婚：你 $1 × 对方 $2——'],
  [/(\S+) produces (\S+): supports it/g, '$1生$2：有扶助'], [/(\S+) produces (\S+): it gives, which drains it/g, '$1生$2：付出而耗'], [/(\S+) controls (\S+): it leads/g, '$1克$2：$1居主导'],
  [/(\S+) controls (\S+), but folk rule says \S+ benefits \(相克反吉\)/g, '$1克$2，但相克反吉'], [/(\S+) controls (\S+): pressure on it/g, '$1克$2：$2受压'], [/Same element: kindred, but can compete/g, '同五行：同气相求，也会相争'],
  [/Their year stem (.): /, '对方年干 $1：'], [/Your year stem (.) into their chart: /, '你的年干 $1 入对方命盘：'], [/(\S+化.) lands in (your|their) (\S+) \([^)]+\) palace/, (m, s, w, p) => `${s}落入${w === 'your' ? '你' : '对方'}的${p}`], [/(\S+化.) → (\S+)$/, '$1 → $2'],
  [/Their (?:Life palace|命宫) ?\((.)\) sits on your (\S+) palace — they naturally fit the ([a-z ]+) role in your chart\./, (m, br, p, y) => `对方命宫（${br}）落在你的${p}——在你的命盘中，对方天然适合${YOU_ZH[y] || y}这个角色。`],
  [/Their (?:Life palace|命宫) ?branch (.) falls on your (\S+) \([^)]+\) palace — they tend to show up in your .+ matters\./, '对方命宫（$1）落在你的$2——对方常出现在你这方面的事务中。'],
  [/Your own (.+?) palaces?: /, (m, p) => `你自己的${p.replace(/ & /g, '、')}：`],
  [/Your stem (.) in (\S+) \((\S+)\), their stem (.) in (\S+) \((\S+)\) — (.+)\.$/, (m, a, pa, da, b, pb, db, rel) => `你的日干 ${a} 在${pa}（${da}），对方的日干 ${b} 在${pb}（${db}）——${QREL_ZH[rel] || rel}。`],
  [/Relationship indicators? \(([^)]+)\) /, '关系用神（$1）'], [/in (\S+宫): /g, '在$1：'],
  [/^(\s*)DM (\s*)$/, '$1日主 $2'], [/Day Master /g, '日主 '], [/ · needs /, ' · 喜 '],
  // --- generic fallbacks (keep last)
  [/(Year|Month|Day|Hour) (stem|branch)( \(main\))?/g, (m, p, s, mn) => `${ZP[p][0]}${s === 'stem' ? '干' : '支'}${mn ? '（本气）' : ''}`],
  [/\b(Year|Month|Day|Hour|Luck)(?= ×|,|\))/g, (m, p) => ZP[p]], [/(× |, )(Year|Month|Day|Hour|Luck|流年 Annual)\b/g, (m, s, p) => s + ZP[p]], [/流年 Annual/g, '流年'],
  [/\b(Wood|Fire|Earth|Metal|Water)\b/g, (m, e) => ZE[e]],
];
let ZDYN = null;
function zhDynamic() {
  if (ZDYN) return ZDYN;
  ZDYN = [];
  LIFE_STAGES_EN.forEach((s, i) => ZDYN.push([`${s} — ${STAGE_PLAIN[i]}`, STAGE_ZH[i]]));
  Object.keys(GROUP_PLAIN).forEach(k => ZDYN.push([GROUP_PLAIN[k], GROUP_PLAIN_ZH[k]]));
  Object.keys(ZW_STAR_KW).forEach(k => { const en = (ZW_STAR_KW[k].split('—')[1] || '').trim(); if (en) ZDYN.push([en, ZW_STAR_ZH[k]]); });
  ZDYN.sort((a, b) => b[0].length - a[0].length);
  return ZDYN;
}
function zhText(s) {
  if (!/[A-Za-z]{2}/.test(s)) return s;
  const t = s.trim();
  if (Object.prototype.hasOwnProperty.call(ZX, t)) return s.replace(t, ZX[t]);
  zhDynamic().forEach(([en, zh]) => { if (s.includes(en)) s = s.split(en).join(zh); });
  ZR.forEach(([re, rep]) => { s = s.replace(re, rep); });
  return s;
}
function zhDom(root) {
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = []; while (w.nextNode()) nodes.push(w.currentNode);
  nodes.forEach(n => { const p = n.parentNode && n.parentNode.nodeName; if (p === 'SCRIPT' || p === 'STYLE' || p === 'OPTION') return; const v = zhText(n.nodeValue); if (v !== n.nodeValue) n.nodeValue = v; });
}
function zhScope() {
  if (LANG !== 'zh') return;
  document.querySelectorAll('.techwrap, .swhy, .cnote, .cmini').forEach(zhDom);
}

// ----- Chinese "how to read" notes (ex() looks titles up here) -----
const GOD_MEANING_ZH = {
  比肩:['独立、自立、自信','同辈、兄弟姐妹、平级同事'], 劫财:['好胜、大胆、敢冒险；也主破费','对手、竞争者、分享（或分走）资源的朋友'],
  食神:['创意、享受、温和的表达、有品味','饮食、休闲、学生；女命为子女'], 伤官:['才华、机智、表现欲、反叛规矩','公开展现的才能、创新、批评权威；女命为子女'],
  偏财:['大方、会做生意、善抓机会、好交际','横财、生意收入、投资；父亲；男命为女友'], 正财:['勤奋、节俭、负责、务实','薪水、储蓄、稳定资产；男命为妻'],
  七杀:['有野心、有胆识、强烈、能处理危机','压力、严厉的上司、竞争、权力；男命为子'], 正官:['自律、正直、守规矩、重名位','职位、名声、权威、法律；女命为夫；男命为女'],
  偏印:['直觉强、思维另类、想法独立','专门技能、玄学、研究；易孤独'], 正印:['仁慈、好学、有耐心、重安全感','学历、资历、贵人、母亲、庇护、文书'],
};
const EX_ZH = {
  'How to read the pillars': ['怎么看四柱', `<p>每一栏由上往下看：</p><ul>
    <li><b>最上方的小标签</b>——天干的十神：这个字<i>对你来说是什么</i>（如正官 = 权威／规矩）。日柱显示<b>日主</b>，那就是<b>你</b>。</li>
    <li><b>大字</b>——上为天干，下为地支。颜色代表五行（绿木、红火、土黄、灰金、蓝水）。</li>
    <li><b>藏干</b>——每个地支里藏着 1–3 个天干，影响真实但较隐蔽；第一个最强（本气）。</li>
    <li><b>十二长生</b>——日主在该地支的强弱状态。<b>纳音</b>是这组干支的诗意五行名。</li>
    <li>每一柱同时代表一个人生领域和一个年龄段——该柱的吉凶会反映在那个领域。</li></ul>`],
  'What the element balance means': ['五行平衡代表什么', () => `<p>横条显示命局中各五行的多寡，平衡是目标。</p><ul>
    <li><b>喜用神</b>是命局需要多一点的五行——带这些五行的年份、行业、颜色和方位通常较顺。</li>
    <li><b>忌神</b>是已经过多、或破坏平衡的五行。</li>
    <li><b>日主强弱</b>：身强要<i>消耗</i>能量（食伤、财、官）；身弱要<i>补充</i>（印、比劫）。</li>
    <li>得令 = 生在帮你的月份 · 得地 = 地支里有你的根 · 得势 = 周围有帮扶的天干。</li></ul>
    <table class="gloss"><tr><th>五行</th><th>颜色</th><th>方位</th><th>行业</th></tr>${EL_PRACTICAL_ZH.map((x, e) => `<tr><td>${elTag(e)}</td><td>${x.c}</td><td>${x.d}</td><td>${x.i}</td></tr>`).join('')}</table>`],
  'What the Ten Gods mean': ['十神是什么意思', () => `<table class="gloss"><tr><th>十神</th><th>性格</th><th>人生领域／人物</th></tr>${Object.entries(GOD_MEANING_ZH).map(([g, m]) => `<tr><td><b class="g-${TG_GROUP[g]}">${g}</b></td><td>${m[0]}</td><td>${m[1]}</td></tr>`).join('')}</table>
    <p class="small">每一对是同一种关系的阴阳两面——“偏”的较强烈、不规则，“正”的较稳定、传统。</p>`],
  'What the Hurting Officer is': ['什么是伤官', `<p>伤官是你所生、阴阳相反的五行，是往外冲的原始才华——机智、表现、创新、批评。它“伤”的是正官（规矩、上司、名声）。</p><ul>
    <li><b>好的搭配</b>：配印（有纪律、有资历）、生财（才华变现）、制杀（胆识压住压力）。</li>
    <li><b>经典警示</b>：伤官见官——与权威、合约或名声起冲突，尤其当大运或流年补上缺的那一边时。</li></ul>`],
  'What combinations and clashes mean': ['合与冲代表什么', `<ul><li><b>合</b>（绿色）——吸引、合作、结合在一起；也可能把某个五行“绑住”而减弱作用。</li>
    <li><b>冲</b>（红色）——变动、冲突、改变。两柱相冲，代表它们所管的人生领域之间有张力（如年 × 月 = 家庭背景 vs 事业／父母）。</li>
    <li><b>刑、害</b>——较隐性的摩擦、误会、自找麻烦。</li></ul>`],
  'How to read Luck Pillars': ['怎么看大运', `<p>每十年有一柱“外在天气”叠加在命局上。它的十神告诉你来的是<i>什么主题</i>；它的五行告诉你是否<i>有助平衡</i>。</p><ul>
    <li><b>顺</b>——带来你需要的五行。<b>较辛苦</b>——加重你已经太多的。<b>起伏</b>——两者都有。</li>
    <li>天干大致主前五年，地支主后五年。</li>
    <li>每步大运里，流年是第二层。冲到日支的年份，常伴随搬迁、感情变化或健康需留意。</li></ul>`],
  'How to read the Zi Wei chart': ['怎么看紫微命盘', () => `<ul>
    <li>十二格是十二<b>宫</b>——每宫是一个人生领域（宫名在格子底部）。<b>命宫</b>有外框标示。</li>
    <li><b>紫色粗体</b>是十四主星——该领域的性格。<b>蓝色</b>是吉星助力；<b>红色</b>是煞星（擎羊、陀罗、火星、铃星、地空、地劫）。</li>
    <li>星名后的灰色小字是亮度：庙／旺强而正面，得／利尚可，平普通，陷弱。</li>
    <li>彩色标签是<b>四化</b>：<em class="m-禄">禄</em>顺利、<em class="m-权">权</em>掌控、<em class="m-科">科</em>名声、<em class="m-忌">忌</em>阻碍。</li>
    <li>每格的年龄范围是该宫的十年大限。<b>大限</b>标示目前的十年；<b>流年</b>标示今年的宫位。</li>
    <li>空宫“借”对宫的星来看。</li></ul>
    <table class="gloss">${Object.entries(ZW_PALACE_PLAIN_ZH).filter(([k]) => k !== '交友').map(([k, v]) => `<tr><td><b>${k}</b></td><td>${v}</td></tr>`).join('')}</table>`],
  'How to read the Qi Men chart': ['怎么看奇门盘', `<p>奇门是当下的地图：九格代表九个方位（上方为南，与中国罗盘相同）。每格有四层：</p><ul>
    <li><b>八神</b>（最上）——暗中的气氛：值符贵人、螣蛇多变、太阴暗助、六合合作……</li>
    <li><b>九星</b> + <b>天盘干</b>——时机与气候，“正在到来”的东西。</li>
    <li><b>八门</b> + <b>地盘干</b>——人的行动与既有的局面。门最重要：<span class="qdoor d1">开 休 生</span>为吉，<span class="qdoor d-1">伤 惊 死</span>为凶，<span class="qdoor d0">景 杜</span>中性。</li>
    <li><b>空</b> = 落空或延误；<b>马</b> = 走动、出行、快。</li></ul>
    <p><b>命局</b>描述你天生的策略。<b>时局</b>（现在）用来做决定：找到符合你目标的门所在的格子（开门看事业、生门看财、六合看合作），那个方位此刻有利。点任一格看说明。</p>`],
  'How to read the cross-reference': ['怎么看合参', `<p>每个人生领域由三种算法不同的方法各自解读：</p><ul>
    <li><b>八字</b>——由四柱看五行平衡与十神。</li><li><b>紫微</b>——由农历生日与时辰，把星曜排入十二宫。</li><li><b>奇门</b>——出生时辰（“此刻”一行则用现在）的能量地图。</li></ul>
    <p><span class="tone good">有利</span> = 这种方法看到顺利或机会。<span class="tone warn">留意</span> = 有摩擦或要多费力。<span class="tone mixed">中性</span> = 两者都不明显。<b>两三种方法一致</b>时值得重视；只有一种提出，只是较弱的提示。</p>`],
  'How the score is calculated': ['分数怎么算', `<ul>
    <li><b>日主角色</b>——对方在十神上是你的什么人。每种关系有“理想角色”：如上司最好给你规矩（正官）或支持（正印）；朋友最好是平辈（比肩）。</li>
    <li><b>五行互补</b>——对方的命盘能否补你所缺，反之亦然。这是“相处舒不舒服”最实际的指标。</li>
    <li><b>柱位合冲</b>——与这段关系相关的柱之间是合（连结）还是冲（摩擦）。</li>
    <li><b>紫微飞化</b>——对方生年四化“飞”入你的命盘：化禄入相关宫位 = 对方带来助益；化忌 = 功课或负担。</li>
    <li><b>奇门此刻</b>——只看当下：<i>此刻</i>谁占上风、谁在支持谁。每两小时会变。</li></ul>
    <p>横条显示每个因素从 −（红，摩擦）到 +（绿，支持）。分数是加权平均，权重随关系而变。</p>`],
};
