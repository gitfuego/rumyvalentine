import { Box } from "@mui/joy";
import { neon } from "@neondatabase/serverless";
import styles from "./StudentCount.module.scss";

export const dynamic = "force-dynamic";

export default async function StudentCount() {
  const numStudents = await getNumStudents();
  return (
    <Box className={styles.container}>{numStudents} Scarlet Lovers have already joined!</Box>
  );
}

async function getNumStudents() {
  const sql = neon(process.env.DATABASE_URL!);
  try {
    const response = await sql`SELECT COUNT(*) AS num_users FROM Users;`;
    console.log(response[0])
    return response[0].num_users;
  } catch (err) {
    console.error(err);
    return "An unknown number of";
  }
}
