import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <main className="container">
      <Navbar />
      <Outlet />
    </main>
  )
}
