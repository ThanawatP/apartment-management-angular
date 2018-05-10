import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './user.routes';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserService } from './user.service';
import { UserDetailEditComponent } from './components/user-detail-edit/user-detail-edit.component';
import { RoomService } from '../room/room.service';
import { FormsModule }   from '@angular/forms';
import { NewUserFormComponent } from './components/new-user-form/new-user-form.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule
  ],
  providers: [
    UserService,
    RoomService
  ],
  declarations: [UserListComponent, UserDetailComponent, UserDetailEditComponent, NewUserFormComponent]
})
export class UserModule { }
