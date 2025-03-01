import postIcon from '../../assets/post.png'
import '../../styles/profile-layout/Profile.css'

export default function Profile() {
  return (
    <section className="profile-overview-container">
      <div className="profile-overview">

        <div className="profile-titles">
          <h1>Profile Overview</h1>
          <p>Your account summary and recent activities</p>
        </div>

        <div className="profile-details-container">
          <div className="account-details">
            <h3>Account Details</h3>
            <div className="details-row">
              <p className='title'>Name:</p>
              <p>Essalhi Rayene</p>
            </div>
            <div className="details-row">
              <p className='title'>Email:</p>
              <p>rayene.salhi@gmail.com</p>
            </div>
            <div className="details-row">
              <p className='title'>City Of Residence:</p>
              <p>ElKef, Tunisia</p>
            </div>
            <div className="details-row">
              <p className='title'>Phone Number:</p>
              <p>(+216) 92840380</p>
            </div>
            <div className="details-row">
              <p className='title'>Member Since:</p>
              <p>February 2025</p>
            </div>
            <div className="details-row">
              <p className='title'>Level:</p>
              <p>Eco Warrior</p>
            </div>
          </div>
          <div className="points-summary">
            <h3>Points Summary</h3>
            <div className="points-amount">
              <h1 className='amount'>1250</h1>
              <p>Total Points Earned</p>
              <button>Redeem Points</button>
            </div>
          </div>
        </div>

        <h3>Recent Activity</h3>

        <div className="activity-container">
          <div className="post">
            <img src={postIcon} alt="post icon" />
            <div className="post-details">
              <h3>First Contribution</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis aspernatur ut fugiat harum modi perspiciatis corporis, laudantium commodi, mollitia quos, obcaecati at! Pariatur quod vitae dolore explicabo, quos accusantium inventore?</p>
            </div>
          </div>
          <div className="post">
            <img src={postIcon} alt="post icon" />
            <div className="post-details">
              <h3>100 Points Club</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis aspernatur ut fugiat harum modi perspiciatis corporis, laudantium commodi, mollitia quos, obcaecati at! Pariatur quod vitae dolore explicabo, quos accusantium inventore?</p>
            </div>
          </div>
          <div className="post">
            <img src={postIcon} alt="post icon" />
            <div className="post-details">
              <h3>Regular Recycler</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis aspernatur ut fugiat harum modi perspiciatis corporis, laudantium commodi, mollitia quos, obcaecati at! Pariatur quod vitae dolore explicabo, quos accusantium inventore?</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
