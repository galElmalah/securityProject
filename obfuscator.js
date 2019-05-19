const { execSync } = require('child_process');
const fs = require('fs');
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



const obfuscate = filename => {
  //obfuscation function
  let flag = false;
  let iter = 0;
  while (!flag) {
    let tmpFile = originalFileContent;
    while (true) {
      try {
        tmpFile = addRandomString(tmpFile);
        iter++;
        fs.writeFileSync('./' + filename + '.test.out', tmpFile, 'binary');
        execute('chmod 777 ./' + filename + '.test.out');
        execute('objdump -d ./' + filename + '.test.out');
      } catch (err) {
        console.log(`Cant decompile \n ${err}`);
        try {
          execute('./' + filename + '.test.out');
          console.log('Yayyy');
          return iter;
        } catch (err) {
          console.log("Can't compile.");
        }

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
      console.log('file name is not exist');
      process.exit(1);
    }
    return obfuscate(filename);
  },
  obfuscate,
};

module.exports.obfuscate = obfuscate;
