import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Record from './components/Record'
import UserList from './components/UserList'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <UserList />,
      },
    ],
  },
  {
    path: '/edit/:id',
    element: <App />,
    children: [
      {
        path: '/edit/:id',
        element: <Record />,
      },
    ],
  },
  {
    path: '/create',
    element: <App />,
    children: [
      {
        path: '/create',
        element: <Record />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
