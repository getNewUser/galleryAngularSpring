import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, OnInit, forwardRef, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { MatSelect, MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-tags-checkbox-input',
  templateUrl: './tags-checkbox-input.component.html',
  styleUrls: ['./tags-checkbox-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagsCheckboxInputComponent),
      multi: true
    }
  ]
})
export class TagsCheckboxInputComponent implements ControlValueAccessor {

  constructor() {}
  onChange: any = () => {};
  onTouch: any = () => {};
  isDisabled: boolean;
  @ViewChild(MatSelect, {static: false}) matSelect: MatSelect;
  @Output() selectionChange: EventEmitter<MatSelectChange> = new EventEmitter<MatSelectChange>();
  
  @Input()
  val; // this is the updated value that the class accesses

  @Input()
  tags: any;

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
