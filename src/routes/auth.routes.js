import express from 'express'
import { doctorLoginController, registerDoctorController, registerUserController, userLoginController } from '../controllers/auth.controller.js'

const authRouter = express.Router()

authRouter.post("/register/doctor",registerDoctorController)
authRouter.post("/register/user",registerUserController)

authRouter.post("/login/doctor",doctorLoginController)
authRouter.post("/login/user",userLoginController)

export default authRouter