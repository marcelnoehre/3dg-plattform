const database = require('../../database.json');
const jwt = require('jsonwebtoken');

async function verify(req, res, next) {
    try {
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

module.exports = {
    verify,
    login
}