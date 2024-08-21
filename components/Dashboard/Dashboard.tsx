import styles from "./Dashboard.module.scss"
import { neon } from '@neondatabase/serverless';
import { getServerSession } from "next-auth";
import { Link } from "@mui/joy";
import Image from "next/image";
import AgreementPrompt from "./AgreementPrompt";

export default async function Dashboard() {
  const session = await getServerSession();

  const agreed = await addUser(session?.user);
  const didQuestionnaire = await checkResponse(session?.user?.email);

  return (
    <>
      {!agreed && <AgreementPrompt />}
      <div className={styles.main}>
        <Module
        completed={false}
        href='/home/profile'
        image="/images/rumvLogoOnly.svg" 
        label="Profile"
        />
        <Module 
        completed={didQuestionnaire}
        href='/home/questionnaire'
        image="/images/rumvLogoOnly.svg" 
        label="Questionnaire"
        />
        <Module 
        completed={false}
        href='/home#'
        image="/images/rumvLogoOnly.svg" 
        label="Matches"
        />
      </div>
    </>
  );
}

async function addUser(user) {
  const sql = neon(process.env.DATABASE_URL!);
  try {
    // check if user is in database
    const response = await sql(`SELECT * FROM Users WHERE email=$1`,
      [user.email]
    );
    if (response[0]) return response[0].agreed;

    // if not, add them
    else {
      const insertion = await sql(`INSERT INTO Users (name, email)
        Values ($1, $2) RETURNING *`,
        [user.name, user.email]
      );
      return insertion[0].agreed;
    }
  } catch (err) {
    return console.error(err);
  }
}

async function checkResponse(email) {
  const sql = neon(process.env.DATABASE_URL!);
  try {
    const response = await sql(`SELECT * FROM Responses WHERE email=$1`,
      [email]
    );
    return response[0] !== undefined;
  } catch (err) {
    console.error(err);
    return false;
  }
}

function Module({ href, image, label, completed }) {
  if (label === "Matches") completed = new Date('2025-02-10T00:00:00') > new Date();

  return (
    <Link href={href} disabled={label !== "Profile" ? completed : false}>
      <div className={styles.moduleContainer}>
        <h3>{label}</h3>
        <Image src={image} alt={label} width="180" height="180"/>
      </div>
    </Link>
  )
}