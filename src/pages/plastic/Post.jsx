import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronDown, ChevronUp, MapPin, MessageSquare, Phone, ShoppingBag, Milk, User, Recycle, Bookmark, Check, Trash2 } from "lucide-react"
import avatarImg from '../../assets/profile.png'
import { useTranslation } from "react-i18next"
import { displayTimeAgo } from "../../utils/formatTime"
import { savePostToUser, removePostFromUser, checkPostSaved, deletePost } from "../../firebase/displayPosts"
import { auth } from "../../config/firebase"
import "./post.css"

export default function Post({ post, canDelete }) {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const [expandedPosts, setExpandedPosts] = useState({})
    const [isSaved, setIsSaved] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        async function checkPosts() {
            const isSaved = await checkPostSaved(auth.currentUser.uid, post.id)
            setIsSaved(isSaved)
        }
        checkPosts()
    }, [post.id])

    const toggleExpand = (postId) => {
        setExpandedPosts((prev) => ({
            ...prev,
            [postId]: !prev[postId],
        }))
    }

    const handleSavePost = () => {
        setIsSaved((prev) => !prev)

        if (isSaved) {
            removePostFromUser(auth.currentUser.uid, post.id)
        } else {
            savePostToUser(auth.currentUser.uid, post.id) 
        }
    }

    const handleDeletePost = async () => {
        setIsDeleting(true)
        await deletePost(post.id, navigate)
        window.location.reload()
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
                            <h3 className="user-name">{post.user.firstName} {post.user.lastName} {post.userID === auth.currentUser.uid && <span className="by-you">{t('by_you')}</span>}</h3>
                            <span className={`role-badge ${post.role === "provider" ? "provider-badge" : post.role === "collector" ? "collector-badge" : "admin-badge"}`}>
                                {t(post.role)}
                            </span>
                        </div>

                        <div className="location">
                            <MapPin className="icon-small" />
                            <span>{t(`cities.${post.state}.${post.city}`)}, {t(`states.${post.state}`)}</span>
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
                                    <span className="stat-label">{t('bottles')}</span>
                                </div>
                            </div>
                        )}

                        {post.bags > 0 && (
                            <div className="stat-item">
                                <ShoppingBag className="stat-icon" />
                                <div className="stat-value">
                                    <span className="stat-number">{post.bags}</span>
                                    <span className="stat-label">{t('bags')}</span>
                                </div>
                            </div>
                        )}

                        {post.mixed > 0 && (
                            <div className="stat-item">
                                <Recycle className="stat-icon" />
                                <div className="stat-value">
                                    <span className="stat-number">{post.mixed}</span>
                                    <span className="stat-label">{t('mixed_items')}</span>
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
                                {t('contact_informations')}
                            </h3>

                            <div className="contact-info">
                                <div className="contact-detail">
                                    <MapPin className="icon-small" />
                                    <span>{t(`cities.${post.state}.${post.city}`)}, {t(`states.${post.state}`) || "-"}</span>
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
                <button 
                className={`contact-button ${post.role === "provider" ? "provider-button" : post.role === "collector" ? "collector-button" : "admin-button"}`}
                disabled={post.userID === auth.currentUser.uid || post.user.phone === ''}
                >
                    <>
                        <MessageSquare className="icon-small" />
                        {t('contact_user')}
                    </>
                </button>
                <button 
                    className={`save-button ${isSaved ? "saved" : ""}`} 
                    onClick={() => handleSavePost(post.id)} disabled={post.userID === auth.currentUser.uid}
                >
                    {
                        !isSaved ?
                        <>
                            <Bookmark className="icon-small" />
                            {t('save_post')}
                        </> :
                        <>
                            <Check className="icon-small" />
                            {t('post_saved')}
                        </>
                    }
                </button>
                {
                    canDelete === true && (
                        <button className={`delete-button ${isDeleting ? "loading" : ""}`} onClick={() => handleDeletePost(post.id)}>
                            <Trash2 className="icon-small delete"/>
                        </button>
                    )
                }
            </div>
            {
                post.user.phone === '' && 
                <span className="no-phone-number">
                    {t('no_phone_alert')}
                </span>
            }
        </div>
    )
}