import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { onAuthStateChanged } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { displayPosts, showTotalItemsShared } from '../../firebase/displayPosts'
import { auth } from '../../config/firebase'
import { useTranslation } from 'react-i18next'

import Post from "./Post"
import Loading from '../../components/Loading'
import NoPosts from '../../components/NoPosts'

import { Plus } from "lucide-react"

import Filters from './Filters'
import Stats from './Stats'

import './posts.css'

const fetchPosts = async () => {
    try {
        return await displayPosts()
    } catch (error) {
        console.log(error)
        return null
    }
}

const fetchStats = async () => {
    try {
        return await showTotalItemsShared()
    } catch (error) {
        console.log(error)
        return null
    }
}

export default function PostsPage() {
    const navigate = useNavigate()
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/login?message=You have to log in to proceed')
            } else {
                setIsAuth(true)
            }
        })

        return () => unsubscribe()
    }, [navigate])

    const { data: posts, isLoading: postsLoading, error: postsError } = useQuery(
        {
            queryKey: ['posts'],
            queryFn: fetchPosts,
            enabled: isAuth,
            staleTime: 5 * 60 * 1000
        }
    )

    const { data: stats, isLoading: statsLoading, error: statsError } = useQuery(
        {
            queryKey: ['stats'],
            queryFn: fetchStats,
            enabled: isAuth,
            staleTime: 5 * 60 * 1000, // 5 minutes
        }
    )

    const [activeFilters, setActiveFilters] = useState([])
    const [searchQuery, setSearchQuery] = useState("")

    const toggleFilter = (filter) => {
        if (activeFilters.includes(filter)) {
        setActiveFilters(activeFilters.filter((f) => f !== filter))
        } else {
        setActiveFilters([...activeFilters, filter])
        }
    }
    const clearFilters = () => {
        setActiveFilters([])
    }

    const { t } = useTranslation()

    postsError && console.log(postsError)
    statsError && console.log(statsError)

    return (
        <section className='posts-page-container'>
            <div className="left-section">
                <Filters 
                    clearFilters={clearFilters} 
                    toggleFilter={toggleFilter} 
                    activeFilters={activeFilters}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
                <div className="community-posts">
                    <div className="posts-header">
                        <h2 className="posts-title">{t('Community Posts')}</h2>
                        <Link to="/newPost" className="add-post-button">
                            <Plus className="add-icon" />
                            <p>{t('add-post')}</p>
                        </Link>
                    </div>

                    {
                        postsLoading ? <Loading /> : (
                            !posts || posts.length === 0 ? <NoPosts /> :
                            <div className="community-posts-grid">
                                {
                                    activeFilters.length === 0 ? 
                                    posts.map(post => <Post key={post.id} post={post} />) :
                                    posts
                                        .filter(post => activeFilters.includes(post.role))
                                        .map(post => <Post key={post.id} post={post} />)
                                }
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="right-section">
                {
                    statsLoading ? <Loading /> :
                    !stats || stats.length === 0 ? <NoPosts /> :
                    <Stats stats={stats} />
                }
            </div>
        </section>
    )
}