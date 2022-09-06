import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { UserlistComponent } from './userlist/userlist.component';
import { ChannellistComponent } from './channellist/channellist.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { HomeComponent } from './home/home.component';
import { NewgroupComponent } from './newgroup/newgroup.component';
import { NewchannelComponent } from './newchannel/newchannel.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UserdetailsComponent,
    UserlistComponent,
    ChannellistComponent,
    CreateuserComponent,
    HomeComponent,
    NewgroupComponent,
    NewchannelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
