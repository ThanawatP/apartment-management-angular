import { Component, OnInit } from '@angular/core';
import { Rental } from '../../../../shared/models/rental';
import { RentalService } from '../../rental.service';
import { MessageService } from '../../../../shared/services/message.service';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.css']
})
export class RentalDetailComponent implements OnInit {
  rental: Rental;

  constructor(
    private route:ActivatedRoute,
    private rentalService:RentalService,
    private location:Location
  ) { }

  ngOnInit() {
    this.getRental();
  }

  getRental(): void {
    const id = this.route.snapshot.paramMap.get('id');
    // this.user = {id: "1", name: "tae"}
    this.rentalService.getRental(id)
      .subscribe(rental => this.mapping(rental));
  }

  mapping(rental: Object): void {
    this.rental =  {
      id: rental["_id"],
      roomId: rental["room_id"],
      userId: rental["user_id"],
      electricityBill: {
        previousReading: rental["electricity_bill"]["previous_reading"],
        recentReading: rental["electricity_bill"]["recent_reading"],
        consumption: rental["electricity_bill"]["consumption"],
        rate: rental["electricity_bill"]["rate"],
        cost: rental["electricity_bill"]["cost"]
      },
      waterBill: {
        previousReading: rental["water_bill"]["previous_reading"],
        recentReading: rental["water_bill"]["recent_reading"],
        consumption: rental["water_bill"]["consumption"],
        rate: rental["water_bill"]["rate"],
        cost: rental["water_bill"]["cost"]
      },
      total: rental["total"],
      rate: rental["rate"],
      status: rental["status"],
      billPeriod: rental["bill_period"],
      createdAt: rental["created_at"],
      updatedAt: rental["updated_at"]
    }
    // this.userService.user = this.user;
  }

  goBack() {
    this.location.back()
  }
}