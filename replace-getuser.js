const fs = require('fs');
const path = require('path');

const replaceInFile = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('await supabase.auth.getUser()')) {
    content = content.replace(
      /const \{ data: \{ user \} \} = await supabase\.auth\.getUser\(\);/g,
      "const { data: { session } } = await supabase.auth.getSession();\n  const user = session?.user;"
    );
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
  }
};

const walkSync = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkSync(filePath);
    } else if (filePath.endsWith('.tsx') && !filePath.includes('actions.ts')) {
      replaceInFile(filePath);
    }
  }
};

walkSync('./src/app/dashboard');
walkSync('./src/components');
console.log('Done replacing getUser with getSession in UI files.');
