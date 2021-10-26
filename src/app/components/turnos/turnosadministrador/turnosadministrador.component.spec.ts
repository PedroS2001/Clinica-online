import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosadministradorComponent } from './turnosadministrador.component';

describe('TurnosadministradorComponent', () => {
  let component: TurnosadministradorComponent;
  let fixture: ComponentFixture<TurnosadministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosadministradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosadministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
