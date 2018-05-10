import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthlyGraphComponent } from './components/monthly-graph/monthly-graph.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { routing } from './dashboard.routes'
import { RentalService } from '../rental/rental.service';
import { RoomService } from '../room/room.service';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  providers:[
    RentalService,
    RoomService
  ],
  declarations: [MonthlyGraphComponent, DashboardComponent]
})
export class DashboardModule { }
