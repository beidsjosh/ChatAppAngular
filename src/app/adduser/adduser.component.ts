import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { Users } from 'server/data/users';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  username='';
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

  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
  }

  get stateName(){
    return this.iderrorshow ? 'show':'hide';
  }
  get noticeName(){
    return this.noticeshow ? 'show':'hide';
  }
  
  addNewUser(event: any){
    event.preventDefault();
    if(this.userid == null){
      this.iderrorshow = !this.iderrorshow;
    } else{
      this.newuser = new Users(this.userid, this.username, this.useremail, this.userrole, this.usergroup, this.userok);
      this.dataService.adduser(this.newuser).subscribe((data)=>{
        console.log(data);
        this.noticeshow = true;
        if(data.err == null){
          this.newuserMessage ="New user(" + this.username + ") was added successfully";
        }else{
          this.newuserMessage = data.err;
        }
        this.userid = 0;
        this.username = "";
        this.useremail = "";
        this.userrole = "";
        this.usergroup = "";
        this.userok = false;
      });
    }
  }
  /*checkvalidid(event){
    this.noticeshow = false;
      this.dataService.checkvalidid(event).subscribe((data) =>{
        if (data.success == 0){
          this.iderrormsg2 = "Something above" + data.topnum;
          this.iderrorshow = !this.iderrorshow;
        } else{
          this.iderrorshow = false;
          this.iderrormsg2 = "";
        }
      })
  }*/


}
