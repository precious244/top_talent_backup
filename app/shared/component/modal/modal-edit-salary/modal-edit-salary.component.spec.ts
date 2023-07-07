import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditSalaryComponent } from './modal-edit-salary.component';

describe('ModalEditSalaryComponent', () => {
  let component: ModalEditSalaryComponent;
  let fixture: ComponentFixture<ModalEditSalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditSalaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
