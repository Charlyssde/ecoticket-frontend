import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTycComponent } from './modal-tyc.component';

describe('ModalTycComponent', () => {
  let component: ModalTycComponent;
  let fixture: ComponentFixture<ModalTycComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTycComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
