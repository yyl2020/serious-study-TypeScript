/*
* Generics
* */
// bad
function identity(arg: any): any {
    return arg
}
// good 使用 type 变量(特殊变量，作用于类型而不是值)捕获参数类型，以便后面使用该信息
function identity2<Type>(arg: Type): Type {
    return arg
}
// 两种调用的方法1.显式的传入类型参数
let output = identity2<string>('string')
// 2. 编辑器类型参数推断
let output2 = identity2('string')

// 使用泛型类型变量
function loggingIdentity<Type>(arg: Type[]): Type[] {
    return arg
}

/*
* Keyof Type Operator
* */
type Point = { x: number, y: number }
type P = keyof Point // P type -> x | y

type Arrayish = {[n: number]: unknown}
type A = keyof Arrayish

type Mapish = {[k: string]: boolean}
type M = keyof Mapish // 因为JS对象key始终被强制转换为字符串

/*
* Typeof Type Operator 在类型上下文中获取变量或属性的类型,也就是引用某个值的类型
* */
let s = "hello"
let n: typeof s; // n type -> string
/*
* 索引访问类型(Indexed Access Type) 用来查找另一种类型的指定类型
* */
type Person = { age: number; name: string; alive: boolean}
type Age = Person["age"]
type I1 = Person["age" | "name"]; // number | string
type I2 = Person[keyof Person]; // string | number | boolean
type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName];

// 与 typeof 结合，方便捕获数字字面量的元素类型
const MyArray = [
    { name: "Alice", age: 15 },
    { name: "Bob", age: 23 },
    { name: "Eve", age: 38 },
];
type Person3 = typeof MyArray[number]
type Age3 = Person3["age"]
/*
* 条件类型(conditional Types) 有助于描述输入类型与输出类型的关系
* */
interface Animal {
    live(): void
}
interface Dog extends Animal{
    woof(): void
}// 条件类型： SomeType extends OtherType ? TrueType : FalseType;
type example = Dog extends Animal ? number : string
type example2 = RegExp extends Animal ? number : string

// 与泛型一起使用
interface IdLabel {
    id: number;
}
interface NameLabel {
    name: string;
}
function createLabel(id: number): IdLabel
function createLabel(name: string): NameLabel
function createLabel(nameOrId: string|number): NameLabel|IdLabel
function createLabel(nameOrId: string|number): NameLabel|IdLabel{
    throw 'unimplemented'
}
// 上面当确定类型的时候要创建三个重载，如果添加一个处理的新类型，重载数量巨增
// 用条件类型和泛型改造
type nameOrId<T extends string | number> = T extends number ? IdLabel : NameLabel
function createLabelBetter<T extends string | number>(nameOrId: T):nameOrId<T> {
    throw 'unimplemented'
}
// 条件类型约束

/*
* 映射类型(Mapped Types) 建立再索引签名的语法上，用于声明尚未提前声明的属性类型
* */
type Horse = {}
type onlyBoolsAndHorses = {
    [key: string]: boolean | Horse
}
const conforms: onlyBoolsAndHorses = {
    del: true,
    rodney: false
}
// 遍历键创建类型
type OptionsFlags<Type> = {
    [Property in keyof Type]: boolean
}
type FeatureFlags = {
    darkMode: () => void;
    newUserProfile: () => void;
}
type FeatureOptions = OptionsFlags<FeatureFlags>
// 映射修饰符(mapping Modifiers) readonly 和 ?,可以通过加-前缀删除修饰符或者通过+前缀添加修饰符，如果不加前缀默认+
type CreateMutable<Type> = {
    -readonly [Property in keyof Type]: Type[Property]
}
type LockedAccount = {
    readonly id: string;
    readonly name: string;
}
type unLockedAccount = CreateMutable<LockedAccount>

/*
* 模板文字类型
* */
type World = "world"
type Greeting = `hello ${World}`
// 联合类型
type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";
type ALLLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`
// 联合交叉相乘
type Lang = "en" | "ja" | "pt"
type LocaleMessageIDs = `${Lang}_${ALLLocaleIDs}`
