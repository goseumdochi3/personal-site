import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetPokemonCardSalesData } from '../clients/PokemonQueryClient'
import { PokemonCardSalesData } from '../models/PokemonCardSalesData'

const PokemonCardPage: React.FC = () => {
  const { expansion, cardNumber } = useParams()
  const { data, isLoading, error } = useGetPokemonCardSalesData(
    expansion,
    cardNumber
  )
  const [salesData, setSalesData] = useState<PokemonCardSalesData[]>([])
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [orderBy, setOrderBy] = useState<keyof PokemonCardSalesData>('soldDate')

  useEffect(() => {
    setSalesData(data?.pokemonCardSalesData || [])
  }, [data, isLoading])

  const handleRequestSort = (property: keyof PokemonCardSalesData) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const sortedData = [...salesData].sort((a, b) => {
    if (orderBy === 'soldDate') {
      return order === 'asc'
        ? new Date(a.soldDate).getTime() - new Date(b.soldDate).getTime()
        : new Date(b.soldDate).getTime() - new Date(a.soldDate).getTime()
    } else {
      return order === 'asc'
        ? a[orderBy] < b[orderBy]
          ? -1
          : 1
        : a[orderBy] > b[orderBy]
          ? -1
          : 1
    }
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">Sale Title</TableCell>
            <TableCell align="left">
              <TableSortLabel
                active={orderBy === 'price'}
                direction={orderBy === 'price' ? order : 'asc'}
                onClick={() => handleRequestSort('price')}
              >
                Price
              </TableSortLabel>
            </TableCell>
            <TableCell align="left">
              <TableSortLabel
                active={orderBy === 'soldDate'}
                direction={orderBy === 'soldDate' ? order : 'asc'}
                onClick={() => handleRequestSort('soldDate')}
              >
                Date
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">Link</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {sortedData.map((sale) => (
            <TableRow key={sale.id}>
              <TableCell align="left">{sale.title}</TableCell>
              <TableCell align="left">{sale.price}</TableCell>
              <TableCell align="left">
                {new Date(sale.soldDate).toLocaleDateString('en-US', {
                  month: '2-digit',
                  day: '2-digit',
                  year: 'numeric',
                })}
              </TableCell>
              <TableCell align="right">
                <a href={sale.link} className="hyperlink">
                  Sale Link
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default PokemonCardPage
