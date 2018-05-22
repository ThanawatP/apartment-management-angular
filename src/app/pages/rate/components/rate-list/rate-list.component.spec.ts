import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateListComponent } from './rate-list.component';

describe('RateListComponent', () => {
  let component: RateListComponent;
  let fixture: ComponentFixture<RateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
