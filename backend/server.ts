import './config.ts'

import express from 'express'
import cors from 'cors'
import { ErrorHandler } from './src/middlewares/ErrorHandler'
import { UserRouter } from './src/auth/routes/UserRouter'

const PORT = process.env.PORT || 5050
const app = express()

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(ErrorHandler)

app.use(new UserRouter().router)

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
