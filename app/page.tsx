import CustomCountdown from "../components/Countdown/CustomCountdown";
import StudentCount from "../components/StudentCount/StudentCount";
// import { neon } from "@neondatabase/serverless";

export default async function Page() {

  return (
    <>
      <h1>Landing</h1>
      <StudentCount />
      <CustomCountdown />
    </>
  );
}