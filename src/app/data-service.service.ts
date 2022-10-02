import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Users} from 'server/data/users';
import { Groups } from 'server/data/groups';

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
}
