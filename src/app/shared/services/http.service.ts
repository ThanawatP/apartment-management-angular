import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class HttpService {
    private _url: string = environment.api_uri;
    private _httpOptionsForPost = {
        headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    }

    constructor(private _http: HttpClient) { }

    GET(path: string, options?: any): Observable<any> {
        const url = this.generateUrl(path);
        return this._http.get(url, options)
            .pipe(
                catchError(this._handleError<any>())
            );
    }

    POST(path: string, body: HttpParams = null, options?: any): Observable<any> {
        const url = this.generateUrl(path);
        return this._http.post(url, body, options)
            .pipe(
                catchError(this._handleError<any>())
            );
    }

    POST_FORM(path: string, body: HttpParams = null, options?: any): Observable<Object> {
        const url = this.generateUrl(path);
        return this._http.post(url, body, this._httpOptionsForPost)
            .pipe(
                catchError(this._handleError<Object>())
            );
    }

    PUT(path: string, data: any = null, options: any): Observable<Object> {
        const url = this.generateUrl(path);
        const body = data ? JSON.stringify(data) : '';
        return this._http.put(url, body, options)
            .pipe(
                catchError(this._handleError<Object>())
            );
    }

    DELETE(path: string, options: any): Observable<Object> {
        const url = this.generateUrl(path);
        return this._http.delete(url, options)
            .pipe(
                catchError(this._handleError<Object>())
            );
    }

    private generateUrl(path: string): string {
        return `${this._url}${path}`;
    }

    private _handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
