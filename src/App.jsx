import { 
  createBrowserRouter, 
  createRoutesFromElements,
  RouterProvider, 
  Route } from 'react-router-dom'

import Layout from './Layout/Layout'

import Home from './pages/static/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

import About from './pages/static/About'
import HowItWorks from './pages/static/HowItWorks'

import ProfileLayout from './Layout/ProfileLayout'

import Profile from './pages/profile-layout/Profile'
import Settings from './pages/profile-layout/Settings'
import Points from './pages/profile-layout/Points'
import Posts from './pages/profile-layout/Posts'

import PostsPage from './pages/plastic/PostsPage'

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
      <Route 
        path='howToUse'
        element={<HowItWorks />}
      />
      <Route path='profile' element={<ProfileLayout />}>
        <Route index element={<Profile />} />
        <Route path='settings' element={<Settings />} />
        <Route path='points' element={<Points />} />
        <Route path='posts' element={<Posts />} />
      </Route>

      <Route 
        path='posts'
        element={<PostsPage />}
      />
    </Route>
  ))
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
