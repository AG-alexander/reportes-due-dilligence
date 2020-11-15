import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantclienteComponent } from './mantcliente.component';

describe('MantclienteComponent', () => {
  let component: MantclienteComponent;
  let fixture: ComponentFixture<MantclienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantclienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
