import { DirectivesModule } from './../../directives/directives.module';
import { SignupRoutingModule } from './signup-routing.module';
import { MustMatchDirective } from './../../directives/must-match.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../material.module';
import { AuthService } from 'src/app/services/auth.service';
import { SignupComponent } from './signup.component';
import { ControlAccessorsModule } from './../../control-accessors.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [SignupComponent, MustMatchDirective],
  imports: [
    CommonModule,
    ControlAccessorsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SignupRoutingModule,
    DirectivesModule
  ],
  providers: [AuthService]
})
export class SignupModule {}
