import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobFindRoutingModule } from './job-find-routing.module';
import { JobFindComponent } from './job-find.component';
import { CurrencyFormat } from './job-find.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    JobFindComponent,
    CurrencyFormat
  ],
  imports: [
    CommonModule,
    JobFindRoutingModule,
    SharedModule
  ]
})
export class JobFindModule { }
