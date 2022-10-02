import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdduserComponent } from './adduser/adduser.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewchannelComponent } from './newchannel/newchannel.component';
import { NewgroupComponent } from './newgroup/newgroup.component';
import { UserlistComponent } from './userlist/userlist.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'createuser', component: CreateuserComponent},
  { path: 'newgroup', component: NewgroupComponent},
  { path: 'userlist', component: UserlistComponent},
  { path: 'newchannel', component: NewchannelComponent},
  { path: 'adduser', component: AdduserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
