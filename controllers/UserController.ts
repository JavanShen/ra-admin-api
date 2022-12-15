import { verifyUsername, verifyPassword, verifyUserExist } from "../utils/validate"
import { findUser } from "../utils/find"
import jwt from "../utils/jwt"
import UserModel from "../model/UserModel"

export default {
    login(username: unknown, password: unknown){
        if (!verifyUsername(username)) return {
            code: 0,
            message: '用户名格式错误'
        }

        if (!verifyPassword(password)) return {
            code: 0,
            message: '密码格式错误'
        }

        if (!verifyUserExist(username as string)) return {
            code: 0,
            message: '用户名不存在'
        }

        const user = findUser(username as string)

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
    register(username: unknown, password: unknown) {
        if (!verifyUsername(username)) return {
            code: 0,
            message: '用户名格式错误'
        }

        if (!verifyPassword(password)) return {
            code: 0,
            message: '密码格式错误'
        }

        if (verifyUserExist(username as string)) return {
            code: 0,
            message: '用户名已存在'
        }

        UserModel.addUser(username as string, password as string, 'user')

        return {
            code: 1,
            message: '注册成功'
        }
    }
}