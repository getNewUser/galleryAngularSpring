import { Component, OnInit, Input } from '@angular/core';
import { IPhoto } from '../models/photo.model';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { PhotodialogComponent } from '../components/photodialog/photodialog.component';
import { GalleryService } from '../services/gallery.service';


@Component({
  selector: "app-photo",
  templateUrl: "./photo.component.html",
  styleUrls: ["./photo.component.scss"]
})
export class PhotoComponent implements OnInit {
  @Input() photo: IPhoto;


  openDialog() {
    // this.gallery.getFullPhoto(this.photo.id)
    //   .then(data => {
    //    this.fullphoto = data.picture;
    //   });

    const dialogConfig = new MatDialogConfig();


    this.dialog.open(PhotodialogComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: true,
      data:  this.photo
      
    });
  }

  constructor(private gallery: GalleryService, private dialog: MatDialog) {}

  ngOnInit() {}
}
