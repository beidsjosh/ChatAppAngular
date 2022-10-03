import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { Channels } from 'server/data/channels';
import { Groups } from 'server/data/groups';

@Component({
  selector: 'app-addchannel',
  templateUrl: './addchannel.component.html',
  styleUrls: ['./addchannel.component.css']
})
export class AddchannelComponent implements OnInit {
  channelname='';
  channelid:number = 0;
  groupsinchannel = '';
  newchannel!: Channels;
  newchannelMessage="";
  iderrormsg:string = "This id already exists & New ID is required.";
  iderrormsg2:string="";
  iderrorshow:boolean = false;
  noticeshow:boolean = false;

  GroupList: Groups[] = [];
  GroupNameList: string[] = [];

  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.dataService.getgroups().subscribe((data)=>{
      this.GroupList = data;
      //console.log(this.ChannelList);
      for (let i = 0; i< this.GroupList.length; i++) {
        this.GroupNameList.push(this.GroupList[i].groupname);
        console.log(this.GroupNameList)
      }
    });
  }

  get stateName(){
    return this.iderrorshow ? 'show':'hide';
  }
  get noticeName(){
    return this.noticeshow ? 'show':'hide';
  }
  
  addNewChannel(event: any){
    event.preventDefault();
    if(this.channelid == null){
      this.iderrorshow = !this.iderrorshow;
    } else{
      this.newchannel = new Channels(this.channelid, this.channelname, this.groupsinchannel);
      this.dataService.addchannel(this.newchannel).subscribe((data)=>{
        console.log(data);
        this.noticeshow = true;
        if(data.err == null){
          this.newchannelMessage = "New Channel(" + this.channelname + ") was added successfully";
        }else{
          this.newchannelMessage = data.err;
        }
        this.channelid = 0;
        this.channelname = "";
        this.groupsinchannel = "";
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
