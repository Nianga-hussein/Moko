const fs = require('fs');
const path = 'assets/css/app.css';
try {
  if (fs.existsSync(path)) {
    let content = fs.readFileSync(path, 'utf8');
    content = content.replace(/#f33c0e/g, '#FF6600');
    fs.writeFileSync(path, content, 'utf8');
    console.log('Success');
  } else {
    console.log('File not found');
  }
} catch (e) {
  console.error(e);
}