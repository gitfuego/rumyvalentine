import { neon } from '@neondatabase/serverless';
import { getServerSession } from "next-auth";
import { Link, Typography, Step, StepIndicator, Stack } from "@mui/joy";
import Image from "next/image";
import styles from "./Dashboard.module.scss"
import AgreementPrompt from "./AgreementPrompt";
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
          <Typography sx={{textAlign: 'center'}}></Typography>
          <Stack spacing={1}>
            <Module
            completed={didProfile}
            href='/home/profile'
            image="/images/rumvLogoOnly.svg" 
            label="Profile"
            />
            <Typography sx={{textAlign: 'center'}}>What others see</Typography>
          </Stack>
      </Step>
      <Step
        orientation="vertical"
        indicator={<StepIndicator variant="outlined">2</StepIndicator>}
        >
        <Typography sx={{textAlign: 'center'}}></Typography>
        <Stack spacing={1}>
          <Module 
          completed={didQuestionnaire}
          href='/home/questionnaire'
          image="/images/rumvLogoOnly.svg" 
          label="Questionnaire"
          />
          <Typography sx={{textAlign: 'center'}} >What nobody sees</Typography>
        </Stack>
      </Step>
      <Step orientation="vertical"
      indicator={<StepIndicator variant="outlined">3</StepIndicator>}
      >
        <Typography sx={{textAlign: 'center'}}></Typography>
        <Stack spacing={1}>
              <Module 
              completed={false}
              href='/home#'
              image="/images/rumvLogoOnly.svg" 
              label="Matches"
              />
          <Typography sx={{textAlign: 'center'}}>What you will see</Typography>
        </Stack>
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