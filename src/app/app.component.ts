import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  UserLoggedin = sessionStorage.getItem('userlogin')
  isUserLoggedin = false;

  loggedinUsername = sessionStorage.getItem('username');
  loggedinUserrole = sessionStorage.getItem('userrole');
  supertrue = false;
  admintrue = false;
  defaulttrue = false;
  

  constructor(private router: Router) { 
    if(sessionStorage.getItem('userlogin') == "true"){
      this.isUserLoggedin = true;
    } else if(sessionStorage.getItem('userlogin') == "false"){
      this.isUserLoggedin = false;
    }

    if ((sessionStorage.getItem('userrole')=="super")){
      this.supertrue = true;
      console.log(this.supertrue);
    } else if ((sessionStorage.getItem('userrole')=="group-admin")){
      this.admintrue = true;
    } else if ((sessionStorage.getItem('userrole')=="default")){
      this.defaulttrue = true;
    }
  }
  title = 'assign';

  logout(){
    sessionStorage.clear();
    alert("Logged out, returning to login page");
    this.router.navigateByUrl("/login");
    this.isUserLoggedin = false;
  }
}
