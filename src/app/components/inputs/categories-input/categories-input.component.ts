import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSelectChange, MatSelect } from '@angular/material';

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
  @ViewChild(MatSelect, {static: false}) matSelect: MatSelect;
  @Output() selectionChange: EventEmitter<MatSelectChange> = new EventEmitter<MatSelectChange>();
  
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

  selectionChanged(event: MatSelectChange){
    this.selectionChange.emit(new MatSelectChange(this.matSelect, event.value));
    // console.log(event.value);
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
