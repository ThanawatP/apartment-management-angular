import { Component, OnInit } from '@angular/core';
import { Rate } from '../../../../shared/models/rate';
import { RateService } from '../../rate.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-rate-detail-edit',
  templateUrl: './rate-detail-edit.component.html',
  styleUrls: ['./rate-detail-edit.component.css']
})
export class RateDetailEditComponent implements OnInit {
  rate: Rate;

  constructor(
    private rateService: RateService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getRate();
  }

  onSubmit() {
    this.rateService.updateRate(this.rate).subscribe(rate => this.rateService.rate = rate);
    this.goBack();
  }

  getRate() {
    this.rateService.rate$.subscribe(rate => this.rate = rate);
  }

  goBack() {
    this.location.back();
  }

}
