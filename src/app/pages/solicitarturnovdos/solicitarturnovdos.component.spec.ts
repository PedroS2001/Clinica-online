import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarturnovdosComponent } from './solicitarturnovdos.component';

describe('SolicitarturnovdosComponent', () => {
  let component: SolicitarturnovdosComponent;
  let fixture: ComponentFixture<SolicitarturnovdosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitarturnovdosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarturnovdosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
