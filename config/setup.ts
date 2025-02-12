import { AfterStep, setWorldConstructor, World, Before, After, AfterAll, BeforeAll, BeforeStep, DataTable, setParallelCanAssign, parallelCanAssignHelpers, ITestCaseHookParameter } from "@cucumber/cucumber";
import CustomWorld from "./world";
import { Driver } from "./driver";
import { chromium } from "@playwright/test";
import { MetaData, Platform } from '../utils/metaclass';

import { Pickle } from '@cucumber/messages/dist/cjs/src/messages'


setWorldConstructor(CustomWorld)

let ex: ITestCaseHookParameter

const { atMostOnePicklePerTag } = parallelCanAssignHelpers
const myTagRule = atMostOnePicklePerTag(['@chrome', '@firefox'])
let plataforma: Platform = Platform.CHROME
const mySecondRule = (pickleInQuestion: Pickle, picklesInProgress: Pickle[]) => {
    let s = pickleInQuestion.tags.some(tag => tag.name == plataforma)
    let g = picklesInProgress.find(pick => pick.tags.some(t => t.name == plataforma))
    if (s && g != undefined) {
        console.log("Son del mismo navegador "+pickleInQuestion.tags.some(tag => tag.name == plataforma));
        return true
    } else {
        return false
    }
}


//Hooks Cucumber

Before({ timeout: 15000 }, async function (this: CustomWorld, scenario) {
    //let exec:MetaData=new MetaData();
    //exec.execution.executor.name="Gabriel Ramirez";
    let scenarioId = scenario.gherkinDocument.feature!.children.findIndex(sc => sc.scenario?.name === scenario.pickle.name);
    let tagsNavegadores = ["@chrome", "@firefox", "@edge"]
    let tag = scenario.gherkinDocument.feature?.children[scenarioId].scenario?.tags.find(tag => tagsNavegadores.includes(tag.name))

    switch (tag?.name) {
        case "@firefox":
            plataforma=Platform.FIREFOX
            break;
        case "@edge":
            plataforma=Platform.EDGE
            break;
        case "@safari":
            plataforma=Platform.SAFARI
            break;

        default:
            break;
    }
    setParallelCanAssign(mySecondRule)
    await this.init(plataforma);
    //exec.execution.navigator_platform=Platform.CHROME

    if (scenario.gherkinDocument.feature?.children[scenarioId].scenario?.examples.length) {
        imprimeHeader(scenario.gherkinDocument.feature?.children[scenarioId].scenario?.examples[0].tableHeader)
        imprimeBody(scenario.gherkinDocument.feature.children[scenarioId].scenario.examples[0].tableBody)
        //let exampleId=scenario.gherkinDocument.feature?.children[scenarioId].scenario?.examples.findIndex(s=>s.id==scenario.pickle.id);
        //console.log(`########## Scenario outline : ${scenario.gherkinDocument.feature.children[scenarioId].scenario.examples[exampleId].id} ##########`);
    } else {
        console.log(`########## Scenario : ${scenario.pickle.name} ##########`);
    }



})


After(async function (this: CustomWorld, scenario) {
    await this.browser!.close();  // Cierra el navegador
});

BeforeStep(async function (this: CustomWorld, scenario) {
    //let scenarioId= scenario.gherkinDocument.feature!.children.findIndex(sc=>sc.scenario?.name===scenario.pickle.name);
    //let stepId= scenario.gherkinDocument.feature!.children[scenarioId!].scenario?.steps.findIndex(step=>step.text===scenario.pickleStep.text);
    //console.log(`########## ${scenario.gherkinDocument.feature?.children[scenarioId!].scenario?.steps[stepId!].keyword} ${scenario.pickleStep.text} ##########`);
})

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



function imprimeHeader(tableHeader: any) {
    let headerRow: string = "|  ";
    tableHeader.cells.forEach((column: any) => {
        headerRow = headerRow + column.value + "  |  "
    });
    console.log(headerRow);

}
function imprimeBody(tableBody: any) {
    let bodyRow: string = "|  ";
    tableBody[0].cells.forEach((column: any) => {
        bodyRow = bodyRow + column.value + "  |  "
    });
    console.log(bodyRow);
}