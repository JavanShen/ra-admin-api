import UserServer from "../server/UserServer"

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

const verifyUserExist = async (username: string) => {
    return (await UserServer.findUserByUserName(username)).length > 0
}

export {verifyPassword, verifyUsername, verifyUserExist}