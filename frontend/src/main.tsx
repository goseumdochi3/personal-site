import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './App'
import PokemonQueryClientProvider from './clients/PokemonQueryClientProvider'
import PokemonCardPage from './components/PokemonCardPage'
import SearchPage from './components/SearchPage'
import UserList from './components/UserList'
import './styles.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    children: [
      {
        path: '/',
        element: <UserList />,
      },
    ],
  },
  {
    path: '/pokemon-cards/:expansion/:cardNumber',
    element: <HomePage />,
    children: [
      {
        path: '/pokemon-cards/:expansion/:cardNumber',
        element: <PokemonCardPage />,
      },
    ],
  },
  {
    path: '/pokemon-cards',
    element: <HomePage />,
    children: [
      {
        path: '/pokemon-cards',
        element: <SearchPage />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PokemonQueryClientProvider>
      <RouterProvider router={router} />
    </PokemonQueryClientProvider>
  </React.StrictMode>
)
