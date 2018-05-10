import {
  RouterModule,
  Routes
} from '@angular/router';
import { RoomListComponent } from './components/room-list/room-list.component';
import { RoomDetailComponent } from './components/room-detail/room-detail.component';
import { RoomDetailEditComponent } from './components/room-detail-edit/room-detail-edit.component';
import { NewRoomFormComponent } from './components/new-room-form/new-room-form.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'list', component: RoomListComponent },
    { path: 'new', component: NewRoomFormComponent },
    { path: ':id', component: RoomDetailComponent },
    { path: ':id/edit', component: RoomDetailEditComponent }
  ]
}];
export const routing = RouterModule.forChild(routes);