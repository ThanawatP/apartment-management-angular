import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RateListComponent } from './components/rate-list/rate-list.component';
import { routing } from './rate.routes';
import { RateService } from './rate.service';
import { RateDetailComponent } from './components/rate-detail/rate-detail.component';
import { RateDetailEditComponent } from './components/rate-detail-edit/rate-detail-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule
  ],
  providers: [
    RateService
  ],
  declarations: [RateListComponent, RateDetailComponent, RateDetailEditComponent]
})
export class RateModule { }
