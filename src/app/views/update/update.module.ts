import { AuthService } from 'src/app/services/auth.service';
import { UpdateRoutingModule } from './update-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../material.module';
import { ControlAccessorsModule } from './../../control-accessors.module';
import { UpdateComponent } from './update.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ UpdateComponent],
  imports: [
    CommonModule,
    ControlAccessorsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    UpdateRoutingModule
  ],
  providers: [
    AuthService
  ]
})
export class UpdateModule { }
