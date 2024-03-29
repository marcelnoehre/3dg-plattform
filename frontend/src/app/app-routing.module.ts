import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { TmpVoiceBotComponent } from './components/tmp-voice-bot/tmp-voice-bot.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';

const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'create-user',
		component: CreateUserComponent,
		canActivate: [authGuard]
	},
	{
		path: 'account-settings',
		component: AccountSettingsComponent,
		canActivate: [authGuard]
	},
	{
		path: 'app/tmp-voice-bot',
		component: TmpVoiceBotComponent,
		canActivate: [authGuard]
	},
	{
		path: '',
		component: DashboardComponent,
		canActivate: [authGuard]
	},
	{
		path: '**',
		redirectTo: ''
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }