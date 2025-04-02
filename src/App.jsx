import { 
  createBrowserRouter, 
  createRoutesFromElements,
  RouterProvider, 
  Route } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Layout from './Layout/Layout'

import Home from './pages/static/Home'
import Login, { action as loginAction } from './pages/Login'
import Signup, { action as signupAction } from './pages/Signup'

import About from './pages/static/About'
import HowItWorks from './pages/static/HowItWorks'

import ProfileLayout from './Layout/ProfileLayout'

import Profile from './pages/profile-layout/Profile'
import Settings, { action as settingsAction } from './pages/profile-layout/Settings'
import Posts from './pages/profile-layout/Posts'
import Messages from './pages/profile-layout/Messages'
import Chat, { action as chatAction } from './pages/profile-layout/Chat'
import Saved from './pages/profile-layout/Saved'

import Points from './pages/profile-layout/Points'
import Summary from './pages/points/Summary'
import Partners from './pages/points/Partners'

import ObjectivesLayout, { loader as objectivesLoader } from './pages/objectives/ObjectivesLayout'
import Daily from './pages/objectives/Daily'
import Weekly from './pages/objectives/Weekly'
import Monthly from './pages/objectives/Monthly'
import Once from './pages/objectives/Once'

import PostsPage from './pages/plastic/PostsPage'
import NewPost, 
{ loader as newPostLoader, action as newPostAction } from './pages/plastic/NewPost'
import Details, { loader as detailsLoader } from './pages/profile-layout/Details'
import Edit, { loader as editLoader, action as editAction } from './pages/profile-layout/Edit'

import ErrorElement from './components/ErrorElement'
import './App.css'

export default function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />} errorElement={<ErrorElement />}>
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
      <Route path='profile' element={<ProfileLayout />} >
        <Route index element={<Profile />} />
        <Route path='saved' element={<Saved />} />
        <Route path='settings' element={<Settings />} action={settingsAction} />
        <Route path='points' element={<Points />}>
          <Route index element={<Summary />} />
          <Route index element={<Partners />} />
        </Route>
        <Route path='objectives' element={<ObjectivesLayout />} loader={objectivesLoader}>
          <Route index element={<Daily />} />
          <Route path='weekly' element={<Weekly />} />
          <Route path='monthly' element={<Monthly />} />
          <Route path='once' element={<Once />} />
        </Route>
        <Route path='posts' element={<Posts />} />
        <Route path='posts/:postId' element={<Details />} loader={detailsLoader} />
        <Route 
          path='posts/:postId/edit' 
          element={<Edit />} 
          loader={editLoader} 
          action={editAction} 
        />
        <Route path='messages' element={<Messages />} />
        <Route path='messages/:userId' element={<Chat />} action={chatAction} />
      </Route>

      <Route 
        path='posts'
        element={<PostsPage />}
      />
      <Route 
        path='newPost' 
        element={<NewPost />} 
        loader={newPostLoader}
        action={newPostAction} 
      />
    </Route>
  ))

  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  )
}
