import { userList } from "../data/user"

const verifyUsername = (val: unknown) => {
    if (typeof val !== 'string') return false
    
    const len = val.length
    if (len < 2 || len > 7) return false
    
    return true
}


const verifyPassword = (val: unknown) => {
    if (typeof val !== 'string') return false

    const len = val.length
    if(len < 6 || len > 16) return false

    return true
}

const verifyUserExist = (username: string) => {
    return userList.findIndex(item => item.username === username) > -1
}

export {verifyPassword, verifyUsername, verifyUserExist}