/* eslint-disable react-refresh/only-export-components */
import {
    redirect,
    defer,
    Await,
    useLoaderData,
    useNavigate,
    Form,
    useNavigation
} from 'react-router-dom'
import { Suspense } from 'react'

import Loading from '../../components/Loading'

import { getPostDetails, updatePost } from '../../firebase/displayPosts'
import { auth } from '../../config/firebase'
import { formatDate } from '../../utils/formatTime'

import locationMarker from '../../assets/location.png'
import bottleIcon from '../../assets/bottle.png'
import bagIcon from '../../assets/bag.png'
import mixedIcon from '../../assets/mixedMaterial.png'
import './edit.css'

export async function action({ request }) {
    const formData = await request.formData()
    const { title, description, bottles, bags, mixed } = Object.fromEntries(formData)

    if (!title || !description || !bottles || !bags || !mixed) {
        return 'All fields are required'
    }

    const postData = {
        title,
        description,
        bottles,
        bags,
        mixed
    }

    const postId = new URL(request.url).pathname.split('/')[3]

    await updatePost(postId, postData)

    return redirect(`/profile/posts/${postId}?message=Post updated successfully`)
}


export async function loader({ request }) {
    const postId = new URL(request.url).pathname.split('/')[3]

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

export default function Edit() {
    const postObject = useLoaderData()
    const navigate = useNavigate()
    const navigation = useNavigation()

    return (
        <Suspense fallback={<Loading />}>
            <Await resolve={postObject.post}>
                {
                    post => (
                        <div className='edit-post-container'>
                            <div className="edit-post">
                                <Form method='post' replace>
                                    <div className="edit-post-header">
                                        <input type="text" name="title" defaultValue={post.title} placeholder='Title' className='post-title'/>
                                        <p className='published-on'>Published on: {formatDate(post.createdAt.seconds)}</p>
                                        <div className="location">
                                            <img src={locationMarker} alt="location" />
                                            <p className='location-text'>{post.city}, {post.state}</p>
                                        </div>
                                    </div>
                                    <div className="edit-post-content">
                                        <textarea 
                                            name="description" 
                                            defaultValue={post.description} 
                                            placeholder='Description'
                                        />
                                        <div className="quantities">
                                            <div className="icon">
                                                <img src={bottleIcon} alt="bottle" />
                                                <p>Bottles</p>
                                                <input 
                                                    type="number" 
                                                    name="bottles" 
                                                    defaultValue={post.bottles} 
                                                    min={0} 
                                                    placeholder='Bottles'
                                                />
                                            </div>
                                            <div className="icon">
                                                <img src={bagIcon} alt="bag" />
                                                <p>Bags</p>
                                                <input 
                                                    type="number" 
                                                    name="bags" 
                                                    defaultValue={post.bags} 
                                                    min={0} 
                                                    placeholder='Bags'
                                                />
                                            </div>
                                            <div className="icon">
                                                <img src={mixedIcon} alt="mixed" />
                                                <p>Mixed Materials</p>
                                                <input 
                                                    type="number" 
                                                    name="mixed" 
                                                    defaultValue={post.mixed} 
                                                    min={0} 
                                                    placeholder='Mixed Materials'
                                                />
                                            </div>
                                        </div>
                                        <div className="edit-post-actions">
                                            <button 
                                                type="submit" 
                                                disabled={navigation.state === 'submitting'}
                                                className='submit-button'
                                            >
                                                {
                                                    navigation.state === 'submitting' ? 
                                                    'Applying Changes...' : 'Apply Changes'
                                                }
                                            </button>
                                            <button 
                                                className='cancel-btn'
                                                type="button" 
                                                onClick={() => navigate(-1)}
                                            >
                                                Cancel Changes
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    )
                }
            </Await>
        </Suspense>
    )
}
