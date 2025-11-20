import { NgClass, NgStyle } from '@angular/common';
import { Component, EventEmitter, forwardRef, input, Output, Self } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-select-input',
  imports: [MatSelectModule, MatInputModule, ReactiveFormsModule, NgClass, NgStyle],
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.css',

})
export class SelectInputComponent implements ControlValueAccessor {
  label = input<string>();
  options = input<any[]>();
  class = input<string>('');
  style = input<Record<string, string>>({});
  optionValueKey = input<string>('');
  optionLabelKey = input<string>('');

  @Output() change = new EventEmitter<any>();
  onChange = (value: any) => {};
  onTouched = () => {};
  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }
  handleValueChange(value: any) {
    this.onChange(value);
    this.change.emit(value);
  }
  writeValue(value: any): void {
    if (value !== undefined) {
      this.control.setValue(value, { emitEvent: false });
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.control.disable() : this.control.enable();
  }
}
