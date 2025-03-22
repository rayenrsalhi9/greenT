import { Link } from 'react-router-dom'
import { displayTimeAgo } from '../../utils/formatTime'
import { useTranslation } from 'react-i18next'

import bottle from '../../assets/posts/bottle.png'
import bag from '../../assets/posts/bag.png'
import mixed from '../../assets/posts/mixed.png'

import profilePic from "../../assets/profile.png"
import locationMarker from '../../assets/location.png'
import chat from "../../assets/posts/chat.png"

import './post.css'

export default function Post({ post }) {
    const { t } = useTranslation()
    return (
        <div className="post">
            <div className="post-header">
                <div className="user">
                    <img src={profilePic} alt="profile pic" loading='lazy' className='profile-pic'/>
                    <div className="user-details"> 
                        <h3 className='username'>{post.firstName} {post.lastName}</h3> 
                        <p className='location'>
                            <img src={locationMarker} alt="location marker" loading='lazy' className='location-marker'/>
                            {post.city}, {post.state}
                        </p>
                        <p className="publish-time">{displayTimeAgo(post.createdAt.seconds)}</p>          
                    </div>
                </div>
                
            </div>
            <div className="post-body">
                <h1>{post.title}</h1>
                <p>{post.description}</p>
                <div className="plastic-types">
                    {
                        post.bottles > 0 && 
                        <div className="plastic-type">
                            <img src={bottle} alt="bottle icon" loading='lazy'/>
                            <p><b>{post.bottles}</b> {t('Bottles')}</p>
                        </div>
                    }
                    {
                        post.bags > 0 && 
                        <div className="plastic-type">
                            <img src={bag} alt="bag icon" loading='lazy'/>
                            <p><b>{post.bags}</b> {t('Bags')}</p>
                        </div>
                    }
                    {
                        post.mixed > 0 && 
                        <div className="plastic-type">
                            <img src={mixed} alt="mixed icon" loading='lazy'/>
                            <p><b>{post.mixed}</b> {t("Mixed Items")}</p>
                        </div>
                    }
                </div>
            </div>
            <div className="post-footer">
                <Link to={`/profile/messages/${post.userID}`}>
                    <img src={chat} alt="chat icon" loading='lazy'/>
                    {t('Contact User')}
                </Link>
            </div>
        </div>
    )
}
