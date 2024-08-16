"use client";
import { useSession, signOut, signIn } from 'next-auth/react';
import styles from "./AppBar.module.scss"
import { Button } from '@mui/joy';

export default function AppBar() {
  const { data: session } = useSession();

  return (
    <header className={styles.header} >
      <a href='/' className={styles.logo}></a>
      <h4>{session?.user?.email ?? ''}</h4>
      <SignInButton />
    </header>
  )
}

function SignInButton() {
  const { data: session } = useSession();

  return (
    <Button variant="outlined" color="danger" onClick={() => {session?.user ? signOut() : signIn()}} >
      {session?.user ? "Sign Out" : "Sign In"}
    </Button>
  );
}