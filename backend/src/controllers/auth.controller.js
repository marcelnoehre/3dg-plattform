const jwt = require('jsonwebtoken');
const databaseService = require('../database/database.service');

async function verify(req, res, next) {
    try {
        const database = await databaseService.getDataBase();
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
        const database = await databaseService.getDataBase();
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
        const database = await databaseService.getDataBase();
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

async function udpateUsername(req, res, next) {
    try {
        const database = await databaseService.getDataBase();
        const token = req.body.token;
        const tokenUser = jwt.decode(token);
        const username = req.body.username;
        if (!database.users[tokenUser.username] || !database.users[tokenUser.username]) {
            res.status(500).send({ message: 'Internal Server Error!' });
        } else if (database.users[username]) {
            res.status(402).send({ message: 'Username is already taken!' });
        } else {
            const old = {
                permission: database.users[tokenUser.username].permission,
                password: database.passwords[tokenUser.username]
            }
            delete database.users[tokenUser.username];
            delete database.passwords[tokenUser.username];
            database.users[username] = {
                username: username,
                permission: old.permission
            };
            database.passwords[username] = old.password;
            await databaseService.updateDatabase(database);
            res.json({ message: 'Username updated succesfully! You have been logged out for security reasons!' });
        }
    } catch (err) {
        next(err);
    }
}

async function udpatePassword(req, res, next) {
    try {
        const database = await databaseService.getDataBase();
        const token = req.body.token;
        const tokenUser = jwt.decode(token);
        const password = req.body.password;
        if (!database.passwords[tokenUser.username]) {
            res.status(500).send({ message: 'Internal Server Error!' });
        } else if (database.passwords[tokenUser.username] === password) {
            res.status(402).send({ message: 'New password cannot be the same as the old one!' });
        } else {
            database.passwords[tokenUser.username] = password;
            await databaseService.updateDatabase(database);
            res.json({ message: 'Password updated succesfully! You have been logged out for security reasons!' });
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    verify,
    login,
    createUser,
    udpateUsername,
    udpatePassword
}