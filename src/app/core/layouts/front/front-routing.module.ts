import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/login.guard';
import { FrontLayoutComponent } from './front-layout/front-layout.component';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: FrontLayoutComponent,
    children: [

      {
        path: '',
        canActivate: [LoginGuard],
        loadChildren: () => import('../../../module/front/home/home.module').then((x) => x.HomeModule)
      },
      {
        path: 'login',
        canActivate: [LoginGuard],
        loadChildren: () => import('../../../module/front/login/login.module').then((x) => x.LoginModule)
      },
      {
        path: 'sign-up',
        canActivate: [LoginGuard],
        loadChildren: () => import('../../../module/front/sign-up/sign-up.module').then((x) => x.SignUpModule)
      },
      // {
      //   path: 'events',
      //   canActivate: [AuthGuard],
      //   loadChildren: () => import('../../../module/admin/events/events.module').then((x) => x.EventsModule)
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontRoutingModule { }
