import { Injectable } from '@angular/core';
import { Room } from '../../shared/models/room';
import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from '../../shared/services/http.service';
import { Rate } from '../../shared/models/rate';

@Injectable()
export class RateService {
  private _rates = new BehaviorSubject<Rate[]>([]);
  private _rate = new BehaviorSubject<Rate>(new Rate);

  constructor(private _httpService: HttpService) { }

  // rates
  get rates$() {
    return this._rates.asObservable();
  }

  get rates() {
    return this._rates.value;
  }

  set rates(rates: Rate[]) {
    this._rates.next(rates);
  }

  // rate
  get rate$() {
    return this._rate.asObservable();
  }

  get rate() {
    return this._rate.value;
  }

  set rate(rate: Rate) {
    this._rate.next(rate);
  }

  getAllRates(): Observable<Object> {
    return this._httpService.GET('/rate/all');
  }

  getRate(id: string): Observable<Object> {
    return this._httpService.GET(`/rate/${id}`);
  }

  updateRate(rate: Rate): Observable<any> {
    const body = new HttpParams()
      .set('value', `${rate.value}`);
    return this._httpService.POST_FORM(`/rate/${rate.id}`, body);
  }
}
