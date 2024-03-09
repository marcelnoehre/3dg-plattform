const fs = require('fs');
const path = require('path');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);

async function getDataBase() {
    try {
        const data = await readFileAsync(path.resolve(__dirname, 'database.json'), 'utf8');
        return JSON.parse(data);
    } catch (err) {
        throw new Error('Error accessing database: ' + err);
    }
}

async function updateDatabase(database) {
    fs.writeFile(path.resolve(__dirname, 'database.json'), JSON.stringify(database, null, 2), 'utf8', (err) => {
        if (err) {
            throw new Error('Error saving database: ' + err);
        }
    });
}

module.exports = {
    getDataBase,
    updateDatabase
}