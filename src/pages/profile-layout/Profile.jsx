import { useOutletContext } from 'react-router-dom'
import { format } from 'date-fns'

import postIcon from '../../assets/post.png'
import '../../styles/profile-layout/Profile.css'

export default function Profile() {
  const profile = useOutletContext()
  const creationDate = profile.createdAt ? format(profile.createdAt.toDate(), "MMMM-yyyy") : "Unknown"
  
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
              <p> {profile.lastName} {profile.firstName} </p>
            </div>
            <div className="details-row">
              <p className='title'>Email:</p>
              <p> {profile.email} </p>
            </div>
            <div className="details-row">
              <p className='title'>City Of Residence:</p>
              <p> {profile.city} </p>
            </div>
            <div className="details-row">
              <p className='title'>Phone Number:</p>
              <p>
                {
                  profile.phone !== '' && `(+216) ${profile.phone}` 
                }
              </p>
            </div>
            <div className="details-row">
              <p className='title'>Member Since:</p>
              <p> {creationDate} </p>
            </div>
            <div className="details-row">
              <p className='title'>Level:</p>
              <p> {profile.badge} </p>
            </div>
          </div>
          <div className="points-summary">
            <h3>Points Summary</h3>
            <div className="points-amount">
              <h1 className='amount'> {profile.points} </h1>
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
