import { FilterCategoriesService } from './../../services/filterTagsCategories.service';
import { GalleryService } from './../../services/gallery.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { IPhoto, ITag, ICategory } from 'src/app/models';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {
  id: number;
  photo: IPhoto;
  photoTemplate: IPhoto;
  categories: ICategory[] = [];
  selectedCategories: number[] = [];
  selectedTags: number[] = [];
  fullPicture: string;
  shownPicture: string = '../../../assets/noimage2.png';
  isTagsEmpty = false;
  allTags: string[] = [];
  tags: string[] = [];
  tagsToReturn: ITag[] = [];
  tagsFromService: ITag[] = [];

  SERVER_URL = 'http://localhost:8080/images';
  noTags: boolean = true;

  name = 'Name..';
  description = 'Description..';

  constructor(
    private gallery: GalleryService,
    private httpClient: HttpClient,
    private filter: FilterCategoriesService,
    private snackBar: MatSnackBar,
    private router: Router,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.loadCategories();
  }
  picked(event: any): void {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.handleInputChange(file);
    }
  }

  handleInputChange(files): void {
    var file = files;
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onloadend = this.handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  handleReaderLoaded(e): void {
    let reader = e.target;
    let base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    this.shownPicture = 'data:image/jpg;base64,' + base64result;
    this.fullPicture = base64result;
  }

  onSubmit(f, action: string): void {
    if (this.tags.length < 1) {
      this.isTagsEmpty = true;
      return;
    }
    this.isTagsEmpty = false;
    this.noTags = false;
    this.photo = f.value;
    this.photo.thumbnail = this.fullPicture;
    this.httpClient
      .post<any>('http://localhost:8080/images', this.photo)
      .subscribe(
        () => {
          this.snackBar.open('Image added successfully', action, {
            duration: 2000
          });
          this.router.navigate(['']);
        },
        err => {
          this.snackBar.open('Something went wrong..', action, {
            duration: 2000
          });
        }
      );
  }

  public filterCategories(category: number): void {
    this.filter.filter(category, this.selectedCategories);
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
