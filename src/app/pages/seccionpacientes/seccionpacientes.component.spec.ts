import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionpacientesComponent } from './seccionpacientes.component';

describe('SeccionpacientesComponent', () => {
  let component: SeccionpacientesComponent;
  let fixture: ComponentFixture<SeccionpacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeccionpacientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccionpacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
