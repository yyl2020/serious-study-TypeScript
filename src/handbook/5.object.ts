/*
* Object Types
* */
function greet(person: {name: string, age: number}) {
    return "hello" + person.name
}
// or
interface Person {
    name: string;
    age: number;
}
// or
type Person2 = {
    name: string;
    age: number;
}
/*
* 属性修饰符(property modifiers) 通常可以指定类型，是否可选，是否只读
* */
// 可选属性(optional properties)
type Shape = {
    x: number;
    y: number;
}
interface PaintOptions {
    shape: Shape;
    xPos?: number;
    yPos?: number
}
function paintShape({ shape, xPos = 0, yPos = 0 }: PaintOptions) { // 参数解构，默认值
    // ...
}
// 在解构参数中无法使用类型注释，
function paintShape2({shape2: Shape2, xPos:number = 100}) {
    // console.log(shape2) // Cannot find name 'shape2'. Did you mean 'Shape2'?
    // console.log(xPos) // Cannot find name 'xPos'
}
function getShape() {
    return {
        x: 10,
        y: 10
    }
}
const shape = getShape();
paintShape({ shape });
paintShape({ shape, xPos: 100 });
paintShape({ shape, yPos: 100 });
paintShape({ shape, xPos: 100, yPos: 100 });
// 只读属性(readonly properties)
interface SomeType {
    readonly prop: string;
    readonly resident: { name: string; age: number };
}
function doSomething(obj: SomeType) {
    // We can read from 'obj.prop'.
    console.log(`prop has the value '${obj.prop}'.`);

    // But we can't re-assign it.
    // obj.prop = "hello";

    // 属性本身不能被重写，但是内部内容能改变
    obj.resident.age++
    // obj.resident = { // Cannot assign to 'resident' because it is a read-only property.
    //     name: "Victor the Evictor",
    //     age: 42,
    // };
}
// 索引签名(index signatures) 描述可能值的类型
interface StringArray {
    [index: number]: string
}
const myArray: StringArray = ["jjj", "kkk", "lll"]
const secondItem = myArray[1]
// 索引签名属性类型必须是string或number
// 并且数字索引器返回的类型必须是字符串索引器返回类型的子类型
interface Animal {
    name: string;
}
interface Dog extends Animal {
    breed: string;
}
interface NotOkay {
    // [x: number]: Animal; //Numeric index type 'Animal' is not assignable to string index type 'Dog;
    // [x: string]: Dog
    [x: number]: Dog;
    [x: string]: Animal;
}

/*
* 扩展类型(extending types)
* */
interface BasicAddress {
    name?: string;
    street: string;
    city: string;
    country: string;
    postalCode: string;
}
interface AddressWithUnit extends BasicAddress{
    unit: string;
}
// 多种类型扩展
interface Colorful {
    color: string;
}
interface Circle {
    radius: number;
}
interface ColorfulCircle extends Colorful, Circle {}


/*
* 交集类型(intersection types) 组合现有对象类型,与extends主要区别在与任何处理冲突
* */
type ColorfulCircle2 = Colorful & Circle;
function draw(circle: Colorful & Circle) {
    console.log(`Color was ${circle.color}`);
    console.log(`Radius was ${circle.radius}`);
}
draw({ color: "blue", radius: 42 })
// draw({ color: "red", radus: 42 }) //but 'raidus' does not exist in type 'Colorful & Circle'. Did you mean to write 'radius'?
/*
* 泛型对象类型(generic object types)
* */
interface Box<Type> {
    contents: Type
}
let ABox: Box<string> = { contents: "ye" }
interface Apple {
}
// same as '{ contents: Apple }'
type AppleBox = Box<Apple>
// with generic function
function setContents<Type>(box: Box<Type>, newContents: Type) {
    box.contents = newContents
}
// 与接口不同,类型别名不仅可以描述对象类型,还可以编写其他类型的泛型辅助类型
type OrNull<Type> = Type | null
type OneOrMany<Type> = Type | Type[]
type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>
type OneOrManyOrNullStrings = OneOrManyOrNull<string>

// 数组类型(array types) number[] 是 Array<number>的简写
function doSomething2(value: Array<string>) {

}
let myArray2: string[] = ["1","2"]
doSomething2(myArray2)
doSomething2(new Array("hello","work"))

// Array 本身就是泛型类型
interface ArrayFake<Type> {
    length: number;
    pop(): Type | undefined;
    push(...items: Type[]): number
}

// 只读数组类型(readonlyArray types)
function doStuff(values: ReadonlyArray<string>) { // 简写-> readonly string[]
    const copy = values.slice()
    console.log(`the first value${values[0]}`)
    // values.push("hello") // Property 'push' does not exist on type 'readonly string[]'
}

// 元组类型(tuple types) 另一种形式的Array,知道数组有多少元素,类型和位置
type StringNumberPair = [string, number]
function doSomething3(pair: [string, number]){
    const a = pair[0]
    const b = pair[1]
    // 解构元组
    const [x, y] = pair
}
doSomething3(["1",2])
// 下面的接口等价与简单的元组类型
interface StringNumberPair2 {
    length: 2;
    0: string;
    1: number;
}
// 元组的可选属性
type Either2dOr3d = [number, number, number?]
// 元组也有剩余元素,这些元素必须是数组/元组类型
type StringNumberBooleans = [string, number, ...boolean[]]
const a2: StringNumberBooleans = ["hello", 1];
const b2: StringNumberBooleans = ["beautiful", 2, true];
const c2: StringNumberBooleans = ["world", 3, true, false, true, false, true];
// 当想要使用带有剩余参数的可变数量的参数，并且你需要最少数量的元素，但又不想引入中间变量时
function redaButtonInput(...args: [string, number, ...boolean[]]) {
    const [name, version, ...input] = args
}
// 基本相当于：
function redaButtonInput2(name: string, version: string, ...input: boolean[]) {
}

// 只读元组类型(readonly tuple types)
function doSomething5(pair: readonly [string, number]) {
}










