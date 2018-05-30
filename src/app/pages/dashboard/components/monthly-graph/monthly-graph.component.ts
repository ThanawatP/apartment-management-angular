import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';
import { RentalService } from '../../../rental/rental.service';
import { Room } from '../../../../shared/models/room';
import { Rental } from '../../../../shared/models/rental';

@Component({
  selector: 'app-monthly-graph',
  templateUrl: './monthly-graph.component.html',
  styleUrls: ['./monthly-graph.component.css']
})
export class MonthlyGraphComponent implements OnInit {
  chart = [];
  constructor(private rentalService: RentalService) { }

  ngOnInit() {
    this.rentalService.rentals$.subscribe(rentals => {
      this.generateGraph(rentals);
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      if (propName === 'rentals') {
        this.rentalService.rentals$.subscribe(rentals => {
          this.generateGraph(rentals);
        })
      }
    }
  }

  generateGraph(rentals: Rental[]) {
    let data = [];
    let count = 0;
    let backgroundColor = [
      'rgba(54, 162, 235, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(54, 162, 235, 0.2)',
    ];
    const pendingColor = 'rgba(255, 99, 132, 0.2)';
    for (let rental of rentals) {
      data.push(+rental["total"]);
      if (rental["status"] == "pending") {
        backgroundColor[count] = pendingColor;
      }
      count++;
    }
    if (data.length != 12) {
      let missingMontCount = 12 - data.length;
      for (let count = 0; count < missingMontCount; count++) {
        data.push(0);
      }
    }
    this.chart = new Chart("myBarChart", {
      type: 'bar',
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
          "Oct", "Nov", "Dec"
        ],
        datasets: [{
          label: '# of total cost',
          data: data,
          backgroundColor: backgroundColor

        }],
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }

      }
    });
  }

}
