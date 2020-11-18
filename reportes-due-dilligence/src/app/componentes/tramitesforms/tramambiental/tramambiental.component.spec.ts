import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TramambientalComponent } from './tramambiental.component';

describe('TramambientalComponent', () => {
  let component: TramambientalComponent;
  let fixture: ComponentFixture<TramambientalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TramambientalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TramambientalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
