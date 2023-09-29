import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { EventsComponent } from '../../admin/events/events.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },  {
    path: "events",
    component: EventsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
