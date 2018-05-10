import { Component, OnInit } from '@angular/core';
import { Room } from '../../../../shared/models/room';
import { RoomService } from '../../room.service';
import { User } from '../../../../shared/models/user';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { switchMap } from 'rxjs/operators/switchMap';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
  rooms: Room[];
  pageCount: Number[];
  currentPage: Number = 1;
  term: string

  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this.search(this.roomService.term)
  }

  search(term: string): void {
    this.term = term
    this.roomService.term = term
    this.roomService.term$.pipe(
        // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.roomService.getRooms(this.currentPage, term))
    ).subscribe(rooms => this.mapping(rooms))
  }

  getRooms(page: Number, roomTerm?: string): void {
    this.roomService.getRooms(page, roomTerm).subscribe(rooms => this.mapping(rooms));
    this.currentPage = page;
  }

  mapping(data: Object): void {
    let temps: Room[] = [];
    if (data["total"] != 0) {
      console.log(Math.ceil(data["total"] / 10) + 1)
      this.pageCount = Array(Math.floor(data["total"] / 10) + 1).fill(null).map((x, i) => i + 1)
      console.log(this.pageCount)
    }
    for (let room of data["data"] as Object[]) {
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
    this.roomService.rooms = this.rooms;
    console.log(this.rooms.length)
  }
}
