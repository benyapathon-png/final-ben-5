import { prisma } from "../config/prismaClient.js"
import jwt from "jsonwebtoken"

export const findDoctorUsername = async(username)=>{
    const userDoctor = await prisma.doctor.findFirst({
        where:{username : username} 
    })
    return userDoctor
}

export const createDoctorUser = async (username,hashedPassword,specialization) => {
    const newDoctor = await prisma.doctor.create({
        data : {
            username,
            password:hashedPassword,
            specialization
        }
    })
    return newDoctor
}

export const findUserUsername = async(username)=>{
    const user = await prisma.user.findFirst({
        where:{username:username}
    })
    return user
} 

export const createUser = async (username,hashedPassword)=>{
    const newUser = await prisma.user.create({
        data : {
            username,
            password: hashedPassword
        }
    })
    return newUser
}

export const createDoctorToken = async (doctor) => {
    const payload = {
        id: doctor.id,
        username: doctor.username
    }

    const token = jwt.sign(payload,process.env.JWT_SECRET,{
        algorithm:'HS256',
        expiresIn: '30d'
    })
    return token
}


export const createUserToken = async (user) => {
    const payload = {
        id: user.id,
        username: user.username
    }

    const token = jwt.sign(payload,process.env.JWT_SECRET,{
        algorithm:'HS256',
        expiresIn: '30d'
    })
    return token
}