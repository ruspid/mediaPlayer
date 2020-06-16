import { Component, OnInit } from '@angular/core';
import { PlaylistService } from './playlist.service';
import { ITrack } from './track';

@Component({
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  constructor(private _playlistService: PlaylistService) {}

  tracks: ITrack[];
  name: string;
  totalTracks: number;
  duration: number;

  
  ngOnInit(): void {
    this._playlistService.getPlaylist().subscribe({
      next: playlist  => {
          this.tracks = playlist.tracks;
          this.name = playlist.name;
          this.totalTracks = playlist.totalTracks;
          this.duration = playlist.duration;
      },
      error: err => console.log("   EROR  " + err)
    });
  }

}
