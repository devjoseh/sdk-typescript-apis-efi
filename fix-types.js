const fs = require('fs');
const path = require('path');

const typesPath = path.join(__dirname, 'dist', 'types', 'index.d.ts');

if (fs.existsSync(typesPath)) {
    let content = fs.readFileSync(typesPath, 'utf8');
    
    // Convert 'export default class EfiPay' to 'declare class EfiPay'
    // and append 'export = EfiPay;' to ensure compatibility with NodeNext + ESM/CJS default imports
    if (content.includes('export default class EfiPay')) {
        content = content.replace('export default class EfiPay', 'declare class EfiPay');
        content += '\nexport = EfiPay;\n';
        fs.writeFileSync(typesPath, content);
        console.log('Fixed types in dist/types/index.d.ts');
    }
}
