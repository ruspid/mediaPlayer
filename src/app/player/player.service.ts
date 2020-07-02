import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import { ITrack } from '../track/track';
import { PlayerCommand } from './player.command';
import { PlayerEventType, PlayerEvent } from './player.event';
import { PlayerEventListener } from './player.event.listener';




@Injectable({
    providedIn: 'root'
})
export class PlayerService{

  private webSocketUrl: string = 'ws://localhost:8080/player';
  ws: WebSocketSubject<any>;
  message$: Observable<PlayerEvent>;

  connected: boolean;

  constructor(private eventListener: PlayerEventListener){
      this.connect();
  }

  resume(): void{
    console.log("command : RESUME");
    this.ws.next({ type: PlayerCommand.RESUME});
  }

  play(track: ITrack) {
    console.log("command : PLAY");
    this.ws.next({ type: PlayerCommand.PLAY, payload: track});
  }

  pause(): void{
    console.log("command : PAUSE");
    this.ws.next({ type: PlayerCommand.PAUSE});
  }

  next(): void{
    console.log("command : NEXT");
    this.ws.next({ type: PlayerCommand.NEXT});
  }


  previuos(): void{
    console.log("command : PREVIUOS");
    this.ws.next({ type: PlayerCommand.PREVIOUS});
  }


  private match(message: PlayerEvent): boolean{
    try {
      return Object.values(PlayerEventType).includes(message.type as PlayerEventType);
    } catch (error) {
      return false;
    }
  }

  private handleEvent(event: PlayerEvent){
      this.eventListener.handleEvent(event);  
  }

  private connect() {
    this.ws = webSocket(this.webSocketUrl); 
    this.message$ = this.ws.multiplex(
      () => ({subscribe: 'message'}),
      () => ({unsubscribe: 'message'}),
      message => this.match(message)
    );
    // subscribe to messages sent from the server
    this.message$.subscribe(
      value => this.handleEvent(value),
      error => this.disconnect(error),
      () => this.disconnect()
    );
    this.setConnected(true);
  }

  private disconnect(err?) {
    if (err) { console.error(err); }
    this.setConnected(false);
    console.log('Disconnected');
  }

  private setConnected(connected) {
    this.connected = connected;
  }
}