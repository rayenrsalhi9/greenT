import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

import userIcon from '../../assets/profile.png'
import location from '../../assets/location.png'

import bottle from '../../assets/bottle.png'
import bag from '../../assets/bag.png'
import mixed from '../../assets/mixedMaterial.png'

import '../../styles/plastic/PostsPage.css'

export default function Post({post}) {
    const { t } = useTranslation();

    return (
        <div className="post">
            <div className="user">
                <img src={userIcon} alt="user icon" />
                {post.lastName} {post.firstName}
            </div>
            <div className="details">
                <h3 className="title">{post.title}</h3>
                <div className="location">
                    <img src={location} alt="location icon" />
                    {`${post.city}, ${post.state}`}
                </div>
                <p className="description">{post.description}</p>
                <div className="quantities">
                    <div className="icon">
                        <img src={bottle} alt="bottle icon" />
                        <p className="name">{t('post-bottles')}</p>
                        <p className='quantity'>{post.bottles}</p>
                    </div>
                    <div className="icon">
                        <img src={bag} alt="bag icon" />
                        <p className="name">{t('post-bags')}</p>
                        <p className='quantity'>{post.bags}</p>
                    </div>
                    <div className="icon">
                        <img src={mixed} alt="mixed materials icon" />
                        <p className="name">{t('post-mixed')}</p>
                        <p className='quantity'>{post.mixed}</p>
                    </div>
                </div>
            </div>
            <div className="message-section">
                <Link 
                    to={`/profile/messages/${post.userID}`}
                    className="details-btn"
                > 
                    {t('post-contact-user')}
                </Link>
            </div>
        </div>
    )
}
