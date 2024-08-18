import Questionnaire from "../../../components/Questionnaire/Questionnaire";
import { redirect } from "next/navigation";
import { neon } from '@neondatabase/serverless';
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession();
  const hasResponse = await getResponse(session?.user);
  if (hasResponse) redirect('/home');

  return (
    <>
      <Questionnaire />
    </>
  );
}

async function getResponse(user) {
  const sql = neon(process.env.DATABASE_URL!);
  try {
    const response = await sql(`SELECT * FROM Responses WHERE email=$1`,
      [user.email]
    );
    return response[0] !== undefined;
  } catch (err) {
    console.error(err);
    return false;
  }
}