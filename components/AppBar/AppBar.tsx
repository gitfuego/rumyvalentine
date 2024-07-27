"use client";
import { useSession, signOut, signIn } from 'next-auth/react';
import styles from "./AppBar.module.scss"
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import { Button } from '@mui/joy';
import React from 'react';
import CardioLoader from '../CardioLoader';


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
  const { data: session } = useSession();

  return (
    <header className={styles.header} >
      <a href='/' className={styles.logo}></a>
      <h4>{session?.user?.email ?? ''}</h4>
      <nav className={styles.nav}>
        <SignInButton />
        <ModeToggle />
      </nav>
    </header>
  )
}

function SignInButton() {
  const { data: session } = useSession();

  return (
    <Button onClick={() => {session && session.user ? signOut() : signIn()}} >
      {session && session.user ? "Sign Out" : "Sign In"}
    </Button>
  );
}