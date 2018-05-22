import {
    RouterModule,
    Routes
} from '@angular/router';
import { RateListComponent } from './components/rate-list/rate-list.component';
import { RateDetailComponent } from './components/rate-detail/rate-detail.component';
import { RateDetailEditComponent } from './components/rate-detail-edit/rate-detail-edit.component';

const routes: Routes = [{
    path: '',
    children: [
        { path: 'list', component: RateListComponent },
        { path: ':id', component: RateDetailComponent },
        { path: ':id/edit', component: RateDetailEditComponent }
    ]
}];
export const routing = RouterModule.forChild(routes);