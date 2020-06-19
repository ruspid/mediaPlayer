import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PlaylistService } from './playlist.service';
import { PlayList } from './playlist';
import { Router, ActivatedRoute } from '@angular/router';
import { ITrack } from '../track/track';

@Component({
  selector: "playlist-component",
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  
  @Output() event = new EventEmitter<ITrack>();
  
  public playlist: PlayList;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private _playlistService: PlaylistService){}

  ngOnInit(): void {
    let id: string = this.route.snapshot.paramMap.get('id');
    this._playlistService.getPlaylist(id).subscribe({
          next: playlist  => this.playlist = playlist,
          error: err => console.log("   EROR  " + err)
        });
  }

  onPlay(event: Event): void {
    let id: string = (event.target as Element).id;
    let track: ITrack  = this.playlist.tracks.find(t => t.id == id);
    this.event.emit(track);
  }

  onBack(): void {
    this.router.navigate(['/playlists']);
  }
}
