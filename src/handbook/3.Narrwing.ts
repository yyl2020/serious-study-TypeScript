/*
* 将类型细化为比声明的类型更具体的类型的过程称为 narrowing
* */
// 几种常见的 narrowing 方式
// typeof 类型保护
function printAll(strs: string | string[] | null) {
    if (typeof strs === "object"){
        for (const s of strs) { // Object is possibly 'null'.
            console.log(s)
        }
    }else if (typeof strs === "string") {
        console.log(strs)
    }else {
        // do nothing
    }
}
// Truthiness narrowing(真实性缩小) 在任何表达式里使用条件 &&,||,if,!...
function printAll2(strs: string | string[] | null){
    if (strs && typeof strs === "object"){ // 防范 null 或者 undefined 这样的值
        for (const s of strs){
            console.log(s)
        }
    }else if (typeof strs === "string") {
        console.log(strs)
    }
}
function multiplyAll(
    values: number[] | undefined,
    factor: number): number[] | undefined{
    if(!values){ // 通过 ! 将否定分支过滤掉
        return values
    }else {
        return values.map((x)=> x * factor)
    }
}
// Equality narrowing(相等缩小) ===, !==, ==, !=
function example(x: string | number, y: string | boolean){
    if (x === y){
        x.toUpperCase() // x 和 y 相等两个都是 string 类型
        y.toUpperCase()
    }else {
        console.log(x) // x: string | number
        console.log(y) // y: string | number
    }
}
interface Container {
    value: number | null | undefined
}
function multiplyValue(container: Container, factor: number){
    if (container.value != null){ // Remove both 'null' and 'undefined' from the type.
        container.value *= factor
    }
}
// in operator narrowing(in 操作符缩小)
type Fish = { name?: string, swim: () => void }
type Bird = { name?: string, fly: () => void }
type Human = { swim?: () => void; fly?: () => void };
function move(animal: Fish | Bird) {
    if ("swim" in animal){
        return animal.swim()
    }

    return animal.fly()
}

function move2(animal: Fish | Bird | Human){
    if ("swim" in animal){
        animal.swim() // animal: Fish | Human
    }else {
        animal.fly() // animal: Brid | Human
    }
}
// instanceof narrowing
function logValue(x: Date | string){
    if (x instanceof Date){
        console.log(x.toUTCString()) // x: Date
    }else {
        console.log(x.toString()) // x: string
    }
}
// 分配(assignment) 当我们为变量赋值的时，TS会查看右侧的赋值，并适当缩小右侧的范围
let x = Math.random() < 0.5 ? 10 : "hello"
x = 1
// x = true //Type 'boolean' is not assignable to type 'string | number'.

// 控制流分析(control flow analysis)：基于可达性的代码分析
// 当分析一个变量时，控制流可以一次次地分裂和重新合并，而且可以观察到改变量在每个点上都有不同的类型
function example2(){
    let x: string | number | boolean
    x = Math.random() < 0.5
    console.log(x) // x: boolean

    if (Math.random() < 0.5){
        x = "hello"
        console.log(x) // x: string
    }else {
        x = 100
        console.log(x) // x: number
    }
    return x // x: string | number
}

// 类型谓词(type predicates) 谓词采用 parameterName is Type 形式
function isFish(pet: Fish | Bird): pet is Fish{
    return (pet as Fish).swim !== undefined
}
function getSmallPet(): Fish | Bird{
    if (Math.random() < 0.5){
        return {
            swim: () => console.log("swim")
        }
    }else {
        return {
            fly: () => console.log("fly")
        }
    }
}
const zoo: (Fish | Bird)[] = [getSmallPet(),getSmallPet(),getSmallPet()]
const underWater1: Fish[] = zoo.filter(isFish)
const underWater2: Fish[] = zoo.filter((pet): pet is Fish => {
    if (pet.name === "sharkey") return  false
    return isFish(pet)
})
// 标签联合 | 可辨识联合(discriminated unions)
interface Shape {
    kind: "circle" | "square";
    radius?: number;
    sideLength?: number;
}
function getArea(shape: Shape){
    return Math.PI * shape.radius! ** 2 // 非空断言：shape.radius! 表示 radius 肯定存在
}
// 上面那种编码问题在于类型检查器无法根据属性知道是否存在 radius 或 sideLength
// 我们要将我们知道的信息传达给类型检查器，让我们重新定义 Shape
interface Circle {
    kind: "circle";
    radius: number;
}
interface Square {
    kind: "square";
    sideLength: number;
}
type betterShape = Circle | Square
function getArea2(shape:betterShape) {
    // if (shape.kind === "circle"){
    //     return Math.PI * shape.radius ** 2
    // }
    // or switch
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2
        case "square":
            return shape.sideLength ** 2
    }
}
// never type 表示不应该存在的状态
// 穷举检查(exhaustiveness checking)
function getArea3(shape: Shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
        // default:
        //     const _exhaustiveCheck: never = shape;
        //     return _exhaustiveCheck;
    }
}
