import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loggedinUsername = sessionStorage.getItem('username');
  loggedinUserrole = sessionStorage.getItem('userrole');
  loggedinUsergroup = sessionStorage.getItem('usergroup');
  supertrue = false;
  admintrue = false;
  defaulttrue = false;

  UserLoggedin = sessionStorage.getItem('userlogin')
  isUserLoggedin = false;

  UserGroupList: string[] = [];

  

  constructor(private httpClient: HttpClient) { 
  }

  ngOnInit(): void {
    if ((sessionStorage.getItem('userrole')=="super")){
      this.supertrue = true;
      console.log(this.supertrue);
    } else if ((sessionStorage.getItem('userrole')=="group-admin")){
      this.admintrue = true;
    } else if ((sessionStorage.getItem('userrole')=="default")){
      this.defaulttrue = true;
    }

    if(sessionStorage.getItem('userlogin') == "true"){
      this.isUserLoggedin = true;
    } else if(sessionStorage.getItem('userlogin') == "false"){
      this.isUserLoggedin = false;
    }

    this.httpClient.post(BACKEND_URL + '/getUserChannels',  httpOptions)
    .subscribe((data:any)=>{
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        if (data[i].groupsinchannel == this.loggedinUsergroup){
            this.UserGroupList.push(data[i].channelname);
        }
      }
      
      console.log(this.UserGroupList);
  })
  }

}
