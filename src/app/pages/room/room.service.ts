import { Injectable } from '@angular/core';
import { Room } from '../../shared/models/room';
import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from '../../shared/services/http.service';

@Injectable()
export class RoomService {
  private _room = new BehaviorSubject<Room>(new Room());
  private _rooms = new BehaviorSubject<Room[]>([]);
  private _term = new BehaviorSubject<string>("");

  constructor(private _httpService: HttpService) { }

  // room
  get room$() {
    return this._room.asObservable();
  }

  get room() {
    return this._room.value;
  }

  set room(newRoom: Room) {
    this._room.next(newRoom);
  }

  // room
  get rooms$() {
    return this._rooms.asObservable();
  }

  get rooms() {
    return this._rooms.value;
  }

  set rooms(rooms: Room[]) {
    this._rooms.next(rooms);
  }

  // term
  get term$() {
    return this._term.asObservable();
  }

  get term() {
    return this._term.value;
  }

  set term(term: string) {
    this._term.next(term);
  }

  getAllRooms(term?: string): Observable<Object[]> {
    let path = `/rooms/all`;
    if (term) {
      path = `${path}?term=${term}`;
    }
    return this._httpService.GET(path);
  }

  getRooms(page: Number, term?: string): Observable<Object> {
    let path = `/rooms?page=${page}`;
    if (term) {
      path = `${path}&term=${term}`;
    }
    return this._httpService.GET(path);
  }

  getAvailableRooms(): Observable<Object[]> {
    return this._httpService.GET('/rooms/available');
  }

  getRoom(id: string): Observable<Object> {
    return this._httpService.GET(`/room/${id}`);
  }

  updateRoom(room: Room): Observable<any> {
    const body = new HttpParams()
      .set('rates', `${room.rates}`);
    return this._httpService.POST_FORM(`/room/${room.id}`, body);
  }

  addRoom(room: Room): Observable<Object> {
    const body = new HttpParams()
      .set('room_id', room.id)
      .set('rates', `${room.rates}`);
    return this._httpService.POST_FORM('/room', body);
  }
}
