import { displayPostsByUser } from '../../firebase/displayPosts'
import { formatDate } from '../../utils/formatTime'

import { useTranslation } from 'react-i18next'

import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { auth } from '../../config/firebase'

import Loading from '../../components/Loading'
import '../../styles/profile-layout/Posts.css'

export default function Posts() {

  const { t } = useTranslation()
  const userID = auth.currentUser.uid
  const [posts, setPosts] = useState(null)

  const [searchParams] = useSearchParams()
  const message = searchParams.get('message')

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await displayPostsByUser(userID)
      setPosts(posts)
    }
    fetchPosts()
  }, [userID])
  
  return (
    <div className="user-posts-container">
        <h1 className="title">{t('posted-plastics-title')}</h1>
        <div className="new-post-link">
          <Link to="/newPost">{t('posted-plastics-add-plastic')}</Link>
        </div>
        {
          message && <p className="url-message">{message}</p>
        }
        {
          posts && posts.length > 0 && (
          posts.map((post) => (
            <div key={post.id} className="post">
                <div className="post-details">
                    <h2>{post.title}</h2>
                    <p className="time">
                      { formatDate(post.createdAt.seconds) }
                    </p>
                    <p>{post.description}</p>
                </div>
                <div className="post-actions">
                    <Link 
                      to={`./${post.id}`}
                      className="post-details-btn"
                    >
                        {t('posted-plastics-see-details')}
                    </Link>
                </div>
            </div>
            
          ))
          )
        }
        {
          posts && posts.length === 0 && (
            <p className="no-posts">{t('posted-plastics-no-posts')}</p>
          )
        }
        {
          !posts && <Loading />
        }
    </div>
  )
}
