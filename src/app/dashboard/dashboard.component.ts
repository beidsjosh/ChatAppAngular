import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  loggedinUsername = sessionStorage.getItem('username');
  loggedinUserrole = sessionStorage.getItem('userrole');
  supertrue = false;
  admintrue = false;
  defaulttrue = false;

  constructor() { }

  ngOnInit(): void {
    if ((sessionStorage.getItem('userrole')=="super")){
      this.supertrue = true;
      console.log(this.supertrue);
    } else if ((sessionStorage.getItem('userrole')=="group-admin")){
      this.admintrue = true;
    } else if ((sessionStorage.getItem('userrole')=="default")){
      this.defaulttrue = true;
    }
  }

}
