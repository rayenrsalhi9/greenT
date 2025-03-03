import userIcon from '../../assets/profile.png'
import location from '../../assets/location.png'

import bottle from '../../assets/bottle.png'
import bag from '../../assets/bag.png'
import mixed from '../../assets/mixedMaterial.png'

import message from '../../assets/message.png'

import '../../styles/plastic/PostsPage.css'

export default function Post({post}) {
    console.log(post)
    return (
        <div className="post">
            <div className="user">
                <img src={userIcon} alt="user icon" />
                {post.firstName} {post.lastName}
            </div>
            <div className="details">
                <h3 className="title">{post.title}</h3>
                <div className="location">
                    <img src={location} alt="location icon" />
                    {`${post.state}, ${post.city}`}
                </div>
                <p className="description">{post.description}</p>
                <div className="quantities">
                    <div className="icon">
                        <img src={bottle} alt="bottle icon" />
                        <p className="name">bottles</p>
                        <p className='quantity'>{post.bottles}</p>
                    </div>
                    <div className="icon">
                        <img src={bag} alt="bag icon" />
                        <p className="name">bags</p>
                        <p className='quantity'>{post.bags}</p>
                    </div>
                    <div className="icon">
                        <img src={mixed} alt="mixed materials icon" />
                        <p className="name">mixed materials</p>
                        <p className='quantity'>{post.mixed}</p>
                    </div>
                </div>
            </div>
            <div className="action">
                <button className="reactions">
                    <img src={message} alt="message icon" />
                    <p>Contact User</p>
                </button>
                <button>View Details</button>
            </div>
        </div>
    )
}
