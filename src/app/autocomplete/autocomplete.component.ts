import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ITag } from 'src/app/models';
import { GalleryService } from '../services/gallery.service';



@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent  {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<ITag[]>;
  // tagsNames: ITag[] = [];
  // fruits: string[] = ['Lemon'];
  checkedTags: string[] = ['Joy'];
  // allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  tags: ITag[] = [];
  selectedTags: number[] = [];

  @ViewChild('tagInput', {static: false}) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  constructor(
    private gallery: GalleryService) {
    this.loadTags();
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
        startWith(null),
        map((tag: ITag | null) => tag ? this._filter(tag) : this.tags.slice()));
  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.checkedTags.push(value.trim());
        
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.tagCtrl.setValue(null);
    }
  }

  remove(tag: string): void {
    const index = this.checkedTags.indexOf(tag);

    if (index >= 0) {
      this.checkedTags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.checkedTags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: ITag): ITag[] {
    console.log(value);
     const filterValue = value.name;

    return this.tags.filter(tag => tag.name.toLowerCase().indexOf(filterValue) === 0);
  }


  private loadTags(): Subscription {
    return this.gallery.getTags().subscribe(data => {
      this.tags = data;
      for(let i = 1; i < data.length; i++){
        this.filteredTags[i] = data[i].name;
        // this.tagsNames [i] = data[i];
      }
    });
  }
}