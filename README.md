# 四柱 · 紫微 · 奇门 Destiny Calculator

A single-page calculator that draws a **BaZi (Four Pillars)** chart and cross-references it with **Zi Wei Dou Shu** and **Qi Men Dun Jia**. It runs entirely in the browser: birth details stay on the device and nothing is sent to a server.

## What it does

- **Summary** – a plain-language card for each area of life (career, money, love, family, health, home, timing), with an "at a glance" box.
- **Reading** – a narrative report: pillars, Na Yin, 10-year Luck Pillars, the next two years, plus Zi Wei and Qi Men readings.
- **BaZi** – pillars, hidden stems, Ten Gods, Five Elements balance, Day Master strength, Hurting Officer (伤官) patterns, combinations and clashes, Na Yin, Luck Pillars and annual pillars.
- **Zi Wei** – the 12-palace chart with the four transformations (四化), current decade and year.
- **Qi Men** – an hour chart (转盘, 拆补) for the birth time and for now.
- **Cross-reference** – each life area read by all three systems, showing where they agree.
- **Past Life 前世** – a modern, plain-language reading inspired by 三世书: who you were (Year pillar Na Yin), the gift you carried over (Day Master), the lesson left unfinished (weakest element) and why you came back (Hour branch). Original text, not copied from any edition. Includes numerology (Life Path, karmic debt, missing numbers), an everyday-life example on every card, and a references list. Expert view adds the Na Yin detail, the Lo Shu grid and the step-by-step working.
- **Compatibility** – two charts compared by role (spouse, lover, friend, boss, team member, partner, child, parent, sibling).
- **Guide** – analogies and the calculation steps behind every section.
- English / 中文 switch, and a Simple / Expert view.

Time handling includes true solar time, solar-term boundaries, a choice of Zi-hour rule, and historical clock offsets for Singapore and Malaysia.

## Use it

Open `index.html` in a browser. To host it, enable GitHub Pages for this repository (Settings → Pages → deploy from the `main` branch, root folder).

## Build

```
npm install
npm run build
```

This bundles the libraries and inlines everything in `src/` into `index.html`.

## Credits

Calendar and pillars: [lunar-javascript](https://github.com/6tail/lunar-javascript). Zi Wei Dou Shu: [iztro](https://github.com/SylarLong/iztro). The Qi Men engine, interpretation rules and text are part of this project.

## Note

Strength scores, ratings, compatibility weights and the Supportive / Caution labels are simplified rules of thumb. Schools of practice differ, and the tool does not detect special structures such as 从格. Treat the output as a prompt for reflection, not a prediction.
