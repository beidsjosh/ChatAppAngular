import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Users} from 'server/data/users';
import { Groups } from 'server/data/groups';
import { Channels } from 'server/data/channels';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient) { }
  adduser(users:Users){
    return this.http.post<any>('http://localhost:3000/api/adduser', users);
  }

  addgroup(groups:Groups){
    return this.http.post<any>('http://localhost:3000/api/addgroup', groups);
  }

  addchannel(channels:Channels){
    return this.http.post<any>('http://localhost:3000/api/addchannel', channels);
  }

  getusers(){
    return this.http.get<any>('http://localhost:3000/api/getusers');
  }

  getgroups(){
    return this.http.get<any>('http://localhost:3000/api/getgroups');
  }

  getchannels(){
    return this.http.get<any>('http://localhost:3000/api/getchannels');
  }

  deleteuser(userid: any){
    return this.http.post<any>('http://localhost:3000/api/deleteuser', {'userid':userid})
  }

  login(username: string){
    return this.http.post<any>('http://localhost:3000/api/login', {'username':username});
  }
}
