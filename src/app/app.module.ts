import { PhotoComponent } from './components/photo/photo.component';


import { HttpClient } from '@angular/common/http';
import { GalleryService } from './services/gallery.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GalleryComponent } from './views/gallery/gallery.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PhotodialogComponent } from './components/photodialog/photodialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatChipsModule} from '@angular/material/chips';
import { ItemCountPipe } from './pipes/item-count.pipe';
import { AddComponent } from './views/add/add.component';
import { UpdateComponent } from './views/update/update.component';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input'





@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    PhotoComponent,
    PhotodialogComponent,
    ItemCountPipe,
    AddComponent,
    UpdateComponent
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
    MatInputModule
  ],
  providers: [GalleryService],
  bootstrap: [AppComponent],
  entryComponents: [PhotodialogComponent]
})
export class AppModule { }
