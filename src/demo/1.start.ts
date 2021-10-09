/*
 * 推导类型
 */
let hello = "hello w"

/*
 * 定义类型
 */
interface User {
    name: string,
    id: number
}
const user: User = {
    name: "yyl",
    id: 0
}

// 对类使用 interface declaration
class UserAccount {
    name: string;
    id: number;
    constructor(name: string, id: number) {
        this.name = name
        this.id = id
    }
}
const user2: User = new UserAccount("yyl", 1)

// 可以用接口来注释参数并将值返回给函数
function getAdminUser(): User {
    // ...
    return {name: "111", id:22}
}
function deleteUser(user:User){
    // ...
}



