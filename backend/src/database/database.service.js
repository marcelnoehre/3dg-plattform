const fs = require('fs');
const path = require('path');

async function getDataBase() {
    return JSON.parse(JSON.stringify(require('./database.json')));
}

async function updateDatabase(database) {
    fs.writeFile(path.resolve(__dirname, 'database.json'), JSON.stringify(database, null, 2), 'utf8', (err) => {
        if (err) {
            throw new Error('Error saving database:', err);
        }
    });
}

module.exports = {
    getDataBase,
    updateDatabase
}