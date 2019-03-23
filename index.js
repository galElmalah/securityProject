const program = require("commander");
const Obfuscator = require("./obfuscator");

program
    .command('obfuscate <filename>')
    .description('Choose file to ocfuscate')
    .action(function (file) {
        var fileName = file.substring(0, file.lastIndexOf('.'));
        var fileEnding = file.substring(file.lastIndexOf('.') + 1, file.length);
        console.log(fileName, fileEnding);

        Obfuscator.obfuscate(fileName, fileEnding);
    })


program.parse(process.argv);