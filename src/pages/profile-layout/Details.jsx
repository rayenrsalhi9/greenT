/* eslint-disable react-refresh/only-export-components */
import { 
    redirect, 
    defer, 
    Await, 
    useLoaderData, 
    Link, 
    useNavigate,
    useSearchParams
 } from 'react-router-dom'
import { Suspense } from 'react'

import { getPostDetails, deletePost } from '../../firebase/displayPosts'
import { auth } from '../../config/firebase'
import { formatDate } from '../../utils/formatTime'

import Loading from '../../components/Loading'

import locationMarker from '../../assets/location.png'
import bottleIcon from '../../assets/bottle.png'
import bagIcon from '../../assets/bag.png'
import mixedIcon from '../../assets/mixedMaterial.png'
import leftArrow from '../../assets/left-arrow.png'
import './details.css'

export async function loader({ request }) {
    const postId = new URL(request.url).pathname.split('/').pop()
    
    return new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                resolve(redirect('/login?message=You have to log in to proceed'))
            } else {
                resolve(defer({ post: getPostDetails(postId) }))
            }
            unsubscribe()
        })
    })
}

export default function Details() {
    const postObject = useLoaderData()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const message = searchParams.get('message')

    return (
       <Suspense fallback={<Loading />}>
        <Await resolve={postObject.post}>
            {
                post => (
                    <div className='post-details-container'>
                        <div className="back-to-all-posts-link">
                            <img src={leftArrow} alt="left-arrow" />
                            <Link to='/profile/posts'>Back to all posts</Link>
                        </div>
                        {
                            message && (
                                <div className="changes-message">
                                    <p>{message}</p>
                                </div>
                            )
                        }
                        <div className="post-details">
                            <div className="header">
                                <h1>{post.title}</h1>
                                <p>Published on: {formatDate(post.createdAt.seconds)}</p>
                            </div>
                            <div className="content">
                                <div className="location">
                                    <img src={locationMarker} alt="location" />
                                    <p className='location-text'>{post.city}, {post.state}</p>
                                </div>
                                <p className='description'>{post.description}</p>
                                <div className="quantities">
                                    <div className="icon">
                                        <img src={bottleIcon} alt="bottle" />
                                        <p>Bottles</p>
                                        <p className='quantity'>{post.bottles}</p>
                                    </div>
                                    <div className="icon">
                                        <img src={bagIcon} alt="bag" />
                                        <p>Bags</p>
                                        <p className='quantity'>{post.bags}</p>
                                    </div>
                                    <div className="icon">
                                        <img src={mixedIcon} alt="mixed" />
                                        <p>Mixed Materials</p>
                                        <p className='quantity'>{post.mixed}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="actions">
                                <Link 
                                    to={`../posts/${post.id}/edit`}
                                    className='edit-button'
                                >
                                    Edit Post
                                </Link>
                                <button 
                                    className='delete-button'
                                    onClick={async () => deletePost(post.id, navigate)}
                                >
                                    Delete Post
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </Await>
       </Suspense>
    )
}
