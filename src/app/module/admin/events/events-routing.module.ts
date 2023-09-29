import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events.component';
import { UiUxComponent } from './ui-ux/ui-ux.component';
import { JobFindComponent } from '../job-find/job-find.component';
import { WebDevelopmentComponent } from './web-development/web-development.component';

const routes: Routes = [{
  path: '',
  component: EventsComponent,
}, {
  path: 'ui-ux',
  component: UiUxComponent
}, {
  path: 'web-development-101',
  component: WebDevelopmentComponent
  },
 {
  path: 'job-find',
  component: JobFindComponent
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
