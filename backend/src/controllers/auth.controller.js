const jwt = require('jsonwebtoken');
const databaseService = require('../services/database.service');

async function verify(req, res, next) {
    try {
        const database = require('../../database.json');
        const token = req.query.token;
        const tokenUser = jwt.decode(token);
        const user = database.users[tokenUser.username];
        if (user) {
            user.token = token;
            res.json(user);
        } else {
            res.status(403).send({ message: 'Invalid Token' });
        }
    } catch(err) {
        next(err);
    }
}

async function login(req, res, next) {
    try {
        const database = require('../../database.json');
        const username = req.body.username;
        const password = req.body.password;
        if (database.passwords[username] === password) {
            const user = database.users[username];
            if (user) {
                user.token = jwt.sign(user, database.secret, { expiresIn: database.expire });
                res.json(user);
            } else {
                res.status(500).send({ message: 'Internal Server Error' });
            }
        } else {
            res.status(401).send({ message: 'Invalid Credentials' });
        }
    } catch (err) {
        next(err);
    }
}

async function createUser(req, res, next) {
    try {
        const database = require('../../database.json');
        const username = req.body.username;
        const permission = req.bdoy.permission;
        if(!database.users[username]) {
            database.users[username] = {
                username: username,
                permission: permission
            }
            database.passwords[username] = {
                password: database.defaultPassword
            }
            await databaseService.updateDatabase(database);
            res.json({ message: 'User created successfully!' });
        } {
            res.status(402).send({ message: 'ERROR.INVALID_TOKEN' });
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    verify,
    login,
    createUser
}