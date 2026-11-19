// Builds the single-file page: bundles the two libraries, then inlines every source file into src/template.html.
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const src = f => path.join(__dirname, 'src', f);
execSync(`npx esbuild "${src('entry.js')}" --bundle --minify --format=iife --outfile="${path.join(__dirname, 'libs.js')}"`, { stdio: 'inherit' });
const read = f => fs.readFileSync(f, 'utf8');
const parts = { LIBS: read(path.join(__dirname, 'libs.js')).replace(/<\/script/gi, '<\\/script'), ENGINE: 'engine.js', I18N: 'i18n.js', UI: 'ui.js', EXPLAIN: 'explain.js', GUIDE: 'guide.js', GUIDEZH: 'guide_zh.js', NAYIN: 'nayin.js', READING: 'reading.js', SIMPLE: 'simple.js', TABCARDS: 'tabcards.js', ZHDICT: 'zhdict.js', COMPAT: 'compat.js', PASTLIFE: 'pastlife.js' };
let html = read(src('template.html'));
for (const [key, val] of Object.entries(parts)) {
  const marker = `/*${key}*/`;
  if (!html.includes(marker)) throw new Error('Missing marker ' + marker);
  html = html.replace(marker, () => (key === 'LIBS' ? val : read(src(val))));
}
fs.writeFileSync(path.join(__dirname, 'index.html'), html);
console.log('index.html written:', html.length, 'bytes');
