import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material-module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ToolbarProfileComponent } from './components/toolbar-profile/toolbar-profile.component';
import { LoginComponent } from './components/login/login.component';
import { SpinnerIconComponent } from './components/spinner-icon/spinner-icon.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TmpVoiceBotComponent } from './components/tmp-voice-bot/tmp-voice-bot.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { TmpVoiceBotSettingsComponent } from './components/tmp-voice-bot/tmp-voice-bot-settings/tmp-voice-bot-settings.component';
import { TmpVoiceBotChannelSettingsComponent } from './components/tmp-voice-bot/tmp-voice-bot-channel-settings/tmp-voice-bot-channel-settings.component';
import { TmpVoiceBotTeamSettingsComponent } from './components/tmp-voice-bot/tmp-voice-bot-team-settings/tmp-voice-bot-team-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ToolbarComponent,
    ToolbarProfileComponent,
    LoginComponent,
    SpinnerIconComponent,
    DashboardComponent,
    TmpVoiceBotComponent,
    CreateUserComponent,
    AccountSettingsComponent,
    TmpVoiceBotSettingsComponent,
    TmpVoiceBotChannelSettingsComponent,
    TmpVoiceBotTeamSettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
