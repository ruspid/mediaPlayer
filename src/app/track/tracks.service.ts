import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { ITrack } from './track';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TrackService{
    createPlaylist(playlistName: string, selectedTracks: string[]) {
      console.log(playlistName + "  " + selectedTracks);
    }

    private tracksUrl = 'api/tracks.json';

    constructor(private httpClient: HttpClient){}
  
    getTracks(): Observable<ITrack[]>{
          return this.httpClient.get<ITrack[]>(this.tracksUrl).pipe(
            // tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
          );
    }

    private handleError(err: HttpErrorResponse){
        return throwError(err.message);
    }
}