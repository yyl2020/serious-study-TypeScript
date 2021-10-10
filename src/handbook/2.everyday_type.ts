/*
* primitives: string, number, boolean
* Array: Array<type>, type[]
* any: 代表任何类型，可以使用 noImplicitAny 禁止使用any
* */

/*
* function: 指定输入和输出值的类型
* */

/*
* Object Types: 定义对象类型，只需要列出其属性及其类型
* */
let obj: {
    x: number,
    y?: number // 可选属性
}

/*
* Union Types
* */
function print (id: number | string) { // 定义联合类型
    if (typeof id === 'string'){   // 缩小联合类型，推断出更具体的类型
        console.log(id.toUpperCase())
    } else {
      console.log(id)
    }

}

/*
* type: 类型别名
* */
type ID = number | string
type UserInputSanitizedString = string;
type Point = {
    x: number,
    y: number
}
/*
* Interfaces:另一种命名对象类型的方式
* */
interface Ponint2 {
    x: number,
    y: number
}
// type 与 interface 非常类似
// 关键区别在于 type 不能添加新属性，interface 是可扩展的

/*
* 类型断言: 指定更具体的类型
* */
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement
const myCanvas2 = <HTMLCanvasElement>document.getElementById("main_canvas")

/*
* null 和 undefined
* */
// 非空断言运算符
function live(x?: number | null) {
    console.log(x!.toFixed()) // no error
}

/*
* 枚举 (enum)
* */
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}

/*
* Less Common Primitives: bigint symbol*/
const onHundred: bigint = BigInt(100)
const fname = Symbol()
