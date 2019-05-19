const fs = require('fs');
const { execSync } = require('child_process');
const Obfuscate = require('./obfuscator');

const getRandomCodeContent = () => {
  const getRandom = max => Math.floor(Math.random() * max);
  const fun = [
    () => `printf("%d", ${getRandom(1000)});\n`,
    () => `${getRandom(1000)} + ${getRandom(2000)};\n`,
    () => `cout << "${getRandom(1000)}\n";`,
  ];
  let functions = '';
  for (let i = 0; i < getRandom(100000); i++) {
    functions += `  ${fun[getRandom(2)]()}`;
  }
  const template = `#include <stdio.h>
int main(){
${functions}
}
`;
  return template;
};

const getDataSet = () => fs.readdirSync('./dataSets');

const genFiles = () => {
  for (let i = 0; i < 500; i++) {
    fs.writeFileSync(`./dataSets/data${i}.cpp`, getRandomCodeContent());
  }
};

getDataSet().forEach(file => {
  execSync(
    `gcc ./dataSets/${file} -o ./dataSets/${file.replace('cpp', 'out')}`
  );
});

const stats = file => fs.statSync(`./dataSets/${file}`);

const toMetaData = ({ blocks, size, ino }) => ({
  blocks,
  size,
  ino,
});

export const genMetaData = () => {
  const files = getDataSet();
  const metaData = files.map(stats).map(toMetaData);
  const untilObfuscation = files
    .filter(file => !file.includes('.cpp'))
    .map(file => Obfuscate.execution(`./dataSets/${file}`, -1));

  fs.writeFileSync(
    './metaData.json',
    JSON.stringify({
      untilObfuscation,
      metaData,
    })
  );
};
