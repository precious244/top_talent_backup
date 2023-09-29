import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScreeningQuestionRoutingModule } from './screening-question-routing.module';
import { ScreeningQuestionComponent } from './screening-question.component';


@NgModule({
  declarations: [
    ScreeningQuestionComponent
  ],
  imports: [
    CommonModule,
    ScreeningQuestionRoutingModule
  ]
})
export class ScreeningQuestionModule { }
