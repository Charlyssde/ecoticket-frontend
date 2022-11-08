import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudPacComponent } from './solicitud-pac.component';

describe('SolicitudPacComponent', () => {
  let component: SolicitudPacComponent;
  let fixture: ComponentFixture<SolicitudPacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudPacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudPacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
