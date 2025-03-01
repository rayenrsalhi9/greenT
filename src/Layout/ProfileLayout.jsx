import ProfileNav from "../components/ProfileNav"
import { Outlet } from "react-router-dom"

export default function ProfileLayout() {
  return (
    <section className="profile-layout">
        <ProfileNav />
        <Outlet />
    </section>
  )
}
