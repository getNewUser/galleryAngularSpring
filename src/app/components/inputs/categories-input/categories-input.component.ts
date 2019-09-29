import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, OnInit, forwardRef, Input } from '@angular/core';

@Component({
  selector: 'app-categories-input',
  templateUrl: './categories-input.component.html',
  styleUrls: ['./categories-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CategoriesInputComponent),
      multi: true
    }
  ]
})
export class CategoriesInputComponent implements ControlValueAccessor {

  constructor() {}
  onChange: any = () => {};
  onTouch: any = () => {};
  isDisabled: boolean;
  
  @Input()
  val; // this is the updated value that the class accesses

  @Input()
  categoriesList: any;

  set value(val) {
    // this value is updated by programmatic changes if( val !== undefined && this.val !== val){
    this.val = val ? val : [''];
    this.onChange(val);
    this.onTouch(val);
  }

  get value() {
    return this.val;
  }
  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;

  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

}
