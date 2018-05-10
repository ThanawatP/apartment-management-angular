import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../report.service';
import { RentalService } from '../../../rental/rental.service';
import { Report } from '../../../../shared/models/report'

@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.css']
})
export class MonthlyReportComponent implements OnInit {
  report: Report

  constructor(
    private reportService:ReportService,
    private rentalService:RentalService
  ) { }

  ngOnInit() {
    this.generateReport()
  }

  generateReport() {
    this.rentalService.getBillPeriods().subscribe(billPeriods => {
      this.reportService.generateReport(billPeriods[0]["_id"]).subscribe(report => this.mapping(report))
    })
  }

  mapping(report: Object) {
    this.report = {
      billPeriod: report["bill_period"],
      paid: report["paid"],
      pending: report["pending"],
      total: report["total"],
      pendingRooms: report["pending_rooms"]
    }
    console.log(`report: ${JSON.stringify(this.report)}`)
  }

}
