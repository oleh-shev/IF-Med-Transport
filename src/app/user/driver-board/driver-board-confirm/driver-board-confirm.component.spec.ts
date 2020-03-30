import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverBoardConfirmComponent } from './driver-board-confirm.component';

describe('DriverBoardConfirmComponent', () => {
  let component: DriverBoardConfirmComponent;
  let fixture: ComponentFixture<DriverBoardConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverBoardConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverBoardConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
