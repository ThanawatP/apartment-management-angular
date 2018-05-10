import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { User } from '../../../../shared/models/user';
import { Room } from '../../../../shared/models/room';
import { RoomService } from '../../../room/room.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-detail-edit',
  templateUrl: './user-detail-edit.component.html',
  styleUrls: ['./user-detail-edit.component.css']
})
export class UserDetailEditComponent implements OnInit {
  user: User;
  // updatedUser: User = new User();
  rooms: Room[];

  constructor(
    private userService:UserService,
    private roomService:RoomService,
    private location:Location
  ) { }

  ngOnInit() {
    this.getUser();
    this.getAvailableRooms();
  }

  onSubmit() {
    console.log("submit")
    this.userService.updateUser(this.user).subscribe(user => console.log("updated: " + JSON.stringify(user)));
    this.goBack();
  }

  getUser() {
    this.userService.user$.subscribe(user => {
      console.log("a" + JSON.stringify(user));
      this.user = user;
      // this.updatedUser.id = this.user.id;
    });
  }

  getAvailableRooms() {
    this.roomService.getAvailableRooms().subscribe(rooms => this.mapping(rooms))
  }

  mapping(rooms: Object[]): void {
    let temps: Room[] = [new Room()];
    for (let room of rooms) {
      console.log(room)
      let mappedRoom: Room = {
        id: room["_id"],
        user: new User(),
        rates: room["rates"]
      }
      if (room["user"]) {
        if (room["user"]["id"] != "") {
          console.log("id: " +  room["user"]["id"])
          console.log("name: " +  room["user"]["name"])
          mappedRoom.user.id = room["user"]["id"];
          mappedRoom.user.name = room["user"]["name"];
        }
      }
      temps.push(mappedRoom);
    }
    this.rooms = temps;
    console.log(this.rooms.length)
  }

  goBack(): void {
    this.location.back();
  }

  get diagnostic() { return JSON.stringify(this.user); }
}
