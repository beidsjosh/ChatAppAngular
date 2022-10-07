import { Injectable } from '@angular/core';

import io from 'socket.io-client';
import { Observable } from 'rxjs';


const SERVER_URL = 'http://localhost:3000/home'

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any;

  constructor() { }

  initSocket(){
    this.socket = io(SERVER_URL);
    return ()=>{this.socket.disconnect();}
  }

  joinroom(selroom: any){
    this.socket.emit("joinRoom", selroom);
  }

  leaveroom(selroom: any): void {
    this.socket.emit("leaveRoom", selroom);
  }

  joined(next: any){
    this.socket.on('joined', (res: any) => next(res));
  }

  createroom(newroom: any){
    this.socket.emit('newroom', newroom);
  }

  reqnumusers(selroom: any){
    this.socket.emit("numusers", selroom);
  }

  getnumusers(next: any){
    this.socket.on('numusers', (res: any)=>next(res));
  }

  reqroomList(){
    this.socket.emit('roomlist', 'list please');
  }

  getroomList(next: any){
    this.socket.on('roomlist', (res: any)=>next(res));
  }

  notice(next:any){
    this.socket.on('notice', (res: any)=>next(res));
  }

  sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

  /*getMessage(next: any){
    this.socket.on('message', (message: string)=>next(message));
  }*/

  getMessage(){
    return new Observable(observer=>{
      this.socket.on('message', (data: any) => {observer.next(data)
      });
    });
  }
}
