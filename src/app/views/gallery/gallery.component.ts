import { AuthService } from './../../services/auth.service';
import { Subscription } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/models/category.model';
import { FilterCategoriesService } from 'src/app/services/filterTagsCategories.service';
import { IPhoto, ITag } from 'src/app/models';
import { GalleryService } from 'src/app/services/gallery.service';

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
  counter: number = 0;


  searchString = '';

  isLoaded = false;

  constructor(
    private gallery: GalleryService,
    private filter: FilterCategoriesService,
    private token: AuthService
  ) {
  }
  

  ngOnInit() {
    this.loadPhotos();
    this.loadCategories();
    this.loadTags();
  }


  private filterTags(tag: number): void {
    this.filter.filter(tag, this.selectedTags);
    this.search(this.selectedCategories, this.selectedTags, this.searchString);
  }

  private filterCategory(category: number) {
    this.filter.filter(category, this.selectedCategories);
    this.search(this.selectedCategories, this.selectedTags, this.searchString);
  }

  private search(categories: number[], tags: number[], search: string) {
    this.gallery.search(categories, tags, search).subscribe(data => {
      this.photos = data;
    });
  }

  private initSearch(e: string): void {
    if (e.length < 3 && this.selectedTags.length < 1 && this.selectedCategories.length < 1) {
      this.photos = this.allPhotos;
      return;
    }
    this.searchString = e;
    if (
      e.length > 2 ||
      this.selectedTags.length > 0 ||
      this.selectedCategories.length > 0
    ) {
      this.search(
        this.selectedCategories,
        this.selectedTags,
        this.searchString
      );
    }
  }

  private loadTags(): Subscription {
    return this.gallery.getTagsWithParent().subscribe(data => {
      this.tags = data;
    });
  }

  private loadPhotos(): Subscription {
    return this.gallery.getThumbnails().subscribe(data => {
      this.photos = data;
      this.allPhotos = data;
      this.isLoaded = true;
    });
  }

  private loadCategories(): Subscription {
    return this.gallery.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  private getCategoriesIds(): number[] {
    let numbers = [];
    for (let number of this.categories) {
      numbers.push(number.id);
    }

    return numbers;
  }

  ngOnDestroy() {
    this.loadCategories().unsubscribe();
    this.loadTags().unsubscribe();
    this.loadPhotos().unsubscribe();
  }
}
