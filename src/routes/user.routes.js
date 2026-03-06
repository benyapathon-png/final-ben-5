import express from 'express'
import { editMeUserController, getMeUserController } from '../controllers/user.controller.js'
import authUserCheck from '../middlewares/authen.middleware.js'


const userRouter = express.Router()

userRouter.get("/me",authUserCheck,getMeUserController)
userRouter.put("/me",authUserCheck,editMeUserController)

export default userRouter