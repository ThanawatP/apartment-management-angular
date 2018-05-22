import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateDetailEditComponent } from './rate-detail-edit.component';

describe('RateDetailEditComponent', () => {
  let component: RateDetailEditComponent;
  let fixture: ComponentFixture<RateDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
