// import { useSession } from 'next-auth/react';
import styles from "./Dashboard.module.scss"

// export default function Dashboard() {


//   return (
    // <main className={styles.main} >
    //   <a href='/' className={styles.logo}></a>
    //   <h4>{ }</h4>
    //   {string ? 
    //     <div>{string}</div> :
    //     <button type='button'
    //     onClick={handleClick}>
    //       click
    //     </button>
    //   }
    // </main>
//   )
// }

import { neon } from '@neondatabase/serverless';
import { getServerSession } from "next-auth";

async function getData() {
  const sql = neon(process.env.DATABASE_URL);
  try {
    const response = await sql`SELECT * FROM Users`;
    return response;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default async function Dashboard() {
  const session = await getServerSession();
  const data = await getData();

  return <>{JSON.stringify(session)}</>;
}