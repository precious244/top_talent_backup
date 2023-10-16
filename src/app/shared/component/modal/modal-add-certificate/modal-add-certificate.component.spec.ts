import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddCertificateComponent } from './modal-add-certificate.component';

describe('ModalAddCertificateComponent', () => {
  let component: ModalAddCertificateComponent;
  let fixture: ComponentFixture<ModalAddCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddCertificateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
