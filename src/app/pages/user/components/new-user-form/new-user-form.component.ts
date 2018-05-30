import { Component, OnInit } from '@angular/core';
import { User } from '../../../../shared/models/user';
import { UserService } from '../../user.service';
import { Room } from '../../../../shared/models/room';
import { RoomService } from '../../../room/room.service';

@Component({
  selector: 'app-new-user-form',
  templateUrl: './new-user-form.component.html',
  styleUrls: ['./new-user-form.component.css']
})
export class NewUserFormComponent implements OnInit {
  newUser: User;
  users: User[];
  rooms: Room[];

  constructor(
    private userService:UserService,
    private roomService:RoomService
  ) {
    this.newUser = new User();
  }

  ngOnInit() {
    this.getUsers();
    this.getAvailableRooms();
  }

  getUsers() {
    this.userService.users$.subscribe(users => {
      this.users = users;
    });
  }

  mappingUser(user: Object): void {
    this.newUser =  {
      id: user["_id"],
      name: user["name"],
      birthDate: user["birth_date"],
      roomId: user["room_id"]
    };
  }

  addUser() {
    this.userService.addUser(this.newUser)
      .subscribe(
        user => {
          this.mappingUser(user);
          this.users.push(this.newUser);
          this.userService.users = this.users;
        },
        err => console.log(err),
        () => this.newUser = new User()
      );
  }

  getAvailableRooms() {
    this.roomService.getAvailableRooms().subscribe(rooms => this.mappingRooms(rooms));
  }

  mappingRooms(rooms: Object[]): void {
    let temps: Room[] = [new Room()];
    for (let room of rooms) {
      let mappedRoom: Room = {
        id: room["_id"],
        user: new User(),
        rates: room["rates"]
      };
      if (room["user"]) {
        if (room["user"]["id"] != "") {
          mappedRoom.user.id = room["user"]["id"];
          mappedRoom.user.name = room["user"]["name"];
        }
      }
      temps.push(mappedRoom);
    }
    this.rooms = temps;
  }

}
