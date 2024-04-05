const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);

async function readJSONFile(path) {
    try {
        const data = await readFileAsync(path, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        throw new Error('Error accessing file: ' + err);
    }
}

async function updateJSONFile(path, json) {
    fs.writeFile(path, JSON.stringify(json, null, 2), 'utf8', (err) => {
        if (err) {
            throw new Error('Error saving file: ' + err);
        }
    });
}

module.exports = {
    readJSONFile,
    updateJSONFile
}