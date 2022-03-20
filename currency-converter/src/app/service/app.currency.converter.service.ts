import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {
  public apiKeyParam = {'apiKey': '9809feedc9a53cfc77e7'};

  constructor(private httpClient: HttpClient) {}

  getCurrencies() {
    return this.httpClient.get<any>('https://free.currconv.com/api/v7/currencies', {params: this.apiKeyParam})
  }

  getRatioBetweenCurrencies(fromCurrency: string, toCurrency: string) {
    let apiParams = {"q": fromCurrency + "_" + toCurrency,
                  "compact": "ultra"}
    return this.httpClient.get<any>('https://free.currconv.com/api/v7/convert',
      {params: Object.assign(this.apiKeyParam, apiParams)})
  }
}
