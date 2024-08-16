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
    if (response[0] && response[0].image === user.image) return response[0];
    else if (response[0]) {
      const update = await sql(`UPDATE Users
        SET image = $1 WHERE email = $2 RETURNING *`,
        [ user.image, user.email ]
      );
      return update[0];

    }
    else {
      const input = await sql(`INSERT INTO Users (name, email, image)
        Values ($1, $2, $3) RETURNING *`,
        [user.name, user.email, user.image]
      );
      return input[0];
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default async function Dashboard() {
  const session = await getServerSession();

  const data = await getData(session?.user);

  return (
    <div>
      <Avatar alt={data?.name} src={data?.image} />
      {JSON.stringify(data)}
      <br/>
      {JSON.stringify(session)}
    </div>
  );
}