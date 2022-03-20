import { TestBed } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import {AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {HttpClientModule} from "@angular/common/http";

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      AppComponent
    ],
    providers: [
      FormBuilder,
      AppComponent
    ],
    imports: [
      BrowserModule,
      NgbModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule
    ],
  }).compileComponents());

  it('should be created', () => {
    const service: AppComponent = TestBed.get(AppComponent);
    expect(service).toBeTruthy();
  });

  describe('createForm', () => {
    describe('amount form control', () => {
      it('should contain max 9 digits', () => {
        const form = getForm();
        const control = getControl(form);

        control.setValue('1234567890');
        expect(control.hasError('numberLengthInvalid')).toBeTruthy();

        control.setValue('999999.999')
        expect(control.hasError('numberLengthInvalid')).toBeFalsy();

        control.setValue('12345678.999')
        expect(control.hasError('numberLengthInvalid')).toBeTruthy();
      });

      it('should match float number pattern', () => {
        const form = getForm();
        const control = getControl(form);

        control.setValue('gsdgbfs');
        expect(control.hasError('pattern')).toBeTruthy();

        control.setValue('999999.999')
        expect(control.hasError('pattern')).toBeFalsy();
      });

      it('float number should contain only one dot', () => {
        const form = getForm();
        const control = getControl(form);

        control.setValue('45.454.5');
        expect(control.hasError('numberSeparatorCountInvalid')).toBeTruthy();

        control.setValue('999999.999')
        expect(control.hasError('numberSeparatorCountInvalid')).toBeFalsy();

        control.setValue('12345678')
        expect(control.hasError('numberSeparatorCountInvalid')).toBeFalsy();
      });
    });
  });
});

function getForm(): FormGroup {
  return TestBed.get(AppComponent).fromAmountForm;
}

function getControl(form: FormGroup): AbstractControl {
  return <AbstractControl> form.get('fromAmount');
}
