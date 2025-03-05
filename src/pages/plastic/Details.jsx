/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'

import { getUser } from '../../firebase/getProfile'
import { getPost } from '../../firebase/getPost'

import Loading from '../../components/Loading'

import { serverTimestamp } from 'firebase/firestore'
import { auth } from '../../config/firebase.js'

import { saveMessage } from '../../firebase/saveMessage.js'

import userImg from '../../assets/profile.png'
import locationMark from '../../assets/location.png'
import calendar from '../../assets/calendar.png'
import bottle from '../../assets/bottle.png'
import bag from '../../assets/bag.png'
import mixed from '../../assets/mixedMaterial.png'

import '../../styles/plastic/Details.css'

export async function messagesAction({ request }) {

    const url = new URL(request.url)

    const senderID = auth.currentUser.uid
    const destinationID = url.searchParams.get('user')
    const postID = url.searchParams.get('post')

    const formData = await request.formData()
    const { msg } = Object.fromEntries(formData)

    if (!msg) return null

    const msgObject = {
        senderID,
        destinationID,
        postID,
        text: msg,
        createdAt: serverTimestamp()
    }

    await saveMessage(msgObject)
    
    return null
}

export default function Details() {

    const [searchParams] = useSearchParams()
    const userID = searchParams.get('user')
    const postID = searchParams.get('post')

    const [user, setUser] = useState(null)
    const [post, setPost] = useState(null)

    useEffect(() => {
        async function getUserDetails() { 
            setUser(await getUser(userID))
            setPost(await getPost(userID, postID))
        }
        getUserDetails()
    }, [])

    return (
        <section className="chat-container">
            <Link to=".." relative='path'>Return to all posts</Link>
            {
                user && post ?

                <div className="chat">
                    <div className="content">
                        <div className="user-details">
                            <img src={userImg} alt="" />
                            <div className="user-details-info">
                                <h3>{user.firstName} {user.lastName} </h3>
                                <p>
                                    Member since  {
                                        new Date(user.createdAt.seconds * 1000)
                                        .toLocaleString("en-US", { month: "long", year: "numeric" })
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="post-details">
                            <h2>{post.title}</h2>
                            <div className="location-and-date">
                                <p className="location">
                                    <img src={locationMark} alt="" />
                                    {post.state}, {post.city}
                                </p>
                                <p className="date">
                                    <img src={calendar} alt="" />
                                    Posted on {
                                        new Date(post.createdAt.seconds * 1000)
                                        .toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric" })
                                    }
                                </p>
                            </div>
                            <p className="description">
                                {post.description}
                            </p>
                            <div className="quantities">
                                <div className="icon">
                                    <img src={bottle} alt="" />
                                    <p className="name">Bottles</p>
                                    <p className="quantity">{post.bottles}</p>
                                </div>
                                <div className="icon">
                                    <img src={bag} alt="" />
                                    <p className="name">Bags</p>
                                    <p className="quantity">{post.bags}</p>
                                </div>
                                <div className="icon">
                                    <img src={mixed} alt="" />
                                    <p className="name">Mixed materials</p>
                                    <p className="quantity">{post.mixed}</p>
                                </div>
                            </div>
                        </div>
                        <button className='contact-user-button'>Contact User</button>
                    </div>
                </div> : <Loading />
            }
        </section>
    )
}
