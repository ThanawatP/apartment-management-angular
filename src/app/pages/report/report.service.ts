import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { HttpService } from '../../shared/services/http.service';

@Injectable()
export class ReportService {
  constructor(private _httpService: HttpService) { }

  generateReport(billPeriod: string): Observable<Object> {
    const body = new HttpParams()
      .set("bill_period", billPeriod);
    return this._httpService.POST('/report/generate', body);
  }
}
