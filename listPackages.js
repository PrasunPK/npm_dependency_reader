const fs = require('fs');

const packageContent = fs.readFileSync((process.argv[2] || '.') + '/package.json', 'UTF-8');
const jsonData = JSON.parse(packageContent);

const dependencies = jsonData.dependencies || [];
const peerDependencies = jsonData.peerDependencies || [];

const horizontalSeparator = "-";
const verticalSeparator = "|";

const dependencyNames = Object.keys(dependencies).concat(Object.keys(peerDependencies));
const dependencyVersions = Object.values(dependencies).concat(Object.values(peerDependencies));

const findLongestLength = (collection) => {
  var longest = collection.reduce(function (a, b) { return a.length > b.length ? a : b; });
  return longest.length;
};

const addSpace = (length) => {
  let spaces = '';
  for (var i = 0; i < length; i++) {
    spaces += ' ';
  }
  return spaces;
}

const getnameWithPadding = (name, collection, extra) => {
  return name + addSpace(!extra ? (findLongestLength(collection) - name.length)+5 : 6);
};

const calculateTotalLengthForHeaderBorder = () => {
  return findLongestLength(dependencyNames) + findLongestLength(dependencyVersions) + 7;
};

const createTopBorder = () => {
  let border = horizontalSeparator;
  for (var i = 0; i < calculateTotalLengthForHeaderBorder()+8; i++) {
    border += horizontalSeparator;
  }
  return border += horizontalSeparator;
};

const createColumnHeading = (name, extra) => {
  return getnameWithPadding(name , dependencyNames, extra);
}

const createHeader = () => {
  return createTopBorder() + '\n' + verticalSeparator +
    addSpace(1) + createColumnHeading('Package Name') + addSpace(1) + verticalSeparator +
    addSpace(1) + createColumnHeading('Version', true) + addSpace(0) + verticalSeparator + '\n' +
    createTopBorder() + '\n' ;
}

let text = createHeader();
for (var i = 0; i < dependencyNames.length; i++) {
  text += verticalSeparator + addSpace(1) + getnameWithPadding(dependencyNames[i], dependencyNames) + addSpace(1) + verticalSeparator +
                       addSpace(1) + getnameWithPadding(dependencyVersions[i], dependencyVersions, false) + addSpace(1) + verticalSeparator + '\n';
}
text+=createTopBorder();

console.log(text);
