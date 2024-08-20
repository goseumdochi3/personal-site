import './config.ts'

import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { getSoldDataForEntireSet } from './src/ebay-scraper/services/EbayScraperService.ts'
import { ErrorHandler } from './src/middlewares/errorHandler'
import PokemonCardRoutes from './src/pokemon-cards/routes/pokemonCardRoutes'

const PORT = process.env.PORT || 5050
const app = express()

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'none'"],
      },
    },
  })
)

app.use(cors(corsOptions))
app.use(express.json())
app.use(ErrorHandler)

app.use('/', new PokemonCardRoutes().initRoutes())

getSoldDataForEntireSet('Silver Tempest')

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
