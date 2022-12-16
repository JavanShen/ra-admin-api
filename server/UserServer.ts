import UserModel from "../model/UserModel";

export default {
    addUser(username: string, password: string, role = 'user') {
        return UserModel.create({
            username,
            password,
            role
        })
    },
    findUserByUserName(username: string) {
        return UserModel.find({
            username
        }).exec()
    }
}