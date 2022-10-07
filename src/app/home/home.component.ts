import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { SocketService } from '../socket.service';
import { Channels } from 'server/data/channels';
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

  ChannelList: Channels[] = [];
  UserChannelList: string[] = [];

  //socket.io stuff
  private socket: any;
  messagecontent: string = "";
  messages: string[] = [];
  rooms=[];
  roomslist: string = "";
  roomnotice: string = "";
  currentroom: string = "";
  isInRoom = false;
  numusers: number = 0;
  ioConnection:any;

  

  constructor(private httpClient: HttpClient, private dataService: DataServiceService, private socketService: SocketService) { 
  }

  ngOnInit(){
    //check what role user is
    if ((sessionStorage.getItem('userrole')=="super")){
      this.supertrue = true;
      console.log(this.supertrue);
    } else if ((sessionStorage.getItem('userrole')=="group-admin")){
      this.admintrue = true;
    } else if ((sessionStorage.getItem('userrole')=="default")){
      this.defaulttrue = true;
    }

    //check if user is logged in
    if(sessionStorage.getItem('userlogin') == "true"){
      this.isUserLoggedin = true;
    } else if(sessionStorage.getItem('userlogin') == "false"){
      this.isUserLoggedin = false;
    }

    //gets channels for channel list
    this.dataService.getchannels().subscribe((data)=>{
      this.ChannelList = data;
      //console.log(this.ChannelList);
      for (let i = 0; i< this.ChannelList.length; i++) {
        if (this.ChannelList[i].groupsinchannel == this.loggedinUsergroup){
          this.UserChannelList.push(this.ChannelList[i].channelname);
          console.log(this.UserChannelList)
        }
      }
    });
    
    //socket.io stuff
    //this.socketService.initSocket();
    this.initIoConnection();
    //this.socketService.getMessage((m: any)=>{this.messages.push(m)});
    this.socketService.reqroomList();
    this.socketService.getroomList((msg: any)=>{this.rooms = JSON.parse(msg)});
    this.socketService.notice((msg:any)=>{this.roomnotice=msg});
    this.socketService.joined((msg:any)=>{this.currentroom=msg
    if (this.currentroom != ""){
      this.isInRoom = true;
    } else{
      this.isInRoom = false;
    }
  });

    

    /*this.httpClient.post(BACKEND_URL + '/getUserChannels',  httpOptions)
    .subscribe((data:any)=>{
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        if (data[i].groupsinchannel == this.loggedinUsergroup){
            this.UserGroupList.push(data[i].channelname);
        }
      }
      
      console.log(this.UserGroupList);
  })*/
  
  }

  private initIoConnection(){
    this.socketService.initSocket();
    this.ioConnection = this.socketService.getMessage()
    .subscribe((message) => {
      this.messages.push(message as string);
    })
      
  }

  joinroom(){
    this.socketService.joinroom(this.roomslist);
    this.socketService.reqnumusers(this.roomslist);
    this.socketService.getnumusers((res: number)=>{this.numusers = res});
    console.log("room joined");
  }

  clearnotice(){
    this.roomnotice = ""
  }

  leaveroom(){
    this.socketService.leaveroom(this.currentroom);
    this.socketService.reqnumusers(this.currentroom);
    this.socketService.getnumusers((res: number)=>{this.numusers = res});
    this.roomslist = "";
    this.currentroom = "";
    this.isInRoom = false;
    this.numusers = 0;
    this.roomnotice = "";
    this.messages = [];
  }

  chat(){
    if(this.messagecontent){
      this.socketService.sendMessage(this.messagecontent);
      this.messagecontent = "";
      console.log("Message sent");
    } else {
      console.log("No Message");
    }
  }

}
