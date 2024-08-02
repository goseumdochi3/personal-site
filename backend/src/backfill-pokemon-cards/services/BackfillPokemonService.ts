import { PokemonCardService } from './PokemonCardService'
import { allPokemonCardSets } from '../../models/PokemonCardSets'
import { getPokemonCardsFromSet } from '../client/PokellectorScrapingClient'
import { setTimeout } from 'timers/promises'

const backfillAllPokemonCards = async () => {
  for (const setName of allPokemonCardSets) {
    console.log(`Backfilling ${setName}`)

    const cards = await getPokemonCardsFromSet(setName)

    await new PokemonCardService().bulkCreatePokemonCardsFromList(cards)

    console.log(`Backfilled ${setName}`)

    // Timeout to avoid overloading external servers
    await setTimeout(300)
  }
}

export { backfillAllPokemonCards }
