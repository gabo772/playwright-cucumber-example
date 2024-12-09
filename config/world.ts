import { World } from "@cucumber/cucumber";
import { Browser, chromium, Page } from "@playwright/test";


export default class extends World {
    page!: Page
    browser: Browser | undefined

    constructor(options: any) {
        super(options);
        this.browser = undefined;
    }


    async init() {
        this.browser = await chromium.launch({
            channel: 'chrome',
            headless: true
        });
        this.page = await this.browser.newPage();
    }
}
