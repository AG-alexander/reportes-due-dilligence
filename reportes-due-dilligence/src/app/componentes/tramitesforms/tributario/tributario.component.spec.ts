import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TributarioComponent } from './tributario.component';

describe('TributarioComponent', () => {
  let component: TributarioComponent;
  let fixture: ComponentFixture<TributarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TributarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TributarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
