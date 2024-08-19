import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

import userRoutes from './routes/user.js'

const app = express()

dotenv.config()

app.use(cors())
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 3001

mongoose.connect(process.env.DB_URL)
	.then(() => app.listen(port, () => console.log(`Server is running on port: ${port}`)))
	.catch(e => console.log(`Error connecting to MongoDB \n${e}`))

// routes
app.use("", userRoutes)
