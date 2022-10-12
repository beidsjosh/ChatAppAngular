import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddchannelComponent } from './addchannel/addchannel.component';
import { AddgroupComponent } from './addgroup/addgroup.component';
import { AdduserComponent } from './adduser/adduser.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ListusersComponent } from './listusers/listusers.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'adduser', component: AdduserComponent},
  { path: 'addgroup', component: AddgroupComponent},
  { path: 'addchannel', component: AddchannelComponent},
  { path: 'getlist', component: ListusersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
