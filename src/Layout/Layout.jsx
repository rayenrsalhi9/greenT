import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"

import { useTranslation } from "react-i18next"

export default function Layout() {
  const { i18n } = useTranslation()

  return (
    <main className={`container ${i18n.language === 'ar' ? 'ar' : ''}`}>
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  )
}
