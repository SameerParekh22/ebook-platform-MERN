import React from 'react'
import ReactDOM from 'react-dom'
//import App from './App.jsx'
import './index.css'
import {RouterProvider} from 'react-router-dom'
import router from './routers/router.jsx'
import 'flowbite';
import AuthProvider from './contexts/AuthProvider.jsx'
import { CartProvider } from './contexts/CartContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
)
// ReactDOM.render(
//   <React.StrictMode>
//    <RouterProvider router={router} />
//   </React.StrictMode>,
//   document.getElementById('root')
// )
