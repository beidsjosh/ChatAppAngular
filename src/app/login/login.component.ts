import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
const BACKEND_URL = 'http://localhost:3000';
import { Users } from 'server/data/users';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username='';
  password='';
  useremail='';
  userid:number = 0;
  usergroup='';
  userrole='';
  userok=false;
  newuser!: Users;
  newuserMessage="";
  iderrormsg:string = "This id already exists & New ID is required.";
  iderrormsg2:string="";
  iderrorshow:boolean = false;
  noticeshow:boolean = false;

  userlist: Users[] = [];

  constructor(private dataService: DataServiceService, private router:Router) { }

  ngOnInit(): void {
  }
  /*submit(){
    
    let user = {username:this.username};
    console.log(user);
    this.httpClient.post(BACKEND_URL + '/login', user,  httpOptions)
    // this.httpClient.post(BACKEND_URL + '/login', user)
    .subscribe((data:any)=>{


      if (data.ok){

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



    
  }*/

  get stateName(){
    return this.iderrorshow ? 'show':'hide';
  }
  get noticeName(){
    return this.noticeshow ? 'show':'hide';
  }
  
  login(event: any){
    event.preventDefault();
    if(this.userid == null){
      this.iderrorshow = !this.iderrorshow;
    } else{
      //this.newuser = new Users(this.userid, this.username, this.useremail, this.userrole, this.usergroup, this.userok);
      this.dataService.login(this.username, this.password).subscribe((data)=>{
          console.log(data);
          if(data.error==null){
          this.userok = true;
          this.userlist = data;
          console.log(this.userlist);

          sessionStorage.setItem('userid', this.userlist[0].userid.toString());
          sessionStorage.setItem('userlogin', this.userok.toString());
          sessionStorage.setItem('username', this.userlist[0].username);
          sessionStorage.setItem('useremail', this.userlist[0].useremail);
          sessionStorage.setItem('userrole', this.userlist[0].userrole.toString());
          sessionStorage.setItem('usergroup', this.userlist[0].usergroup.toString());
  
          this.router.navigateByUrl("/home");
          }else{
            alert(data.error);
          }
      });
    }
  }
}
