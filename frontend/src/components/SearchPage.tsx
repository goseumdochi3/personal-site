import { Autocomplete, Box, Input, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useGetAllPokemonCards } from '../clients/PokemonQueryClient'
import { PokemonCard } from '../models/PokemonCard'

const cardTypes = ['Pokémon', 'Trainer', 'Energy', 'Special']

const pokemonExpansionSet = [
  'Twilight Masquerade',
  'Silver Tempest',
  'Emerald Suns',
]

const SearchPage: React.FC = () => {
  const {
    data: pokemonCardsResponse,
    error,
    isLoading,
  } = useGetAllPokemonCards()
  const [allPokemonCards, setAllPokemonCards] = useState<PokemonCard[]>([])
  const [filteredPokemonCards, setFilteredPokemonCards] = useState<
    PokemonCard[]
  >([])
  const [cardNameSearch, setCardNameSearch] = useState<string>('')
  const [expansionSetFilter, setExpansionSetFilter] = useState<string>('')
  const [cardTypeFilter, setCardTypeFilter] = useState<string>('')

  useEffect(() => {
    setAllPokemonCards(pokemonCardsResponse?.pokemonCards || [])
  }, [pokemonCardsResponse])

  useEffect(() => {
    setFilteredPokemonCards(filterPokemonCards())
  }, [expansionSetFilter, cardTypeFilter, allPokemonCards, cardNameSearch])

  const filterPokemonCards = () => {
    return allPokemonCards
      .filter((pokemonCard) => {
        if (!expansionSetFilter) {
          return true
        }
        return pokemonCard.cardSet === expansionSetFilter
      })
      .filter((pokemonCard) => {
        if (!cardTypeFilter) {
          return true
        }
        return pokemonCard.cardType === cardTypeFilter
      })
      .filter((pokemonCard) => {
        if (!cardNameSearch) {
          return true
        }
        return pokemonCard.cardName
          .toLowerCase()
          .includes(cardNameSearch.toLowerCase())
      })
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Search Pokemon Card</h1>
      <div className="flex flex-row gap-4">
        <Input
          className="w-1/3 border-solid rounded"
          placeholder="Card Name"
          value={cardNameSearch}
          onChange={(event) => setCardNameSearch(event.target.value)}
        />
        <Autocomplete
          id="card-set-select"
          sx={{ width: '20%' }}
          options={pokemonExpansionSet}
          getOptionLabel={(option) => option}
          onChange={(_, newValue) => setExpansionSetFilter(newValue ?? '')}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props
            return (
              <Box
                key={key}
                component="li"
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                {...optionProps}
              >
                <img loading="lazy" width="20" alt="" />
                {option}
              </Box>
            )
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Expansion Set"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password',
              }}
            />
          )}
        />
        <Autocomplete
          id="card-type-select"
          sx={{ width: '20%' }}
          options={cardTypes}
          getOptionLabel={(option) => option}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props
            return (
              <Box
                key={key}
                component="li"
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                {...optionProps}
              >
                <img loading="lazy" width="20" alt="" />
                {option}
              </Box>
            )
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Card Type"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password',
              }}
              onChange={(event) => setCardTypeFilter(event.target.value)}
            />
          )}
        />
        <Autocomplete
          id="card-type-select"
          sx={{ width: '20%' }}
          disabled
          options={cardTypes}
          getOptionLabel={(option) => option}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props
            return (
              <Box
                key={key}
                component="li"
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                {...optionProps}
              >
                <img loading="lazy" width="20" alt="" />
                {option}
              </Box>
            )
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Card Type"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password',
              }}
            />
          )}
        />
      </div>
      <div>
        {isLoading && <div>Loading...</div>}
        {filteredPokemonCards.length > 0 ? (
          <div className="flex flex-row gap-4 flex-wrap justify-start pt-8 flex-start">
            {filteredPokemonCards.map((pokemonCard) => (
              <img
                key={pokemonCard.uuid}
                className="w-36 cursor-pointer hover:scale-110"
                loading="lazy"
                src={pokemonCard.imageLink ?? ''}
                onClick={() => {
                  window.location.href = `/pokemon-cards/${pokemonCard.cardSet}/${pokemonCard.cardNumber}`
                }}
                alt={
                  'https://i.pinimg.com/originals/b9/eb/42/b9eb42b06ef014d539d1e9f3b2871608.png'
                }
              />
            ))}
          </div>
        ) : (
          <div>No cards found</div>
        )}
      </div>
    </div>
  )
}

export default SearchPage
