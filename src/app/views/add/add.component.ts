import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FilterCategoriesService } from './../../services/filterTagsCategories.service';
import { GalleryService } from './../../services/gallery.service';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Subscription, Observable } from 'rxjs';
import { IPhoto, ITag, ICategory } from 'src/app/models';
import {
  MatSnackBar,
  MatAutocompleteSelectedEvent,
  MatChipInputEvent,
  MatAutocomplete
} from '@angular/material';
import { Router } from '@angular/router';
import { startWith, map } from 'rxjs/operators';

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

  SERVER_URL = 'http://localhost:8080/images';
  uploadForm: FormGroup;
  noTags: boolean = true;

  constructor(
    private gallery: GalleryService,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private filter: FilterCategoriesService,
    private snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loadTags();
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allTags.slice()
      )
    );
  }

  ngOnInit() {
    this.loadCategories();
    this.loadTags();
    this.createForm();
  }

  credentials: FormGroup = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    categories: new FormControl(),
    tags: new FormControl(),
    file: new FormControl()
  });

  private createForm(): void {
    this.credentials = this.fb.group({
      name: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(12)]],
      description: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      categories: ['', [Validators.required]],
      tags: ['', [Validators.required]],
      file: ['', [Validators.required]]
    });
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

  onSubmit(action: string): void {
    console.log(this.credentials.valid);
    console.log(this.credentials.value);
    if (this.tags.length < 1) {
      this.isTagsEmpty = true;
      return;
    }
    if (this.credentials.errors !== null) {
      return;
    }
    this.isTagsEmpty = false;
    this.noTags = false;
    this.photo = this.credentials.value;
    this.photo.tags = this.getTags();
    this.photo.thumbnail = this.fullPicture;
    console.log(this.photo);
    this.httpClient
      .post<any>('http://localhost:8080/images', this.photo)
      .subscribe(
        () => {
          this.snackBar.open('Image added successfully', action, {
            duration: 2000
          });
          this.router.navigate(['home']);
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
  tagsIsEmpty = true;

  tagsToReturn: ITag[] = [];
  tagsFromService: ITag[] = [];

  @ViewChild('tagInput', { static: false }) tagInput: ElementRef<HTMLInputElement>;
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

      this.isTagsEmpty = false;
      this.tagCtrl.setValue(null);
    }
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }

    if (this.tags.length < 1) {
      this.isTagsEmpty = true;
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

  getTags(): ITag[] {
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
