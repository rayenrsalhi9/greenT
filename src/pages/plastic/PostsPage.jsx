import Post from './Post'
import { NavLink, Link } from 'react-router-dom'
import '../../styles/plastic/PostsPage.css'

export default function PostsPage() {
  return (
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
            <Post />
            <Post />
        </div>
    </section>
  )
}
