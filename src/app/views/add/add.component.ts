import { FilterCategoriesService } from './../../services/filterTagsCategories.service';
import { GalleryService } from './../../services/gallery.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { IPhoto, ITag, ICategory } from 'src/app/models';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {
  id: number;
  photo: IPhoto;
  photoTemplate: IPhoto;
  tags: ITag[] = [];
  categories: ICategory[] = [];
  selectedCategories: number[] = [];
  selectedTags: number[] = [];
  fullPicture: string;
  shownPicture: string = '../../../assets/noimage2.png';

  SERVER_URL = 'http://localhost:8080/images';
  uploadForm: FormGroup;

  constructor(
    private gallery: GalleryService,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private filter: FilterCategoriesService
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.loadTags();
    this.uploadForm = this.formBuilder.group({
      file: ['']
    });
  }

  picked(event): void {
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

  onSubmit(f: NgForm): void {
    this.photo = f.value;
    this.photo.thumbnail = this.fullPicture;
    this.httpClient
      .post<any>('http://localhost:8080/images', this.photo)
      .subscribe(res => console.log(res), err => console.log());
  }

  private filterTags(tag: number): void {
    this.filter.filter(tag, this.selectedTags);
  }

  private filterCategories(category: number): void {
    this.filter.filter(category, this.selectedCategories);
  }

  private loadTags(): Subscription {
    return this.gallery.getTags().subscribe(data => {
      this.tags = data;
    });
  }

  private loadCategories(): Subscription {
    return this.gallery.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  ngOnDestroy() {
    this.loadCategories().unsubscribe();
    this.loadTags().unsubscribe();
  }
}
