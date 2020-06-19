import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Injectable } from '@angular/core';
import { Rules } from './rules';

@Injectable({
    providedIn: 'root'
})
export class RulesService{
    private optionsUrl = 'http://localhost:8080/options';

    constructor(private httpClient: HttpClient){}
  
    getOptions(): Observable<Rules>{
          return this.httpClient.get<Rules>(this.optionsUrl).pipe(
            // tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
          );
    }

    private handleError(err: HttpErrorResponse){
        return throwError(err.message);
    }
}