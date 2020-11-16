import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManttramiteComponent } from './manttramite.component';

describe('ManttramiteComponent', () => {
  let component: ManttramiteComponent;
  let fixture: ComponentFixture<ManttramiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManttramiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManttramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
