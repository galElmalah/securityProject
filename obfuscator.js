// const { execSync } = require('child_process');
const fs = require('fs');
// const execute = (cmd) => execSync(cmd, { stdio: 'inherit' });
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

module.exports = {

    obfuscate(filename, ending) {
        const { execSync } = require('child_process');
        const execute = (cmd) => execSync(cmd, { stdio: 'inherit' });

        try {

            if (ending != -1) {
                execute('chmod 777 ' + filename + '.' + ending)
                originalFileContent = fs.readFileSync(filename + '.' + ending, 'binary');
            }
            else {
                execute('chmod 777 ' + filename)
                originalFileContent = fs.readFileSync(filename, 'binary');
            }

        } catch (err) {
            console.log("file name is not exist");
            process.exit(1)
        }
        let flag = false;
        while (!flag) {
            let tmpFile = originalFileContent;
            while (true) {
                try {
                    tmpFile = addRandomString(tmpFile)
                    fs.writeFileSync('./' + filename + '.test.out', tmpFile, 'binary');
                    execute('chmod 777 ./' + filename + '.test.out');

                    execute('objdump -d ./' + filename + '.test.out');
                } catch (err) {
                    console.log(`Cant decompile \n ${err}`);
                    try {
                        execute('./' + filename + '.test.out');
                        flag = true;
                        console.log("Golden");

                        break;
                    } catch (err) {
                        console.log("$$$$$$$$$$$$$$$$");
                    }

                    break;
                }
            }
        }

    }

}




