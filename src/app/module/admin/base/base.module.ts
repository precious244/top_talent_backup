import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseRoutingModule } from './base-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BaseComponent } from './base.component';


@NgModule({
  declarations: [
    BaseComponent
  ],
  imports: [
    CommonModule,
    BaseRoutingModule,
    SharedModule
  ]
})
export class BaseModule { }
