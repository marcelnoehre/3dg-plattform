const jwt = require('jsonwebtoken');
const database = require('../../database.json');

function query(req, res, next) {
    jwtAuth(req.query.token, res, next);
}

function body(req, res, next) {
    jwtAuth(req.body.token, res, next);
}

function jwtAuth(token, res, next) {
    try {
        jwt.verify(token, database.secret);
        next();
    } catch (err) {
        res.status(403).send({ message: 'Invalid Token' });
    }
}

module.exports = {
    query,
    body
};