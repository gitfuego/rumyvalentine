import Profile from "../../../components/Profile/Profile";
import { neon } from '@neondatabase/serverless';
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession();
  const user = await getUser(session!.user!.email);


  return (
    <>
      <Profile user={user} />
    </>
  );
}

async function getUser(email) {
  const sql = neon(process.env.DATABASE_URL!);
  try {
    const response = await sql(`SELECT * FROM Users WHERE email=$1`,
      [email]
    );
    return response[0];
  } catch (err) {
    console.error(err);
    return false;
  }
}