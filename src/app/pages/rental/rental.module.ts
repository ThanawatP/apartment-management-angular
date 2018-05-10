import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentalListComponent } from './components/rental-list/rental-list.component';
import { RentalDetailComponent } from './components/rental-detail/rental-detail.component';
import { routing } from './rental.routes';
import { RentalService } from './rental.service';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  providers:[
    RentalService
  ],
  declarations: [RentalListComponent, RentalDetailComponent]
})
export class RentalModule { }
