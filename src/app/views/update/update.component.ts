import { Subscription } from 'rxjs';
import { GalleryService } from 'src/app/services/gallery.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPhoto, ICategory } from 'src/app/models';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  id: number;
  photo: IPhoto;
  photoTemplate: IPhoto;
  categories: ICategory[] = [];
  selectedCategories: number[] = [];
  preselectedCategories: ICategory[] = [];
  fullPhoto: string;
  imgurl: string;
  isTagsEmpty = false;
  allTags: string[] = [];
  tags: string[] = [];

  name = '';
  description = '';

  constructor(
    private route: ActivatedRoute,
    private gallery: GalleryService,
    private snackBar: MatSnackBar,
    private router: Router,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.loadPhoto(this.id);
    this.loadCategories();
    this.getFullPhoto(this.id);
  }

  onSubmit(f, action: string) {
    if (this.tags.length < 1) {
      this.isTagsEmpty = true;
    }
    if (f.valid === true && this.name !== '' && this.description !== '') {
      this.photo = f.value;
      this.photo.id = this.photoTemplate.id;
      this.photo.thumbnail = this.photoTemplate.thumbnail;
      this.photo.width = this.photoTemplate.width;
      this.photo.height = this.photoTemplate.height;
      this.photo.date = this.photoTemplate.date;
      if (this.photo.name === '') {
        this.photo.name = this.photoTemplate.name;
      }
      if (this.photo.description === '') {
        this.photo.description = this.photoTemplate.description;
      }
      if (this.photo.categories.length < 1) {
        this.photo.categories = this.photoTemplate.categories;
      }
      this.gallery.updateImage(this.photo);
      this.snackBar.open('Image updated', action, { duration: 2000 });
      this.router.navigate(['']);
    } else {
      this.snackBar.open('Something went wrong', action, { duration: 2000 });
    }
  }

  private getFullPhoto(imageId: number): Subscription {
    return this.gallery.getFullPhoto(imageId).subscribe(data => {
      this.fullPhoto = data.picture;
      this.imgurl = 'data:image/jpg;base64,' + this.fullPhoto;
    });
  }

  private loadPhoto(imageId: number): Subscription {
    return this.gallery.getPhoto(imageId).subscribe(data => {
      this.photo = data;
      this.photoTemplate = data;

      for (let tag of data.tags) {
        this.tags.push(tag.name);
      }

      for (let category of data.categories) {
        this.preselectedCategories.push(category);
      }
      this.name = data.name;
      this.description = data.description;
    });
  }

  private loadCategories(): Subscription {
    return this.gallery.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  ngOnDestroy() {
    this.loadCategories().unsubscribe();
  }
}
