import {CurrencyConverterPage} from "./app.po";

describe('Currency Converter', () => {
  let page: CurrencyConverterPage;

  beforeEach(() => {
    page = new CurrencyConverterPage();
    cy.visit("http://localhost:4200/")
  });

  it('Amounts should be 0', () => {
    page.getFromAmount().should('have.value', "0");
    page.getToAmount().should('have.value', "0");
  });

  it('Change from amount and check to amount change', async() => {
    const value = "54321";
    page.getFromAmount().type(value);

    page.getFromAmount().should('have.value', value);

    page.getToAmount().should('not.have.value', "0");
  });

  it('Swap from and to amount values', async() => {
    const value = "54321";
    page.getToAmount().type(value);
    page.getFromAmount().type("0");

    page.getSwapButton().click();

    page.getFromAmount().should('have.value', value);
    page.getToAmount().should('not.have.value', "0");
  });

  it('Change currency and check to amount change', async() => {
    const value = "12";
    const currency = "EUR";
    page.getFromAmount().type(value);
    page.getToAmount().type("0");
    page.selectValueInFromCurrencyDropDown(currency);

    page.getFromAmount().should('have.value', value);
    page.getFromCurrency().should('have.value', currency);
    page.getToAmount().should('not.have.value', "0");
  });
});
