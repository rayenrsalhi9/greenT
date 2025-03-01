import { Link } from 'react-router-dom'
import '../styles/About.css'

export default function About() {
  return (
    <section className="about">
        <h1>About Our Platform</h1>
        
        <div>
            <h2>Connecting Plastic Providers & Seekers</h2>
            <p>Our platform is designed to bring together individuals and businesses who have accumulated plastic materials (such as bottles, bags, and other recyclable plastics) and those who need them. Whether you are looking to dispose of plastics responsibly or need a steady supply for recycling or repurposing, our app makes the process seamless and efficient.</p>
        </div>

        <h2>How It Works</h2>

        <ol>
            <li><b>Sign Up & Log In:</b> Users create an account and specify whether they are providing or seeking plastics.</li>
            <li><b>List Your Plastic Quantities:</b> Providers can log the type and amount of plastic they have available.</li>
            <li><b>Find Nearby Users:</b> The app connects providers with seekers based on location, ensuring easy collection and distribution.</li>
            <li><b>Coordinate & Exchange:</b> Users can communicate, arrange pickups, and contribute to a more sustainable environment.</li>
        </ol>

        <h2>Why Use Our Platform?</h2>

        <ul>
            <li><b>Efficiency:</b> Instantly locate plastic providers or seekers near you.</li>
            <li><b>Sustainability:</b> Reduce plastic waste by ensuring it is collected and repurposed properly.</li>
            <li><b>Community Impact:</b> Connect with individuals and businesses that are committed to eco-friendly solutions.</li>
            <li><b>Easy Communication:</b> Integrated messaging features allow seamless coordination between users.</li>
        </ul>

        <h1>Frequently Asked Questions (FAQ)</h1>

        <div>
            <h2>Who can use this platform?</h2>
            <p>Anyone! Whether you are an individual, a recycling business, or an organization in need of plastic materials, you can sign up and start connecting.</p>
        </div>

        <div>
            <h2>Is it free to use?</h2>
            <p>Yes! Our platform is free for all users to list, find, and exchange plastic materials.</p>
        </div>

        <div>
            <h2>How do I ensure the plastic I receive is clean and usable?</h2>
            <p>We encourage users to describe their plastic materials accurately and communicate before exchanges to clarify any concerns about quality. And we express our gratitude by offering incredible discounts and prizes at various popular locations such as malls, parks, and shops. Feel free to discover our partners <Link to=''>from here</Link>.</p>
        </div>

        <div>
            <h2>What happens after I connect with someone?</h2>
            <p>Once connected, you can arrange the details of the exchange—such as time, location, and quantity—directly within the app.</p>
        </div>

        <div>
            <h2>Can businesses use this platform?</h2>
            <p>Absolutely! Businesses looking for bulk plastic materials for recycling or production can efficiently source them from local providers.</p>
        </div>

        <div>
            <h2>How does this help the environment?</h2>
            <p>By connecting plastic providers and seekers, we reduce waste, encourage recycling, and promote a circular economy, ensuring that plastics are reused rather than ending up in landfills or oceans.</p>
        </div>

        <p>Join us in making plastic waste management smarter and more sustainable!</p>

    </section>
  )
}
