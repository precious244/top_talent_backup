import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditCertificateComponent } from './modal-edit-certificate.component';

describe('ModalEditCertificateComponent', () => {
  let component: ModalEditCertificateComponent;
  let fixture: ComponentFixture<ModalEditCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditCertificateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
