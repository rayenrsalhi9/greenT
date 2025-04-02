import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { auth } from '../../config/firebase'
import { getSavedPosts } from '../../firebase/displayPosts'
import Post from '../plastic/Post'
import Loading from '../../components/Loading'
import './saved.css'
import { Ban } from 'lucide-react'

async function fetchSavedPosts() {
  try {
    return await getSavedPosts(auth.currentUser.uid)
  } catch (error) {
    console.error(error)
    return 'Failed to fetch saved posts'
  }
}


export default function Saved() {

  const { t } = useTranslation()
  const navigate = useNavigate()

  const { 
    data: savedPosts,
    isLoading: postsLoading,
    error: postsError
  } = useQuery({
    queryKey: ['savedPosts'],
    queryFn: fetchSavedPosts,
    staleTime: Infinity,
    cacheTime: 5 * 60 * 1000,
    refetchOnMount: "always"
  })

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/login?message=You have to log in to proceed')
      }
    })

    return () => unsubscribe()
  }, [navigate])

  return (
    <section className="saved-posts-container">
        <div className="saved-posts">
          <div className="saved-posts-header">
            <h1>{t('profile_saved_posts')}</h1>
            <p>{t('profile_saved_posts_description')}</p>
          </div>
          {postsLoading && <Loading />}
          {postsError && <p>Error: {postsError}</p>}
          {
            savedPosts && savedPosts.length > 0 && (
              savedPosts.map(post => (
                <Post key={post.id} post={post} />
              ))
            )
          }
          {
            savedPosts && savedPosts.length === 0 && (
              <p className='no-posts-alert'>
                <Ban size={20} />
                {t('profile_saved_posts_empty')}
              </p>
            )
          }
        </div>
    </section>
  )
}
