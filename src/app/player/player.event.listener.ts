import { Injectable } from '@angular/core';
import { PlayList } from '../playlist/playlist';
import { ITrack } from '../track/track';
import { PlayerComponent } from './player.component';
import { PlayerEventType, PlayerEvent } from './player.event';

@Injectable({
    providedIn: 'root'
})
export class PlayerEventListener{

  component: PlayerComponent;
  //todo change with observable to avoid calling of component from listener
  player(component: PlayerComponent): void{
    this.component = component;
  }

  resumed(): void{
    this.component.resumed();
  }

  played(track: ITrack) {
    this.component.played(track);
  }

  paused(): void{
    this.component.paused();
  }

  playlistPlayed(playlist: PlayList) {
    this.component.playlistPlayed(playlist);
  }

  handleEvent(event: PlayerEvent){
    console.log("event " + JSON.stringify(event));
    switch (event.type) {
      case PlayerEventType.PLAYED:
          this.played(event.object);
          break;
      case PlayerEventType.PAUSED:
          this.paused();
          break;
      case PlayerEventType.RESUMED:
          this.resumed();
          break;
      default:
          // ...
          break;
      }
  }

}