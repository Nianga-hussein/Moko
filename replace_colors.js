const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'assets/css/app.css');

try {
  const data = fs.readFileSync(filePath, 'utf8');
  let result = data.replace(/#f33c0e/gi, '#FF6600');
  result = result.replace(/rgba\(77,\s*115,\s*252/g, 'rgba(255, 102, 0');

  fs.writeFileSync(filePath, result, 'utf8');
  console.log('Successfully replaced colors in app.css');
} catch (err) {
  console.error('Error:', err);
}
