const auth = 'auth/';
const tmpVoiceBot = 'tmpVoiceBot/';

export enum RequestPath {
	// ### AUTH ###
	VERIFY = auth + 'verify',
	LOGIN = auth + 'login',
	CREATE_USER = auth + 'create-user',
	UPDATE_USERNAME = auth + 'update-username',
	UPDATE_PASSWORD = auth + 'update-password',
	// ### TMP VOICE BOT ###
	START_TMP_VOICE_BOT = tmpVoiceBot + 'start-tmp-voice-bot',
	RESTART_TMP_VOICE_BOT = tmpVoiceBot + 'restart-tmp-voice-bot',
	STOP_TMP_VOICE_BOT = tmpVoiceBot + 'stop-tmp-voice-bot'
}