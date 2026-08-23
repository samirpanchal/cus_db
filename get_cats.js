import fs from 'fs';
const content = fs.readFileSync('src/data/materialsMenu.js', 'utf8');
const match = content.match(/export const materialsMenu = (\[[\s\S]*\]);/);
if(match) {
  // It's a JS object, let's just evaluate it loosely or parse it
  // Since it's valid JS (not JSON), we can eval it
  const evalFunc = new Function('return ' + match[1]);
  const menu = evalFunc();
  console.log(menu.map(c => c.name).join(', '));
}
