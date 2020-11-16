import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TramitesComponent } from './tramites.component';

describe('TramitesComponent', () => {
  let component: TramitesComponent;
  let fixture: ComponentFixture<TramitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TramitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TramitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
