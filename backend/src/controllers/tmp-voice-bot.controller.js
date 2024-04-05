const commonService = require('../services/common.service');
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

async function getConsole(req, res, next) {
    try {
        res.json(consoleOutput);
    } catch(err) {
        next(err);
    }
}

async function getChannelSettings(req, res, next) {
    try {
        const database = await databaseService.getDataBase();
        const data = await commonService.readJSONFile(database.tmpVoiceBot.path.replace('index.js', 'assets/channel.json'));
        res.json(data);
    } catch(err) {
        next(err);
    }
}

async function start(req, res, next) {
    try {
        const database = await databaseService.getDataBase();
        if (database.tmpVoiceBot.isRunning) {
            res.status(400).send({ message: 'Bot is already running!' });
        } else {
            await startBot();
            database.tmpVoiceBot.pendingChanges = false;
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
            database.tmpVoiceBot.pendingChanges = false;
            await databaseService.updateDatabase(database);
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
            database.tmpVoiceBot.pendingChanges = false;
            await databaseService.updateDatabase(database);
            res.send({ message: 'Bot stopped!' });
        } else {
            res.status(400).send({ message: 'Bot is not running!' });
        }
    } catch(err) {
        next(err);
    }
}

async function updatePath(req, res, next) {
    try {
        const database = await databaseService.getDataBase();
        database.tmpVoiceBot.path = req.body.path;
        await databaseService.updateDatabase(database);
        res.json({ message: 'Path Update Success!' });
    } catch(err) {
        next(err);
    }
}

async function updateChannelSettings(req, res, next) {
    try {
        const attribute = req.body.attribute;
        const value = req.body.value;
        const database = await databaseService.getDataBase();
        const path = database.tmpVoiceBot.path.replace('index.js', 'assets/channel.json');
        const data = await commonService.readJSONFile(path);
        data[attribute] = value;
        await commonService.updateJSONFile(path, data);
        if (database.tmpVoiceBot.isRunning) {
            database.tmpVoiceBot.pendingChanges = true;
        }
        await databaseService.updateDatabase(database);
        res.json({ message: 'Channel Settings Update Success!' });
    } catch(err) {
        next(err);
    }
}

module.exports = {
    getConsole,
    getChannelSettings,
    start,
    restart,
    stop,
    updatePath,
    updateChannelSettings
}