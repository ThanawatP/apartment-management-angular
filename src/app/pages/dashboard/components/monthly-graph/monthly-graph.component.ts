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
  @Input() room: Room;
  @Input() rentals: Rental[];
  constructor(private rentelService: RentalService) { }

  ngOnInit() {
    this.getRentals("A1")
    // var ctx = document.getElementById("myBarChart");
  }

  ngOnChanges(changes: SimpleChanges) {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    for (let propName in changes) {
      // let change = changes[propName];

      // let curVal  = JSON.stringify(change.currentValue);
      // let prevVal = JSON.stringify(change.previousValue);
      // let changeLog = `${propName}: currentValue = ${curVal}, previousValue = ${prevVal}`;

      if (propName === 'rentals') {
        //  console.log(`room: ${this.room.id}`)
        this.getRentals("")
      }
    }
  }

  getRentals(roomID: string) {
    // this.rentelService.getRentals(roomID, true).subscribe(rentals => {
    //   let data = [];
    //   for (let rental of rentals) {
    //     console.log(`${rental["bill_period"]} ${rental["total"]}`);
    //     data.push(+rental["total"]);
    //   }
    //   console.log(data.length)
    //   let backgroundColor = [
    //     'rgba(54, 162, 235, 0.2)',
    //     'rgba(54, 162, 235, 0.2)',
    //     'rgba(54, 162, 235, 0.2)',
    //     'rgba(54, 162, 235, 0.2)',
    //     'rgba(54, 162, 235, 0.2)',
    //     'rgba(54, 162, 235, 0.2)',
    //     'rgba(54, 162, 235, 0.2)',
    //     'rgba(54, 162, 235, 0.2)',
    //     'rgba(54, 162, 235, 0.2)',
    //     'rgba(54, 162, 235, 0.2)',
    //     'rgba(54, 162, 235, 0.2)',
    //     'rgba(54, 162, 235, 0.2)',
    //   ]
    //   const latestMonthBackgroundColor = 'rgba(255, 99, 132, 0.2)';
    //   backgroundColor[data.length - 1] = latestMonthBackgroundColor
    //   if (data.length != 12) {
    //     let missingMontCount = 12 - data.length;
    //     console.log(missingMontCount)
    //     for (let count = 0; count < missingMontCount; count++) {
    //       data.push(0);
    //     }
    //   }
    //   console.log(data)
    //   this.chart = new Chart("myBarChart", {
    //     type: 'bar',
    //     data: {
    //       labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
    //         "Oct", "Nov", "Dec"
    //       ],
    //       datasets: [{
    //         label: '# of total cost',
    //         data: data,
    //         backgroundColor: backgroundColor

    //       }],
    //     },
    //     options: {
    //       scales: {
    //         yAxes: [{
    //           ticks: {
    //             beginAtZero: true
    //           }
    //         }]
    //       }

    //     }
    //   });
    // })
    let data = [];
    let count = 0
    // const paidColor = 'rgba(54, 162, 235, 0.2)'
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
    ]
    const pendingColor = 'rgba(255, 99, 132, 0.2)'
    for (let rental of this.rentals) {
      console.log(`${rental["bill_period"]} ${rental["total"]}`);
      data.push(+rental["total"]);
      // backgroundColor[count] = paidColor
      if (rental["status"] == "pending") {
        backgroundColor[count] = pendingColor
      }
      count++
    }
    console.log(data.length)
    // const latestMonthBackgroundColor = 'rgba(255, 99, 132, 0.2)';
    // backgroundColor[data.length - 1] = latestMonthBackgroundColor
    if (data.length != 12) {
      let missingMontCount = 12 - data.length;
      console.log(missingMontCount)
      for (let count = 0; count < missingMontCount; count++) {
        data.push(0);
      }
    }
    console.log(data)
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
