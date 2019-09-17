import { AuthService } from './../../../services/auth.service';
import { Component, Output, Inject, EventEmitter } from '@angular/core';
import { IFullPicture, IPhoto } from 'src/app/models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GalleryService } from 'src/app/services/gallery.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isObject } from 'util';

@Component({
  selector: 'app-photodialog',
  templateUrl: './photodialog.component.html',
  styleUrls: ['./photodialog.component.scss']
})
export class PhotodialogComponent {
  fullPhoto: IFullPicture;
  imgurl: string ='';
  snackbarText: string;

  @Output() submitClicked = new EventEmitter<any>();

  constructor(
    public dialogRef: MatDialogRef<PhotodialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPhoto,
    private gallery: GalleryService,
    private snackBar: MatSnackBar,
    public auth: AuthService
  ) {
    this.getFullPicture(data.id);
  }

  deleteImage(message, action): Subscription {
    if(!this.auth.isAdmin()){
      this.snackBar.open('Only admins can delete images', action, { duration: 2000});
      return;
    }
    return this.gallery.deleteImage(this.data.id).subscribe(data => {
      location.reload();
    });
  }

  private getFullPicture(imageId: number): Subscription {
    return this.gallery.getFullPhoto(imageId).subscribe(data => {
      this.fullPhoto = data;
      this.imgurl = 'data:image/jpg;base64,' + this.fullPhoto.picture;
    });
  }

  close() {
    this.dialogRef.close();
  }
}
