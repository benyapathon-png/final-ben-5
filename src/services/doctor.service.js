import jwt from "jsonwebtoken"
import { prisma } from "../config/prismaClient.js"

export const editDoctor = async (id,username,hashedPassword,specialization) => {
    const user = await prisma.doctor.update({
        where:{id:id},
        data: {
            username,
            password:hashedPassword,
            specialization
        }
    })
    return user
}