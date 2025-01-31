import { World } from "@cucumber/cucumber";
import { Browser, chromium, Page, firefox, webkit, BrowserType, } from "@playwright/test";
import { Platform } from "../utils/metaclass";


export default class extends World {
    page!: Page
    browser: Browser | undefined

    constructor(options: any) {
        super(options);
        this.browser = undefined;
    }


    async init(navegador: Platform) {
        let tipoNavegador!: BrowserType
        let channel: string;
        switch (navegador) {
            case Platform.CHROME:
                tipoNavegador = chromium;
                channel = "chrome"
                break;
            case Platform.EDGE:
                tipoNavegador = chromium;
                channel = "msedge"
                break;
            case Platform.FIREFOX:
                tipoNavegador = firefox;
                channel = "firefox"
                break;
            case Platform.SAFARI:
                tipoNavegador = webkit;
                channel = "webkit"
                break;
            default:
                throw new Error("No se ha seleccionado navegador")
        }
        this.browser = await tipoNavegador.launch({
            channel: channel,
            headless:true,
            args: ['--headless=new']
        });
        /*const context = await this.browser.newContext({
            viewport: {
              width: 1920, // Ancho deseado
              height: 1080, // Altura deseada
            },
          });*/
        this.page = await this.browser.newPage();
    }
}
