import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/pages/auth/auth.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  { path: 'inicio', pathMatch: 'full', canActivate: [ AuthGuard ], loadChildren: './dashboard/dashboard.module#DashboardModule' },
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'entrar', component: LoginComponent },
      { path: 'registrar-se', component: RegisterComponent },
      { path: '**', redirectTo: 'entrar' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
