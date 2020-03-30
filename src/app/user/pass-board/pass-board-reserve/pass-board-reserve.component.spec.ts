import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassBoardReserveComponent } from './pass-board-reserve.component';

describe('PassBoardReserveComponent', () => {
  let component: PassBoardReserveComponent;
  let fixture: ComponentFixture<PassBoardReserveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassBoardReserveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassBoardReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
