import { Component, OnInit } from '@angular/core';
import { Room } from '../../../../shared/models/room';
import { RoomService } from '../../room.service';
import { User } from '../../../../shared/models/user';

@Component({
  selector: 'app-new-room-form',
  templateUrl: './new-room-form.component.html',
  styleUrls: ['./new-room-form.component.css']
})
export class NewRoomFormComponent implements OnInit {
  newRoom: Room;
  rooms: Room[];

  constructor(
    private roomService:RoomService
  ) {
    this.newRoom = new Room();
  }

  ngOnInit() {
    this.getRooms();
  }

  getRooms() {
    this.roomService.rooms$.subscribe(rooms => this.rooms = rooms);
  }

  addRoom() {
    this.roomService.addRoom(this.newRoom)
      .subscribe(
        room => this.mapping(room),
        err => console.log(err),
        () => this.newRoom = new Room()
      );
  }


  mapping(room: Object): void {
    this.newRoom = {
      id: room["_id"],
      user: new User(),
      rates: room["rates"]
    };
    if (room["user"]) {
      if (room["user"]["id"] != "") {
        this.newRoom.user.id = room["user"]["id"];
        this.newRoom.user.name = room["user"]["name"];
      }
    }
    this.rooms.push(this.newRoom);
    this.roomService.rooms = this.rooms;

  }
}
