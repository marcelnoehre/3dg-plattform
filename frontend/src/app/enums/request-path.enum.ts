const auth = 'auth/';

export enum RequestPath {
	// ### AUTH ###
	VERIFY = auth + 'verify',
	LOGIN = auth + 'login',
	CREATE_USER = auth + 'create-user',
	UPDATE_USERNAME = auth + 'update-username',
	UPDATE_PASSWORD = auth + 'update-password'
}