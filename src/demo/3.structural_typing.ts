/*
* 结构类型系统：TS的核心原则是类型检查侧重于值的形状
* */
// 在结构类型系统中，如果两个对象具有相同的形状，则认为属于同一类型
interface Point {
    x: number;
    y: number
}
function logPoint(p: Point) {
    console.log(`${p.x},${p.y}`)
}
const point = {
    x: 12,
    y: 99
}
// point 没有被声明为 Point 类型。
// 但是TS会在类型检查中将 point 形状(shape)与 Point 的形状进行比较
// 他们形状相同，所以代码检查通过
logPoint(point)
// 形状匹配只需要匹配对象字段的子集
const point2 = {
    x:11,
    y:133,
    z:5
}
logPoint(point2)
