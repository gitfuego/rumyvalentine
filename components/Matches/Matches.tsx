import { neon } from '@neondatabase/serverless';
import { getServerSession } from "next-auth";
import { Box } from '@mui/joy';
import CustomAvatar from './CustomAvatar';

export default async function Matches() {
  const session = await getServerSession();
  const matches = await getMatches(session?.user);
  // lets add some css animations
  
  return (
    <Box>
      Matches
      {matches.map((match, idx) => <CustomAvatar user={match} key={`match${idx}`} />)}
    </Box>
  );
}

async function getMatches(user) {
  const sql = neon(process.env.DATABASE_URL!);
  try {
    // check if user is in database
    const response = await sql(`SELECT * FROM Matches WHERE email1=$1 OR email2=$1`,
      [user.email]
    );
    return response;
  } catch (err) {
    console.error(err);
    return [{name: "John", image: null}, {name: "Jane Doe", image: null}];
  }
}