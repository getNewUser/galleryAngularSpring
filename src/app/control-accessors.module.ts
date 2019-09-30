import { TagsInputComponent } from './components/inputs/tags-input/tags-input.component';
import { CategoriesInputComponent } from './components/inputs/categories-input/categories-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { EmailInputComponent } from './components/inputs/email-input/email-input.component';
import { PasswordInputComponent } from './components/inputs/password-input/password-input.component';
import { NameInputWiderComponent } from './components/inputs/name-input-wider/name-input-wider.component';
import { NameInputComponent } from './components/inputs/name-input/name-input.component';
import { DescriptionInputComponent } from './components/inputs/description-input/description-input.component';
import { NgModule } from '@angular/core';
import { TagsCheckboxInputComponent } from './components/inputs/tags-checkbox-input/tags-checkbox-input.component';
import { SearchBoxInputComponent } from './components/inputs/search-box-input/search-box-input.component';

@NgModule({
  declarations: [
    EmailInputComponent,
    PasswordInputComponent,
    NameInputWiderComponent,
    NameInputComponent,
    DescriptionInputComponent,
    CategoriesInputComponent,
    TagsInputComponent,
    TagsCheckboxInputComponent,
    SearchBoxInputComponent
  ],
  imports: [FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [
    EmailInputComponent,
    PasswordInputComponent,
    NameInputWiderComponent,
    NameInputComponent,
    DescriptionInputComponent,
    CategoriesInputComponent,
    TagsInputComponent,
    TagsCheckboxInputComponent,
    SearchBoxInputComponent
  ]
})
export class ControlAccessorsModule {}
