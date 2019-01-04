import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SecurityIndicatorComponent } from './components/security-indicator/security-indicator.component';

@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent, SecurityIndicatorComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [AuthComponent]
})
export class AuthModule { }
