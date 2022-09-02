import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { GroupchannelsComponent } from './groupchannels/groupchannels.component';
import { UserlistComponent } from './userlist/userlist.component';
import { ChannellistComponent } from './channellist/channellist.component';
import { CreateuserComponent } from './createuser/createuser.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UserdetailsComponent,
    GroupchannelsComponent,
    UserlistComponent,
    ChannellistComponent,
    CreateuserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
