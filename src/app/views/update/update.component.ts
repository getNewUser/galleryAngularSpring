import { Subscription, Observable } from 'rxjs';
import { GalleryService } from 'src/app/services/gallery.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
import { FilterCategoriesService } from 'src/app/services/filterTagsCategories.service';
import { IPhoto, ITag, ICategory } from 'src/app/models';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatSnackBar } from '@angular/material';
import { Router } from "@angular/router";
import {
  MatAutocomplete,
  MatChipInputEvent,
  MatAutocompleteSelectedEvent
} from '@angular/material';
import { startWith, map } from 'rxjs/operators';

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
  fullPhoto: string;
  imgurl: string;

  constructor(
    private route: ActivatedRoute,
    private gallery: GalleryService,
    private filter: FilterCategoriesService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loadTags();
    this.loadCategories();
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allTags.slice()
      )
    );
  }

  onSubmit(f: NgForm, message,action) {
    if (f.valid === true) {
      this.photo = f.value;
      this.photo.id = this.photoTemplate.id;
      this.photo.thumbnail = this.photoTemplate.thumbnail;
      this.photo.width = this.photoTemplate.width;
      this.photo.height = this.photoTemplate.height;
      this.photo.date = this.photoTemplate.date;
      if(this.photo.name === ''){
        this.photo.name = this.photoTemplate.name;
      }
      if(this.photo.description === ''){
        this.photo.description = this.photoTemplate.description;
      }
      if(this.photo.categories.length < 1){
        this.photo.categories = this.photoTemplate.categories;
      }
      this.photo.tags = this.getTags();
      this.gallery.updateImage(this.photo);
      this.snackBar.open('Image updated', action, { duration: 2000});
      this.router.navigate(['home']);
    }
  }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.loadPhoto(this.id);
    this.loadCategories();
    this.getFullPhoto(this.id);
  }

  private getFullPhoto(imageId: number): Subscription {
    return this.gallery.getFullPhoto(imageId).subscribe(data => {
      this.fullPhoto = data.picture;
      this.imgurl = 'data:image/jpg;base64,' + this.fullPhoto;
    });
  }

  private filterCategory(category: number) {
    this.filter.filter(category, this.selectedCategories);
  }

  private loadPhoto(imageId: number): Subscription {
    return this.gallery.getPhoto(imageId).subscribe(data => {
      this.photo = data;
      this.photoTemplate = data;

      for (let tag of data.tags) {
        this.tags.push(tag.name);
      }
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

  //  ============ Tags

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  tags: string[] = [];
  filteredTags: Observable<string[]>;
  allTags: string[] = [];

  tagsToReturn: ITag[] = [];
  tagsFromService: ITag[] = [];

  @ViewChild('tagInput', { static: false }) tagInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        this.tags.push(value.trim());
      }

      if (input) {
        input.value = '';
      }

      this.tagCtrl.setValue(null);
    }
  }

  remove(fruit: string): void {
    const index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(
      fruit => fruit.toLowerCase().indexOf(filterValue) === 0
    );
  }

  public getTags(): ITag[] {
    for (let i = 0; i < this.tags.length; i++) {
      let tag: ITag = {
        id: '',
        name: this.tags[i],
        createdDate: ''
      };
      this.tagsToReturn.push(tag);
    }
    return this.tagsToReturn;
  }

  private loadTags(): Subscription {
    return this.gallery.getTags().subscribe(data => {
      this.tagsFromService = data;

      for (let i = 0; i < data.length; i++) {
        this.allTags[i] = data[i].name;
      }
    });
  }
}
