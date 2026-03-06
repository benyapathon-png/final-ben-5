import bcrypt from "bcrypt"

export function getMeUserController(req,res) {
    const {id,username,specialization} = req.result
    res.status(200).json({id,username,specialization})
}