import express from 'express'
import "dotenv/config"
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
import doctorRouter from './routes/doctor.routes.js'



const app = express()
app.use(express.json())

const PORT = process.env.PORT

//try
// app.use("/",(req,res)=>{
//     res.send("runja")
// })

app.use("/auth",authRouter)
app.use("/users",userRouter)
app.use("/doctors",doctorRouter)


app.listen(PORT,()=>{
    console.log(`server is running naja at http://localhost:${PORT}`)
})