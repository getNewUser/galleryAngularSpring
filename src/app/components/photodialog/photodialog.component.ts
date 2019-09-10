import { Component, Output, Inject,EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPhoto } from 'src/app/models/photo.model';
import { GalleryService } from 'src/app/services/gallery.service';
import { IFullPicture } from 'src/app/models/IFullPicture.model';


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
    private gallery: GalleryService) {
      this.getFullPicture(data.id);
    }

    deleteImage(){
      this.gallery.deleteImage(this.data.id)
      .subscribe(data => {
        console.log('deleted boys');
      })
    }


  
    getFullPicture(imageId: number){
      this.gallery.getFullPhoto(imageId)
      .subscribe(data => {
         this.fullPhoto = data;
      });
    }

  close(){
    this.dialogRef.close();
  }
}
