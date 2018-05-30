import { Component, OnInit } from '@angular/core';
import { RentalService } from '../../rental.service';
import { Rental } from '../../../../shared/models/rental';
import { BillPeriod } from '../../../../shared/models/bill_period';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { switchMap } from 'rxjs/operators/switchMap';

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.css']
})
export class RentalListComponent implements OnInit {
  rentals: Rental[];
  billPeriods: BillPeriod[];
  pageCount: Number[];
  currentPage: Number = 1;
  dropdown: Boolean = false;
  currentBillPeriod: string;
  roomTerm: string;
  status: string;

  constructor(private rentalService: RentalService) { }

  ngOnInit() {
    this.getBillPeriods();
    this.search(this.rentalService.roomTerm);
  }

  search(term): void {
    this.roomTerm = term;
    this.rentalService.roomTerm = term;
    this.status = this.rentalService.status;
    this.rentalService.roomTerm$.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((roomTerm: string) => this.rentalService.getRentals(this.currentPage, this.rentalService.status, this.rentalService.currentBillPeriod, roomTerm)),
    ).subscribe(rentals => {
      this.rentals = rentals["data"] as Rental[];
      if (rentals["total"] != 0) {
        this.pageCount = Array(Math.ceil(rentals["total"] / 10)).fill(null).map((x, i) => i + 1);
      }
    });
  }

  getRentals(page: Number, status: string, billPeriod: string): void {
    this.rentalService.getRentals(page, status, billPeriod).subscribe(rentals => {
      this.rentals = rentals["data"] as Rental[];
      if (rentals["total"] != 0) {
        this.pageCount = Array(Math.ceil(rentals["total"] / 10)).fill(null).map((x, i) => i + 1);
      }
    })
    this.currentPage = page;
  }


  getBillPeriods(): void {
    this.rentalService.getBillPeriods().subscribe(billPeriods => {
      this.billPeriods = billPeriods;
      if (!this.rentalService.currentBillPeriod) {
        this.rentalService.currentBillPeriod = billPeriods[0]["_id"];
      }
      this.currentBillPeriod = this.rentalService.currentBillPeriod;
    })
  }

  toggleDropdown(): void {
    if (this.dropdown) {
      this.dropdown = false;
    } else {
      this.dropdown = true;
    }
  }

  setCurrentBillPeriod(billPeriod: string) {
    this.rentalService.currentBillPeriod = billPeriod;
    this.currentBillPeriod = billPeriod;
    this.getRentals(this.currentPage, this.status, billPeriod);
  }

  setStatus(status: string) {
    this.rentalService.status = status;
    this.status = status;
    this.getRentals(this.currentPage, status, this.rentalService.currentBillPeriod);
  }
}
