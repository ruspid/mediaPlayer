import { Component, OnInit } from '@angular/core';
import { PlaylistService } from './playlist.service';
import { PlayList } from './playlist';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  playlist: PlayList;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private _playlistService: PlaylistService){}

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this._playlistService.getPlaylist(id.toString()).subscribe({
          next: playlist  => this.playlist = playlist,
          error: err => console.log("   EROR  " + err)
        });
  }

  onBack(): void {
    this.router.navigate(['/playlists']);
  }
}
