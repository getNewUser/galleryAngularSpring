import { AuthService } from './services/auth.service';
import { FilterCategoriesService } from './services/filterTagsCategories.service';
import { PhotodialogComponent } from './components/dialogs/photodialog/photodialog.component';
import { PhotoComponent } from './components/photo/photo.component';
import { GalleryService, } from './services/gallery.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GalleryComponent } from './views/gallery/gallery.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule,
         MatProgressSpinnerModule,
         MatChipsModule,
         MatDialogModule,
         MatToolbarModule,
         MatIconModule,
         MatTooltipModule,
         MatButtonModule,
         MatSelectModule,} from '@angular/material/';
import { ItemCountPipe } from './pipes/item-count.pipe';
import { AddComponent } from './views/add/add.component';
import { UpdateComponent } from './views/update/update.component';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './components/login/login.component';





@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    PhotoComponent,
    PhotodialogComponent,
    ItemCountPipe,
    AddComponent,
    UpdateComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatSelectModule
  ],
  providers: [GalleryService,
              FilterCategoriesService,
              AuthService,
              CookieService],
  bootstrap: [AppComponent],
  entryComponents: [PhotodialogComponent]
})
export class AppModule { }