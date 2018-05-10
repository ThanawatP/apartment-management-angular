import {
    RouterModule,
    Routes
} from '@angular/router';
import { MonthlyReportComponent } from './components/monthly-report/monthly-report.component';
  
const routes: Routes = [{
    path: '', component: MonthlyReportComponent
}];
export const routing = RouterModule.forChild(routes);