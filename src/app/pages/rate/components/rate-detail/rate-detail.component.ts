import { Component, OnInit } from '@angular/core';
import { Rate } from '../../../../shared/models/rate';
import { RateService } from '../../rate.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-rate-detail',
  templateUrl: './rate-detail.component.html',
  styleUrls: ['./rate-detail.component.css']
})
export class RateDetailComponent implements OnInit {
  rate: Rate;

  constructor(
    private rateService: RateService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getRate();
  }

  getRate(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.rateService.getRate(id).subscribe(rate => this.mapping(rate));
  }

  mapping(data: Object): void {
    this.rate = {
      id: data["_id"],
      value: data["value"],
      createdAt: data["created_at"],
      updatedAt: data["updated_at"]
    }
    this.rateService.rate = this.rate;
  }

  goBack(): void {
    this.location.back();
  }
}
