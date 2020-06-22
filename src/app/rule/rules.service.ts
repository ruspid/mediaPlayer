import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Injectable } from '@angular/core';
import { Rules } from './rules';
import { Rule } from './rule';

@Injectable({
    providedIn: 'root'
})
export class RulesService{
    private optionsUrl = 'http://localhost:8080/options';
    private rulesUrl = 'http://localhost:8080/rules';

    constructor(private httpClient: HttpClient){}
  
    getOptions(): Observable<Rules>{
          return this.httpClient.get<Rules>(this.optionsUrl).pipe(
            // tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
          );
    }

    getRules(): Observable<Rule[]>{
        return this.httpClient.get<Rule[]>(this.rulesUrl).pipe(
          // tap(data => console.log('All: ' + JSON.stringify(data))),
          catchError(this.handleError)
        );
  }

    addRule(rule: Rule){
        return this.httpClient.post(this.rulesUrl, rule)
        .subscribe(
            data => {alert("Succesfully Added Product details")},
            Error => {alert("failed while adding product details")}
        )
    }


    private handleError(err: HttpErrorResponse){
        return throwError(err.message);
    }
}