const express = require('express');
const router = express.Router();
const tmpVoiceBotController = require('../controllers/tmp-voice-bot.controller');
const jwtAuth = require('../auth/jwtAuth');

router.get('/get-console-tmp-voice-bot', jwtAuth.query, tmpVoiceBotController.getConsole);
router.get('/get-channel-settings-tmp-voice-bot', jwtAuth.query, tmpVoiceBotController.getChannelSettings);

router.post('/start-tmp-voice-bot', jwtAuth.body, tmpVoiceBotController.start);
router.post('/stop-tmp-voice-bot', jwtAuth.body, tmpVoiceBotController.stop);
router.post('/restart-tmp-voice-bot', jwtAuth.body, tmpVoiceBotController.restart);

router.put('/update-path-tmp-voice-bot', jwtAuth.body, tmpVoiceBotController.updatePath);

module.exports = router;