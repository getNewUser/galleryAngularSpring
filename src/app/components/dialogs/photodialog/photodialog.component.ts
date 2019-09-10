import { Component, Output, Inject, EventEmitter } from '@angular/core';
import { IFullPicture, IPhoto } from 'src/app/models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GalleryService } from 'src/app/services/gallery.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-photodialog',
  templateUrl: './photodialog.component.html',
  styleUrls: ['./photodialog.component.scss']
})
export class PhotodialogComponent {
  fullPhoto: IFullPicture;

  @Output() submitClicked = new EventEmitter<any>();

  constructor(
    public dialogRef: MatDialogRef<PhotodialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPhoto,
    private gallery: GalleryService
  ) {
    this.getFullPicture(data.id);
  }

  deleteImage(): Subscription {
    return this.gallery.deleteImage(this.data.id).subscribe(data => {
      console.log(data);
    });
  }

  private getFullPicture(imageId: number): Subscription {
    return this.gallery.getFullPhoto(imageId).subscribe(data => {
      this.fullPhoto = data;
    });
  }

  close() {
    this.dialogRef.close();
  }
}
