import { NgStyle, NgClass } from '@angular/common';
import { Component, input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
@Component({
  selector: 'app-text-input',
  imports: [ReactiveFormsModule, MatInputModule, NgStyle, NgClass],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css'
})
export class TextInputComponent implements ControlValueAccessor {
  label = input<string>('');
  type = input<string>('text');
  style = input<Record<string, string>>({});
  class = input<string>('');
  value: string = '';
  isDisabled: boolean = false;

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

    get control(): FormControl {
    return this.ngControl.control as FormControl;
  }


  writeValue(value: any): void {
    this.value = value ?? '';
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
