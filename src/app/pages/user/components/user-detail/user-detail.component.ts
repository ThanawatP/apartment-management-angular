import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../../shared/models/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Input() user: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
      .subscribe(user => this.mapping(user));
  }

  mapping(user: Object): void {
    this.user =  {
      id: user["_id"],
      name: user["name"],
      birthDate: user["birth_date"],
      roomId: user["room_id"]
    };
    this.userService.user = this.user;
  }

  goBack(): void {
    this.location.back();
  }
}
