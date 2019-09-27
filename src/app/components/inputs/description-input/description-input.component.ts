import { Component, forwardRef,  } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-description-input',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DescriptionInputComponent),
      multi: true
    }
  ],
  templateUrl: './description-input.component.html',
  styleUrls: ['./description-input.component.scss']
})
export class DescriptionInputComponent implements ControlValueAccessor {
  constructor() {}
  onChange: any = () => {};
  onTouch: any = () => {};
  val = ''; // this is the updated value that the class accesses
  placeholder = '';
  isChanged = 0; // set value(val) gets called twice while initializing so I set it's placeholder as val twice just to avoid it being renamed if user inputs something


  set value(val) {
    // this value is updated by programmatic changes if( val !== undefined && this.val !== val){
    this.val = val;
     if(this.isChanged < 3){
      this.placeholder = this.val;
    }
    this.onChange(val);
    this.onTouch(val);
    this.isChanged++;
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
