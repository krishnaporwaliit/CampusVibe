const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

const replacements = [
  // Backgrounds & Gradients
  { from: /bg-gradient-to-br from-\[#0F0A1A\] to-\[#1A1025\]/g, to: 'bg-[#FFFDFB]' },
  { from: /bg-black\/30/g, to: 'bg-white border border-gray-200 focus:ring-2 focus:ring-rose-500/20' },
  { from: /bg-black\/50/g, to: 'bg-gray-100/50' },
  { from: /bg-black\/20/g, to: 'bg-gray-50' },
  { from: /bg-black\/80/g, to: 'bg-black/40' }, // Modals overlay
  { from: /bg-white\/5/g, to: 'bg-gray-50' },
  
  // Gradients for text/buttons
  { from: /from-purple-400 to-rose-400/g, to: 'from-rose-600 to-rose-400' },
  { from: /from-purple-500 to-rose-400/g, to: 'from-rose-600 to-rose-400' },
  { from: /from-purple-500 to-rose-500/g, to: 'from-rose-600 to-rose-500' },
  { from: /from-purple-600 to-pink-600/g, to: 'from-rose-500 to-rose-600' },
  { from: /from-rose-500 hover:to-rose-400/g, to: 'from-rose-600 hover:to-rose-500' },
  { from: /from-purple-500/g, to: 'from-rose-500' },
  
  // Text colors
  { from: /text-gray-300/g, to: 'text-gray-600' },
  { from: /text-gray-200/g, to: 'text-gray-700' },
  { from: /text-gray-400/g, to: 'text-gray-500' },
  { from: /text-pink-400/g, to: 'text-rose-600' },
  { from: /hover:text-pink-300/g, to: 'hover:text-rose-700' },
  
  // Borders & focus
  { from: /border-purple-500/g, to: 'border-rose-500' },
  { from: /border-white\/10/g, to: 'border-gray-200' },
  { from: /border-white\/20/g, to: 'border-gray-200' },
  
  // Fix button text colors (I replaced text-white with text-gray-900 globally earlier, let's restore it for buttons)
  { from: /text-gray-900 font-bold/g, to: 'text-white font-bold' },
  { from: /text-gray-900 py-2/g, to: 'text-white py-2' },
  
  // Error messages
  { from: /bg-red-500\/20 text-red-200/g, to: 'bg-red-50 text-red-600 border border-red-100' }
];

function processDirectory(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;
      replacements.forEach(rule => {
        content = content.replace(rule.from, rule.to);
      });
      if (content !== original) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      }
    }
  });
}

processDirectory(directoryPath);
console.log('Done mapping styles!');
