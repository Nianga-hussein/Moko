const fs = require('fs');
const fd = fs.openSync('debug.log', 'w');
try {
  const content = fs.readFileSync('assets/css/app.css', 'utf8');
  fs.writeSync(fd, 'Read success\n');
  const newContent = content.replace(/#f33c0e/g, '#FF6600');
  fs.writeFileSync('assets/css/temp_style.css', newContent);
  fs.writeSync(fd, 'Write success\n');
} catch (e) {
  fs.writeSync(fd, 'Error: ' + e.message + '\n');
} finally {
  fs.closeSync(fd);
}