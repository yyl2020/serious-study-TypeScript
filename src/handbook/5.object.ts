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

// 数组类型(array types)

// 只读数组类型(readonlyArray types)

// 元组类型(tuple types)

// 只读元组类型(readonly tuple types)
