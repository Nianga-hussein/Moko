const fs = require('fs');
try {
  const content = fs.readFileSync('assets/css/app.css', 'utf8');
  const newContent = content.replace(/#f33c0e/g, '#FF6600');
  fs.writeFileSync('assets/css/temp_style.css', newContent);
} catch (e) {
  // empty
}