import { Component, OnInit } from '@angular/core';
import { User } from '../../../../shared/models/user';
import { UserService } from '../../user.service';
import { Observable, Subject } from 'rxjs';
import { tap, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];
  user: User;
  pageCount: Number[];
  currentPage: Number = 1;
  roomTerm: string

  constructor(private userService: UserService) {
    this.user = new User();
  }

  ngOnInit() {
    this.search(this.userService.roomTerm)
  }

  search(term: string): void {
    this.roomTerm = term
    this.userService.roomTerm = term
    this.userService.roomTerm$.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((roomTerm: string) => this.userService.getUsers(this.currentPage, roomTerm)),
    ).subscribe(users => this.mapping(users))
  }

  getUsers(page: Number, roomTerm?: string): void {
    this.userService.getUsers(page, roomTerm).subscribe(users => this.mapping(users));
    this.currentPage = page
    console.log(`currentpage = ${this.currentPage}`)
  }

  mapping(data: Object): void {
    let temps: User[] = [];
    if (data["total"] != 0) {
      console.log(Math.ceil(data["total"] / 10) + 1)
      this.pageCount = Array(Math.floor(data["total"] / 10) + 1).fill(null).map((x, i) => i + 1)
      console.log(this.pageCount)
    } else {
      this.pageCount = []
    }
    for (let user of data["data"] as Object[]) {
      console.log(user)
      let mappedUser: User = {
        id: user["_id"],
        name: user["name"],
        birthDate: user["birth_date"],
        roomId: user["room_id"]
      }
      temps.push(mappedUser);
    }
    this.users = temps;
    this.userService.users = this.users;
  }
}
