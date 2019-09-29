import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../material.module';
import { ControlAccessorsModule } from './../../control-accessors.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  declarations: [ LoginComponent ],
  imports: [
    CommonModule,
    ControlAccessorsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule
  ], 
  providers: [
    AuthService
  ]
})
export class LoginModule { }
