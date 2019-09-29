import { GalleryRoutingModule } from './../gallery/gallery-routing.module';
import { AddModule } from './../add/add.module';
import { ControlAccessorsModule } from './../../control-accessors.module';
import { ItemCountPipe } from './../../pipes/item-count.pipe';
import { FormsModule } from '@angular/forms';
import { PhotoComponent } from './../../components/photo/photo.component';
import { GalleryComponent } from './gallery.component';
import { RouterModule } from '@angular/router';
import { routes} from './gallery-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../../material.module';





@NgModule({
  declarations: [GalleryComponent, PhotoComponent, ItemCountPipe],
  imports: [
    RouterModule.forChild(routes),
    RouterModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ControlAccessorsModule,
    GalleryRoutingModule
  ]
})
export class GallerymoduleModule { }
