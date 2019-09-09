import { AddComponent } from './views/add/add.component';
import { GalleryComponent } from './views/gallery/gallery.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateComponent } from './views/update/update.component';

const routes: Routes = [
  { path: '', component: GalleryComponent },
  { path: 'update/:id', component: UpdateComponent },
  { path: 'add', component: AddComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
