import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className='w-100 min-vh-100 bg-dark bg-gradient text-white'>
      <div className='container'>
        <h3 className='text-center'>WELCOME TO HOME PAGE</h3>
        <div className='text-center mt-3'>
          <button 
            className='btn btn-primary me-2'
            onClick={() => navigate('/addproduct')}
          >
            Add Product
          </button>
          <button 
            className='btn btn-success me-2'
            onClick={() => navigate('/display')}
          >
            View Products
          </button>
          <button 
            className='btn btn-warning'
            onClick={() => navigate('/product')}
          >
            Products
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  )
}
