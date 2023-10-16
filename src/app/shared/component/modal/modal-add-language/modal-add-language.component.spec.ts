import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddLanguageComponent } from './modal-add-language.component';

describe('ModalAddLanguageComponent', () => {
  let component: ModalAddLanguageComponent;
  let fixture: ComponentFixture<ModalAddLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddLanguageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
