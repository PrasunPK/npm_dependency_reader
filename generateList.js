const listOfCheckableComponents = []; //add all the packages to traverse

const fs = require('fs');

let initialSource = '.';
const parentBody = {};

const list = (allDependencies, parentCompName) => {
  Object.keys(allDependencies).forEach((name) => {
    if(listOfCheckableComponents.indexOf(name) >= 0) {
      initialSource = `./node_modules/${name}`;
      generateList(name);
    }
    else {
      const newObj = Object.assign(parentBody[parentCompName], { [name]: allDependencies[name] });

      parentBody[parentCompName] = newObj;
    }
  });
};

const getAllDependencies = (parentObjectName) => {
  const packageContent = fs.readFileSync(`${initialSource}/package.json`, 'UTF-8');
  const jsonData = JSON.parse(packageContent);

  parentBody[jsonData.name] = {};

  const dependencies = jsonData.dependencies || {};
  const peerDependencies = jsonData.peerDependencies || {};
  const allDeps = Object.assign(dependencies, peerDependencies);

  list(allDeps, parentObjectName);
};

const generateList = (parentObject) => {
  getAllDependencies(parentObject);
};

generateList(''); //add your initial package

console.log(parentBody);
