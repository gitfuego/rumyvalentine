import LandingCountdown from "../components/Countdown/LandingCountdown";
import StudentCount from "../components/StudentCount/StudentCount";
import { Box } from "@mui/joy";

export default async function Page() {

  return (
    <>
      <h1>RU my Valentine?</h1>
      <Box id='stats'>
        <StudentCount />
        <LandingCountdown />
      </Box>
    </>
  );
}