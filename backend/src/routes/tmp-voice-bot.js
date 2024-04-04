const express = require('express');
const router = express.Router();
const tmpVoiceBotController = require('../controllers/tmp-voice-bot.controller');
const jwtAuth = require('../auth/jwtAuth');

router.get('/get-console', jwtAuth.query, tmpVoiceBotController.getConsole);

router.post('/start', jwtAuth.body, tmpVoiceBotController.start);
router.post('/stop', jwtAuth.body, tmpVoiceBotController.stop);

module.exports = router;