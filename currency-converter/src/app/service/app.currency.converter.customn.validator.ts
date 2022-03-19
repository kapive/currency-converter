import {AbstractControl} from "@angular/forms";

// Valid number must contain up to from 9 digits
// Example: 99, 999999999, 999999.999
export function ValidateNumberLength(control: AbstractControl): {[key: string]: any} | null {
  if (control.value && control.value.replace(/[.,]/g, '').length > 9) {
    return {'numberLengthInvalid': true};
  }
  return null;
}

// Valid number should contain only one dot in float number
export function ValidateNumberSeparatorCount(control: AbstractControl): {[key: string]: any} | null {
  if (control.value && control.value.replace(/[0-9]/g, '').length > 1) {
    return {'numberSeparatorCountInvalid': true};
  }
  return null;
}
