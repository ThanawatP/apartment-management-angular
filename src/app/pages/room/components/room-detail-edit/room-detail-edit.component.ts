import { Component, OnInit } from '@angular/core';
import { Room } from '../../../../shared/models/room';
import { RoomService } from '../../room.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-room-detail-edit',
  templateUrl: './room-detail-edit.component.html',
  styleUrls: ['./room-detail-edit.component.css']
})
export class RoomDetailEditComponent implements OnInit {
  room: Room;

  constructor(
    private roomService: RoomService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getRoom();
  }

  onSubmit() {
    this.roomService.updateRoom(this.room).subscribe(room => this.roomService.room = room);
    this.goBack();
  }

  getRoom() {
    this.roomService.room$.subscribe(room => this.room = room);
  }

  goBack() {
    this.location.back();
  }
}
