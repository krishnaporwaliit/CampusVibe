const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src');

const rules = [
  // Fix text colors in Swipe.jsx match screen
  { from: /text-5xl font-bold text-gray-900 mb-6/g, to: 'text-5xl font-bold text-white mb-6' },
  { from: /text-xl text-gray-900 mb-8/g, to: 'text-xl text-white mb-8' },
  // Fix text colors in image overlays (Swipe.jsx, etc)
  { from: /text-3xl font-bold text-gray-900 mb-1/g, to: 'text-3xl font-bold text-white mb-1' },
  // Fix chat bubbles
  { from: /bg-gradient-to-r from-rose-500 to-rose-600 text-gray-900/g, to: 'bg-gradient-to-r from-rose-500 to-rose-600 text-white' },
  { from: /bg-indigo-600 text-gray-900/g, to: 'bg-indigo-600 text-white' },
  { from: /bg-indigo-500 hover:bg-indigo-600 text-gray-900/g, to: 'bg-indigo-500 hover:bg-indigo-600 text-white' },
  // Fix send buttons and circular buttons with rose bg
  { from: /bg-rose-500 rounded-full flex items-center justify-center text-gray-900/g, to: 'bg-rose-500 rounded-full flex items-center justify-center text-white' },
  { from: /bg-indigo-600 rounded-full flex items-center justify-center text-gray-900/g, to: 'bg-indigo-600 rounded-full flex items-center justify-center text-white' },
  // Fix Rating modal close button which is over an image
  { from: /bg-black\/40 rounded-full text-gray-900 z-10 hover:bg-black\/60/g, to: 'bg-black/40 rounded-full text-white z-10 hover:bg-black/60' },
  // Fix black/40 input boxes
  { from: /bg-black\/40 border border-gray-100 rounded-xl/g, to: 'bg-white border border-gray-200 rounded-xl' },
  { from: /bg-black\/40 border border-indigo-500\/30 rounded-full/g, to: 'bg-white border border-indigo-500/30 rounded-full' },
  { from: /bg-black\/40 border border-gray-100 rounded-full/g, to: 'bg-white border border-gray-200 rounded-full' },
];

function processDir(d) {
  fs.readdirSync(d).forEach(file => {
    const full = path.join(d, file);
    if (fs.statSync(full).isDirectory()) processDir(full);
    else if (full.endsWith('.jsx')) {
      let content = fs.readFileSync(full, 'utf8');
      let orig = content;
      rules.forEach(r => content = content.replace(r.from, r.to));
      if (content !== orig) {
        fs.writeFileSync(full, content);
        console.log("Fixed", full);
      }
    }
  });
}
processDir(dir);
