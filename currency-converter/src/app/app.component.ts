import {Component, OnInit} from '@angular/core';
import {CurrencyService} from "./service/app.currency.converter.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidateNumberLength, ValidateNumberSeparatorCount} from "./validator/app.currency.converter.customn.validator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Currency Converter';

  private currencies: any
  public currencyKeys: any
  public fromCurrency = 'ALL';
  public toCurrency = 'ALL';
  public fromAmount = '0';
  public toAmount = '0'
  public fromAmountForm: FormGroup;
  public toAmountForm: FormGroup;

  constructor(private currencyService: CurrencyService) {
    this.fromAmountForm = new FormGroup({
      fromAmount: new FormControl("", {
        validators: [
          Validators.pattern("[+-]?((\\d+\\.?\\d*)|(\\.\\d+))"),
          ValidateNumberLength,
          ValidateNumberSeparatorCount],
        updateOn: "blur"
      })
    });

    this.toAmountForm = new FormGroup({
      toAmount: new FormControl("", {
        validators: [
          Validators.pattern("[+-]?((\\d+\\.?\\d*)|(\\.\\d+))"),
          ValidateNumberLength,
          ValidateNumberSeparatorCount],
        updateOn: "blur"
      })
    });
  }

  async ngOnInit() {
    await this.currencyService.getCurrencies().toPromise().then(res => {
      console.log(res)
      this.currencies = res.results
      this.currencyKeys = Object.keys(res.results)
    });
  }

  async onFromAmountChange(amount: string) {
    this.fromAmount = amount;

    this.getRatioAndConvert().then();
  }

  onToAmountChange(amount: string) {
    this.toAmount = amount;
  }

  async onFromCurrencyChange(currency: string) {
    this.fromCurrency = currency;

    this.getRatioAndConvert().then();
  }

  async onToCurrencyChange(currency: string) {
    this.toCurrency = currency;

    this.getRatioAndConvert().then();
  }

  async swapAmounts() {
    let temporaryValue = this.fromAmount;

    this.fromAmount = this.toAmount;
    this.toAmount = temporaryValue;

    this.getRatioAndConvert().then();
  }

  async getRatioAndConvert() {
    if (this.fromAmount != '0') {
      await this.getCurrencyRatio().toPromise().then(res => {
        this.convertNewAmount(res[this.fromCurrency + "_" + this.toCurrency])
      });
    }
  }

  getCurrencyRatio() {
    return this.currencyService.getRatioBetweenCurrencies(this.fromCurrency, this.toCurrency);
  }

  convertNewAmount(ratio: number) {
    let newAmount = ratio * parseInt(this.fromAmount);
    this.onToAmountChange(newAmount.toFixed(2).toString())
  }
}
