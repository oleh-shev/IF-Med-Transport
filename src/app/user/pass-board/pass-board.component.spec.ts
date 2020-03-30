import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassBoardComponent } from './pass-board.component';

describe('PassBoardComponent', () => {
  let component: PassBoardComponent;
  let fixture: ComponentFixture<PassBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
