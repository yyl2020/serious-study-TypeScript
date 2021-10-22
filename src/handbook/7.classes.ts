/*
* 字段成员(Class Members)
* */
// 字段(Fields)
class Point {
    x: number = 0; // 字段初始化
    y: number = 0; // --strictPropertyInitialization 控制是否需要初始化类字段
}
const point = new Point()

class GoodGreeter {
    name: string;
    constructor() {
        this.name = "hello";// TypeScript 不会分析从构造函数调用的方法来检测初始化
    }
}
class OKGreeter {
    name!: string; // 使用明确赋值断言运算符避免未初始化报错
}
// readonly 反正改造函数以外对字段赋值
class Greeting {
    readonly name: string = "world";
    constructor(otherName) {
        if (typeof otherName !== undefined){
            this.name = otherName
        }
    }
    changeName(){
        // this.name = "world" //Cannot assign to 'name' because it is a read-only property.
    }
}
// 构造函数(constructors) 与函数类似
// 区别是构造函数不能有返回类型注释，不能有类型参数

// super call 使用this指向成员之前，在构造函数体内使用super()
class Base {
    k = 4
}
class Derived extends Base{
    constructor() {
        // console.log(this.k) //'super' must be called before accessing 'this' in the constructor of a derived class.
        super();
    }
}
// 方法(Methods) 类上的函数属性称为方法
class line extends Point{
    constructor() {
        super();
    }
    scale(n: number): void{
        this.x *= n
        this.y *= n
    }
}
// Getters/Setters
class C {
    _length = 0
    get length() { // 如果get存在但不存在set，则该属性自动readonly
        return this._length
    }
    set length(value) { // 如果没有指定setter参数的类型，则根据getter的返回类型推断
        this._length = value
    }
}
// 索引签名(index signatures) 与对象类型的索引签名相同
class MyClass {
    [s: string]:boolean | ((s: string) => boolean); // 通常将索引数据存储在另一个地方而不是类实例本身。
    check(s:string){
        return this[s] as boolean;
    }
}

/*
* 类继承(Class Heritage)
* */
// implements clauses(子句) 来检查类是否满足特定的 interface
interface Pingable {
    ping(): void
}
class Sonar implements Pingable{
    ping() {
        console.log("ping")
    }
}
// 类也可以实现多个接口
// class C implements A, B{ }
// 注意事项(Cautions)：implements 子句不会改变类或它的方法的类型
interface Checkable {
    check(name: string): boolean
}
class NameCheck implements Checkable{
    check(s) { // Parameter 's' implicitly has an 'any' type.
        return s.toUpperCase() === 'OK'
    }
}
// extends clauses 派生类具有其基类的所有属性和方法
class Animal {
    move(){
        console.log("move")
    }
}
class Dog extends Animal{
    woof(timer: number){
        for (let i = 0; i < timer; i++){
            console.log('woof')
        }
    }
}
const d = new Dog()
d.move()
d.woof(10)
// 覆盖方法(overriding methods) 最好不用，派生类遵循基类契约很重要
class Cat extends Animal {
    move(name?: string):void {
        if (name === undefined){
            super.move();
        }else {
            console.log("fly")
        }
    }
}
// 初始化顺序(initialization Order)
class BaseClass {
    name = 'base' // 1
    constructor(){ // 2
        console.log("my name is" + this.name)
    }
}
class DerivedClass extends BaseClass {
    name = 'derived' // 3
    constructor() { // 4
        super();
    }
}
const g = new DerivedClass() // print 'base'
// 初始化顺序 1->2->3->4
/*
* 成员可见性(Member Visibility) JS运行时，依然可以访问 private 或 protected 成员
* */
class GreetingFaker {
    private name = "yyy" // private 仅类内部可见
    public greet(){ // public 默认可见性，在任何地方可以访问
        console.log("hi!")
    }
    protected getName(){ // protected 仅对声明它们的类的子类可见
        return 'hi!'
    }
}
class SpecialGreeter extends GreetingFaker{
    public howdy(){
        console.log("hello" + this.getName())
    }
}
const v = new SpecialGreeter()
v.greet()
// v.getName() // Property 'getName' is protected and only accessible within class 'GreetingFaker' and its subclasses.

/*
* 静态成员(Static Members) 与类的特定实例无关，可以通过类构造函数对象本身访问
* */
class MyStaticClass {
    static x = 0
    static printX(){
        console.log(MyStaticClass.x)
    }
}
console.log(MyStaticClass.x)
MyStaticClass.printX()

// special static names: 覆盖 function 原型属性是不安全的，所以不能使用某些static名称，如 name,length,call
class S {
    // static name = "S!"; // Static property 'name' conflicts with built-in property 'Function.name' of constructor function 'S'.
}

/*
* static Blocks in Classes : 静态块允许您编写具有自己范围的语句序列，这些语句可以访问包含类中的私有字段
* */
// class Foo {
//     static #count = 0;
//
//     get count() {
//         return Foo.#count;
//     }
//
//     static {
//     try {
//      const lastInstances = loadLastInstances();
//      Foo.#count += lastInstances.length;
//       }catch {}
//    }
// }
/*
* (Generic Classes)
* */
class Box<Type> {
    contents: Type;
    constructor(value: Type) {
        this.contents = value;
    }
}
const b = new Box("hello")
/*
* this at Runtime in Classes this的指向取决于函数的调用方式
* */

/*
* this types
* */

// this-基本类型守卫

/*
* 参数属性(parameter properties) 将构造函数参数转换为具有相同名称和值的类属性。
* */
class Params {
    constructor(
        public readonly x: number,
        protected y: number,
        private z: number
    ) {
    }
}
const a = new Params(1,2,3)
console.log(a.x)
// console.log(a.z) // Property 'z' is private and only accessible within class 'Params'.
/*
* Class Expressions 类表达式与类声明非常类似，唯一的区别是类表达式不需要名称，然后可以和任何标识符绑定
* */
const someClass = class<Type> {
  content: Type;
  constructor(value: Type) {
      this.content = value
  }
}
/*
* 抽象类和成员(abstract Classes and Members)
* 抽象方法或者抽象字段没有提供实现，这些成员必须存在抽象类中，不能直接实例化
* */
abstract class Base2{
    abstract getName(): string; // 如果没有实现基类的抽象成员会报错
    printName(){
        console.log("hello" + this.getName())
    }
}
// const b2 = new Base2() //  Cannot create an instance of an abstract class.
class Derived2 extends Base2 {
    getName(): string {
        return "world";
    }
}
const d2 = new Derived2();
d2.printName();
/*
* 类之间的关系(Relationships Between Class) 类会在结构上进行比较，与其他类型相同
* */
class Point1 {
    x = 0;
    y = 0;
}
class Point2 {
    x = 0;
    y = 0;
}
const p: Point1 = new Point2() // 这两个类可以相互替代
