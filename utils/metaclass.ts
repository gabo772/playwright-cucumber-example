
export enum Platform{
    CHROME="Chrome",
    FIREFOX="Firefox",
    EDGE="Edge",
    SAFARI="Safari",
}

interface Scenario{
    name:string,
    steps:Step[],
    status:Result

}
interface Step{
    type:StepType,
    text:string,
    screenshot:string,
    status:Result
}
interface Execution{
    executor:Executor,
    type_execution:string,
    date:string,
    time:string,
    navigator_platform:Platform
    feature_name:string,
    scenarios:Scenario

}
interface Executor{
    name:string
}
enum Result{
    PASSED="passed",
    FAILED="failed"
} 
enum StepType{
    GIVEN="Given",
    WHEN="When",
    AND="And",
    THEN="Then",
}

export class MetaData{
    execution!:Execution;
    
    


}