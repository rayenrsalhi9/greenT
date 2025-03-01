import ProfileNav from "../components/ProfileNav"
import { Outlet } from "react-router-dom"

export default function ProfileLayout() {
  return (
    <>
        <ProfileNav />
        <Outlet />
    </>
  )
}
