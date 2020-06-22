import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PlaylistService } from './playlist.service';
import { PlayList } from './playlist';
import { Router, ActivatedRoute } from '@angular/router';
import { ITrack } from '../track/track';

@Component({
  selector: "playlist-iner-component",
  templateUrl: './playlist-iner.component.html',
  styleUrls: ['./playlist-iner.component.css']
})
export class PlaylistInerComponent implements OnInit {
  
  @Output() event = new EventEmitter<ITrack>();
  
  public playlist: PlayList;
  public playlists: PlayList[];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private playlistService: PlaylistService){}

  ngOnInit(): void {
    this.playlistService.getPlaylistList().subscribe({
      next: playlists => this.initPlaylist(playlists)
    })
  }

  initPlaylist(playlists: PlayList[]){
    this.playlists = playlists
    this.playlist = playlists[0];
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
