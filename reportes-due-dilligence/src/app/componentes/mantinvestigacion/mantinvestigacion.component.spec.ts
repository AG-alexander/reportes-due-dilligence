import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantinvestigacionComponent } from './mantinvestigacion.component';

describe('MantinvestigacionComponent', () => {
  let component: MantinvestigacionComponent;
  let fixture: ComponentFixture<MantinvestigacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantinvestigacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantinvestigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
