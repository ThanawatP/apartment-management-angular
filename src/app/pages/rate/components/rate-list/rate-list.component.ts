import { Component, OnInit } from '@angular/core';
import { RateService } from '../../rate.service';
import { Rate } from '../../../../shared/models/rate';

@Component({
  selector: 'app-rate-list',
  templateUrl: './rate-list.component.html',
  styleUrls: ['./rate-list.component.css']
})
export class RateListComponent implements OnInit {
  rates: Rate[];

  constructor(private rateService:RateService) { }

  ngOnInit() {
    this.getAllRates();
  }

  getAllRates(): void {
    this.rateService.getAllRates().subscribe(rates => this.mapping(rates));
  }

  mapping(data: Object): void {
    let temps: Rate[] = [];
    for (let rate of data["data"] as Object[]) {
      let mappedRate: Rate = {
        id: rate["_id"],
        value: rate["value"],
        createdAt: rate["created_at"],
        updatedAt: rate["updated_at"]
      }
      temps.push(mappedRate);
    }
    this.rates = temps;
    this.rateService.rates = this.rates;
  }
}
