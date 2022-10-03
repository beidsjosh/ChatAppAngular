import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { Users } from 'server/data/users';
import { Groups } from 'server/data/groups';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  username='';
  password=''
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

  GroupList: Groups[] = [];
  GroupNameList: string[] = [];

  loggedinUsername = sessionStorage.getItem('username');
  loggedinUserrole = sessionStorage.getItem('userrole');
  supertrue = false;
  admintrue = false;
  defaulttrue = false;


  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.dataService.getgroups().subscribe((data)=>{
      this.GroupList = data;
      //console.log(this.ChannelList);
      for (let i = 0; i< this.GroupList.length; i++) {
        this.GroupNameList.push(this.GroupList[i].groupname);
        console.log(this.GroupNameList)
      }
    });

    if ((sessionStorage.getItem('userrole')=="super")){
      this.supertrue = true;
      console.log(this.supertrue);
    } else if ((sessionStorage.getItem('userrole')=="group-admin")){
      this.admintrue = true;
    } else if ((sessionStorage.getItem('userrole')=="default")){
      this.defaulttrue = true;
    }
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
      this.newuser = new Users(this.userid, this.username, this.password, this.useremail, this.userrole, this.usergroup, this.userok);
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
