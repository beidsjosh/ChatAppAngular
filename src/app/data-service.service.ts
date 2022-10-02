import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Users} from 'server/data/users';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient) { }
  add(users:Users){
    return this.http.post<any>('http://localhost:3000/api/add', users);
  }
}
