import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopograficoComponent } from './topografico.component';

describe('TopograficoComponent', () => {
  let component: TopograficoComponent;
  let fixture: ComponentFixture<TopograficoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopograficoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopograficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
