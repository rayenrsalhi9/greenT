import { auth } from '../../config/firebase'
import { redirect } from 'react-router-dom'

import bottle from '../../assets/bottle.png'
import bag from '../../assets/bag.png'
import mixed from '../../assets/mixedMaterial.png'

import '../../styles/plastic/NewPost.css'

export function loader() {
    return new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                resolve(redirect('/login?message=You have to log in to proceed'));
            } else {
                resolve(null);
            }
            unsubscribe();
        });
    });
}

export default function NewPost() {
  return (
    <div className="post-form-container">
      <form  method='post' className="post-form">
        <h1 className="form-title">Create a New Post</h1>

        <div className="form-group">
          <label htmlFor="title">Post Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter post title" 
          />
        </div>

        <div className="location-group">
          <div className="form-group">
            <label htmlFor="state">State</label>
            <select id="state" name="state">
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <select id="city" name="city"> 
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe your post"
          />
        </div>

        <div className="items-count-group">
          <div className="count-item">
            <div className="icon-container">
              <img src={bottle} alt="bottle icon" />
            </div>
            <label htmlFor="bottles">Bottles</label>
            <input
              type="number"
              id="bottles"
              name="bottles"
              min="0"
            />
          </div>

          <div className="count-item">
            <div className="icon-container">
              <img src={bag} alt="bag icon" />
            </div>
            <label htmlFor="bags">Bags</label>
            <input
              type="number"
              id="bags"
              name="bags"
              min="0"
            />
          </div>

          <div className="count-item">
            <div className="icon-container">
              <img src={mixed} alt="mixed materials icon" />
            </div>
            <label htmlFor="mixed">Mixed Items</label>
            <input
              type="number"
              id="mixed"
              name="mixed"
              min="0"
            />
          </div>
        </div>

        <button type="submit" className="submit-button">
          Submit Post
        </button>
      </form>
    </div>
  )
}
