import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
const BACKEND_URL = 'http://localhost:3000';

// for angular http methods
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';

import { Groupobj } from '../Objects/groupobj';

@Component({
  selector: 'app-newgroup',
  templateUrl: './newgroup.component.html',
  styleUrls: ['./newgroup.component.css']
})
export class NewgroupComponent implements OnInit {

  groupname='';
  groupid='';

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  submitNewGroup(){
    let groupobj = {
      'groupid': this.groupid,
      'groupname': this.groupname
    }

    this.httpClient.post<Groupobj[]>(BACKEND_URL + '/postNewGroup', groupobj,  httpOptions)
      .subscribe((m: any) => {alert(JSON.stringify(m));});

    alert("New Group created! Returning to dashboard");
    this.router.navigateByUrl("/dashboard");
  }
}
