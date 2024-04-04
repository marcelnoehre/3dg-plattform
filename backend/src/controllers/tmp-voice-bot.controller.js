const databaseService = require('../database/database.service');
const { spawn } = require('child_process');

let botProcess;
let consoleOutput = [];

async function startBot() {
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

async function start(req, res, next) {
    try {
        const database = await databaseService.getDataBase();
        if (database.tmpVoiceBot.isRunning) {
            res.status(400).send('Bot is already running!');
        } else {
            await startBot();
            database.tmpVoiceBot.isRunning = true;
            await databaseService.updateDatabase(database);
            res.send('Bot started!');
        }
    } catch(err) {
        next(err);
    }
}

async function stop(req, res, next) {
    try {
        const database = await databaseService.getDataBase();
        if (database.tmpVoiceBot.isRunning) {
            await botProcess.kill();
            consoleOutput = [];
            database.tmpVoiceBot.isRunning = false;
            await databaseService.updateDatabase(database);
            res.send('Bot stopped!');
        } else {
            res.status(400).send('Bot is not running!');
        }
    } catch(err) {
        next(err);
    }
}

module.exports = {
    start,
    stop
}