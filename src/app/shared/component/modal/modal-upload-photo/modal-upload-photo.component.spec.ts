import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUploadPhotoComponent } from './modal-upload-photo.component';

describe('ModalUploadPhotoComponent', () => {
  let component: ModalUploadPhotoComponent;
  let fixture: ComponentFixture<ModalUploadPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUploadPhotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUploadPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
