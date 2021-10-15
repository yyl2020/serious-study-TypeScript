/*
* 函数类型表达式(Function Type Expressions) 在语法上类似箭头函数
* */
function greeter(fn: (a: string) => void){ // 或者 type GreetFunction = (a: string) => void;
    fn("hello")
}
function printgre(s: string){
    console.log(s)
}
greeter(printgre)
/*
* 回调签名(Call Signatures) 类似fn.length函数属性
* */
type  DescribableFunction = {
    description: string;
    (someArg: number): boolean;
}

function doSomething (fn: DescribableFunction){
    console.log(fn.description + 'return' + fn(4))
}
/*
* 构造签名(Construct Signatures)
* */
type SomeObject = any
type SomeConstructor = {
    new (s: string): SomeObject;
}
function fn(ctor: SomeConstructor) {
    return new ctor('hello')
}
// 有一些对象可以用new也可以不用，比如Date。你可以任意组合同一类型的调用和构造签名。
interface CallOrConstruct {
    new (s: string): Date
    (n?: number): number
}

/*
*泛型函数(Generic Functions)，描述两个值之间的对应关系时，会使用泛型
*/
function firstElement(arr: any[]) {
    return arr[0]
}
// 使用泛型后
function firstElement2<Type>(arr: Type[]): Type | undefined {
    return arr[0]
}
const s = firstElement2(["a","b","c"])
const n = firstElement2([1,2,3])
const u = firstElement2([])
// 推理(Inference)
function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
    return arr.map(func)
}
// TS 可以推断 Input 类型参数的类型(来自[1,2,3]),以及 Output 基于函数表达式的返回值的类型参数
const parsed = map([1,2,3], (n) => n*2)
// 约束(Constraints) 通过 extend 实现约束参数类型, 泛型都是将两个或多个具有相同类型的值关联起来
function longest<Type extends { length: number }>(a: Type, b: Type) {
    if (a.length <= b.length){
        return a
    } else {
        return b
    }
}
const longerArray = longest([1,2],[1,2,3,4])
const longerString = longest("sting", "string")
// error
//const notOK = longest(10,100)
// 使用受约束的值
// 看起来没问题，但是该函数承诺返回与传入相同类型的对象，而不仅仅时某些与约束匹配的对象
// function minimumLength<Type extends { length: number }>(obj: Type, minimum: number):Type {
//     if (obj.length < minimum){
//         return obj
//     }else {
//         return {
//             length: minimum
//         }
//     }
// }
// // 应该返回 number[], 但是返回了{ length: 6 }
// const arr = minimumLength([1, 2, 3], 6);

// 指定类型参数(Specifying Type Arguments) 泛型有些时候并不能正确推导出类型
function combine<Type>(arr: Type[], arr2: Type[]): Type[] {
    return arr.concat(arr2)
}
// const arr = combine([1,2,3], ['hello']) // Type 'string' is not assignable to type 'number'.
const arr = combine<string | number>([1,2,3], ['hello']) // 手动指定类型

// 正确编写泛型函数指南
// 下推类型参数(push type parameters down)
// good 尽量使用自身的类型参数而不是约束它
function firstEl1<Type>(arr: Type[]) {
    return arr[0]
}
// bad
function firstEl2<Type extends any[]>(arr: Type[]) {
    return arr[0]
}
// 使用更少的类型参数(push type parameters down)
// good
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
    return arr.filter(func)
}
// bad
function filter2<Type, Func extends (arg: Type)=> boolean>(arr: Type[],func: Func): Type[] {
    return arr.filter(func)
}
// 类型参数应该出现两次(type parameters should appear twice)
// 类型参数用于关联多个值类型，如果类型参数只出现一次，说明没有关联任何东西
// good
function greet2(s: string) {
    console.log('hello' + s)
}
// bad 如果一个类型参数只出现在一个位置，重新考虑你是否真的需要它
function greet3<Str extends string>(s: Str){
    console.log('hello' + s)
}

/*
* 可选参数(Optional Parameters)
* */
// 可选参数
function f(x?: number) {

}
// 默认参数
function f1(x=10) {

}
// 回调函数中的可选参数(Optional Parameters in Callbacks)
// 容易犯的错误 为回调编写函数类型时，切勿编写可选参数，除非您打算在不传递该参数的情况下调用该函数
function myForEach(arr: any[], callback:(arg:any, index?: number)=> void) {
    for (let i = 0; i < arr.length; i++){
        callback(arr[i], i)
    }
}
myForEach([1, 2, 3], (a, i) => {
    console.log(i.toFixed()); // Object is possibly 'undefined'.
});
