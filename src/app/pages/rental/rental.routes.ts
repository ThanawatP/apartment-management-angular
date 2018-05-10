import {
    RouterModule,
    Routes
} from '@angular/router';
import { RentalListComponent } from './components/rental-list/rental-list.component';
import { RentalDetailComponent } from './components/rental-detail/rental-detail.component';

const routes: Routes = [{
    path: '',
    children: [
        { path: 'list', component: RentalListComponent },
        { path: ':id', component: RentalDetailComponent }
    ]
}];
export const routing = RouterModule.forChild(routes);