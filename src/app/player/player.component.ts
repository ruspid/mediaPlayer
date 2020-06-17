import { Component, OnInit, ViewChild } from '@angular/core';
import { PlayList } from '../playlist/playlist';
import { PlaylistService } from '../playlist/playlist.service';
import { ThrowStmt } from '@angular/compiler';
import { ITrack } from '../track/track';
import { PlaylistComponent } from '../playlist/playlist.component';

@Component({
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  @ViewChild(PlaylistComponent) playlistComponent;

  playlist: PlayList;
  currentTrack: ITrack;
  isPlaying: boolean = false;

  constructor(private playlistService: PlaylistService) { }

  ngOnInit(): void {
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
}
