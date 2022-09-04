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
  

  constructor(private router: Router) { 
    if(sessionStorage.getItem('userlogin') == "true"){
      this.isUserLoggedin = true;
    } else if(sessionStorage.getItem('userlogin') == "false"){
      this.isUserLoggedin = false;
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
