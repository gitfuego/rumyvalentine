
import { neon } from '@neondatabase/serverless';
import { getServerSession } from "next-auth";
import { Box, List } from '@mui/joy';
import CustomAvatar from './CustomAvatar';

export default async function Matches() {
  const session = await getServerSession();
  const matches = await getMatches(session?.user);
  
  return (
    <Box>
      <Box component="h1">Matches</Box>
      <List>
      {matches.length>0 ? matches.map((match, idx) => <CustomAvatar user={match} key={`match${idx}`} />) :
      <MatchesPlaceholder/>}
      </List>
    </Box>
  );
}

function MatchesPlaceholder() {
  return (
    <Box component="h2" textAlign="center">No matches yet! Either the algorithm is working on it or you didn't fill everything out in time.</Box>
  )
}

async function getMatches(user) {
  const sql = neon(process.env.DATABASE_URL!);
  try {
    const response = await sql(`SELECT DISTINCT u.name, u.ctype, u.contact, u.profile_pic
      FROM Users u
      JOIN Matches m ON (m.user1 = u.email OR m.user2 = u.email)
      WHERE (m.user1 = $1 OR m.user2 = $1)
      AND u.email <> $1;`,
      [user.email]
    );
    return response;
  } catch (err) {
    console.error(err);
    return [];
  }
}