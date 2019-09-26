import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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


@NgModule({
  imports: [
    CommonModule,
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
    MaterialFileInputModule
  ],
  exports: [
    CommonModule,
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
    MaterialFileInputModule
  ]
})
export class MaterialModule {}
