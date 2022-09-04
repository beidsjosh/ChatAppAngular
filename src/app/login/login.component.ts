import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = "";

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }
  submit(){
    
    let user = {username:this.username};
    console.log(user);
    this.httpClient.post(BACKEND_URL + '/login', user,  httpOptions)
    // this.httpClient.post(BACKEND_URL + '/login', user)
    .subscribe((data:any)=>{
      alert("posting: " +JSON.stringify(user));

      alert("postRes: " +JSON.stringify(data));

      if (data.ok){
        alert("correct");
        sessionStorage.setItem('userid', data.userid.toString());
        sessionStorage.setItem('userlogin', data.ok.toString());
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('useremail', data.useremail);
        sessionStorage.setItem('userrole', data.userrole.toString());
        sessionStorage.setItem('usergroup', data.usergroup.toString());

        this.router.navigateByUrl("/home");
      }
      else { alert("Incorrect Username");}


    })



    
  }
}
