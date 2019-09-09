import { ITag } from 'src/app/models/ITag.model';
import { GalleryService } from './../../services/gallery.service';
import { IPhoto } from './../../models/photo.model';
import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/models/ICategory.model';
import { IFullPicture } from 'src/app/models/IFullPicture.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent implements OnInit {

  allPhotos: IPhoto[] = [];
  photos: IPhoto[] = [];
  categories: ICategory[] = [];
  selectedCategories: number[] = [];
  tags: ITag[] = [];
  selectedTags: number[] = [];

  searchString = '';
 
  count = 0;
  isLoaded = false;


  constructor(private gallery: GalleryService) { }

  ngOnInit() {
    this.loadPhotos();
    this.loadCategories();
    this.loadTags();
  }

  filterTags(tag: number){
    if(this.selectedTags.includes(tag)){
      for(let i = 0; i < this.selectedTags.length; i++){
        if(this.selectedTags[i] === tag){
          this.selectedTags.splice(i,1);
          this.search(this.selectedCategories, this.selectedTags, this.searchString);
          return;
        }
      }
    }
    this.selectedTags.push(tag);
    this.search(this.selectedCategories, this.selectedTags, this.searchString);
  }

  filterCategory(category: number){
    if(this.selectedCategories.includes(category)){
      for(let i = 0; i < this.selectedCategories.length; i++){
        if(this.selectedCategories[i] === category){
          this.selectedCategories.splice(i,1);
          this.search(this.selectedCategories, this.selectedTags, this.searchString);
          return;
        }
      }
    }
    
    this.selectedCategories.push(category);
    this.search(this.selectedCategories, this.selectedTags, this.searchString);
    console.log(this.searchString);
  }

  search(categories: number[], tags: number[], search: string){
    this.gallery.search(categories,tags,search)
    .subscribe(data => {
      this.photos = data;
    })
  }

  initSearch(e: string){
    this.searchString = e;
    console.log(this.searchString);
    console.log('initSearch: ' + this.searchString);
    if(e.length > 2 || this.selectedTags.length > 0 || this.selectedCategories.length > 0){
      this.search(this.selectedCategories, this.selectedTags, this.searchString);
    }
  }



  loadTags(): void {
    this.gallery.getTags()
    .subscribe(data => {
      this.tags = data;
    })
  }



  loadPhotos(): void {
    this.gallery.getThumbnails()
      .subscribe(data => {
        this.photos = data;
        this.allPhotos = data;
        this.isLoaded = true;

      });
  }

  loadCategories(): void{
    this.gallery.getCategories()
    .subscribe(data =>{
      this.categories = data;
    });
     
  }

  

  getCategoriesIds(): number[] {
    let numbers = [];
    for(let number of this.categories){
      numbers.push(number.id);
    }

    return numbers;
  }

 
}