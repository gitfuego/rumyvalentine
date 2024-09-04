import styles from "./Dashboard.module.scss"
import { neon } from '@neondatabase/serverless';
import { getServerSession } from "next-auth";
import { Link, Typography, Step, StepIndicator } from "@mui/joy";
import Image from "next/image";
import AgreementPrompt from "../Dashboard/AgreementPrompt";
import AdaptiveStepper from "./AdaptiveStepper";

export default async function Dashboard() {
  const session = await getServerSession();
  const user = await getUser(session?.user);
  const didQuestionnaire = await checkResponse(session?.user?.email);
  const didProfile = user!.pref !== null;

  return (
    <>
      {!user!.agreed && <AgreementPrompt />}
      <main className={styles.main}>
      <AdaptiveStepper>
      <Step
        orientation="vertical"
        indicator={
          <StepIndicator variant="solid" color="danger">
            1
          </StepIndicator>
        }
        >
        <Module
        completed={didProfile}
        href='/home/profile'
        image="/images/rumvLogoOnly.svg" 
        label="Profile"
        />
      </Step>
      <Step
        orientation="vertical"
        indicator={<StepIndicator variant="outlined">2</StepIndicator>}
        >
        <Module 
        completed={didQuestionnaire}
        href='/home/questionnaire'
        image="/images/rumvLogoOnly.svg" 
        label="Questionnaire"
        />
      </Step>
      <Step orientation="vertical"
      indicator={<StepIndicator variant="outlined">3</StepIndicator>}
      >
      <Module 
        completed={false}
        href='/home#'
        image="/images/rumvLogoOnly.svg" 
        label="Matches"
        />
      </Step>
    </AdaptiveStepper>
    </main>
    </>
  );
}

async function getUser(user) {
  const sql = neon(process.env.DATABASE_URL!);
  try {
    // check if user is in database
    const response = await sql(`SELECT * FROM Users WHERE email=$1`,
      [user.email]
    );
    if (response[0]) return response[0];

    // if not, add them
    else {
      const insertion = await sql(`INSERT INTO Users (name, email)
        Values ($1, $2) RETURNING *`,
        [user.name, user.email]
      );
      return insertion[0];
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
  let disabled = completed;
  if (label === "Matches") disabled = new Date('2025-02-10T00:00:00') > new Date();
  else if (label === "Profile") disabled = false;

  return (
    <Link href={href} disabled={disabled}>
      <div className={styles.moduleContainer}>
        <Image src={image} alt={label} width="180" height="180"/>
        <Typography level="h3" fontSize="l">
          {label}
        </Typography>
      </div>
    </Link>
  )
}

// import Stepper from '@mui/joy/Stepper';
// import Step from '@mui/joy/Step';
// import StepIndicator from '@mui/joy/StepIndicator';

// export default function IndicatorTopStepper() {
//   return (
    // <Stepper sx={{ width: '100%' }}>
    //   <Step
    //     orientation="vertical"
    //     indicator={
    //       <StepIndicator variant="solid" color="neutral">
    //         1
    //       </StepIndicator>
    //     }
    //   >
    //     1
    //   </Step>
    //   <Step
    //     orientation="vertical"
    //     indicator={<StepIndicator variant="outlined">2</StepIndicator>}
    //   >
    //     2
    //   </Step>
    //   <Step orientation="vertical" indicator={<StepIndicator>3</StepIndicator>}>
    //     3
    //   </Step>
    // </Stepper>
//   );
// }