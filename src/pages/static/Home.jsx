import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import homePageImg from "../../assets/home-img.jpg";
import "../../styles/static/Home.css";

export default function Home() {
  const { t } = useTranslation();

  return (
    <section className="home">
      <motion.div 
        className="hero-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h1 className="hero-title">{t("home-title")}</h1>
          <p>{t("home-description")}</p>
          <motion.div 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.95 }}
          >
            <Link to="login" className="plastics-link-btn">
              {t("home-button")}
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
        className="hero-image"
        initial={{ opacity: 1, y: 20 }}
        animate={{
            opacity: 1,
            y: [0, -6, 0], // Floating effect
            rotate: [0, 1, -1, 0], // Slight rotation effect
            boxShadow: [
            "0px 0px 10px #fafafa",
            "0px 0px 15px #ffbe0b",
            "0px 0px 10px #fafafa",
            ],
        }}
        transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
        }}
        >
        <img src={homePageImg} alt="home page" />
        </motion.div>
      </motion.div>

      <motion.div 
        className="nav-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h2>{t("home-nav-title")}</h2>
        <p>{t("home-nav-description")}</p>
        <div className="buttons-section">
          <motion.div 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.95 }}
          >
            <Link to="signup" className="signup-link">
              {t("home-nav-signup")}
            </Link>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.95 }}
          >
            <Link to="about" className="about-link">
              {t("home-nav-about")}
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}