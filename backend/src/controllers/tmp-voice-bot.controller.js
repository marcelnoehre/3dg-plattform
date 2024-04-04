const databaseService = require('../database/database.service');
const { spawn } = require('child_process');

let botProcess;
let consoleOutput = [];

async function startBot() {
    const database = await databaseService.getDataBase();
    botProcess = spawn('node', [database.tmpVoiceBot.path]);

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

    botProcess.on('close', () => {
        console.log(`Bot process terminated!`);
    });
}

async function start(req, res, next) {
    try {
        const database = await databaseService.getDataBase();
        if (database.tmpVoiceBot.isRunning) {
            res.status(400).send({ message: 'Bot is already running!' });
        } else {
            await startBot();
            database.tmpVoiceBot.isRunning = true;
            await databaseService.updateDatabase(database);
            res.send({ message: 'Bot started!' });
        }
    } catch(err) {
        next(err);
    }
}

async function restart(req, res, next) {
    try {
        const database = await databaseService.getDataBase();
        if (database.tmpVoiceBot.isRunning) {
            await botProcess.kill();
            consoleOutput = [];
            await startBot();
            res.send({ message: 'Bot restarted!' });
        } else {
            res.status(400).send({ message: 'Bot is not running!' });
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
            res.send({ message: 'Bot stopped!' });
        } else {
            res.status(400).send({ message: 'Bot is not running!' });
        }
    } catch(err) {
        next(err);
    }
}

async function getConsole(req, res, next) {
    try {
        const database = await databaseService.getDataBase();
        if (database.tmpVoiceBot.isRunning) {
            res.json(consoleOutput);
        } else {
            res.status(400).send({ message: 'Bot is not running!' });
        }
    } catch(err) {
        next(err);
    }
}

module.exports = {
    start,
    restart,
    stop,
    getConsole
}