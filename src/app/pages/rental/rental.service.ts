import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Rental } from '../../shared/models/rental';
import { BillPeriod } from '../../shared/models/bill_period';
import { environment } from './../../../environments/environment';
import { HttpService } from '../../shared/services/http.service';

@Injectable()
export class RentalService {
  private _currentBillPeriod = new BehaviorSubject<string>("");
  private _roomTerm = new BehaviorSubject<string>("");
  private _status = new BehaviorSubject<string>("all");

  constructor(private _httpService: HttpService) { }

  get currentBillPeriod() {
    return this._currentBillPeriod.value;
  }

  set currentBillPeriod(billPeriod: string) {
    this._currentBillPeriod.next(billPeriod);
  }

  get roomTerm$() {
    return this._roomTerm.asObservable();
  }

  get roomTerm() {
    return this._roomTerm.value;
  }

  set roomTerm(roomTerm: string) {
    this._roomTerm.next(roomTerm);
  }

  get status() {
    return this._status.value;
  }

  set status(status: string) {
    this._status.next(status);
  }

  getRentals(page: Number, status: string, billPeriod?: string, roomTerm?: string, roomID?: string, isAnnual?: boolean): Observable<Object> {
    let path = `/rental/list?page=${page}`;
    if (roomTerm) {
      path = `${path}&room_term=${roomTerm}`
    }
    let httpOptions = {
      "params": {}
    }
    if (roomID || isAnnual) {
      httpOptions["params"]["room_ids"] = roomID
      httpOptions["params"]["annual"] = isAnnual
    }
    if (billPeriod) {
      httpOptions["params"]["bill_period"] = billPeriod
    }
    if (status) {
      httpOptions["params"]["status"] = status
    }
    return this._httpService.GET(path, httpOptions)
  }

  getRental(id: string): Observable<Object> {
    return this._httpService.GET(`/rental/${id}`);
  }

  updateRental(id: string): Observable<Object> {
    return this._httpService.POST(`/rental/${id}`);
  }

  getBillPeriods(): Observable<BillPeriod[]> {
    return this._httpService.GET('/bill_period/all')
  }
}
