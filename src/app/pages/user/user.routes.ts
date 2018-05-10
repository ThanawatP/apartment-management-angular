import {
  RouterModule,
  Routes
} from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserDetailEditComponent } from './components/user-detail-edit/user-detail-edit.component';
import { NewUserFormComponent } from './components/new-user-form/new-user-form.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'list', component: UserListComponent },
      { 
        path: 'new',
        component: NewUserFormComponent
      },
      { 
        path: ':id',
        component: UserDetailComponent
      },
      { 
        path: ':id/edit',
        component: UserDetailEditComponent
      }
    ]
  }
]
export const routing = RouterModule.forChild(routes);