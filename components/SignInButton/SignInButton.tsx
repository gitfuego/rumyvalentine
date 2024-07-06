"use client";
import React from 'react';
import { useSession, signOut, signIn } from 'next-auth/react';


export default function SignInButton() {
  const { data: session } = useSession();

  if (session && session.user){
    return (
      <div>
        <p>{session.user.email}</p>
        <button onClick={() => {signOut()}} >
          Sign Out
        </button>
      </div>
    );
  }
  return (
    <button onClick={() => signIn()} >
          Sign In
    </button>
  );
}