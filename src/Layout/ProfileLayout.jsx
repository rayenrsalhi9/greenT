
import { Outlet, redirect, defer, Await, useLoaderData } from "react-router-dom"
import { Suspense, useState, useEffect } from 'react';
import { getUser } from "../firebase/getProfile";
import { auth } from "../config/firebase";

import ProfileNav from "../components/ProfileNav"

export function loader() {
  return new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
          if (!user) {
              resolve(redirect('/login?message=You have to log in to proceed'));
          } else {
              resolve(defer({ profile: getUser(user.uid) }));
          }
          unsubscribe();
      });
  });
}

export default function ProfileLayout() {
  const [user, setUser] = useState(auth.currentUser)
  const profileObject = useLoaderData()

  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
          setUser(user);
      });

      return () => unsubscribe();
  }, []);

  return (
    <section className="profile-layout">
        <Suspense fallback={<h1>Loading...</h1>}>
          <Await resolve={profileObject.profile}>
              {
                profile => (
                  <>
                    <ProfileNav profile={profile} user={user} />
                    <Outlet context={profile} />
                  </>
                )
              }
          </Await>
        </Suspense>
    </section>
  )
}
