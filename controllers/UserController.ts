import { verifyUsername, verifyPassword, verifyUserExist } from "../utils/validate"
import jwt from "../utils/jwt"
import UserServer from "../server/UserServer"

export default {
    async login(username: unknown, password: unknown){
        if (!verifyUsername(username)) return {
            code: 0,
            message: '用户名格式错误'
        }

        if (!verifyPassword(password)) return {
            code: 0,
            message: '密码格式错误'
        }

        if (!await verifyUserExist(username as string)) return {
            code: 0,
            message: '用户名不存在'
        }

        const [user] = await UserServer.findUserByUserName(username as string)

        if (user?.password !== password) return {
            code: 0,
            message: '密码错误'
        }

        const token = jwt.generate({
            username,
            role: user?.role || 'user'
        }, '1d')

        return {
            code: 1,
            token
        }
    },
    async register(username: unknown, password: unknown) {
        if (!verifyUsername(username)) return {
            code: 0,
            message: '用户名格式错误'
        }

        if (!verifyPassword(password)) return {
            code: 0,
            message: '密码格式错误'
        }

        if (await verifyUserExist(username as string)) return {
            code: 0,
            message: '用户名已存在'
        }

        const res = await UserServer.addUser(username as string, password as string)

        if (!res) return {
            code: 0,
            message: '注册失败'
        }

        return {
            code: 1,
            message: '注册成功'
        }
    }
}