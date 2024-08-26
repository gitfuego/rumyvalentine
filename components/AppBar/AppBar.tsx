"use client";
import { useSession, signOut, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styles from "./AppBar.module.scss"
import { Button, Box } from '@mui/joy';
import { usePathname } from 'next/navigation';
import Loader from '../Loader/Loader';


export default function AppBar() {
  const path = usePathname();
  const [ loading, setLoading ] = useState(path !== '/')
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user || path === '/user-agreement') setLoading(false);
  }, [session]);

  useEffect(() => {
    let prevScrollpos = window.scrollY;
    window.onscroll = function() {
      const currentScrollPos = window.scrollY;
      const header = document.querySelector("header")!;
      if (prevScrollpos > currentScrollPos) {
        header.style.top = "0";
        header.style.boxShadow = "0 0 8px gray"
      } else {
        header.style.top = "-10vh";
        header.style.boxShadow = "none";
      }
      prevScrollpos = currentScrollPos;
}
  })

  if (loading) {
    return (
      <Box component="header" className={styles.header} >
        <Box className={styles.logoContainer}>
          <a href='/' className={styles.logo}></a>
        </Box>
        <Loader />
        <Box component="nav" className={styles.nav}>
          <Loader />
          <ModeToggle />
        </Box>
      </Box>
    );
  }

  return (
    <Box component="header" className={styles.header} >
      <Box className={styles.logoContainer}>
          <a href='/' className={styles.logo}></a>
        </Box>
      <h4>{session?.user?.email ? session?.user?.email.substring(0, session?.user?.email.indexOf('@')) : ''}</h4>
      <Box component="nav" className={styles.nav}>
        <SignInButton />
        <ModeToggle />
      </Box>
    </Box>
  )
}

function SignInButton() {
  const { data: session } = useSession();

  return (
    <Button 
    variant="solid" 
    color={session?.user ? "neutral" : "danger"} 
    onClick={() => {session?.user ? signOut() : signIn()}} >
      {session?.user ? "Sign Out" : "Scarletmail Sign In"}
    </Button>
  );
}

import { useColorScheme } from '@mui/joy/styles';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  return (
    <DarkModeSwitch
    checked={mode === 'dark'}
    onChange={() => {
      setMode(mode === 'dark' ? 'light' : 'dark')}
    }
    />
  );
}
