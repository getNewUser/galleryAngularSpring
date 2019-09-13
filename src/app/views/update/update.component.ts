import { Subscription } from 'rxjs';
import { GalleryService } from 'src/app/services/gallery.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FilterCategoriesService } from 'src/app/services/filterTagsCategories.service';
import { IPhoto, ITag, ICategory } from 'src/app/models';

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
  fullPhoto: string;
  imgurl: string;

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
    this.getFullPhoto(this.id);
    
  }





  private getFullPhoto(imageId: number): Subscription{
    return this.gallery.getFullPhoto(imageId)
    .subscribe( data => {
      this.fullPhoto = data.picture;
      this.imgurl = 'data:image/jpg;base64,' + this.fullPhoto;
    })
  }

  private filterTags(tag: number): void{
    this.filter.filter(tag, this.selectedTags);
  }

  private filterCategory(category: number){
    this.filter.filter(category, this.selectedCategories);
  }

  private loadPhoto(imageId: number): Subscription{
   return this.gallery.getPhoto(imageId)
    .subscribe(data => {
      this.photo = data;
      this.photoTemplate = data;
    })
  }

  private  loadTags(): Subscription{
    return this.gallery.getTags()
    .subscribe(data => {
      this.tags = data;
    })
  }

  private  loadCategories(): Subscription{
    return this.gallery.getCategories()
    .subscribe(data =>{
      this.categories = data;
    });
     
  }

  ngOnDestroy() {
    this.loadCategories().unsubscribe();
    this.loadTags().unsubscribe();
  }

}
