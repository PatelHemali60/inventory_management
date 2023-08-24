import { FormControl } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  Component,
  OnInit,
  Input,
  Injector,
  forwardRef,
  Self,
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  Validator,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
  NG_VALIDATORS,
} from '@angular/forms';

export const VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputControlComponent),
  multi: true,
};

export const VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => InputControlComponent),
  multi: true,
};

@Component({
  selector: 'app-input-control',
  templateUrl: './input-control.component.html',
  styleUrls: ['./input-control.component.scss'],
})
export class InputControlComponent implements OnInit {
  @Input() labelName: string = 'labelName';
  @Input() inputType: string = 'text';
  // @Input() name!: string;
  // @Input() type!: string;
  // @Input() placeholder!: string;
  // @Input() label!: string;
  // @Input() isRequired!: boolean;
  // @Input() pattern!: string;
  // @Input() errorMessage!: string;

  onChange!: (_: any) => {};
  onTouched!: (_: any) => {};

  value: any;
  disabled!: boolean;

  constructor() {
    // this.controlDir.valueAccessor = this;
  }

  ngOnInit() {}

  // writeValue(value: any) {
  //   this.value = value;
  // }

  // registerOnChange(fn: any) {
  //   this.onChange = fn;
  // }

  // registerOnTouched(fn: any) {
  //   this.onTouched = fn;
  // }

  // setDisabledState(isDisabled = false) {
  //   this.disabled = isDisabled;
  // }

  // validate(c: AbstractControl): ValidationErrors {
  //   const validators: ValidatorFn[] = [];
  //   return validators;
  // }

  // registerOnValidatorChange(fn: () => void) {}
}
