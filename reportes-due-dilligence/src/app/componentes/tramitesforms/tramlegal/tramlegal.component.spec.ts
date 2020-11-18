import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TramlegalComponent } from './tramlegal.component';

describe('TramlegalComponent', () => {
  let component: TramlegalComponent;
  let fixture: ComponentFixture<TramlegalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TramlegalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TramlegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
