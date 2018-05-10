import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthlyReportComponent } from './components/monthly-report/monthly-report.component';
import { routing } from './report.routes';
import { ReportService } from './report.service';
import { RentalService } from '../rental/rental.service';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  providers:[
    ReportService,
    RentalService
  ],
  declarations: [MonthlyReportComponent]
})
export class ReportModule { }
