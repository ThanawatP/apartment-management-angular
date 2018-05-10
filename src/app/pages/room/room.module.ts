import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './room.routes';
import { RoomListComponent } from './components/room-list/room-list.component';
import { RoomDetailComponent } from './components/room-detail/room-detail.component';
import { RoomService } from './room.service';
import { RoomDetailEditComponent } from './components/room-detail-edit/room-detail-edit.component';
import { FormsModule }   from '@angular/forms';
import { NewRoomFormComponent } from './components/new-room-form/new-room-form.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule
  ],
  providers: [
    RoomService
  ],
  declarations: [RoomListComponent, RoomDetailComponent, RoomDetailEditComponent, NewRoomFormComponent]
})
export class RoomModule { }
