const auth = 'auth/';

export enum RequestPath {
	// ### AUTH ###
	VERIFY = auth + 'verify',
	LOGIN = auth + 'login',
	CREATE_USER = auth + 'create-user'
}