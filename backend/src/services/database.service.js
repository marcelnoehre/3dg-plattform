const fs = require('fs');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);

async function updateDatabase(database) {
    try {
        await writeFileAsync('../../database.json', JSON.stringify(database, null, 2), 'utf8');
        return;
    } catch (err) {
        throw new Error('Error saving database:', err);
    }
}

module.exports = {
    updateDatabase
}