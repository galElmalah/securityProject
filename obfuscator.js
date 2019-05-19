const { execSync } = require('child_process');
const fs = require('fs');
const predictor = require('./ml');
const _cliProgress = require('cli-progress');

let originalFileContent;
const execute = cmd => execSync(cmd);
const getRandom = max => Math.floor(Math.random() * max);
const addRandomString = txt => {
  //function that add a character at random palces
  const random = getRandom(txt.length);
  return txt.split('').reduce((accm, char, i) => {
    if (i === random) {
      return accm + ' ';
    }
    return accm + char;
  });
};

const percentage = base => progress => (progress / base) * 100;

const bar1 = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic);
bar1.start(100, 0);
const obfuscate = filename => {
  const { size } = fs.statSync(`./${filename}.out`);
  const [input, output] = predictor.predict(size);
  const progressPercentage = percentage(output);
  let flag = false;
  let iter = 0;
  while (!flag) {
    let tmpFile = originalFileContent;
    while (true) {
      try {
        tmpFile = addRandomString(tmpFile);
        iter++;

        progressPercentage(iter) < 95 && bar1.update(progressPercentage(iter));
        fs.writeFileSync('./' + filename + '.test.out', tmpFile, 'binary');
        execute('chmod 777 ./' + filename + '.test.out');
        execute('objdump -d ./' + filename + '.test.out');
      } catch (err) {
        try {
          execute('./' + filename + '.test.out');
          bar1.update(100);
          return iter;
        } catch (err) {}

        break;
      }
    }
  }
};

module.exports = {
  execution(filename, ending) {
    try {
      if (ending != -1) {
        execute('chmod 777 ' + filename + '.' + ending);
        originalFileContent = fs.readFileSync(
          filename + '.' + ending,
          'binary'
        );
      } else {
        execute('chmod 777 ' + filename);
        originalFileContent = fs.readFileSync(filename, 'binary');
      }
    } catch (err) {
      process.exit(1);
    }
    return obfuscate(filename);
  },
  obfuscate,
};

module.exports.obfuscate = obfuscate;
