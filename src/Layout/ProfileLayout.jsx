import { Outlet, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react';
import { getUser } from "../firebase/getProfile";
import { auth } from "../config/firebase";
import { useQuery } from "@tanstack/react-query";

import ProfileNav from "../components/ProfileNav"
import Loading from '../components/Loading'

const fetchProfile = async (userId) => {
  try {
    return await getUser(userId)
  } catch (error) {
    console.error(error)
    return null
  }
}

export default function ProfileLayout() {

  const [isAuth, setIsAuth] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
          if (!user) {
              navigate('/login?message=You have to log in to proceed');
          } else {
              setIsAuth(true)
          }
      });

      return () => unsubscribe();
  }, [navigate]);

  const { data: profile, isLoading: profileLoading, error: profileError } = useQuery({
    queryKey: ['profile'],
    queryFn: () => fetchProfile(auth.currentUser?.uid),
    enabled: isAuth,
    staleTime: Infinity,
    cacheTime: 5 * 60 * 1000,
    refetchOnMount: 'always'
  })

  profileError && console.error(profileError)

  return (
    <section className="profile-layout">
      {
        profileLoading ? <Loading /> :
        profile && (
          <>
            <ProfileNav profile={profile} />
            <Outlet context={profile} />
          </>
        )
      }    
    </section>
  )
}
