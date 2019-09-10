import { GalleryService } from './../../services/gallery.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IPhoto } from 'src/app/models/photo.model';
import { ITag } from 'src/app/models/ITag.model';
import { ICategory } from 'src/app/models/ICategory.model';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';

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

  constructor(private gallery: GalleryService, private formBuilder: FormBuilder, private httpClient: HttpClient) {}

  ngOnInit() {
    this.loadCategories();
    this.loadTags();
    this.uploadForm = this.formBuilder.group({
      file: ['']
    });
  }
  

  picked(event){
    let fileList: FileList = event.target.files;
    if(fileList.length > 0){
      const file: File = fileList[0];
      this.handleInputChange(file);

    }
  }

  handleInputChange(files){
    var file = files;
    var pattern = /image-*/;
    var reader = new FileReader();
    if(!file.type.match(pattern)){
      alert('invalid format');
      return;
    }
    reader.onloadend = this.handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  handleReaderLoaded(e){
    let reader = e.target;
    let base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    this.shownPicture = 'data:image/jpg;base64,' + base64result;
    this.fullPicture = base64result;
  }

  onSubmit(f: NgForm) {
    this.photo = f.value;
    this.photo.thumbnail = this.fullPicture;
    console.log(this.photo);
    this.httpClient.post<any>('http://localhost:8080/images', this.photo)
    .subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  getFiles(event) {
    this.photo.fullPhoto
    console.log(event.target.files);
    event.target.files;
}



  filterTags(tag: number): void {
    if (this.selectedTags.includes(tag)) {
      for (let i = 0; i < this.selectedTags.length; i++) {
        if (this.selectedTags[i] === tag) {
          this.selectedTags.splice(i, 1);
          return;
        }
      }
    }
    this.selectedTags.push(tag);
  }

  filterCategories(category: number) {
    if (this.selectedCategories.includes(category)) {
      for (let i = 0; i < this.selectedCategories.length; i++) {
        if (this.selectedCategories[i] === category) {
          this.selectedCategories.splice(i, 1);
        }
      }
    }
    this.selectedCategories.push(category);
  }

  loadTags(): Subscription {
    return this.gallery.getTags().subscribe(data => {
      this.tags = data;
    });
  }

  loadCategories(): Subscription {
    return this.gallery.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  ngOnDestroy() {
    this.loadCategories().unsubscribe();
    this.loadTags().unsubscribe();
  }
}
