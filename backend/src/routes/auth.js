const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const jwtAuth = require('../auth/jwtAuth');

router.get('/verify', jwtAuth.query, authController.verify);

module.exports = router;