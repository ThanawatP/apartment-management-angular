import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user';
import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from '../../shared/services/http.service';

@Injectable()
export class UserService {
  private _user = new BehaviorSubject<User>(new User());
  private _users = new BehaviorSubject<User[]>([]);
  private _roomTerm = new BehaviorSubject<string>("");

  constructor(private _httpService: HttpService) { }

  // user
  get user$() {
    return this._user.asObservable();
  }

  get user() {
    return this._user.value;
  }

  set user(newUser: User) {
    this._user.next(newUser);
  }

  // users
  get users$() {
    return this._users.asObservable();
  }

  get users() {
    return this._users.value;
  }

  set users(users: User[]) {
    this._users.next(users);
  }

  // roomTerm
  get roomTerm$() {
    return this._roomTerm.asObservable();
  }

  get roomTerm() {
    return this._roomTerm.value;
  }

  set roomTerm(roomTerm: string) {
    this._roomTerm.next(roomTerm);
  }

  getUsers(page: Number, roomTerm?: string): Observable<Object> {
    let path = `/users?page=${page}`;
    if (roomTerm) {
      path = `${path}&room_term=${roomTerm}`;
    }
    return this._httpService.GET(path);
  }

  getUser(id: string): Observable<Object> {
    return this._httpService.GET(`/user/${id}`);
  }

  updateUser(user: User): Observable<any> {
    let body = new HttpParams();
    body = body.set('room_id', user.roomId)
    if (user.phoneNumber) {
      body = body.set('phone_number', user.phoneNumber);
    }
    return this._httpService.POST_FORM(`/user/${user.id}`, body)
  }

  addUser(user: User): Observable<Object> {
    let body = new HttpParams()
      .set('user_id', user.id)
      .set('username', user.name);
    return this._httpService.POST_FORM('/user', body);
  }
}