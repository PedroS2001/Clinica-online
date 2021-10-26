import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesturnoComponent } from './detallesturno.component';

describe('DetallesturnoComponent', () => {
  let component: DetallesturnoComponent;
  let fixture: ComponentFixture<DetallesturnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesturnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesturnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
