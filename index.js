const { execSync } = require('child_process');
const fs = require('fs');
// execute commands in the terminal
const execute = (cmd) => execSync(cmd, { stdio: 'inherit' });
const originalFileContent = fs.readFileSync("yoel.out", 'binary');
console.log(originalFileContent.toString().length);
const getRandom = (max) => Math.floor(Math.random() * max);

const addRandomString = (txt) => {
    const random = getRandom(txt.length);
    return txt.split('').reduce((accm, char, i) => {
        if (i === random) {
            return accm + ' ';
        }
        return accm + char;
    })
}
execute('./yoel.out')
// console.log(Buffer.from(originalFileContent.toString()));
fs.writeFileSync('./yoel.test.out', originalFileContent, 'binary');
execute('./yoel.test.out')
// while (true) {
//     let tmpFile = originalFileContent.toString();
//     while (true) {
//         try {
//             tmpFile = addRandomString(tmpFile)
//             fs.writeFileSync('./yoel.test.out', tmpFile);
//             execute('./yoel.test.out')
//             execute('objdump -d ./yoel.test.out');
//         } catch (err) {
//             console.log(`Cant decompile \n ${err}`);
//             break;
//         }
//     }
// }

