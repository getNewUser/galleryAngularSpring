import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '',loadChildren: () => import('./views/gallery/gallerymodule.module').then(mod => mod.GallerymoduleModule) },
  { path: 'update/:id', loadChildren: () => import('./views/update/update.module').then(mod => {
    return mod.UpdateModule;
  })},
  { path: 'login', loadChildren: () => import('./views/login/login.module').then(mod => mod.LoginModule) },
  { path: 'signup', loadChildren: () => import('./views/signup/signup.module').then(mod => mod.SignupModule) },
  { path: 'add', loadChildren: () => import('./views/add/add.module').then(mod => {
    return mod.AddModule;
  }), canActivate: [AuthGuard] }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
