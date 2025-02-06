import { expect, Locator, Page } from "@playwright/test";

export class CucumberPage {


    // atributos 

    private page: Page;
    private h1_titulo: Locator;
    private link_api_docs: Locator;
    private h1_api_docs: Locator;


    // constructor 
    constructor(page: Page) {
        this.page = page;
        this.h1_titulo = this.page.locator("xpath=//strong[contains(text(),'Cucumber')]")
        this.link_api_docs = this.page.locator("xpath=//a[text()='API Docs']")
        this.h1_api_docs = this.page.locator("xpath=//h2[text()='What is Cucumber?']")

    }


    //metodos 
    async validarTituloPaginaPrincipal() {

        await expect(this.h1_titulo).toBeVisible();
    }

    async buscoSeccionDocs(seccionDocs: string) {
        const linkDocs = await this.page.locator("xpath=//a[text()='" + seccionDocs + "']")
        await expect(linkDocs).toBeVisible();
        await linkDocs.click();
        await expect(this.link_api_docs).toBeVisible();
        await this.link_api_docs.click();
    }

    async validoQueEstoyEnPantallaDocs() {

        await expect(this.h1_api_docs).toBeVisible();
    }

}

