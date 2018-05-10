import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDetailEditComponent } from './room-detail-edit.component';

describe('RoomDetailEditComponent', () => {
  let component: RoomDetailEditComponent;
  let fixture: ComponentFixture<RoomDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
