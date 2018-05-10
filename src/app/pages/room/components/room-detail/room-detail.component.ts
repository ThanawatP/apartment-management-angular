import { Component, OnInit } from '@angular/core';
import { Room } from '../../../../shared/models/room';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../../room.service';
import { User } from '../../../../shared/models/user';
import { Location } from '@angular/common';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {
  room: Room;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getRoom();
  }

  getRoom(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.roomService.getRoom(id).subscribe(room => this.mapping(room));
  }

  mapping(room: Object): void {
    this.room = {
      id: room["_id"],
      user: new User(),
      rates: room["rates"]
    };
    if (room["user"]) {
      if (room["user"]["id"] != "") {
        this.room.user.id = room["user"]["id"];
        this.room.user.name = room["user"]["name"];
      }
    }
    this.roomService.room = this.room;
  }

  goBack(): void {
    this.location.back();
  }
}
