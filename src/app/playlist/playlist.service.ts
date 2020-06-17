import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, tap} from 'rxjs/operators'
import { IPlayList } from './playlist';

@Injectable({
    providedIn: 'root'
})
export class PlaylistService{

  private playlistUrl = 'api/playlist.json';
  private playlistListUrl = 'api/playlists.json';

  constructor(private httpClient: HttpClient){}

  getPlaylist(id: string): Observable<IPlayList>{
        return this.httpClient.get<IPlayList>(this.playlistUrl).pipe(
          // tap(data => console.log('All: ' + JSON.stringify(data))),
          catchError(this.handleError)
        );
  }

  getPlaylistList(): Observable<IPlayList[]>{
    return this.httpClient.get<IPlayList[]>(this.playlistListUrl).pipe(
      // tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
}

  private handleError(err: HttpErrorResponse){
      return throwError(err.message);
  }
}