import { GalleryComponent } from './gallery.component';
import { GalleryService } from 'src/app/services/gallery.service';
import { NgModule } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { GalleryRoutingModule } from './gallery-routing.module';
import { CommonModule } from "@angular/common";




@NgModule({
  declarations: [ GalleryComponent ],
  imports: [
    GalleryRoutingModule,
    CommonModule
  ],
  providers: [
    GalleryService,
    AuthService
  ]
})
export class GalleryModule { }
