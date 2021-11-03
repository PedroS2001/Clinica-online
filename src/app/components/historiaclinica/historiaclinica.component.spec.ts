import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaclinicaComponent } from './historiaclinica.component';

describe('HistoriaclinicaComponent', () => {
  let component: HistoriaclinicaComponent;
  let fixture: ComponentFixture<HistoriaclinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriaclinicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriaclinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
