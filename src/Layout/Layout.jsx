import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import { useRef, useEffect } from "react"

import { useTranslation } from "react-i18next"

export default function Layout() {

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const scrollRef = useRef(null)

  const { i18n } = useTranslation()

  return (
    <main className={`container ${i18n.language === 'ar' ? 'ar' : ''}`}>
      <div ref={scrollRef}></div>
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  )
}
