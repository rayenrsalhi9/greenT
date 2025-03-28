/* eslint-disable react-refresh/only-export-components */
import { Link, Await, defer, redirect, useLoaderData } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { Suspense, useState } from 'react'
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

export async function loader() {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                resolve(redirect('/login?message=You have to log in to proceed'));
            } else {
                resolve(defer({ posts: displayPosts(), stats: showTotalItemsShared() }));
            }
            unsubscribe();
        })
    })
}

export default function PostsPage() {

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
    const postsObject = useLoaderData()

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
                        <h2 className="posts-title">Community Posts</h2>
                        <Link to = "/newPost" className="add-post-button">
                            <Plus className="add-icon" />
                            <p>Add post</p>
                        </Link>
                    </div>
                    <Suspense fallback={<Loading />}>
                        <Await resolve={postsObject.posts}>
                            {posts => 
                                !posts || posts.length === 0 ? (
                                    <NoPosts />
                                ) : (
                                    <div className="community-posts-grid">
                                        {activeFilters.length === 0
                                            ? posts.map(post => <Post key={post.id} post={post} />)
                                            : posts
                                                .filter(post => activeFilters.includes(post.role))
                                                .map(post => <Post key={post.id} post={post} />)}
                                    </div>
                                )
                            }
                        </Await>
                    </Suspense>

                </div>
            </div>
            <div className="right-section">
                <Suspense fallback={<Loading />}>
                    <Await resolve={postsObject.stats}>
                        {
                            stats => (
                                <Stats stats={stats}/>
                            )    
                        }
                    </Await>
                </Suspense>                       
            </div>
        </section>
    )
}
