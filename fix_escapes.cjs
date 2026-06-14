const fs = require('fs');
let content = fs.readFileSync('src/data/posts.ts', 'utf8');
content = content.replace(/\\"/g, '"');
content = content.replace(/\\i/g, 'i');
content = content.replace(/\\m/g, 'm');
fs.writeFileSync('src/data/posts.ts', content);
console.log('Fixed posts.ts');
