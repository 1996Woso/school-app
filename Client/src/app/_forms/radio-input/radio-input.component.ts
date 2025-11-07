import { NgIf } from '@angular/common';
import { Component, input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-radio-input',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './radio-input.component.html',
  styleUrl: './radio-input.component.css'
})
export class RadioInputComponent implements ControlValueAccessor {
  type = input<string>('radio');
  label= input<string>('');
  name = input<string>('');
  value = input<string>('');
  
  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }
  
  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }

  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
      if (isDisabled) {
        this.control.disable();
      } else {
        this.control.enable();
      }
  }
  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.onChange(input.value);
    this.onTouched();
  }

}
