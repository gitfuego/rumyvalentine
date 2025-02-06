import LandingCountdown from "../components/Countdown/LandingCountdown";
import StudentCount from "../components/StudentCount/StudentCount";
import { Box, List, ListItem, ListItemContent } from "@mui/joy";

export default async function Page() {

  return (
    <>
      <h1>RU my Valentine?</h1>
      <Box id='stats'>
        <StudentCount />
        <LandingCountdown />
      </Box>
      <br/>
      <Box component="h2" >How to find your match:</Box>
      <List component="ol" marker="decimal">
        <ListItem>
          <ListItemContent>
            <h3>Log in with your Scarletmail Google account.</h3>
            Rutgers students only!
          </ListItemContent>
        </ListItem>
        <ListItem>
          <ListItemContent>
            <h3>Fill out your profile and the questionnaire.</h3>
            The best 21 questions you'll have ever answered.
          </ListItemContent>
        </ListItem>
        <ListItem>
          <ListItemContent>
            <h3>Get your matches on February 12th!</h3>
            Clear your schedule for the 14th!
          </ListItemContent>
        </ListItem>
      </List>
      <br/>
      <Box width="50%" minWidth="300px">
        <Box component="h2" textAlign="center">What is RUMV?</Box>
        <Box component="p">
          We take your questionnaire responses and match you with your most compatible people. After that, it's up to one of you to reach out through your provided contact. Love responsibly.
        </Box>
      </Box>
      <br/>
    </>
  );
}