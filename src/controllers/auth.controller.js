import createError from 'http-errors'
import bcrypt from "bcrypt"
import { createDoctorToken, createDoctorUser, createUser, findDoctorUsername, findUserUsername } from '../services/auth.service.js'

export async function registerDoctorController(req,res,next){
    const {username,password,specialization} = req.body

    try{
        const userDoctor = await findDoctorUsername (username)

        if(userDoctor) {
            throw createError(400,"username already exist")
        }
        const hashedPassword = await bcrypt.hash(password,5)
        const newDoctor = await createDoctorUser (username,hashedPassword,specialization)
        res.status(201).json({
            message: "Doctor user success",
            user: {
                id: newDoctor.id,
                username: newDoctor.username,
                specialization:newDoctor.specialization
            }
        })
    } catch(error){
        next(error)
    }    
}

export async function registerUserController(req,res,next) {
    const {username,password} = req.body
    console.log(username,password)
    try {
        const user = await findUserUsername(username)

        if(user) {
            throw createError(400,"username already exist")
        }
        const hashedPassword = await bcrypt.hash(password,5)
        const newUser = await createUser(username,hashedPassword)
        res.status(201).json({
            message: "User Register success",
            user: {
                id: newUser.id,
                username: newUser.username,
            }
        })
    } catch(error) {
        next(error)
    }
}

export async function doctorLoginController(req,res,next) {
    const {username,password} = req.body

    try {
        const doctor = await findDoctorUsername(username)
        const isMatch = await bcrypt.compare(password,doctor.password)
        if(!doctor || !isMatch) {
            throw createError(401,"Invalid condentials")
        }
        const token = await createDoctorToken(doctor)

        res.status(201).json({
            message: "Doctor Login success",
            token: token,
            user: {
                id:doctor.id,
                username: doctor.username
            }
        }) 
    }catch (error) {
        next(error)
    }
}

export async function userLoginController(req,res,next) {
    const {username,password} = req.body

    try {
        const user = await findUserUsername(username)
        const isMatch = await bcrypt.compare(password,user.password)
        if(!user || !isMatch) {
            throw createError(401,"Invalid condentials")
        }
        const token = await createDoctorToken(user)

        res.status(201).json({
            message: "User Login success",
            token: token,
            user: {
                id:user.id,
                username: user.username
            }
        }) 
    }catch (error) {
        next(error)
    }
}