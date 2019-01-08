import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './dashboard/pages/home/home.component';
import { AuthComponent } from './auth/pages/auth/auth.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'entrar', component: LoginComponent },
      { path: 'entrar/:id', component: LoginComponent },
      { path: 'registrar-se', component: RegisterComponent },
      { path: '**', redirectTo: '' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
