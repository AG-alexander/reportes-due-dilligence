import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigacionComponent } from './investigacion.component';

describe('InvestigacionComponent', () => {
  let component: InvestigacionComponent;
  let fixture: ComponentFixture<InvestigacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestigacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
