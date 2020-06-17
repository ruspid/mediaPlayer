import { Component, OnInit } from '@angular/core';
import { TrackService } from './tracks.service';
import { ITrack } from './track';

@Component({
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  tracks: ITrack[];
  selectedTracks: string[] = [];
  playlistName: string;

  constructor(private tracksService: TrackService) { }

  ngOnInit(): void {
    this.tracksService.getTracks().subscribe({
      next: tracks  => this.tracks = tracks,
      error: err => console.log("   EROR  " + err)
    });
  }

  onActionOnRow(event){
    let track: string = (event.target as Element).id;
    if(event.target.checked){
      this.selectedTracks.push(track);
    }
    else{
      this.selectedTracks = this.selectedTracks.filter(t => !t.localeCompare(track));
    };
  }

  createPlaylist(): void{
    this.tracksService.createPlaylist(this.playlistName, this.selectedTracks);
  }
}
