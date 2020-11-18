import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TramariesgosComponent } from './tramariesgos.component';

describe('TramariesgosComponent', () => {
  let component: TramariesgosComponent;
  let fixture: ComponentFixture<TramariesgosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TramariesgosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TramariesgosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
