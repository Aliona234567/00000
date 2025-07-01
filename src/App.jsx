import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './pages/Layout/layout'
import { Home } from './pages/Home/Home'
import { Login } from './pages/Login/Login'
import { Register } from './pages/Register/Register'
import { Profile } from './pages/Profile/Profile'
import { Cart } from './pages/Cart/Cart'
import { Products } from './pages/Products/Products'
import { ProductDetail } from './pages/ProductDetail/ProductDetail'
let router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/products',
        element: <Products />
      },
      {
        path: '/product/:id',
        element: <ProductDetail />
      }
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
