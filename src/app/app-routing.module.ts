import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'user', loadChildren: 'app/pages/user/user.module#UserModule' },
  { path: 'room', loadChildren: 'app/pages/room/room.module#RoomModule' },
  { path: 'rental', loadChildren: 'app/pages/rental/rental.module#RentalModule' },
  { path: 'dashboard', loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule' },
  { path: 'report', loadChildren: 'app/pages/report/report.module#ReportModule' },
  { path: 'rate', loadChildren: 'app/pages/rate/rate.module#RateModule' }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }