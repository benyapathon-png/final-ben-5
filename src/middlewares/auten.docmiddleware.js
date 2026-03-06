import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import { findDoctorUsername } from '../services/auth.service.js'


async function authDoctorCheck(req,res,next) {
    console.log("55555")
    try {
        const authorization = req.headers.authorization
        if(!authorization) {
            throw createError(401,"Unauthorization")
        }

        

        const token = authorization.split(" ")[1]
        console.log("token")
        const payload = jwt.verify(token,process.env.JWT_SECRET,{
            algorithms: ['HS256']
        })
        console.log("payload")
        const user = await findDoctorUsername(payload.username)
        if(!user) {
            throw createError(401,"Unauthorization")
        }
        req.user = user
        next()
    } catch(error) {
        console.log("paylo55555ad")
        next(error)
    }
}

export default authDoctorCheck
