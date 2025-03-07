import './errorElement.css'
import { useRouteError, Link } from 'react-router-dom'

export default function ErrorElement() {
    const error = useRouteError()
    
    return (
        <div className="error-element">
            <pre>{error.status} - {error.statusText}</pre>
            <h1>An error occurred</h1>
            <p>{error.message}</p>
            <Link to='/'>Return to home page</Link>
        </div>
    )
}
