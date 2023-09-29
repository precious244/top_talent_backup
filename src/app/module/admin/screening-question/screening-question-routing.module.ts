import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScreeningQuestionComponent } from './screening-question.component';

const routes: Routes = [
  {
    path:'',
    component: ScreeningQuestionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScreeningQuestionRoutingModule { }
