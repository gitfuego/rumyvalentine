import { redirect } from "next/navigation";

export default function Page() {
  if (new Date('2025-02-10T00:00:00') > new Date()) redirect('/home');
  
  return (
    <>
      Matches
    </>
  );
}