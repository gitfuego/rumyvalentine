import styles from "./Dashboard.module.scss"
import Avatar from '@mui/joy/Avatar';
import { neon } from '@neondatabase/serverless';
import { getServerSession } from "next-auth";

async function getData(user) {
  const sql = neon(process.env.DATABASE_URL!);
  try {
    const response = await sql(`SELECT * FROM Users WHERE email=$1`,
      [user.email]
    );
    if (response[0]) return response[0];
    else {
      const input = await sql(`INSERT INTO Users (name, email)
        Values ($1, $2) RETURNING *`,
        [user.name, user.email]
      );
      return input[0];
    }
  } catch (err) {
    return console.error(err);
  }
}

export default async function Dashboard() {
  const session = await getServerSession();

  const data = await getData(session?.user);

  return (
    <div className={styles.main}>
      <Avatar alt={data?.name} src={data?.image} />
    </div>
  );
}