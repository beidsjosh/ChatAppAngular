import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { Users } from 'server/data/users';

@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.css']
})
export class ListusersComponent implements OnInit {
  users: Users[] = [];
  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.dataService.getusers().subscribe((data)=>{
      this.users = data;
    });
  }

  deleteuser(id: any){
    if (confirm("Are you sure you want to delete this user?")){
      this.dataService.deleteuser(id).subscribe((data)=>{
        this.users = data;
      });
    }
  }

}
