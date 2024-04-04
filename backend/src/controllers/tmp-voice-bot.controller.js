const databaseService = require('../database/database.service');
const { spawn } = require('child_process');

let botProcess;
let consoleOutput = [];

function startBot() {
    botProcess = spawn('node', ['/Users/marcelnoehre/Documents/dev/bots/3dg-tmp-voice/index.js']);

    botProcess.stdout.on('data', (data) => {
        const output = data.toString();
        console.log(output);
        consoleOutput.push(output);
    });

    botProcess.stderr.on('data', (data) => {
        const output = data.toString();
        console.error(output);
        consoleOutput.push(output);
    });

    botProcess.on('close', (code) => {
        console.log(`Bot process exited with code ${code}`);
        botProcess = null;
    });
}

module.exports = {

}