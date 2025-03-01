import { 
  createBrowserRouter, 
  createRoutesFromElements,
  RouterProvider, 
  Route } from 'react-router-dom'

import Layout from './Layout/Layout'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import About from './pages/About'

import './App.css'

export default function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route 
        path='login'
        element={<Login />}
      />
      <Route 
        path='signup'
        element={<Signup />}
      />
      <Route 
        path='about'
        element={<About />}
      />
    </Route>
  ))
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
