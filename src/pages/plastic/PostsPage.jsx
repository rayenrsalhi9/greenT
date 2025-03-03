import Post from './Post'
import { Suspense } from 'react';
import { NavLink, Link, redirect, defer, Await, useLoaderData } from 'react-router-dom'
import { auth } from '../../config/firebase';
import { displayPosts } from '../../firebase/displayPosts';

import Loading from '../../components/Loading';
import NoPosts from '../../components/NoPosts';

import '../../styles/plastic/PostsPage.css'

export function loader() {
    return new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                resolve(redirect('/login?message=You have to log in to proceed'));
            } else {
                resolve(defer({ posts: displayPosts() }));
            }
            unsubscribe();
        });
    });
}

export default function PostsPage() {
    const postsObject = useLoaderData()

    return (
        <Suspense fallback={<Loading />}>
            <Await resolve={postsObject.posts}>
                {
                    posts => (
                        <section className="posts-container">
                            <div className="search-bar">
                                <input 
                                    type="search" 
                                    name="post" 
                                    id="post"
                                    placeholder='Search posts, users or plastic types...' 
                                />
                                <div className="filters">
                                    <NavLink to="." className='link bottles'>Bottles</NavLink>
                                    <NavLink to="." className='link bags'>Bags</NavLink>
                                    <NavLink to="." className='link mixed'>Mixed</NavLink>
                                    <Link to="." className='clear-filters'>Clear filters</Link>
                                </div>
                            </div>
                            <h1>All community posts</h1>
                            <div className="posts">
                                {
                                    posts.map(post => (
                                        <Post key={post.id} post={post} />
                                    )) 
                                }
                            </div>
                            { posts.length === 0 && <NoPosts />}
                        </section>
                
                    )
                }
            </Await>
        </Suspense>
    )
}
