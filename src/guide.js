// ===== Guide tab: analogies, calculation steps, what matters =====
const G = (id, title, an, body) => `<details class="gsec" id="g-${id}"><summary><span>${title}</span></summary><div>
  ${an ? `<div class="analogy"><b>${L('Analogy', '比喻')}</b> ${an}</div>` : ''}${body}<div class="gyour" data-k="${id}"></div></div></details>`;
const STEPS = arr => `<ol class="steps">${arr.map(s => `<li>${s}</li>`).join('')}</ol>`;
const MATTERS = arr => `<div class="matters"><b>${L('What matters most', '最重要的')}</b><ul>${arr.map(s => `<li>${s}</li>`).join('')}</ul></div>`;

function guideHtml() {
  if (LANG === 'zh') return guideHtmlZh();
  let h = `<div class="card plain"><h4>📘 How the three systems fit together</h4>
  <div class="analogy"><b>Big-picture analogy — a road trip</b>
  <b>BaZi</b> is the <b>car</b>: its engine type, what fuel it runs on, how strong it is. Its <b>Luck Pillars</b> are the <b>road and seasons</b> you drive through, decade by decade.
  <b>Zi Wei</b> is the <b>map of destinations</b>: 12 places in life (career, wealth, marriage…) and what each place looks like for you.
  <b>Qi Men</b> is the <b>live GPS</b>: which direction and which hour is clear right now.
  You want all three to agree before making a big move.</div>
  <div class="analogy"><b>Or three doctors</b> BaZi is your <b>blood test</b> (constitution, what you're short of). Zi Wei is an <b>MRI</b> showing each organ, or each life area, in detail. Qi Men is <b>today's triage</b>: how you are right now. When all three agree, that's a diagnosis; when only one flags something, it's just a hint.</div>
  <table class="gloss"><tr><th></th><th>BaZi 八字</th><th>Zi Wei 紫微斗数</th><th>Qi Men 奇门遁甲</th></tr>
  <tr><td><b>Built from</b></td><td>Solar calendar: 24 solar terms + birth hour</td><td>Lunar calendar: lunar month, day + birth hour</td><td>Solar term + day + 2-hour block of the moment asked</td></tr>
  <tr><td><b>Core unit</b></td><td>8 characters, 5 elements, Ten Gods</td><td>12 palaces, 14 main stars + ~100 minor stars</td><td>9 palaces × 4 layers (deity, star, door, stems)</td></tr>
  <tr><td><b>Best for</b></td><td>Constitution, strengths, timing over decades and years</td><td>Detailed picture of each life area; personality</td><td>Decisions and timing now; which direction or action</td></tr>
  <tr><td><b>Most sensitive to</b></td><td>Solar-term boundaries (month), birth hour (¼ of chart)</td><td>Birth hour: a wrong hour rotates the whole chart</td><td>The current hour: the chart changes every 2 hours</td></tr>
  <tr><td><b>If birth time unknown</b></td><td>Still ~75% usable (3 pillars)</td><td>Not usable</td><td>Query charts are still usable; the birth chart isn't</td></tr></table></div>`;

  h += `<h3>1 · Time: the foundation of everything</h3>`;
  h += G('time', 'True solar time 真太阳时 & solar terms 节气',
    'A <b>sundial versus your phone clock</b>. Every Chinese system was designed around where the sun actually is. Singapore\'s clock is set to UTC+8 (China\'s time zone), but the sun over Singapore is about an hour "behind" that clock, so 10:30 on the clock is roughly 09:25 by the sun. A different 2-hour block means a different hour pillar.',
    STEPS([
      'Convert your clock time to universal time using the UTC offset at birth (Singapore used +7:30 before 1982; the tool sets this automatically).',
      'Longitude correction: 4 minutes per degree east of Greenwich (Singapore 103.8°E → UTC + 6h55m).',
      'Equation of time: Earth\'s tilted, elliptical orbit makes the sun run up to ±16 minutes fast or slow through the year.',
      'Year and month use <b>solar terms</b>, not Lunar New Year. The BaZi year starts at 立春 (~4 Feb); each month starts at a 节 (e.g. 惊蛰 ~6 Mar). A baby born on 2 Feb belongs to the previous year in BaZi.',
      'Zi hour 子时 (23:00–01:00) straddles midnight; schools disagree on whether the day changes at 23:00 or 00:00. That\'s why there\'s a toggle.',
    ]) + MATTERS(['Births within ~1 hour of a 2-hour boundary (odd hours: 01, 03, 05…) — check both possible hour pillars.', 'Births within a day of a solar term — the month pillar (and Luck Pillars) can flip.', 'The pre-1982 Singapore/Malaysia offset — a 30-minute error is common in online calculators.']));

  h += `<h3>2 · BaZi 八字 — the car and its engine</h3>`;
  h += G('pillars', 'Four Pillars 四柱 — the 8 characters',
    'A <b>four-storey family house</b>. The roof (Year) is ancestry and society. The second floor (Month) is parents and your workplace. Your own bedroom (Day) holds you and your spouse. The ground floor and garden (Hour) are your children and later years. Each floor also covers an age band.',
    `<p>Each pillar is one stem (天干, 10 of them) paired with one branch (地支, 12 of them). Pairing yang with yang and yin with yin gives a 60-pair cycle 六十甲子, the same cycle used for years, months, days and hours.</p>` +
    STEPS([
      '<b>Year</b>: (year − 4) mod 60 gives the position in the 60-cycle, counted from 立春.',
      '<b>Month</b>: the branch is fixed by solar term (寅 month starts at 立春). The stem follows the "Five Tigers" rule 五虎遁 from the year stem (e.g. 甲/己 years start the 寅 month at 丙寅).',
      '<b>Day</b>: an unbroken 60-day count running for thousands of years. It never resets.',
      '<b>Hour</b>: 12 two-hour blocks. The stem follows the "Five Rats" rule 五鼠遁 from the day stem (e.g. 甲/己 days start 子 hour at 甲子).',
    ]) + MATTERS(['The <b>Day stem</b> is "you" (Day Master); every other character is read relative to it.', 'The <b>Month branch</b> is the season and carries the most weight (about a third of the chart\'s energy).', 'Year and Hour are lighter on their own but matter for family and children.']));

  h += G('hidden', 'Hidden stems 藏干',
    'A <b>suitcase</b>. The branch is the suitcase you can see; inside are 1–3 items. The first is the heavy main item; the others are smaller. 寅 Tiger looks like Wood, but it also carries some Fire and Earth.',
    STEPS(['Each branch has a fixed list (e.g. 辰 = 戊 Earth, 乙 Wood, 癸 Water).', 'This tool weights them 60% / 30% / 10% (or 70/30 for two, 100% for one).', 'Only the main hidden stem is used for "what the branch is" (e.g. the spouse-palace Ten God).']) +
    MATTERS(['A Ten God only hidden in a branch is <b>potential</b>: active but private. Once it also appears on a stem (透干), it is visible to the world.', 'Hidden stems are also <b>roots</b>: a Day Master rooted in a branch is real strength, not just appearance.']));

  h += G('elements', 'Five Elements 五行 & their balance',
    'A <b>recipe or an ecosystem</b>. Wood feeds Fire, Fire makes Earth (ash), Earth bears Metal, Metal carries Water (condensation), Water nourishes Wood: that\'s the <b>generating cycle</b>. Wood breaks Earth, Earth dams Water, Water quenches Fire, Fire melts Metal, Metal chops Wood: that\'s the <b>controlling cycle</b>. A good chart is like a good dish: nothing missing, nothing overpowering.',
    STEPS(['Every stem counts 1 point of its element.', 'Each branch adds its hidden stems by weight (60/30/10).', 'The <b>month branch counts double</b>, because the season is the oven temperature for the whole dish.', 'The percentages are each element\'s share of the total. "x/8" is the simple count of the 8 visible characters, for comparison.']) +
    MATTERS(['An element above ~35% dominates the chart; one near 0% is a gap that the right Luck Pillar or year can fill.', 'Balance matters more than having "lucky" elements.']));

  h += G('strength', 'Day Master strength 身强身弱 & useful elements 用神',
    'A <b>person carrying luggage</b>. Wealth, Officer and Output are the luggage (money, responsibility, expression). A strong person can carry a lot and is restless without it. A weak person needs helpers (Resource) and friends (Companions) before carrying more. The <b>useful element</b> is the <b>prescription</b>: what brings this person back to balance.',
    STEPS([
      'Support = your own element + the element that produces you (Resource). Example: Metal Day Master → Metal + Earth.',
      'Score = support ÷ everything else (excluding the Day Master itself). Under 33% weak, 45–55% balanced, over 67% strong.',
      'Three classical checks: 得令 born in a supportive season · 得地 rooted in the branches · 得势 supportive stems around you.',
      'Strong → favour Output, Wealth, Officer (spend energy). Weak → favour Resource, Companions (gain energy).',
      'Climate 调候: winter charts (亥子丑) need Fire to warm them; summer charts (巳午未) need Water. This is shown as a separate note, because it can override strength.',
    ]) + MATTERS(['This is the most debated judgement in BaZi. Masters disagree on borderline charts, so this tool shows the percentage rather than a hard verdict.', 'Extreme charts (under 20% or over 80%) may be "Follow" structures 从格, where the rules flip: the dominant element becomes favourable. The tool does not detect these automatically.']));

  h += G('tengods', 'Ten Gods 十神',
    'The <b>cast of your life movie</b>, named by their relationship to the lead actor (you). Some characters you create (Output), some you manage (Wealth), some manage you (Officer), some look after you (Resource), and some stand beside you (Companions). Each role comes in a steady version and an intense version.',
    STEPS(['Compare each character\'s element to the Day Master\'s: same / you produce it / you control it / it controls you / it produces you → 5 families.', 'Same yin-yang as you → the "partial" version (比肩, 食神, 偏财, 七杀, 偏印). Opposite → the "direct" version (劫财, 伤官, 正财, 正官, 正印).', 'Family strength scores use the same weights as the elements.']) +
    MATTERS(['The <b>dominant family</b> describes your operating style.', 'Gender changes the people map: for men Wealth = wife, Officer = children; for women Officer = husband, Output = children.']));

  h += G('structure', 'Structure 格局',
    'The chart\'s <b>job title or engine model</b>. Two people can both be Geng Metal, but one is an "Officer-structure" chart (built for organisations) and another an "Output-structure" chart (built to create).',
    STEPS(['Take the main hidden stem of the month branch.', 'Its Ten God names the structure (e.g. 正官格). A month branch holding your own element is called 建禄 / 月刃.']) +
    MATTERS(['The classical school 子平 judges quality by whether the structure is protected (e.g. Officer guarded by Resource) or broken (e.g. Officer hit by Hurting Officer).']));

  h += G('ho', 'Hurting Officer 伤官 patterns',
    'The <b>brilliant employee who corrects the boss in meetings</b>. Paired with Resource, they become a respected professor (伤官配印). Paired with Wealth, they found a company and monetise the talent (伤官生财). Facing Seven Killings, they are the bold negotiator who tames a bully (伤官驾杀). Meeting the Direct Officer head-on, they are the whistle-blower who gets fired (伤官见官).',
    STEPS(['Find the stem your Day Master produces with opposite polarity (Geng → Gui Water).', 'Locate it visibly (stems) and hidden (branches).', 'Check what else is prominent — Direct Officer, Resource, Wealth, Seven Killings — and flag the matching classical pattern.', 'Exception: a Metal Day Master in winter with Water as Hurting Officer welcomes Officer (Fire warms the cold chart): 金水伤官喜见官.', 'For Luck Pillars, flag decades whose stem or branch brings Hurting Officer, and warn if your chart already holds a Direct Officer.']) +
    MATTERS(['<b>Visible</b> Hurting Officer is how people see you; hidden is how you think.', 'Timing: problems usually appear when a Luck Pillar or year <b>adds</b> the missing side (an Officer year for a Hurting-Officer chart, or the reverse).']));

  h += G('inter', 'Combinations & clashes 合冲刑害',
    '<b>Chemistry between characters</b>. Combinations are magnets or marriages: they bond, and can also tie each other up. Clashes are head-on collisions between branches directly opposite each other on the 12-branch clock (子 Rat vs 午 Horse, 6 apart). Harms and punishments are quieter friction: misunderstandings and self-sabotage.',
    STEPS(['Stem combinations: 甲己, 乙庚, 丙辛, 丁壬, 戊癸 (each can transform into an element).', 'Branch: six clashes (opposites), six harmonies, three-harmony frames (e.g. 申子辰 Water), directional meetings (e.g. 亥子丑 Water), punishments and harms by fixed tables.', 'The life area affected = the pillars involved (e.g. Year × Month = background vs career).']) +
    MATTERS(['A clash on your <b>Day branch</b> (spouse palace) from a year or decade often coincides with moves, relationship shifts or health watch-points.', 'Clashes aren\'t always bad: they also unlock "storage" branches (辰戌丑未) and create movement.']));

  h += G('luck', 'Luck Pillars 大运 & annual pillars 流年',
    'If the natal chart is the <b>house</b>, Luck Pillars are the <b>seasons</b> it passes through: ten years of spring might suit a Wood house and dry out a Water one. Annual pillars are <b>each year\'s weather</b> inside that season.',
    STEPS([
      'Direction: yang-year male or yin-year female → count <b>forward</b> from the month pillar; otherwise backward.',
      'Start age: count the time from birth to the next (forward) or previous (backward) solar term. Every <b>3 days = 1 year</b>, 1 day = 4 months, 1 hour = 5 days. This tool uses the precise minute-level version.',
      'Each pillar is the next (or previous) pair in the 60-cycle after your month pillar.',
      'Rating: +1 if its element is favourable for you, −1 if unfavourable (branch weighted 1.2×), small bonus for climate. ≥1 favourable, ≤−1 challenging.',
      'The element-shift bars recalculate your balance with the decade added at 1.5× weight.',
      'Annual pillars are flagged for clashes with your chart, Hurting Officer years, and 岁运并临 (year = decade pillar, intensified).',
    ]) + MATTERS(['The <b>transition year</b> between decades often feels unsettled.', 'A great decade can still contain hard years, and the reverse; read the two layers together.']));

  h += G('stages', 'Life stages 十二长生 & Na Yin 纳音',
    'The <b>life cycle of a plant</b> through the 12 branches: sprout (长生), bath (沐浴), first growth, maturity, peak (帝旺), decline, sickness, death, storage (墓), nothing (绝), seed (胎), nurture (养). It measures how comfortable your Day Master feels in each branch.',
    STEPS(['Each Day Master stem has a fixed "birth" branch (e.g. 庚 born in 巳). Yang stems count forward and yin stems backward through the 12 stages.', 'Na Yin is an older poetic name for each of the 60 pairs (e.g. 甲子 = 海中金, "gold in the sea"). It\'s mainly used in compatibility and folk readings.']) +
    MATTERS(['Secondary indicators: useful colour, not decisive.']));

  h += `<h3>3 · Zi Wei Dou Shu 紫微斗数 — the map of destinations</h3>`;
  h += G('zwbasics', 'Palaces, stars & brightness',
    'A <b>house with 12 rooms</b>. Each room is a life area (Career, Spouse, Wealth…). The <b>main stars are the residents</b> who decide the room\'s character: an Emperor (紫微), a Strategist (天机), a General (七杀). <b>Brightness</b> is how well lit the room is, so the same resident behaves better in a bright room. The <b>Four Transformations</b> 四化 are a <b>spotlight</b> (禄 prosperity), a <b>megaphone</b> (权 power), a <b>medal</b> (科 fame) and a <b>red flag</b> (忌 obstacle) placed on particular stars.',
    STEPS([
      'Convert the birth date to the <b>lunar</b> calendar (leap months handled).',
      '<b>Life palace</b>: start at 寅, count forward by lunar month, then backward by birth hour. The Body palace counts forward by hour.',
      'Palace stems: from the birth-year stem, using the Five Tigers rule.',
      '<b>Five Element Bureau</b> 五行局 (e.g. 水二局): the Na Yin element of the Life palace\'s stem-branch. Its number (2–6) sets the age your first 10-year period starts.',
      'The <b>紫微</b> star is placed from your lunar day and bureau number; 13 other main stars follow fixed patterns relative to 紫微 and its mirror 天府.',
      'Minor stars are placed by year, month and hour. 四化 are set by the birth-year stem (e.g. 甲 year → 廉贞禄, 破军权, 武曲科, 太阳忌).',
      '10-year periods move forward or backward through the palaces by gender and year polarity. Ages are nominal (虚岁: counted from 1 at birth).',
    ]) + MATTERS(['<b>Birth hour is everything</b>: a different 2-hour block moves the Life palace and re-arranges every room.', 'Read the Life palace together with its three partners (三方四正: Wealth, Career, Travel). The tool\'s summaries focus on single palaces.', 'An empty room borrows the residents from the opposite room.']));

  h += `<h3>4 · Qi Men Dun Jia 奇门遁甲 — the live GPS</h3>`;
  h += G('qmbasics', 'The 9-palace hour chart',
    'A <b>battle map</b> or <b>multi-storey car park</b> for this exact 2-hour window. The 9 squares are the 8 compass directions plus the centre. Each square has 4 floors: the <b>ground</b> (Earth plate, what\'s already in place), the <b>sky</b> (Heaven plate and Star, what\'s arriving), the <b>people</b> (Door, the human action), and the <b>spirits</b> (Deity, hidden support or interference). You look for the square where all floors line up for your goal.',
    STEPS([
      '<b>Yin or Yang escape</b>: from 冬至 (winter solstice) to 芒种 is Yang 阳遁 (energy rising); from 夏至 to 大雪 is Yin 阴遁.',
      '<b>Upper / middle / lower 元</b>: from the day\'s "head" (the most recent 甲 or 己 day) — its branch decides the 元 (拆补 method).',
      '<b>Ju number</b> 局 (1–9): looked up from solar term × 元 (e.g. 立冬 下元 = Yin 3).',
      '<b>Earth plate</b>: place 戊己庚辛壬癸丁丙乙 starting at the Ju palace — forward for Yang, backward for Yin. (The 甲 "general" hides under the six 仪 — hence 遁甲, "hidden Jia".)',
      '<b>Leader</b>: the hour\'s ten-day block (旬首, e.g. 甲寅 hides under 癸) marks a palace; that palace\'s Star becomes 值符 (lead star) and its Door 值使 (lead door).',
      '<b>Rotate</b>: the lead star moves to the palace where the hour stem sits, and all stars rotate with it, carrying their stems (转盘 rotating plate). The lead door steps one palace per hour since the block began. Deities follow the lead star — clockwise in Yang, anticlockwise in Yin.',
      'Mark void 空亡 (the two branches missing from the ten-day block) and the travel horse 驿马.',
    ]) + MATTERS(['Find your <b>用神</b> (indicator) first: 开门 career, 生门 money, 六合 partnership/marriage, 景门 documents/exams, your day stem = you, hour stem = the matter.', 'A lucky door in a <b>void</b> palace = promising but empty or delayed.', 'Methods differ: 拆补 vs 置闰 (how 元 is assigned) and 转盘 vs 飞盘 (rotating vs flying). This tool uses 拆补 + 转盘, the most common modern Chinese/Singapore practice.']));
  h += G('qmuse', 'Birth chart vs query chart',
    'The birth chart is your <b>default battle strategy</b> — the terrain you were born on. The query chart is <b>today\'s weather report</b> for the battlefield you\'re about to walk into.',
    STEPS(['<b>Birth 命局</b>: where your Day stem sits and what door/star surrounds it shows your instinctive approach.', '<b>Query 时局</b> (auto "now"): used for decisions, meetings, travel direction, timing a launch. It refreshes automatically when the 2-hour block changes.']) +
    MATTERS(['Qi Men is <b>tactical</b> — great for "when and which way", weak for "what is my life about" (that\'s BaZi and Zi Wei).']));

  h += `<h3>5 · Putting them together</h3>`;
  h += G('cross', 'Cross-reference 合参 — how each life area is read',
    '<b>Three witnesses to the same event.</b> If all three describe it the same way, believe it. If they disagree, look deeper and don\'t act on one alone.',
    `<table class="gloss"><tr><th>Life area</th><th>BaZi looks at</th><th>Zi Wei looks at</th><th>Qi Men looks at</th></tr>
    <tr><td>Self</td><td>Day Master element, strength, dominant Ten God family</td><td>Life palace stars & transformations</td><td>Palace of your Day stem (birth chart)</td></tr>
    <tr><td>Career</td><td>Officer score, whether Officer element is favourable, structure, 伤官见官</td><td>Career palace 官禄</td><td>Palace of 开门 Open Door</td></tr>
    <tr><td>Wealth</td><td>Wealth score vs Day Master strength (财多身弱), 伤官生财</td><td>Wealth palace 财帛, where 化禄 / 化忌 sit</td><td>生门 Life Door, location of 戊 (capital)</td></tr>
    <tr><td>Relationships</td><td>Spouse palace (day branch), spouse star, clashes on day branch</td><td>Spouse palace 夫妻</td><td>六合 deity, 乙 (wife) / 庚 (husband) stem</td></tr>
    <tr><td>Now</td><td>Current Luck Pillar + annual pillar</td><td>Current 10-year palace & its 四化</td><td>Query-time chart: hour stem palace, lead door</td></tr></table>
    <p>Each system's verdict becomes <b>Supportive / Mixed / Caution</b> from a simple score (doors weighted most in Qi Men; transformations, lucky/unlucky helper stars and brightness in Zi Wei; element favourability in BaZi). "2/3 supportive" means two independent methods agree.</p>` +
    MATTERS(['Agreement is the signal; strength of a single score is not.', 'Different time scales: BaZi/Zi Wei describe decades and tendencies, Qi Men describes this 2-hour window — a "caution" from Qi Men now means "not this hour", not "not in life".']));
  h += G('compat', 'Compatibility 合盘 — how two charts are compared',
    '<b>Two gardens next to each other</b>. One has too much sun and the other too much water; they help each other by sharing. A good match supplies what the other lacks (element exchange), fits the role you need them in (a gardener vs a neighbour), and their fences don\'t collide (clashes).',
    `<table class="gloss"><tr><th>Factor</th><th>How it's calculated</th><th>Weight by role</th></tr>
    <tr><td>Day Master role</td><td>Their Day Master's Ten God relative to yours, compared with the ideal for that role (husband / boss → 正官; wife → 正财; mother → 正印; friend → 比肩…). Bonus for Day Master stem combination; penalty for clash; 伤官见官 check for bosses.</td><td>20–30%</td></tr>
    <tr><td>Element exchange</td><td>Share of each element in their chart × whether it's favourable (+1) or unfavourable (−1) for you, and the reverse, averaged.</td><td>15–35% (highest for business partners)</td></tr>
    <tr><td>Pillar interactions</td><td>Combinations (+) / clashes (−) between the pillars that matter for the role: Day×Day for spouses, Month×Month for work, your Hour × their Year for a child, your Year × their Hour for a parent. Peach Blossom for lovers.</td><td>20–25%</td></tr>
    <tr><td>Zi Wei 飞化</td><td>Their birth-year stem's four transformations land in your chart. 禄/权/科 in the relevant palace = they bring benefit; 忌 = burden. Plus whether their Life palace sits on your relevant palace.</td><td>15–20%</td></tr>
    <tr><td>Qi Men now</td><td>Your two Day stems' palaces in the current chart: whose palace produces or controls whose (the present power balance), plus the relationship indicator palace (六合, 开门, 生门…).</td><td>10–15%</td></tr></table>
    <p>Score = 50 + 50 × weighted average of the five factors (each −1…+1).</p>` +
    MATTERS(['Spouse/lover: Day pillars + element exchange matter most.', 'Boss/team: Day Master roles + Month pillars (workplace palace).', 'Parent/child: Year ↔ Hour pillars (the parent and child palaces).', 'Business partner: element exchange — do you complete each other?']));
  h += `<p class="muted small">All ratings are simplified rules of thumb so you can learn the logic. Experienced practitioners weigh many more factors and schools disagree, so treat this as a structured way to reflect, not a forecast.</p>`;
  return h;
}

function guideYour() {
  if (!STATE) return;
  const {bazi: b, zw, qmNow: q, inp} = STATE;
  const set = (k, html) => { const el = document.querySelector(`.gyour[data-k="${k}"]`); if (el) el.innerHTML = `<div class="yours"><b>${L('In your chart', '你的命盘')}</b> ${html}</div>`; };
  const t = b.times;
  const tzs = `UTC${inp.tz >= 0 ? '+' : ''}${+inp.tz.toFixed(2)}`;
  set('time', L(`Clock ${fmt(inp.wall)} at ${tzs}, longitude ${inp.lon}° → correction ${t.correctionMin} min (equation of time ${t.eot} min) → true solar <b>${fmt(t.tst)}</b> → ${b.pillars[3] ? b.pillars[3].zhi + ' hour' : 'hour unknown'}. Solar term in force: <b>${b.jieqi}</b>.`,
    `钟表时间 ${fmt(inp.wall)}（${tzs}），经度 ${inp.lon}° → 修正 ${t.correctionMin} 分钟（均时差 ${t.eot} 分钟）→ 真太阳时 <b>${fmt(t.tst)}</b> → ${b.pillars[3] ? b.pillars[3].zhi + '时' : '时辰不详'}。当时节气：<b>${b.jieqi}</b>。`));
  set('pillars', b.pillars.map(p => L(`${p.en} <b>${p.gz}</b> (#${p.jiazi} of 60)`, `${p.zh} <b>${p.gz}</b>（六十甲子第 ${p.jiazi}）`)).join(' · ') + L(`. You are the Day stem <b>${b.dm}</b>.`, `。你是日干 <b>${b.dm}</b>。`));
  set('hidden', b.pillars.map(p => `${p.zhi} → ${p.hidden.map(x => x.stem).join('')}`).join(' · '));
  const tot = b.scores.reduce((a, c) => a + c, 0);
  set('elements', b.scores.map((s, e) => L(`${EL_EN[e]} ${s.toFixed(1)} pts (${(s / tot * 100).toFixed(0)}%)`, `${EL[e]} ${s.toFixed(1)} 分（${(s / tot * 100).toFixed(0)}%）`)).join(' · ') + L(`. Month branch ${b.pillars[1].zhi} counted double.`, `。月支 ${b.pillars[1].zhi} 计双倍。`));
  const dmE = b.dmEl, resE = (dmE + 4) % 5;
  const sup = (b.scores[dmE] - 1 + b.scores[resE]).toFixed(1);
  set('strength', L(`Support = ${EL_EN[dmE]} ${(b.scores[dmE] - 1).toFixed(1)} + ${EL_EN[resE]} ${b.scores[resE].toFixed(1)} = ${sup} of ${(tot - 1).toFixed(1)} = <b>${(b.ratio * 100).toFixed(0)}% → ${b.label}</b>.`,
      `支持 = ${EL[dmE]} ${(b.scores[dmE] - 1).toFixed(1)} + ${EL[resE]} ${b.scores[resE].toFixed(1)} = ${sup}，总数 ${(tot - 1).toFixed(1)}，即 <b>${(b.ratio * 100).toFixed(0)}% → ${b.label.replace(/^[A-Za-z ]+/, '')}</b>。`)
    + ` 得令 ${b.deLing ? '✓' : '✗'} 得地 ${b.deDi ? '✓' : '✗'} 得势 ${b.deShi ? '✓' : '✗'}. ` + L(`Favourable: ${b.favourable.map(e => EL_EN[e]).join(', ')}.`, `喜用：${b.favourable.map(e => EL[e]).join('、')}。`)
    + (b.climate ? ' ' + L(b.climate.text, b.climate.need === 1 ? '生于冬季，需火调候。' : '生于夏季，需水调候。') : ''));
  set('tengods', b.dominant.map(([g, v]) => `${L(GROUP_EN[g], GROUP_EN[g].match(/\((.+)\)/)[1])} ${v.toFixed(1)}`).join(' · '));
  set('structure', L(`Month branch ${b.pillars[1].zhi} main qi ${mainHidden(b.pillars[1].zhi)} = ${b.monthGod} → <b>${b.structure}</b>.`, `月支 ${b.pillars[1].zhi} 本气 ${mainHidden(b.pillars[1].zhi)} = ${b.monthGod} → <b>${b.structure}</b>。`));
  set('ho', b.ho.present ? L(`Hurting Officer = ${STEMS.find(s => tenGod(b.dm, s) === '伤官')}. `, `伤官 = ${STEMS.find(s => tenGod(b.dm, s) === '伤官')}。`) + (b.ho.patterns.map(p => p.name.split(' ')[0]).join(' · ') || L('No classical pattern triggered.', '未成古典格局。')) : L('No natal Hurting Officer.', '原局没有伤官。'));
  set('inter', b.interactions.map(x => x.text.split(' ')[0] + ' ' + (x.text.match(/[一-鿿]{2,}/g) || []).slice(-1)[0] + ' (' + x.pair + ')').join(' · ') || L('No major natal interactions.', '原局没有明显的合冲。'));
  const d0 = b.daYun[0], fwd = (stemYang(b.pillars[0].gan) ? 1 : 0) === b.gender;
  set('luck', L(`Year stem ${b.pillars[0].gan} is ${stemYang(b.pillars[0].gan) ? 'yang' : 'yin'}, ${b.gender ? 'male' : 'female'} → <b>${fwd ? 'forward' : 'backward'}</b> from month pillar ${b.pillars[1].gz}. First Luck Pillar ${d0.gz} starts ${b.yunStart.y}y ${b.yunStart.m}m ${b.yunStart.d}d after birth (${d0.startYear}).`,
    `年干 ${b.pillars[0].gan} 为${stemYang(b.pillars[0].gan) ? '阳' : '阴'}，${b.gender ? '男' : '女'}命 → 从月柱 ${b.pillars[1].gz} <b>${fwd ? '顺排' : '逆排'}</b>。第一步大运 ${d0.gz} 于出生后 ${b.yunStart.y} 年 ${b.yunStart.m} 个月 ${b.yunStart.d} 天起运（${d0.startYear} 年）。`));
  set('stages', b.pillars.map(p => `${p.zhi}：${LIFE_STAGES[p.stage]}`).join(' · '));
  const life = zw.byName('命宫');
  if (!zw.unknown) set('zwbasics', L(`Lunar ${zw.lunarDate}, ${zw.time}. Life palace <b>${life.stem}${life.branch}</b> → bureau <b>${zw.fiveClass}</b> (first decade starts at ${life.decadal[0]}). Year stem ${b.pillars[0].gan} 四化: `, `农历 ${zw.lunarDate}，${zw.time}。命宫 <b>${life.stem}${life.branch}</b> → <b>${zw.fiveClass}</b>（第一个大限从 ${life.decadal[0]} 岁开始）。年干 ${b.pillars[0].gan} 四化：`) + (SIHUA[b.pillars[0].gan] || []).map((s, k) => s + '化' + '禄权科忌'[k]).join(' '));
  set('qmbasics', L(`Now: ${q.dayGZ} day, ${q.hourGZ} hour, solar term ${q.jq} → <b>${q.yang ? 'Yang' : 'Yin'}</b>, ${q.yuan}, Ju <b>${q.ju}</b>. 旬首 ${q.xunName} hides under ${q.xunYi} → lead star ${q.zfStar} moves to ${QM_PALACE[q.zfPalace]}; lead door ${q.zsDoor} moves to ${QM_PALACE[q.zsPalace]}. Void ${q.kongBr.join('')}.`,
    `此刻：${q.dayGZ}日 ${q.hourGZ}时，节气 ${q.jq} → <b>${q.yang ? '阳遁' : '阴遁'}</b>，${q.yuan}，<b>${q.ju}局</b>。旬首 ${q.xunName} 遁于 ${q.xunYi} → 值符 ${q.zfStar} 移至 ${QM_PALACE[q.zfPalace].split(' ')[0]}宫；值使 ${q.zsDoor} 移至 ${QM_PALACE[q.zsPalace].split(' ')[0]}宫。空亡 ${q.kongBr.join('')}。`));
}
