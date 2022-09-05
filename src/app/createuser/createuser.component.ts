import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
const BACKEND_URL = 'http://localhost:3000';

// for angular http methods
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';

import { Userobj } from '../Objects/userobj';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {
  username='';
  useremail='';
  userid='';
  usergroup='';
  userrole='';
  //userok='false';

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  submitNewUser(){
    let userobj = {
      'userid': this.userid,
      'username': this.username,
      'useremail': this.useremail,
      'userrole': this.userrole,
      'usergroup': this.usergroup,
      'userok': "false"
    }

    this.httpClient.post<Userobj[]>(BACKEND_URL + '/postNewUser', userobj,  httpOptions)
      .subscribe((m: any) => {alert(JSON.stringify(m));});

    alert("New User created! Returning to dashboard");
    this.router.navigateByUrl("/dashboard");
  }

}
