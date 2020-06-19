import { Component, OnInit, ViewChild } from '@angular/core';
import { PlayList } from '../playlist/playlist';
import { PlaylistService } from '../playlist/playlist.service';
import { ITrack } from '../track/track';
import { PlaylistComponent } from '../playlist/playlist.component';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';


interface TrackMessage {
  type: string; object: ITrack;
}


@Component({
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  @ViewChild(PlaylistComponent) playlistComponent;

  ws: WebSocketSubject<any>;
  message$: Observable<TrackMessage>;

  connected: boolean;

  playlist: PlayList;
  currentTrack: ITrack;
  isPlaying: boolean = false;

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {
    this.connect();
    let playlistName: string = "name";
    // this.playlist = this.playlistComponent.playlist;

    this.playlistService.getPlaylist(playlistName).subscribe({
      next: playlist => this.playlist = playlist
    })
  }

  acceptData(track: ITrack) {
    console.log(
      "this is the child data displaying in parent component: ",
      track.title
    );
    this.currentTrack = track;
  }

  nextTrack() {
    if(!this.currentTrack) return;
    let indexOfCurrentlyPlayingTrack: number = this.indexOfCurrentlyPlayingTrack();
    if(indexOfCurrentlyPlayingTrack < this.playlist.totalTracks){
      this.currentTrack = this.playlist.tracks[indexOfCurrentlyPlayingTrack+1]
    }
  }
  previousTrack() {
    if(!this.currentTrack) return;
    let indexOfCurrentlyPlayingTrack: number = this.indexOfCurrentlyPlayingTrack();
    if(indexOfCurrentlyPlayingTrack >= 0){
      this.currentTrack = this.playlist.tracks[indexOfCurrentlyPlayingTrack-1]
    }
  }

  indexOfCurrentlyPlayingTrack(): number{
    return this.playlist.tracks
    .map(t => t.id)
    .findIndex(t => t == this.currentTrack.id)
  }

  playOrStop() {
    if(this.isPlaying) 
      this.play()
    else
      this.stop()
  }

  private play(): void{

  }


  private stop(): void{

  }


  connect() {
    // use wss:// instead of ws:// for a secure connection, e.g. in production
    this.ws = webSocket('ws://localhost:8080/player'); // returns a WebSocketSubject

    //  split the subject into 2 observables, depending on object.type
    this.message$ = this.ws.multiplex(
      () => ({subscribe: 'message'}),
      () => ({unsubscribe: 'message'}),
      message => message.type === 'message'
    );

    // subscribe to messages sent from the server
    this.message$.subscribe(
      value => 
      { 
        this.currentTrack = value.object;
        console.log("recidved message " + JSON.stringify(value))
      },
      error => this.disconnect(error),
      () => this.disconnect()
    );


    this.setConnected(true);
  }

  disconnect(err?) {
    if (err) { console.error(err); }
    this.setConnected(false);
    console.log('Disconnected');
  }

  // sendMessage() {
  //   this.ws.next({ name: this.name, message: this.message, type: 'message' });
  //   this.message = '';
  // }

  setConnected(connected) {
    this.connected = connected;
  }

}

