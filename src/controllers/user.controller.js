import bcrypt from "bcrypt"
import { editUser } from "../services/user.service.js"
import { editDoctor } from "../services/doctor.service.js"

export function getMeUserController(req,res) {
    const {id,username} = req.user
    res.status(200).json({id,username})
}

export function getMeDoctorController(req,res){
    const {id,username} = req.user
    res.status(200).json({id,username})
}

export async function editMeUserController(req,res,next) {
    const {id} = req.user
    const {username,password} = req.body

    try {
        const hashPassword = await bcrypt.hash(password,5)
        await editUser(id,username,hashPassword)
        res.status(200).json({ message: "Profile updated" })
    } catch(error){
        next(error)
    }
   
}

export async function editMeDoctorController(req,res,next) {
    const {id} = req.user
    const {username,password,specialization} = req.body

      try {
        const hashPassword = await bcrypt.hash(password,5)
        await editDoctor(id,username,hashPassword,specialization)
        res.status(200).json({ message: "Profile updated" })
    } catch(error){
        next(error)
    }
   
}