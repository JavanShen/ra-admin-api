import { userList } from "../data/user";

export default {
    addUser(username: string, password: string, role: string) {
        userList.push({
            username,
            password,
            role
        })
    }
}