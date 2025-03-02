import userIcon from '../../assets/profile.png'
import location from '../../assets/location.png'

import bottle from '../../assets/bottle.png'
import bag from '../../assets/bag.png'
import mixed from '../../assets/mixedMaterial.png'

import message from '../../assets/message.png'

import '../../styles/plastic/PostsPage.css'

export default function Post() {
  return (
    <div className="post">
                <div className="user">
                    <img src={userIcon} alt="user icon" />
                    Rayene salhi
                </div>
                <div className="details">
                    <h3 className="title">Home cleanup plastic collection</h3>
                    <div className="location">
                        <img src={location} alt="" />
                        ElKef, Tunisia
                    </div>
                    <p className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error ea provident numquam soluta necessitatibus quia a molestiae, et sapiente iste placeat libero consequuntur nostrum commodi similique distinctio adipisci iure at?</p>
                    <div className="quantities">
                        <div className="icon">
                            <img src={bottle} alt="bottle icon" />
                            <p className="name">bottles</p>
                            <p className='quantity'>15</p>
                        </div>
                        <div className="icon">
                            <img src={bag} alt="bag icon" />
                            <p className="name">bags</p>
                            <p className='quantity'>20</p>
                        </div>
                        <div className="icon">
                            <img src={mixed} alt="mixed materials icon" />
                            <p className="name">mixed materials</p>
                            <p className='quantity'>10</p>
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
