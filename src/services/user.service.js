import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import { findDoctorUsername, findUserUsername } from './auth.service.js'

async function authUserCheck(req,res,next) {
    try {
        const authorization = req.headers.authorization
        if(!authorization) {
            throw createError(401,"Unauthorization")
        }

        const token = authorization.split(" ")[1]
        const payload = jwt.verify(token,process.env.JWT_SECRET,{
            algorithms: ['HS256']
        })
        const userDoctor = await findUserUsername(payload.id)
        if(!userDoctor) {
            throw createError(401,"Unauthorization")
        }
        req.result = userDoctor
    } catch(error) {
        next(error)
    }
}

export default authUserCheck