import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UiUxComponent } from './ui-ux/ui-ux.component';
import { WebDevelopmentComponent } from './web-development/web-development.component';


@NgModule({
  declarations: [
    EventsComponent,
    UiUxComponent,
    WebDevelopmentComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    SharedModule
  ]
})
export class EventsModule { }
