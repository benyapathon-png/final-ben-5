
import jwt from "jsonwebtoken"
import { prisma } from "../config/prismaClient.js"

export const editUser = async (id,username,hashedPassword) => {
    const user = await prisma.user.update({
        where:{id:id},
        data: {
            username,
            password:hashedPassword
        }
    })
    return user
}