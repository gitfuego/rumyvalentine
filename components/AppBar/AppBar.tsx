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
  
    function handleScroll() {
      const currentScrollPos = window.scrollY;
      const header = document.querySelector("header");
      if (!header) return;
  
      if (prevScrollpos > currentScrollPos) {
        header.style.top = "0";
        header.style.boxShadow = "0 0 8px gray";
      } else {
        header.style.top = "-10vh";
        header.style.boxShadow = "none";
      }
      prevScrollpos = currentScrollPos;
    }
  

    window.addEventListener('scroll', handleScroll);
  
    // Initial setting of the header's position to avoid abrupt animation on load
    const header = document.querySelector("header");
    if (header) {
      header.style.transition = 'top 0.3s ease-in-out, box-shadow 0.3s ease-in-out';
      header.style.top = "0";
    }
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  

  if (loading) {
    return (
      <>
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
      <PullTab/>
      </>
    );
  }

  return (
    <>
    <Box component="header" className={styles.header} >
      <Box className={styles.logoContainer}>
          <a href='/' className={styles.logo}></a>
        </Box>
      <Box component="h4">
        <span>{session?.user?.email ? session?.user?.email.substring(0, session?.user?.email.indexOf('@')) : ''}</span>
      </Box>
      <Box component="nav" className={styles.nav}>
        <SignInButton />
        <ModeToggle />
      </Box>
    </Box>
    <PullTab/>
    </>
  )
}

function SignInButton() {
  const { data: session } = useSession();

  return (
    <Button
    className={`${session?.user ? '' : styles.signIn}`}
    variant="solid" 
    color={session?.user ? "neutral" : "danger"} 
    onClick={() => {session?.user ? signOut() : signIn()}} >
      {session?.user ? "Sign Out" : "Sign In"}
    </Button>
  );
}

import { useColorScheme } from '@mui/joy/styles';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, [])
  return (
    loading ? <Loader /> : <DarkModeSwitch
    moonColor='white'
    checked={mode === 'dark'}
    onChange={() => {
      setMode(mode === 'dark' ? 'light' : 'dark')}
    }
    />
  );
}

function PullTab() {
  return (
    <div className={styles.pullTabContainer}>
    <button 
    className={styles.pullTab} 
    onClick={(e) => {
      const header = document.querySelector("header");
      header!.style.top = "0";
      header!.style.boxShadow = "0 0 8px gray";
    }}/>
  </div>
  )
}