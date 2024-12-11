import { World } from "@cucumber/cucumber";
import { Browser, chromium, Page, firefox, webkit, BrowserType } from "@playwright/test";


export default class extends World {
    page!: Page
    browser: Browser | undefined

    constructor(options: any) {
        super(options);
        this.browser = undefined;
    }


    async init(navegador: string) {
        let tipoNavegador!: BrowserType
        let channel: string;
        switch (navegador) {
            case "chrome":
                tipoNavegador = chromium;
                channel = "chrome"
                break;
            case "edge":
                tipoNavegador = chromium;
                channel = "msedge"
                break;
            case "firefox":
                tipoNavegador = firefox;
                channel = "firefox"
                break;
            case "safari":
                tipoNavegador = webkit;
                channel = "webkit"
                break;
            default:
                throw new Error("No se ha seleccionado navegador")
        }
        this.browser = await tipoNavegador.launch({
            channel: channel,
            headless: true
        });
        this.page = await this.browser.newPage();
    }
}
