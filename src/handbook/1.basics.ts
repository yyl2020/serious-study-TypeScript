/*
* 静态类型检查: 在代码运行之前发现错误
* */

/*
* 非异常错误：TS能识别的一些错误
* */
// 错别字
// 未调用的函数
// 基本逻辑错误

/*
* 工具类型:提供类型信息辅助编码
* */

/*
* tsc 转换 TS 文件时遵循 you will know better than TypeScript 原则
* 也就是说如果类型检查错误时, tsc 会报错，但是依然会将 TS 编译成 JS
* 如果想TS行为更加严格使用 tsc --noEmitOnError XX.ts
* */


/*
* 显式类型
* */
function greet(person: string, date: Date) {
    console.log(`${person} +++ ${date.toDateString()}`)
}
greet("name", new Date())

/*
* tsc 编译TS文件会将类型擦除，注意：类型注释不会改变程序的运行时行为
* 并且 ES 版本也会进行降级，默认降为ES3.使用 tsc --target es2015 XX.ts 指定降级版本
* */
