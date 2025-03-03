import loading from '../assets/loading.svg'

export default function Loading() {
    const imageStyles = {
        width: '150px',
        display: 'block',
        margin: '30px auto'
    }
  return (
    <img src={loading} alt="loading icon" style={imageStyles} />
  )
}
