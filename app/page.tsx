import CustomCountdown from "../components/Countdown/CustomCountdown";
import StudentCount from "../components/StudentCount/StudentCount";
import { Box } from "@mui/joy";
// import { neon } from "@neondatabase/serverless";

export default async function Page() {

  return (
    <>
      <h1>Find your Rutgers Valentine!</h1>
      <Box id='stats'>
        <StudentCount />
        <CustomCountdown />
      </Box>
    </>
  );
}