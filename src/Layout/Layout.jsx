import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"

export default function Layout() {
  return (
    <main className="container">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  )
}
