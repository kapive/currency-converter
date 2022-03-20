import { TestBed } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import {BrowserModule} from "@angular/platform-browser";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      AppComponent
    ],
    providers: [
      AppComponent
    ],
    imports: [
      BrowserModule,
      NgbModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule
    ]
  }).compileComponents());

  it('should be created', async() => {
    const service: AppComponent = TestBed.get(AppComponent);
    await service.ngOnInit();
    expect(service).toBeTruthy();
  });

  describe('service', () => {
    describe('get currencies', () => {
      it('currency list should be not null', async() => {
        const component = getComponent();
        await component.ngOnInit();

        expect(component.currencyKeys != null).toBeTruthy();
        expect(component.currencyKeys.length > 0).toBeTruthy();
      });
    });

    describe('get ratio', () => {
      it('ratio list should be not null', async() => {
        const component = getComponent();

        await component.getCurrencyRatio()
          .toPromise()
          .then(res => {
            expect(res != null).toBeTruthy();
            expect(res[component.fromCurrency + "_" + component.toCurrency] != null).toBeTruthy()
          })
      });
    });

    describe('update amounts', () => {
      it('should update from amount', () => {
        const component = getComponent();
        const amount = '12345';

        component.onFromAmountChange(amount);

        expect(component.fromAmount == amount).toBeTruthy();
      });

      it('should update to amount', () => {
        const component = getComponent();
        const amount = '12345';

        component.onToAmountChange(amount);

        expect(component.toAmount == amount).toBeTruthy();
      });
    });

    describe('update currencies', () => {
      it('should update from currency', () => {
        const component = getComponent();
        const currency = 'EUR';

        component.onFromCurrencyChange(currency);

        expect(component.fromCurrency == currency).toBeTruthy();
      });

      it('should update to currency', () => {
        const component = getComponent();
        const currency = 'EUR';

        component.onToCurrencyChange(currency);

        expect(component.toCurrency == currency).toBeTruthy();
      });
    });

    describe('swap amounts', () => {
      it('should swap amount', () => {
        const component = getComponent();
        const toAmount = '12345';
        const fromAmount = '54321';

        component.onFromAmountChange(fromAmount);
        component.onToAmountChange(toAmount);
        component.swapAmounts();

        expect(component.fromAmount == toAmount).toBeTruthy();
      });
    });

    describe('calculate new to amount', () => {
      it('should swap amount', () => {
        const component = getComponent();
        const toAmount = '12345';
        const fromAmount = '54321';
        const ratio = 0.2;

        component.onFromAmountChange(fromAmount);
        component.onToAmountChange(toAmount);
        component.convertNewAmount(ratio);

        let newToAmount = ratio * parseInt(fromAmount);

        expect(component.toAmount == newToAmount.toFixed(2).toString()).toBeTruthy();
      });
    });
  });
});

function getComponent(): AppComponent {
  return TestBed.get(AppComponent);
}
