export class CurrencyConverterPage {
  getFromAmount() {
    return cy.get('#fromAmount');
  }

  getToAmount() {
    return cy.get('#toAmount');
  }
  getFromCurrency() {
    return cy.get('#fromCurrencyDropDown');
  }

  getSwapButton() {
    return cy.get('#swapButton');
  }

  selectValueInFromCurrencyDropDown(value: string) {
    this.getFromCurrency().click();
    cy.get("#fromCurrencyDropDown" + value).click();
  }
}
