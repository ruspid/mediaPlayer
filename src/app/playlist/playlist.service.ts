import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, tap} from 'rxjs/operators'
import { PlayList } from './playlist';

@Injectable({
    providedIn: 'root'
})
export class PlaylistService{

  private playlistUrl = 'api/playlist.json';
  private playlistListUrl = 'api/playlists.json';

  constructor(private httpClient: HttpClient){}

  getPlaylist(id: string): Observable<PlayList>{
        return this.httpClient.get<PlayList>(this.playlistUrl).pipe(
          // tap(data => console.log('All: ' + JSON.stringify(data))),
          catchError(this.handleError)
        );
  }

  getPlaylistList(): Observable<PlayList[]>{
    return this.httpClient.get<PlayList[]>(this.playlistListUrl).pipe(
      // tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
}

  private handleError(err: HttpErrorResponse){
      return throwError(err.message);
  }
}