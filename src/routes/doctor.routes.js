import express from 'express'
import authDoctorCheck from '../middlewares/auten.docmiddleware.js'
import { editMeDoctorController, getMeDoctorController} from '../controllers/user.controller.js'


const doctorRouter = express.Router()

doctorRouter.get("/me",authDoctorCheck,getMeDoctorController)
doctorRouter.put("/me",authDoctorCheck,editMeDoctorController)

export default doctorRouter