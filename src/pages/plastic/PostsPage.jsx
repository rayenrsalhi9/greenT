/* eslint-disable react-refresh/only-export-components */
import { NavLink, Link, Await, defer, redirect, useLoaderData } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { Suspense } from 'react'
import { displayPosts, showTotalItemsShared } from '../../firebase/displayPosts'
import { auth } from '../../config/firebase'

import Post from "./Post"
import Loading from '../../components/Loading'
import NoPosts from '../../components/NoPosts'

import bottle from '../../assets/posts/bottle.png'
import bag from '../../assets/posts/bag.png'
import mixed from '../../assets/posts/mixed.png'
import add from '../../assets/posts/add.png'

import './posts.css'

export async function loader() {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                resolve(redirect('/login?message=You have to log in to proceed'));
            } else {
                resolve(defer({ posts: displayPosts(user.uid), stats: showTotalItemsShared() }));
            }
            unsubscribe();
        })
    })
}

export default function PostsPage() {
    const postsObject = useLoaderData()
  return (
    <section className='posts-page-container'>
        <div className="left-section">
            <div className="header">
                <input 
                    type="search" 
                    name="search" 
                    id="search" 
                    placeholder='Search posts, users or plastic types...'
                    className="search-bar" 
                />
                <div className="filters">
                    <div className="plastic-types">
                        <NavLink to=".">
                            <img src={bottle} alt="bottle icon" loading='lazy'/>
                            <p>Bottles</p>
                        </NavLink>
                        <NavLink to=".">
                            <img src={bag} alt="bag icon" loading='lazy'/>
                            <p>Bags</p>
                        </NavLink>
                        <NavLink to=".">
                            <img src={mixed} alt="mixed items icon" loading='lazy'/>
                            <p>Mixed Items</p>
                        </NavLink>
                    </div>
                    <div className="posts-types">
                        <NavLink to=".">
                            All posts
                        </NavLink>
                        <NavLink to="./nearby">
                            Nearby
                        </NavLink>
                        <NavLink to="./top">
                            Top
                        </NavLink>
                        <Link to="." className='clear-filters-btn'>
                            Clear filters
                        </Link>
                    </div>
                </div>
            </div>
            <div className="community-posts">
                <div className="community-posts-header">
                    <h2>Community Posts</h2>
                    <Link to="../newPost">
                        <img src={add} alt="add icon" loading='lazy'/>
                        Add post
                    </Link>
                </div>
                <Suspense fallback={<Loading />}>
                    <Await resolve={postsObject.posts}>
                        {
                            posts => (
                                posts.length === 0 ? <NoPosts /> :
                                <div className="community-posts-grid">
                                    {
                                        posts.map((post) => (
                                            <Post key={post.id} post={post} />
                                        ))
                                    }
                                    
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
                            <div className="cards">
                                <div className="card">
                                    <div className="image-container">
                                        <img src={bottle} alt="" loading='lazy'/>
                                    </div>
                                    <h2>{stats.totalBottles}</h2>
                                    <p>Bottles collected in total</p>
                                </div>
                                <div className="card">
                                    <div className="image-container">
                                        <img src={bag} alt="" loading='lazy'/>
                                    </div>
                                    <h2>{stats.totalBags}</h2>
                                    <p>Bags collected in total</p>
                                </div>
                                <div className="card">
                                    <div className="image-container">
                                        <img src={mixed} alt="" loading='lazy'/>
                                    </div>
                                    <h2>{stats.totalMixed}</h2>
                                    <p>Mixed items collected in total</p>
                                </div>
                                <div className="card">
                                    <div className="image-container">
                                        <img src={add} alt="" loading='lazy'/>
                                    </div>
                                    <h2>{stats.totalPosts}</h2>
                                    <p>Posts shared in total</p>
                                </div>
                            </div>
                        )    
                    }
                </Await>
            </Suspense>
                            
        </div>
    </section>
  )
}
