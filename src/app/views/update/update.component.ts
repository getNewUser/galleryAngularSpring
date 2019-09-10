import { ITag } from './../../models/ITag.model';
import { GalleryService } from 'src/app/services/gallery.service';
import { IPhoto } from './../../models/photo.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/models/ICategory.model';
import { NgForm } from '@angular/forms';
import { FilterCategoriesService } from 'src/app/services/filterTagsCategories.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {


  id: number;
  photo: IPhoto;
  photoTemplate: IPhoto;
  tags: ITag[] = [];
  categories: ICategory[] = [];
  selectedCategories: number[] = [];
  selectedTags: number[] = [];

  constructor(private route: ActivatedRoute,
              private gallery: GalleryService,
              private filter: FilterCategoriesService) { }

  onSubmit(f: NgForm) {
    if(f.valid === true){
      this.photo = f.value;
      this.photo.id = this.photoTemplate.id;
      this.photo.thumbnail = this.photoTemplate.thumbnail;
      this.photo.width = this.photoTemplate.width;
      this.photo.height = this.photoTemplate.height;
      this.photo.date = this.photoTemplate.date;
      // console.log(this.photo)
      this.gallery.updateImage(this.photo);
    }
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false

  }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.loadPhoto(this.id);
    this.loadCategories();
    this.loadTags();
    
  }






  
  
  filterTags(tag: number): void{
    this.filter.filter(tag, this.selectedTags);
  }

  filterCategory(category: number){
    this.filter.filter(category, this.selectedCategories);
  }

  loadPhoto(imageId: number){
    this.gallery.getPhoto(imageId)
    .subscribe(data => {
      this.photo = data;
      this.photoTemplate = data;
    })
  }

  loadTags(): void{
    this.gallery.getTags()
    .subscribe(data => {
      this.tags = data;
    })
  }

  loadCategories(): void{
    this.gallery.getCategories()
    .subscribe(data =>{
      this.categories = data;
    });
     
  }

}
