const jwt = require('jsonwebtoken');
const databaseService = require('../database/database.service');

async function verify(req, res, next) {
    try {
        const database = require('../database/database.json');
        const token = req.query.token;
        const tokenUser = jwt.decode(token);
        const user = database.users[tokenUser.username];
        if (user) {
            user.token = token;
            user.isLoggedIn = true;
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
        const database = require('../database/database.json');
        const username = req.body.username;
        const password = req.body.password;
        if (database.passwords[username] === password) {
            const user = database.users[username];
            if (user) {
                user.token = jwt.sign(user, database.secret, { expiresIn: '1h' });
                user.isLoggedIn = true;
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
        const database = require('../database/database.json');
        const username = req.body.username;
        const permission = req.body.permission;
        if(!database.users[username]) {
            database.users[username] = {
                username: username,
                permission: permission
            }
            database.passwords[username] = database.defaultPassword;
            await databaseService.updateDatabase(database);
            res.json({ message: 'User created successfully!' });
        } else {
            res.status(402).send({ message: 'Username is already taken!' });
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