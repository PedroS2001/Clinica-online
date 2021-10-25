import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarturnoComponent } from './solicitarturno.component';

describe('SolicitarturnoComponent', () => {
  let component: SolicitarturnoComponent;
  let fixture: ComponentFixture<SolicitarturnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitarturnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarturnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
