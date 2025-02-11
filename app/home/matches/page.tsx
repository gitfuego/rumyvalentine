import { redirect } from "next/navigation";
import Matches from "../../../components/Matches/Matches";

export default function Page() {
  if (new Date('2025-02-12T17:00:00Z') > new Date()) redirect('/home');
  
  return (
    <>
      <Matches />
    </>
  );
}