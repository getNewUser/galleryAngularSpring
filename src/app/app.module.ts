import { FilterCategoriesService } from './services/filterTagsCategories.service';
import { PhotodialogComponent } from './components/dialogs/photodialog/photodialog.component';
import { PhotoComponent } from './components/photo/photo.component';
import { GalleryService } from './services/gallery.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GalleryComponent } from './views/gallery/gallery.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule} from '@angular/material/chips';
import { ItemCountPipe } from './pipes/item-count.pipe';
import { AddComponent } from './views/add/add.component';
import { UpdateComponent } from './views/update/update.component';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input'



import { MatButtonModule,
         MatSelectModule,
          } from '@angular/material';





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
  providers: [GalleryService,
              FilterCategoriesService],
  bootstrap: [AppComponent],
  entryComponents: [PhotodialogComponent]
})
export class AppModule { }
