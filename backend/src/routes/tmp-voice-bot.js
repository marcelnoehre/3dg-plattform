const express = require('express');
const router = express.Router();
const tmpVoiceBotController = require('../controllers/tmp-voice-bot.controller');
const jwtAuth = require('../auth/jwtAuth');

router.get('/get-console', jwtAuth.query, tmpVoiceBotController.getConsole);

router.post('/start-tmp-voice-bot', jwtAuth.body, tmpVoiceBotController.start);
router.post('/stop-tmp-voice-bot', jwtAuth.body, tmpVoiceBotController.stop);

module.exports = router;