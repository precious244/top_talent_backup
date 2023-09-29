import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyComponent } from './apply.component';
import { ScreeningQuestionComponent } from '../screening-question/screening-question.component';

const routes: Routes = [
  {
    path: "",
    component: ApplyComponent
  },
  {
    path: "screening-question",
    component: ScreeningQuestionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplyRoutingModule { }
