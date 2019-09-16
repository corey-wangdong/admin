/*包含应用中所有的接口请求函数的模块，每个函数的返回值都是promise */


import ajax from './ajax'

const BASE = 'http://localhost:8888'

// 登录
// export function reqLogin(username,password) {
//     return ajax('./login',{username,password},'POST')
// }

/*箭头函数的强大缩写 */

export const reqLogin = (username,password) => ajax(BASE + '/login',{username,password},'POST')

// 添加用户
// export const reqAddUser = (user) => ajax(BASE + '/manage/user/add',user,'POST')