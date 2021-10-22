import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnospacienteComponent } from './turnospaciente.component';

describe('TurnospacienteComponent', () => {
  let component: TurnospacienteComponent;
  let fixture: ComponentFixture<TurnospacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnospacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnospacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
