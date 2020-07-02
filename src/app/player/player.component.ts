import { Component, OnInit, ViewChild } from '@angular/core';
import { PlayList } from '../playlist/playlist';
import { PlaylistService } from '../playlist/playlist.service';
import { ITrack } from '../track/track';
import { PlaylistInerComponent } from '../playlist/playlist-iner.component';
import { PlayerService } from './player.service';
import { PlayerEventListener } from './player.event.listener';


@Component({
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  @ViewChild(PlaylistInerComponent) playlistComponent;

  connected: boolean;

  playlist: PlayList;
  currentTrack: ITrack;
  isPlaying: boolean;

  constructor(private playlistService: PlaylistService, private playerService: PlayerService, private playerEventListener: PlayerEventListener) {
    playerEventListener.player(this);
  }

  ngOnInit(): void {}

  acceptData(track: ITrack) {
    this.playerService.play(track);
    this.currentTrack = track;
  }

  indexOfCurrentlyPlayingTrack(): number{
    return this.playlist.tracks
    .map(t => t.id)
    .findIndex(t => t == this.currentTrack.id)
  }

  resumeOrPause() {
    if(this.isPlaying === false) 
      this.resume()
    else
      this.pause()
  }

  resume(): void{
    this.playerService.resume();
  }

  play(track: ITrack): void{
    this.playerService.play(track);
  }


  pause(): void{
    this.playerService.pause();
  }

  next(): void{
    this.playerService.next();
  }


  previuos(): void{
    this.playerService.previuos()
  }

  resumed(): void{
    this.isPlaying = true;
  }

  played(track: ITrack) {
    this.currentTrack = track;
    this.isPlaying = true;
  }

  paused(): void{
    this.isPlaying = false;
  }

  playlistPlayed(playlist: PlayList) {
    this.playlist = playlist;
    this.played(playlist.tracks[0]);
  }

}

