"use client";
import { useSession, signOut, signIn } from 'next-auth/react';
import styles from "./AppBar.module.scss"
import Image from 'next/image';

export default function AppBar() {
  const { data: session } = useSession();

  return (
    <header className={styles.header} >
      <a href='/' className={styles.logo}>
      {/* <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
        width="52.000000pt" height="52.000000pt" viewBox="0 0 52.000000 52.000000"
        preserveAspectRatio="xMidYMid meet">

        <g transform="translate(0.000000,76.000000) scale(0.0100000,-0.0100000)"
        fill="#CC0033" stroke="none">
        <path d="M680 5398 l0 -1963 540 540 c297 297 540 544 540 550 0 5 -37 47 -82
        92 l-83 83 -332 -332 -333 -333 0 1538 0 1537 1625 0 1625 0 0 -1185 0 -1185
        -1075 0 -1075 0 0 -125 0 -125 1195 0 1195 0 0 1435 0 1435 -1870 0 -1870 0 0
        -1962z"/>
        <path d="M2025 6704 c-195 -42 -366 -175 -450 -349 -51 -105 -68 -190 -63
        -315 8 -167 65 -304 178 -420 71 -74 139 -116 277 -174 209 -88 404 -228 435
        -312 l12 -34 121 0 121 0 17 39 c39 89 227 221 437 310 199 84 305 175 380
        326 53 107 71 181 72 295 0 117 -20 198 -75 305 -78 150 -217 264 -387 317
        -112 35 -275 32 -385 -6 -44 -15 -102 -41 -129 -57 l-48 -30 -77 39 c-42 22
        -101 47 -131 56 -81 24 -221 29 -305 10z m271 -263 c76 -27 152 -88 198 -160
        l39 -59 81 35 c44 19 96 42 114 50 l33 14 -25 46 c-14 25 -26 47 -26 49 0 8
        111 42 155 48 76 11 182 -17 255 -65 69 -47 110 -95 148 -176 24 -51 27 -70
        27 -158 0 -94 -2 -105 -33 -168 -36 -73 -108 -152 -163 -179 -19 -9 -92 -44
        -163 -77 -140 -66 -300 -168 -355 -225 -19 -20 -40 -36 -46 -36 -6 0 -27 16
        -46 36 -72 75 -301 212 -447 266 -117 44 -196 114 -246 218 -28 59 -31 74 -31
        165 0 92 3 106 32 167 91 192 298 279 499 209z"/>
        <path d="M4680 6475 l0 -125 75 0 75 0 0 -1482 0 -1483 -348 348 -347 347
        -1058 0 -1057 0 0 115 0 115 -125 0 -125 0 0 -235 0 -235 1127 0 1128 0 527
        -527 528 -528 0 1908 0 1907 -200 0 -200 0 0 -125z"/>
        </g>
      </svg> */}
      </a>
      <h4>{session?.user?.email ?? 'a'}</h4>
      <SignInButton />
    </header>
  )
}

function SignInButton() {
  const { data: session } = useSession();

  return (
    <button onClick={() => {session && session.user ? signOut() : signIn()}} >
      {session && session.user ? "Sign Out" : "Sign In"}
    </button>
  );
}