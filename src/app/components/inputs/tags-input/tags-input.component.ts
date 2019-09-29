import { Component, OnInit, Input, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-tags-input',
  templateUrl: './tags-input.component.html',
  styleUrls: ['./tags-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagsInputComponent),
      multi: true
    }
  ]
})
export class TagsInputComponent implements ControlValueAccessor {

  
  constructor() {
    this.filteredTags = this.tagControl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filterTag(tag) : this.allTags.slice()));

  }

  
  // tagList - request for possible initial values
  @Input()
  val: string[];
  isDisabled: boolean;
  hidePassword: boolean;
  selectable = true;
  removable = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  addOnBlur = true;

  // for Autocomplete of tags
  @Input()
  allTags: string[];

  filteredTags: Observable<string[]>;
  tagControl = new FormControl();

  @ViewChild('tagInput', { static: false }) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  isError: boolean;

  onChanged: any = () => { };
  onTouched: any = () => { };

  
  set value(val) {
    this.val = val ? val : [''];
    this.onChanged(val);
    this.onTouched(val);
  }

  get value() {
    return this.val;
  }


  private _filterTag(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }

  private _determineChipListErrorState(): boolean {

    if (!this.value) {
      return false;
    }
    return this.value.length === 0;
  }


  selected(event: MatAutocompleteSelectedEvent): void {

    this.tagInput.nativeElement.value = '';
    this.tagControl.setValue(null);
    this.value.push(event.option.viewValue.trim());
    this.isError = this._determineChipListErrorState();
  }

  removeTag(index: number): void {

    if (index >= 0) {
      this.value.splice(index, 1);
      this.isError = this._determineChipListErrorState();
    }
  }

  addTag(event: MatChipInputEvent): void {

    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {

      const value = event.value;

      // Add tag
      if ((value || '').trim()) {
        this.value.push(value.trim());
      }

      // Reset the input value
      if (event.input) {
        event.input.value = '';
      }
      this.tagControl.setValue(null);
      this.isError = this._determineChipListErrorState();
    }
  }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnInit(): void {
    this.isError = this._determineChipListErrorState();
  }
}