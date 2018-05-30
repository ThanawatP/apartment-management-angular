import { Component, OnInit } from '@angular/core';
import { Room } from '../../../../shared/models/room';
import { RoomService } from '../../../room/room.service';
import { User } from '../../../../shared/models/user';
import { Rental } from '../../../../shared/models/rental';
import { RentalService } from '../../../rental/rental.service';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { switchMap } from 'rxjs/operators/switchMap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  rooms: Room[][];
  selectedRoom: Room;
  rentals: Rental[];
  rental: Rental;
  private _searchTerms = new Subject<string>();

  constructor(
    private roomService: RoomService,
    private rentalService: RentalService
  ) { }

  ngOnInit() {
    this.getRooms();
    this.searchHandle();
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this._searchTerms.next(term);
  }

  searchHandle(): void {
    this._searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.roomService.getAllRooms(term)),
    ).subscribe(rooms => this.mapping(rooms));
  }

  getRooms(term?: string) {
    this.roomService.getAllRooms(term).subscribe(rooms => this.mapping(rooms));
  }

  mapping(rooms: Object[]): void {
    let temps: Room[][] = [];
    let i = 0;
    let count = 0;
    for (let room of rooms) {
      let mappedRoom: Room = {
        id: room["_id"],
        user: new User(),
        rates: room["rates"]
      };
      if (room["user"]) {
        if (room["user"]["id"] != "") {
          console.log("name: " + room["user"]["name"])
          mappedRoom.user.id = room["user"]["id"];
          mappedRoom.user.name = room["user"]["name"];
        }
      }
      if (!temps[i]) {
        temps[i] = [];
      }
      count++;
      temps[i].push(mappedRoom);
      if (count == 5) {
        count = 0;
        i++;
      }
    }
    this.rooms = temps;
    this.selectedRoom = this.rooms[0][0];
    this.getRentals(this.selectedRoom.id);
  }

  getRentals(roomId: string) {
    this.rentalService.getRentals(1, null, null, null, roomId, true).subscribe(rentals => {
      this.rentals = rentals["data"] as Rental[];
      if (this.rentals.length != 0) {
        this.mappingRental(this.rentals[this.rentals.length - 1]);
      } else {
        this.rental = null;
      }
    })
  }

  mappingRental(rental: Object): void {
    this.rental = {
      id: rental["_id"],
      roomId: rental["room_id"],
      userId: rental["user_id"],
      electricityBill: {
        previousReading: rental["electricity_bill"]["previous_reading"],
        recentReading: rental["electricity_bill"]["recent_reading"],
        consumption: rental["electricity_bill"]["consumption"],
        rate: rental["electricity_bill"]["rate"],
        cost: rental["electricity_bill"]["cost"]
      },
      waterBill: {
        previousReading: rental["water_bill"]["previous_reading"],
        recentReading: rental["water_bill"]["recent_reading"],
        consumption: rental["water_bill"]["consumption"],
        rate: rental["water_bill"]["rate"],
        cost: rental["water_bill"]["cost"]
      },
      total: rental["total"],
      rate: rental["rate"],
      status: rental["status"],
      billPeriod: rental["bill_period"],
      createdAt: rental["created_at"],
      updatedAt: rental["updated_at"]
    };
  }

  updateRental(id: string) {
    this.rentalService.updateRental(id).subscribe(rental => this.mappingRental(rental));
  }

  onSelect(room: Room): void {
    this.selectedRoom = room;
    this.getRentals(room.id);
  }
}
