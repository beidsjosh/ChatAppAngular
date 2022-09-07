import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
const BACKEND_URL = 'http://localhost:3000';

import { Channelobj } from '../Objects/channelobj';

@Component({
  selector: 'app-newchannel',
  templateUrl: './newchannel.component.html',
  styleUrls: ['./newchannel.component.css']
})
export class NewchannelComponent implements OnInit {

  grouplist: string[] = [];

  channelname = '';
  channelid = '';
  groupsinchannel = '';

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.httpClient.post(BACKEND_URL + '/getGroups',  httpOptions)
    .subscribe((data:any)=>{
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        this.grouplist.push(data[i].groupname);
      }
      
      console.log(this.grouplist);
    })
  }

  submitNewChannel(){
    let channelobj = {
      'channelid': this.channelid,
      'channelname': this.channelname,
      'groupsinchannel': this.groupsinchannel
    }

    this.httpClient.post<Channelobj[]>(BACKEND_URL + '/postNewChannel', channelobj,  httpOptions)
      .subscribe((m: any) => {alert("New Channel created! Returning to dashboard");});

    //alert("New Channel created! Returning to dashboard");
    this.router.navigateByUrl("/dashboard");
  }

}
