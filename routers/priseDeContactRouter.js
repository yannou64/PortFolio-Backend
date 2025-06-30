import express from "express"
import {sendMessage} from "../controllers/priseDeContactControllers.js"

const priseDeContactRouter = express.Router()

priseDeContactRouter.post("/", sendMessage)

export default priseDeContactRouter