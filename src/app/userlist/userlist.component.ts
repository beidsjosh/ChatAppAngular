import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  userlist: string[] = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.post(BACKEND_URL + '/getUsers',  httpOptions)
    .subscribe((data:any)=>{
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        this.userlist.push(data[i].username);
      }
      
      console.log(this.userlist);
  })
  }

}
