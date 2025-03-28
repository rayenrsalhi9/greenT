import { useState } from "react"
import { ChevronDown, ChevronUp, MapPin, MessageSquare, Phone, ShoppingBag, Milk, User, Recycle } from "lucide-react"
import avatarImg from '../../assets/profile.png'
import { useTranslation } from "react-i18next"
import {displayTimeAgo} from "../../utils/formatTime"
import "./post.css"

export default function Post({ post }) {
    const { t } = useTranslation()

    const [expandedPosts, setExpandedPosts] = useState({})

    const toggleExpand = (postId) => {
        setExpandedPosts((prev) => ({
            ...prev,
            [postId]: !prev[postId],
        }))
    }

    return (
        <div className={`post-card ${post.role === "provider" ? "provider-card" : post.role === "collector" ? "collector-card" : "admin-card"}`}>
            <div className="post-header">
                <div className="user-info">
                    <div className={`avatar ${post.role === 'provider' ? 'provider' : post.role === 'collector' ? 'collector' : 'admin'}`}>
                        <img src={post.user.avatar || avatarImg} alt="avatar" />
                    </div>

                    <div className="user-details">
                        <div className="user-name-role">
                            <h3 className="user-name">{post.user.firstName} {post.user.lastName}</h3>
                            <span className={`role-badge ${post.role === "provider" ? "provider-badge" : post.role === "collector" ? "collector-badge" : "admin-badge"}`}>
                                {post.role}
                            </span>
                        </div>

                        <div className="location">
                            <MapPin className="icon-small" />
                            <span>{post.city}, {post.state}</span>
                        </div>

                        <div className="posted-time">{displayTimeAgo(post.createdAt.seconds, t)}</div>
                    </div>
                </div>
            </div>

            <div className="post-content">
                <div className="post-title-container">
                    <h4 className="post-title">{post.title}</h4>
                    <button className="toggle-button" onClick={() => toggleExpand(post.id)}>
                        {expandedPosts[post.id] ? <ChevronUp className="icon" /> : <ChevronDown className="icon" />}
                        <span className="sr-only">{expandedPosts[post.id] ? "Show less" : "Show more"}</span>
                    </button>
                </div>

                <p className="post-description">{post.description}</p>

                {/* Stats section */}
                {(post.bottles > 0 || post.bags > 0 || post.mixed > 0) && (
                    <div className="stats-container">
                        {post.bottles > 0 && (
                            <div className="stat-item">
                                <div className="stat-icon">
                                <Milk className="stat-icon" />
                                </div>
                                <div className="stat-value">
                                    <span className="stat-number">{post.bottles}</span>
                                    <span className="stat-label">Bottles</span>
                                </div>
                            </div>
                        )}

                        {post.bags > 0 && (
                            <div className="stat-item">
                                <ShoppingBag className="stat-icon" />
                                <div className="stat-value">
                                    <span className="stat-number">{post.bags}</span>
                                    <span className="stat-label">Bags</span>
                                </div>
                            </div>
                        )}

                        {post.mixed > 0 && (
                            <div className="stat-item">
                                <Recycle className="stat-icon" />
                                <div className="stat-value">
                                    <span className="stat-number">{post.mixed}</span>
                                    <span className="stat-label">Mixed</span>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Expanded details section */}
                {expandedPosts[post.id] && (
                    <div className="expanded-details">
                        <div className="separator"></div>

                        {/* User Details Section */}
                        <div className="contact-section">
                            <h3 className={`section-title ${post.role === "provider" ? "provider-title" : post.role === "collector" ? "collector-title" : "admin-title"}`}>
                                <User className="icon-small" />
                                Contact Information
                            </h3>

                            <div className="contact-info">
                                <div className="contact-detail">
                                    <MapPin className="icon-small" />
                                    <span>{post.user.city || "-"}</span>
                                </div>
                                <div className="contact-detail">
                                    <Phone className="icon-small" />
                                    <span>{post.user.phone || "-"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="post-footer">
                <button className={`contact-button ${post.role === "provider" ? "provider-button" : post.role === "collector" ? "collector-button" : "admin-button"}`}>
                    <>
                        <MessageSquare className="icon-small" />
                        Contact User
                    </>
                </button>
            </div>
        </div>
    )
}