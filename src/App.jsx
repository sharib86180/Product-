import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './Pages/Home'
import AddProduct from './Components/AddProduct'
import Display from './Components/Display'
import Product from './Components/Product'

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer/>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="addproduct" element={<AddProduct />} />
            <Route path="display" element={<Display />} />
            <Route path="product" element={<Product />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App