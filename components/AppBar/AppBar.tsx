"use client";
import { useSession, signOut, signIn } from 'next-auth/react';
import styles from "./AppBar.module.scss"
import { useColorScheme } from '@mui/joy/styles';
import { Button } from '@mui/joy';
import React from 'react';
import CardioLoader from '../CardioLoader';
import { createClient } from "../../utils/supabase/client"


function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  // necessary for server-side rendering
  // because mode is undefined on the server
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return (
      <CardioLoader />
    )
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
    >
      {mode === 'light' ? 'Dark Mode' : 'Light Mode'}
    </Button>
  );
}



export default function AppBar() {

  return (
    <header className={styles.header} >
      <a href='/' className={styles.logo}></a>
      <h4>{''}</h4>
      <nav className={styles.nav}>
        <SignInButton />
        <ModeToggle />
      </nav>
    </header>
  )
}

function SignInButton() {
  const supabase = createClient();

  async function handleSignInWithGoogle(response) {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: response.credential,
    })
  }
  

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback?next=${
          location.origin
        }`,
      },
    });
  };

  return (
    <>
    <div id="g_id_onload"
     data-client_id="438319103339-laqn6ev4r7hiuf5081kthqcd3ineq7f0.apps.googleusercontent.com"
     data-context="signin"
     data-ux_mode="redirect"
     data-login_uri="localhost:3000"
     data-callback="handleSignInWithGoogle"
     data-auto_prompt="false">
    </div>
    <div className="g_id_signin"
        data-type="standard"
        data-shape="pill"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left">
    </div>
    </>
  );
}