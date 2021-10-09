/*
 * 组合类型
 */
// unions 联合类型
type MyBool = true | false
type LockState = "locked" | "unlocked"
type PositiveOddNumbersUnderTen = 1 | 3 | 5 | 7 | 9
// unions也提供了一种处理不同类型的方法
function getLength(obj: string | string[]) {
    if(typeof obj === "string"){ // 使用 typeof 判断变量类型
        return [obj]
    }
    return obj.length
}

// generics 泛型
// 泛型为类型提供变量
type StringArray = Array<string>
type ObjectWithNameArray = Array<{ name: string }>
// 可以声明自己使用泛型的类型
interface Backpack<Type> {
    add: (obj: Type) => void;
    get: () => Type
}
declare const backpack: Backpack<string>
const obj = backpack.get()
// backpack.add(11)
