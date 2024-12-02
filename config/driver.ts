import { Browser, Page,chromium } from "@playwright/test";

export class Driver{

    private static page:Page;
    private static browser:Browser;



    static async init(){
        this.browser = await chromium.launch({
            channel: 'chrome',
            headless: false
        });
        this.page = await this.browser.newPage();
    }
    static  getPage():Page {
    
        return this.page;

    }
    static  getBrowser():Browser{
        return this.browser;
    }


}