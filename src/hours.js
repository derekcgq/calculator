// ---------- Birth time unknown: show every possible hour ----------
const HR_BR = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const HR_PY = ['Zǐ','Chǒu','Yín','Mǎo','Chén','Sì','Wǔ','Wèi','Shēn','Yǒu','Xū','Hài'];
// 13 rows: late-night 子 (00:00–01:00), then 丑…亥, then early-night 子 (23:00–24:00)
const HR_SLOTS = (() => {
  const a = [{bi: 0, from: 0, to: 1, mid: [0, 30]}];
  for (let i = 1; i <= 11; i++) a.push({bi: i, from: 2 * i - 1, to: 2 * i + 1, mid: [2 * i, 0]});
  a.push({bi: 0, from: 23, to: 24, mid: [23, 30]});
  return a;
})();
const hrPad = n => String(n).padStart(2, '0');

function hourScenarios() {
  const {inp, bazi: b0} = STATE;
  const base = {...inp, noHour: false, useTST: false};
  const rows = [];
  HR_SLOTS.forEach(s => {
    try {
      const w = [inp.wall[0], inp.wall[1], inp.wall[2], s.mid[0], s.mid[1]];
      const I = {...base, wall: w};
      const B = computeBazi(I);
      const Z = computeZiwei(I, B, new Date());
      const life = Z.byName('命宫'), ev = Z.evalPalace(life);
      rows.push({s, B, Z, life, ev, hour: B.pillars[3], day: B.pillars[2].gz, dayShift: B.pillars[2].gz !== b0.pillars[2].gz});
    } catch (e) {}
  });
  return rows;
}

function hourScenarioCard() {
  if (!STATE || !STATE.inp.noHour) return '';
  const rows = hourScenarios();
  if (!rows.length) return '';
  const b0 = STATE.bazi;
  const fixed = b0.pillars.map(p => `${p.gan}${p.zhi}`).join(' ');
  const lifeKeys = new Set(rows.map(r => r.ev.stars.map(x => x.name).join('')));
  const stems = new Set(rows.map(r => r.hour.stemGod));
  const item = r => {
    const s = r.s, br = HR_BR[s.bi], py = HR_PY[s.bi];
    const t = `${hrPad(s.from)}:00–${hrPad(s.to % 24)}:00`;
    const stars = r.ev.stars.length ? r.ev.stars.map(x => x.name).join(L(' + ', '、')) : L('empty', '空宫');
    const kw = r.ev.stars.slice(0, 2).map(x => plainStar(x.name)).filter(Boolean).join(L('; ', '；'));
    const label = s.from === 0 ? L('late night', '晚子') : s.from === 23 ? L('early night', '早子') : '';
    return `<div class="hrow"><div class="hh"><b>${br}</b>${LANG === 'zh' ? '' : ` <span class="muted small">${py}</span>`}<div class="small muted">${t}${label ? ' · ' + label : ''}</div></div>
      <div class="hb"><div><span class="hpil">${r.hour.gan}${r.hour.zhi}</span> <span class="small muted">${L('hour pillar', '时柱')} · ${r.hour.stemGod}</span>${r.dayShift ? ` <span class="small" style="color:var(--warn)">${L('Day pillar becomes', '日柱变为')} ${r.day}</span>` : ''}</div>
      <div class="small">${L('Zi Wei', '紫微')}: ${r.Z.fiveClass} · ${L('Life palace', '命宫')} ${r.life.stem}${r.life.branch} · <b>${stars}</b>${r.ev.borrowed ? L(' (borrowed)', '（借对宫）') : ''}</div>
      ${kw ? `<div class="small muted">${kw}</div>` : ''}</div>
      <button class="ghost hpick" type="button" data-t="${hrPad(s.mid[0])}:${hrPad(s.mid[1])}">${L('Use', '选用')}</button></div>`;
  };
  return `<div class="card"><h4>${L('Every possible birth hour', '所有可能的出生时辰')}</h4>
    <p class="small muted">${L(`Your Year, Month and Day pillars (${fixed}) are the same whatever the hour, so those parts of your reading are solid. Only the Hour pillar, Zi Wei chart and Qi Men birth chart change. Below is each two-hour slot and what it would give you: ${lifeKeys.size} different Life-palace star combinations. Read them and see which one sounds most like you, or ask a parent which slot fits (e.g. "just after lunch" = 午 Wǔ, 11:00–13:00).`, `你的年柱、月柱、日柱（${fixed}）不受时辰影响，所以这部分解读是可靠的。只有时柱、紫微命盘与奇门命局会随时辰改变。下面列出每个时辰对应的结果：共 ${lifeKeys.size} 种不同的命宫主星组合。可逐个对照，看哪个最像你，或问家人大概是哪个时段（例如“午饭后不久” = 午时，11:00–13:00）。`)}</p>
    <div class="hours">${rows.map(item).join('')}</div>
    <p class="small muted">${L('Times use clock time, since the exact minute is unknown. Tap "Use" to load that slot as your birth time (you can switch back to "Time unknown" any time).', '时间按钟表时间计算。点“选用”即把该时辰作为出生时间载入（随时可改回“时间不详”）。')}</p></div>`;
}

function bindHourPicks() {
  document.querySelectorAll('.hpick').forEach(btn => btn.onclick = () => {
    $('#notime').checked = false; $('#btime').disabled = false; $('#btime').value = btn.dataset.t;
    calculate(false);
  });
}
