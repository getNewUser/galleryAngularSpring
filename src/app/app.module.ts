import { MatchValueDirective } from './directives/match-value.directive';
import { LoginComponent } from './views/login/login.component';
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
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { StartsWithCapitalPipe } from './pipes/starts-with-capital.pipe';
import { SignupComponent } from './views/signup/signup.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { JwtModule } from '@auth0/angular-jwt';
import { MatSnackBarModule } from '@angular/material/snack-bar';






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
    HeaderComponent,
    StartsWithCapitalPipe,
    SignupComponent,
    MatchValueDirective,
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
    MatSelectModule,
    MaterialFileInputModule,
    NgbModule,
    MatCheckboxModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
          function getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i <ca.length; i++) {
              var c = ca[i];
              while (c.charAt(0) == ' ') {
                c = c.substring(1);
              }
              if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
              }
            }
            return "";
          }

        return getCookie('Cookie')},
        whitelistedDomains: ['localhost:8080'],
        blacklistedRoutes: ['http://localhost:8080/api/auth/signup',
                            'http://localhost:8080/api/auth/signin']
      }
    }),
    MatSnackBarModule
  ],
  providers: [GalleryService,
              FilterCategoriesService,
              AuthService,
              CookieService],
  bootstrap: [AppComponent],
  entryComponents: [PhotodialogComponent]
})
export class AppModule { }