import loading from '../assets/loading.gif'
import './loading.css'

export default function Loading() {
  return (
    <img src={loading} alt="loading icon" className='loading-icon' />
  )
}
