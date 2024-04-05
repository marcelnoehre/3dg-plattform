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
        const database = await databaseService.getDataBase();
        res.json({
            consoleOutput: consoleOutput,
            pendingChanges: database.tmpVoiceBot.pendingChanges,
            isRunning: database.tmpVoiceBot.isRunning
        });
    } catch(err) {
        next(err);
    }
}

async function getFile(req, res, next) {
    try {
        const database = await databaseService.getDataBase();
        res.json(database.tmpVoiceBot.path);
    } catch(err) {
        next(err);
    }
}

async function getTeams(req, res, next) {
    try {
        const database = await databaseService.getDataBase();
        const teams = await commonService.readJSONFile(database.tmpVoiceBot.path.replace('index.js', 'assets/teams.json'));
        res.json(teams);
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

async function addTeam(req, res, next) {
    try {
        const newTeam = req.body.team;
        const database = await databaseService.getDataBase();
        const path = database.tmpVoiceBot.path.replace('index.js', 'assets/teams.json');
        const data = await commonService.readJSONFile(path);
        if (data.teams.some(team => team.id === newTeam.id)) {
            res.status(400).send({ message: 'ID Already Exists!' });
        } else if (data.teams.some(team => team.name === newTeam.name)) {
            res.status(400).send({ message: 'Name Already Exists!' });
        } else {
            data.teams.splice(data.teams.length - 1, 0, newTeam);
            await commonService.updateJSONFile(path, data);
            database.tmpVoiceBot.pendingChanges = true;
            await databaseService.updateDatabase(database);
            res.json({ message: 'Teams Update Success!' });
        }
    } catch(err) {
        next(err);
    }
}

async function updatePath(req, res, next) {
    try {
        const database = await databaseService.getDataBase();
        database.tmpVoiceBot.path = req.body.path;
        database.tmpVoiceBot.pendingChanges = true;
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
    getFile,
    getTeams,
    getChannelSettings,
    start,
    restart,
    stop,
    addTeam,
    updatePath,
    updateChannelSettings
}