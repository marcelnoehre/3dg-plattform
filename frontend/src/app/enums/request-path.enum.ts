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
	GET_CONSOLE_TMP_VOICE_BOT = tmpVoiceBot + 'get-console-tmp-voice-bot',
	GET_FILE_TMP_VOICE_BOT = tmpVoiceBot + 'get-file-tmp-voice-bot',
	GET_TEAMS_TMP_VOICE_BOT = tmpVoiceBot + 'get-teams-tmp-voice-bot',
	GET_CHANNEL_SETTINGS_TMP_VOICE_BOT = tmpVoiceBot + 'get-channel-settings-tmp-voice-bot',
	START_TMP_VOICE_BOT = tmpVoiceBot + 'start-tmp-voice-bot',
	RESTART_TMP_VOICE_BOT = tmpVoiceBot + 'restart-tmp-voice-bot',
	STOP_TMP_VOICE_BOT = tmpVoiceBot + 'stop-tmp-voice-bot',
	UPDATE_PATH_TMP_VOICE_BOT = tmpVoiceBot + 'update-path-tmp-voice-bot',
	UPDATE_CHANNEL_SETTINGS_TMP_VOICE_BOT = tmpVoiceBot + 'update-channel-settings-tmp-voice-bot'
}