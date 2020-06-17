import { Component, OnInit } from '@angular/core';
import { PlaylistService } from './playlist.service';
import { PlayList } from './playlist';

@Component({
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.css']
})
export class PlaylistListComponent implements OnInit {

  constructor(private _playlistService: PlaylistService) { }

  playlists: PlayList[];

  ngOnInit(): void {
    this._playlistService.getPlaylistList().subscribe({
      next: playlists  => {
        this.playlists = playlists;
    },
    error: err => console.log("   EROR  " + err)
  });
  }

}
