import { Box } from "@mui/joy"
import { neon } from "@neondatabase/serverless";

export default async function StudentCount() {
  const numStudents = await getNumStudents();
  return (
    <Box>{numStudents} Scarlet Knights have already joined!</Box>
  )
}

async function getNumStudents() {
  const sql = neon(process.env.DATABASE_URL!);
  try {
    const response = await sql`SELECT COUNT(*) AS num_users FROM Users`;
    return response[0].num_users;
  } catch (err) {
    console.error(err);
    return "An unknown number of";
  }
}