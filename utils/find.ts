import { userList } from "../data/user"

const findUser = (username: string) => userList.find(item => item.username === username)

export { findUser }