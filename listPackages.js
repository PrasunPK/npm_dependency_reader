const fs = require('fs');

const packageContent = fs.readFileSync((process.argv[2] || '.') + '/package.json', 'UTF-8');
const jsonData = JSON.parse(packageContent);

const dependencies = jsonData.dependencies || [];
const peerDependencies = jsonData.peerDependencies || [];

const horizontalSeparator = "-";
const verticalSeparator = "|";

const dependencyNames = Object.keys(dependencies).concat(Object.keys(peerDependencies));
const dependencyVersions = Object.values(dependencies).concat(Object.values(peerDependencies));

const header = '|Package Name|Version|\n'
const horizontalBorder = '|:-|:-|';
let text = header + horizontalBorder + '\n';
for (var i = 0; i < dependencyNames.length; i++) {
  text += verticalSeparator + dependencyNames[i] + verticalSeparator + dependencyVersions[i] + verticalSeparator +'\n';
}

console.log(text);
