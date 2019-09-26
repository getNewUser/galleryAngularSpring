import { AuthGuard } from './guards/auth.guard';
import { AddComponent } from './views/add/add.component';
import { GalleryComponent } from './views/gallery/gallery.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateComponent } from './views/update/update.component';
import { LoginComponent } from './views/login/login.component';
import { SignupComponent } from './views/signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  // { path: 'home',loadChildren: () => import('./views/gallery/gallery.module').then(mod => mod.GalleryModule) },
  { path: 'home', component: GalleryComponent },
  { path: 'update/:id', component: UpdateComponent },
  { path: 'add', component: AddComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
