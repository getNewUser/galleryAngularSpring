import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef } from '@angular/core';
import { CategoriesInputComponent } from '../categories-input/categories-input.component';

@Component({
  selector: 'app-search-box-input',
  templateUrl: './search-box-input.component.html',
  styleUrls: ['./search-box-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchBoxInputComponent),
      multi: true
    }
  ]
})
export class SearchBoxInputComponent implements ControlValueAccessor {

  val = ''; // this is the updated value that the class accesses
  constructor() {
  }
  onChange: any = () => {};
  onTouch: any = () => {};

  set value(val) {
    // this value is updated by programmatic changes if( val !== undefined && this.val !== val){
    this.val = val;
    this.onChange(val);
    this.onTouch(val);
  }

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
}
