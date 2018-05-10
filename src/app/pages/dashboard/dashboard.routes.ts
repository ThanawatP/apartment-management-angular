import {
    RouterModule,
    Routes
} from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component'
  
const routes: Routes = [{
    path: '', component: DashboardComponent
}];
export const routing = RouterModule.forChild(routes);