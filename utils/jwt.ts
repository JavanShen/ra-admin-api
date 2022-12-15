import jwt from 'jsonwebtoken'

import type { SignOptions,sign } from 'jsonwebtoken'

const secret = 'feoiauf'

export default {
    generate(val: Parameters<typeof sign>['0'], exprires: SignOptions['expiresIn']) {
        return jwt.sign(val, secret, {expiresIn:exprires})
    },
    verify(token: string) {
        return jwt.verify(token, secret)
    }
}