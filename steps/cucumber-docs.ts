
import { Given, When, Then } from '@cucumber/cucumber';
import CustomWorld from './../config/world'
import { expect, Page } from '@playwright/test';
import { CucumberPage } from '../pages/CucumberPage';


var cucumberPage!: CucumberPage

Given("ingreso a la url {string}", { timeout: 60000 }, async function (this: CustomWorld, url) {
    cucumberPage = new CucumberPage(this.page);
    await this.page.goto(url, { waitUntil: "load", timeout: 60000 });

})

When("valido que estoy en la página principal", async function () {
    await cucumberPage.validarTituloPaginaPrincipal();

})

When("busco {string}", async function (variable) {

    await cucumberPage.buscoSeccionDocs(variable)
})

Then("valido que estoy en Docs", async function () {
    await cucumberPage.validoQueEstoyEnPantallaDocs();

})

When("busco seccion {string}", { timeout: 15000 }, async function (this: CustomWorld, variableReport: string) {
    //(//input[@placeholder='How can we help?'])[1]
    const inputSeccion = await this.page.locator("xpath=(//input[@placeholder='How can we help?'])[1]")
    await expect(inputSeccion).toBeEnabled();
    await inputSeccion.fill(variableReport)
    await this.page.waitForTimeout(5000)
    await inputSeccion.press("Enter")
    await this.page.waitForTimeout(4000)
})

Then('valido que estoy en {string}', { timeout: 10000 }, async function (this: CustomWorld, url: string) {
    // Write code here that turns the phrase above into concrete actions
    await expect(this.page).toHaveURL(url);
    await this.page.waitForTimeout(5000);
})
