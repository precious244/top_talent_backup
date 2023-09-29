import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreeningQuestionComponent } from './screening-question.component';

describe('ScreeningQuestionComponent', () => {
  let component: ScreeningQuestionComponent;
  let fixture: ComponentFixture<ScreeningQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreeningQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreeningQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
