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

module.exports = {
    verify
}