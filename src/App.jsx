import { 
  createBrowserRouter, 
  createRoutesFromElements,
  RouterProvider, 
  Route } from 'react-router-dom'

import Layout from './Layout/Layout'

import Home from './pages/static/Home'
import Login, { action as loginAction } from './pages/Login'
import Signup, { action as signupAction } from './pages/Signup'

import About from './pages/static/About'
import HowItWorks from './pages/static/HowItWorks'

import ProfileLayout, { loader as profileLoader } from './Layout/ProfileLayout'

import Profile from './pages/profile-layout/Profile'
import Settings, { action as settingsAction } from './pages/profile-layout/Settings'
import Points from './pages/profile-layout/Points'
import Posts from './pages/profile-layout/Posts'
import Messages from './pages/profile-layout/Messages'
import Chat, { action as chatAction } from './pages/profile-layout/Chat'

import PostsPage, { loader as postsLoader } from './pages/plastic/PostsPage'
import NewPost, 
{ loader as newPostLoader, action as newPostAction } from './pages/plastic/NewPost'

import './App.css'

export default function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route 
        path='login'
        element={<Login />}
        action={loginAction}
      />
      <Route 
        path='signup'
        element={<Signup />}
        action={signupAction}
      />
      <Route 
        path='about'
        element={<About />}
      />
      <Route 
        path='howToUse'
        element={<HowItWorks />}
      />
      <Route path='profile' element={<ProfileLayout />} loader={profileLoader}>
        <Route index element={<Profile />} />
        <Route path='settings' element={<Settings />} action={settingsAction} />
        <Route path='points' element={<Points />} />
        <Route path='posts' element={<Posts />} />
        <Route path='messages' element={<Messages />} />
        <Route path='messages/:userId' element={<Chat />} action={chatAction} />
      </Route>

      <Route 
        path='posts'
        element={<PostsPage />}
        loader={postsLoader}
      />
      <Route 
        path='newPost' 
        element={<NewPost />} 
        loader={newPostLoader}
        action={newPostAction} 
      />
    </Route>
  ))
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
