import express from 'express'
import authUserCheck from '../services/user.service.js'
import { getMeUserController } from '../controllers/user.controller.js'


const userRouter = express.Router()

userRouter.get("/me",authUserCheck,getMeUserController)

export default userRouter