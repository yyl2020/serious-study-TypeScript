/*
* 模块(modules)
* */
// 语法: 用什么语法来导入和导出东西？
// 模块解析: 模块名称与磁盘上的文件有什么关系
// 模块输出目标: 输出的模块应该是什么样的

import RandomNumberGenerator, { helloWorld as hello } from './7.classes'
import * as classes from './7.classes' // 导出的对象并将它们放入单个命名空间中
hello()
let r = new RandomNumberGenerator()
classes.helloWorld()

// TS 特定的 ES 模块语法
import {  Cats, Dogs } from "./7.classes"; // import 语句只能 import 类型
type Animal = Cats | Dogs

// TS模块配置
// target 它决定了哪些 JS 功能被降级（转换为在较旧的 JavaScript 运行时中运行），哪些保持不变
// module 这决定了模块之间使用哪些代码进行交互
