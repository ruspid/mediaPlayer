import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, tap} from 'rxjs/operators'

@Injectable({
    providedIn: 'root'
})
export class ProductService{

  private productsUrl = 'api/products/products.json';

  constructor(private httpClient: HttpClient){}
    getProducts(): Observable<IProduct[]>{
        return this.httpClient.get<IProduct[]>(this.productsUrl).pipe(
          tap(data => console.log('All: ' + JSON.stringify(data))),
          catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse){
      return throwError(err.message);
    }
}