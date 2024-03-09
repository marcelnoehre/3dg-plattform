const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const jwtAuth = require('../auth/jwtAuth');

router.get('/verify', jwtAuth.query, authController.verify);

router.post('/login', authController.login);
router.post('/create-user', jwtAuth.body, authController.createUser);

router.put('/update-password', jwtAuth.body, authController.udpatePassword);

module.exports = router;