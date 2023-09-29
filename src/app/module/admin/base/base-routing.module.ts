import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base.component';
import { JobFindComponent } from '../job-find/job-find.component';
import { JobDetailComponent } from '../job-detail/job-detail.component';
import { EventsComponent } from '../events/events.component';

const routes: Routes = [{
  path: '',
  component: BaseComponent,
}, {
  path: 'job-find',
  component: JobFindComponent
}, {
  path: "detail/:id",
  component: JobDetailComponent
}, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule { }
