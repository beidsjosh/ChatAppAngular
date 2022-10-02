import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { Groups } from 'server/data/groups';

@Component({
  selector: 'app-addgroup',
  templateUrl: './addgroup.component.html',
  styleUrls: ['./addgroup.component.css']
})
export class AddgroupComponent implements OnInit {
  groupname='';
  groupid:number = 0;
  newgroup!: Groups;
  newgroupMessage="";
  iderrormsg:string = "This id already exists & New ID is required.";
  iderrormsg2:string="";
  iderrorshow:boolean = false;
  noticeshow:boolean = false;

  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
  }

  get stateName(){
    return this.iderrorshow ? 'show':'hide';
  }
  get noticeName(){
    return this.noticeshow ? 'show':'hide';
  }
  
  addNewGroup(event: any){
    event.preventDefault();
    if(this.groupid == null){
      this.iderrorshow = !this.iderrorshow;
    } else{
      this.newgroup = new Groups(this.groupid, this.groupname);
      this.dataService.addgroup(this.newgroup).subscribe((data)=>{
        console.log(data);
        this.noticeshow = true;
        if(data.err == null){
          this.newgroupMessage = data.num + " new user(" + this.groupname + ") was added";
        }else{
          this.newgroupMessage = data.err;
        }
        this.groupid = 0;
        this.groupname = "";
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
