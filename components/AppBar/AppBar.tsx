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

  if (loading) {
    return (
      <Box component="header" className={styles.header} >
        <a href='/' className={styles.logo}></a>
        <Loader />
        <Loader />
      </Box>
    );
  }

  return (
    <Box component="header" className={styles.header} >
      <a href='/' className={styles.logo}></a>
      <h4>{session?.user?.email ? session?.user?.email.substring(0, session?.user?.email.indexOf('@')) : ''}</h4>
      <SignInButton />
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