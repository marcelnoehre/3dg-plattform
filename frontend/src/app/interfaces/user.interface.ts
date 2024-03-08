import { Permission } from 'src/app/enums/permission.enum';

export interface User {
	[key: string]: any,
	token: string,
	username: string,
	permission: Permission,
	isLoggedIn: boolean
}