import styles from './UserAgreement.module.scss';
import { Box } from '@mui/joy'

export default function UserAgreement() {
  return (
    <Box className={styles.container}>
      <Box component="h1" className={styles.title}>User Agreement</Box>
      <Box component="p" className={styles.effectiveDate}>Effective Date: December 20th, 2024</Box>
      
      <Box component="section" className={styles.section}>
        <Box component="h2">Welcome to RUmyValentine ("RUMV")!</Box>
        <Box component="p">
          Please read this User Agreement ("Agreement") carefully before using our matchmaking application, RUmyValentine ("the App"). By accessing or using the App, you agree to be bound by the terms and conditions of this Agreement. If you do not agree with these terms, please do not use the App.
        </Box>
      </Box>

      <Box component="section" className={styles.section}>
        <Box component="h2">1. Acceptance of Terms</Box>
        <Box component="p">
          By creating an account, accessing, or using the App, you acknowledge that you have read, understood, and agree to be bound by this Agreement and any future amendments or updates.
        </Box>
      </Box>

      <Box component="section" className={styles.section}>
        <Box component="h2">2. Use of the App</Box>
        <Box component="p">
          RUMV provides a platform exclusively for Rutgers University students to connect and potentially find compatible matches. The App is intended for personal, non-commercial use only. You agree to use the App in compliance with all applicable laws and regulations. Please note that RUMV is not an official Rutgers University application and is not affiliated with or endorsed by Rutgers University.
        </Box>
      </Box>

      <Box component="section" className={styles.section}>
        <Box component="h2">3. Eligibility</Box>
        <Box component="p">
          You must be at least 18 years old and an enrolled student at Rutgers University to use the App. By using the App, you represent and warrant that you meet these eligibility requirements.
        </Box>
      </Box>

      <Box component="section" className={styles.section}>
        <Box component="h2">4. User Authentication</Box>
        <Box component="p">
          User authentication is handled through Google OAuth. By using Google OAuth, you agree to Google's terms of service and privacy policy. RUMV is not responsible for any issues arising from the use of Google OAuth.
        </Box>
      </Box>

      <Box component="section" className={styles.section}>
        <Box component="h2">5. User Responsibilities</Box>
        <Box component="p"><strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your Google account and password. You agree to accept responsibility for all activities that occur under your account.</Box>
        <Box component="p"><strong>User Conduct:</strong> You agree not to use the App for any unlawful or prohibited activities, including but not limited to harassment, defamation, fraud, or any other actions that may harm other users or the App.</Box>
      </Box>

      <Box component="section" className={styles.section}>
        <Box component="h2">6. Disclaimer of Warranties</Box>
        <Box component="p">
          RUMV is provided on an "as-is" and "as available" basis. The creators of RUMV make no warranties, express or implied, regarding the App's functionality, reliability, availability, or suitability for any particular purpose. You use the App at your own risk.
        </Box>
      </Box>

      <Box component="section" className={styles.section}>
        <Box component="h2">7. Limitation of Liability</Box>
        <Box component="p">
          To the fullest extent permitted by law, the creators, developers, and affiliates of RUMV shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to emotional distress, lost profits, loss of data, or any other damages arising out of or related to your use of the App. This includes any harm or loss resulting from communications or interactions with other users of the App.
        </Box>
      </Box>

      <Box component="section" className={styles.section}>
        <Box component="h2">8. Indemnification</Box>
        <Box component="p">
          You agree to indemnify and hold harmless the creators, developers, affiliates, and employees of RUMV from any claims, damages, liabilities, or expenses (including legal fees) arising out of your use of the App, your violation of this Agreement, or your violation of any rights of another user.
        </Box>
      </Box>

      <Box component="section" className={styles.section}>
        <Box component="h2">9. Termination</Box>
        <Box component="p">
          The creators of RUMV reserve the right to suspend or terminate your account at any time, with or without notice, for any reason, including but not limited to violations of this Agreement.
        </Box>
      </Box>

      <Box component="section" className={styles.section}>
        <Box component="h2">10. Changes to the Agreement</Box>
        <Box component="p">
          RUMV may update this Agreement from time to time. Any changes will be posted on the App, and your continued use of the App following the posting of changes constitutes your acceptance of such changes.
        </Box>
      </Box>

      <Box component="section" className={styles.section}>
        <Box component="h2">11. Governing Law</Box>
        <Box component="p">
          This Agreement shall be governed by and construed in accordance with the laws of the State of New Jersey, without regard to its conflict of law principles.
        </Box>
      </Box>

      <Box component="section" className={styles.section}>
        <Box component="h2">12. Severability</Box>
        <Box component="p">
          If any provision of this Agreement is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary, so that the remainder of this Agreement will otherwise remain in full force and effect.
        </Box>
      </Box>

      <Box component="section" className={styles.section}>
        <Box component="h2">13. Entire Agreement</Box>
        <Box component="p">
          This Agreement constitutes the entire understanding between you and the creators of RUMV regarding the use of the App and supersedes all prior agreements, whether written or oral.
        </Box>
      </Box>

      <Box component="p" className={styles.agreement}>By using RUMV, you acknowledge that you have read, understood, and agree to be bound by this Agreement.</Box>
    </Box>
  );
}
