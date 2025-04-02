import { displayPostsByUser } from '../../firebase/displayPosts'
import Post from '../plastic/Post'

import { useTranslation } from 'react-i18next'
import { BookmarkPlus } from 'lucide-react'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../config/firebase'

import Loading from '../../components/Loading'
import NoPosts from '../../components/NoPosts'
import './posts.css'

async function getUserPosts() {
  try {
    return displayPostsByUser(auth.currentUser.uid)
  } catch(error) {
    console.error(error)
    return 'Error getting user posts'
  }
}

export default function Posts() {

  const { t } = useTranslation()
  const [isAuth, setIsAuth] = useState(false)
  const navigate = useNavigate()
  
  const { data: posts, isLoading: postsLoading, error: postsError } = useQuery({
    queryKey: ['userPosts'],
    queryFn: () => getUserPosts(),
    enabled: isAuth,
    cacheTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true
  })

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/login?message=You have to log in to proceed')
      } else {
        setIsAuth(true)
      }
    })

    return () => unsubscribe()
  }, [navigate])
  
  return (
    <div className="user-posts-container">
        <div className="user-posts">
          <div className="user-posts-header">
            <div className="left">
                <h1>{t('profile_posts')}</h1>
                <p>{t('profile_posts_description')}</p>
            </div>
            <div className="right">
              <Link to="../../newPost">
                <BookmarkPlus />
                {t('profile_new_post')}
              </Link>
            </div>
          </div>
          <div className="posts-body">
            {postsLoading && <Loading />}
            {postsError && <p>{postsError}</p>}
            {posts && posts.map(post => <Post key={post.id} post={post} canDelete={true} />)}
            {posts && posts.length === 0 && <NoPosts />}
          </div>
        </div>
    </div>
  )
}
