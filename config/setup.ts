import { AfterStep, setWorldConstructor, World, Before, After, AfterAll, BeforeAll } from "@cucumber/cucumber";
import CustomWorld from "./world";
import { Driver } from "./driver";
import { chromium } from "@playwright/test";


setWorldConstructor(CustomWorld)

//Hooks Cucumber

Before({ timeout: 15000 }, async function (this: CustomWorld) {

    await this.init("safari");

})


After(async function (this: CustomWorld) {

    await this.browser!.close();  // Cierra el navegador
});

AfterStep(async function (this: CustomWorld, scenario) {
    const buffer = await this.page.screenshot()
    this.attach(buffer, { mediaType: "image/png", fileName: scenario.pickleStep.text })
})

/*BeforeAll(async function () {
    await Driver.init()

})

AfterAll(async function(){
    await Driver.getPage().close()
    await Driver.getBrowser().close();
})*/
