import { GalleryComponent } from './views/gallery/gallery.component';
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
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemCountPipe } from './pipes/item-count.pipe';
import { AddComponent } from './views/add/add.component';
import { UpdateComponent } from './views/update/update.component';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { StartsWithCapitalPipe } from './pipes/starts-with-capital.pipe';
import { SignupComponent } from './views/signup/signup.component';
import { JwtModule } from '@auth0/angular-jwt';
import { MustMatchDirective } from './directives/must-match.directive';
import { NameInputComponent } from './components/inputs/name-input/name-input.component';
import { EmailInputComponent } from './components/inputs/email-input/email-input.component';
import { PasswordInputComponent } from './components/inputs/password-input/password-input.component';
import { DescriptionInputComponent } from './components/inputs/description-input/description-input.component';



import {
  MatDialogModule,
  MatCardModule,
  MatButtonModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatChipsModule,
  MatInputModule,
  MatToolbarModule,
  MatIconModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatAutocompleteModule,
  MatCheckboxModule,
} from '@angular/material';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { NameInputWiderComponent } from './components/inputs/name-input-wider/name-input-wider.component';




@NgModule({
  declarations: [
    AppComponent,
    PhotoComponent,
    PhotodialogComponent,
    ItemCountPipe,
    AddComponent,
    UpdateComponent,
    LoginComponent,
    HeaderComponent,
    StartsWithCapitalPipe,
    SignupComponent,
    MustMatchDirective,
    GalleryComponent,
    NameInputComponent,
    EmailInputComponent,
    PasswordInputComponent,
    DescriptionInputComponent,
    NameInputWiderComponent
  ],
  imports: [
    MatAutocompleteModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatCardModule,
    MatChipsModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatCheckboxModule,
    MaterialFileInputModule,


    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
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
    })
  ],
  providers: [GalleryService,
              FilterCategoriesService,
              AuthService,
              CookieService],
  bootstrap: [AppComponent],
  entryComponents: [PhotodialogComponent]
})
export class AppModule { }