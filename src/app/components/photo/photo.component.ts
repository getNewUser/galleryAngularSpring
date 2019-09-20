import { GalleryService } from './../../services/gallery.service';
import { IPhoto } from 'src/app/models/photo.model';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PhotodialogComponent } from '../dialogs/photodialog/photodialog.component';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  @Input() photo: IPhoto;

  constructor(private gallery: GalleryService, private dialog: MatDialog) {}

  ngOnInit() {}

  openDialog() {
    // const dialogConfig = new MatDialogConfig();

    this.dialog.open(PhotodialogComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: true,
      data: this.photo
    });
  }
}
