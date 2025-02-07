
import { Given, When, Then } from '@cucumber/cucumber';
import CustomWorld from './../config/world'
import { expect, Locator, Page } from '@playwright/test';
import { CucumberPage } from '../pages/CucumberPage';


var cucumberPage!: CucumberPage

Given("ingreso a la url {string}", { timeout: 60000 }, async function (this: CustomWorld, url) {
    cucumberPage = new CucumberPage(this.page);
    await this.page.goto(url, { waitUntil: "load", timeout: 60000 });

})

When("valido que estoy en la página principal", async function () {
    await cucumberPage.validarTituloPaginaPrincipal();

})

When("busco {string}",{timeout:20000}, async function (variable) {

    await cucumberPage.buscoSeccionDocs(variable)
})

Then("valido que estoy en Docs", async function () {
    await cucumberPage.validoQueEstoyEnPantallaDocs();

})

When("busco seccion {string}", { timeout: 15000 }, async function (this: CustomWorld, variableReport: string) {
    //(//input[@placeholder='How can we help?'])[1]
    const inputSeccion = await this.page.locator("xpath=//button[@class='DocSearch DocSearch-Button']")
    await expect(inputSeccion).toBeEnabled();
    await inputSeccion.click();
    const inputReal= await this.page.locator("xpath=//input[@class='DocSearch-Input']")
    await inputReal.fill(variableReport)
    await this.page.waitForTimeout(5000)
    await inputReal.press("Enter")
    await this.page.waitForTimeout(4000)
})

Then('valido que estoy en {string}', { timeout: 10000 }, async function (this: CustomWorld, url: string) {
    // Write code here that turns the phrase above into concrete actions
    await expect(this.page).toHaveURL(url);
    await this.page.waitForTimeout(5000);
})



Given('valido que estoy en la seccion docs',async function (this: CustomWorld) {
  await expect(this.page).toHaveURL("https://cucumber.io/docs/guides/api-automation/?lang=java")
})


When('selecciono icono {string}', async function(this: CustomWorld,lenguaje:string) {
  
    let elem! : Locator;
    switch(lenguaje){
        case "java":
            console.log("ITS JAVA");
            elem=this.page.locator("xpath=//li[@data-language='java']")
            break;
        case "javascript":
            console.log("ITS JAVASCRIPT");
            elem=this.page.locator("xpath=//li[@data-language='javascript']")
            break;
                        
    }
    await elem.click();
})

Then("valido que estoy en la seccion {string}",async function(this: CustomWorld,url:string){
     await expect(this.page).toHaveURL(url);
})