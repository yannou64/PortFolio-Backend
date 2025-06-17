import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import connectionBDD from "./config/dbConnecion.js"
import authentificationRouter from "./routers/authentificationRouter.js"
import cors from "cors"

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

connectionBDD()
app.listen(port, () => {
    console.log(`Le serveur est démarré sur http://localhost:${port}`)
})

// middlewares de préparation
app.use(cors())
app.use(express.json())
app.use(cookieParser())

// routes du projet
app.use("/auth", authentificationRouter)


