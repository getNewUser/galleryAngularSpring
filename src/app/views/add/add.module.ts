import { GalleryService } from './../../services/gallery.service';
import { ControlAccessorsModule } from './../../control-accessors.module';
import { AddComponent } from './add.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../../material.module';
import { routes, AddRoutingModule } from './add-routing.module';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [ AddComponent],
  imports: [
    RouterModule.forChild(routes),
    RouterModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ControlAccessorsModule,
    AddRoutingModule
  ],
  providers: [
    GalleryService
  ]
})
export class AddModule { }
