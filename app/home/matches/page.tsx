import { redirect } from "next/navigation";
import Matches from "../../../components/Matches/Matches";

export default function Page() {
  if (new Date('2025-02-12T09:00:00') > new Date()) redirect('/home');
  
  return (
    <>
      <Matches />
    </>
  );
}