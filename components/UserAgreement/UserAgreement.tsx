import styles from './UserAgreement.module.scss';

export default function UserAgreement() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>User Agreement</h1>
      <p className={styles.effectiveDate}>Effective Date: August 20th, 2024</p>
      
      <section className={styles.section}>
        <h2>Welcome to RUmyValentine ("RUMV")!</h2>
        <p>
          Please read this User Agreement ("Agreement") carefully before using our matchmaking application, RUmyValentine ("the App"). By accessing or using the App, you agree to be bound by the terms and conditions of this Agreement. If you do not agree with these terms, please do not use the App.
        </p>
      </section>

      <section className={styles.section}>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By creating an account, accessing, or using the App, you acknowledge that you have read, understood, and agree to be bound by this Agreement and any future amendments or updates.
        </p>
      </section>

      <section className={styles.section}>
        <h2>2. Use of the App</h2>
        <p>
          RUMV provides a platform exclusively for Rutgers University students to connect and potentially find compatible matches. The App is intended for personal, non-commercial use only. You agree to use the App in compliance with all applicable laws and regulations. Please note that RUMV is not an official Rutgers University application and is not affiliated with or endorsed by Rutgers University.
        </p>
      </section>

      <section className={styles.section}>
        <h2>3. Eligibility</h2>
        <p>
          You must be at least 18 years old and an enrolled student at Rutgers University to use the App. By using the App, you represent and warrant that you meet these eligibility requirements.
        </p>
      </section>

      <section className={styles.section}>
        <h2>4. User Authentication</h2>
        <p>
          User authentication is handled through Google OAuth. By using Google OAuth, you agree to Google's terms of service and privacy policy. RUMV is not responsible for any issues arising from the use of Google OAuth.
        </p>
      </section>

      <section className={styles.section}>
        <h2>5. User Responsibilities</h2>
        <p><strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your Google account and password. You agree to accept responsibility for all activities that occur under your account.</p>
        <p><strong>User Conduct:</strong> You agree not to use the App for any unlawful or prohibited activities, including but not limited to harassment, defamation, fraud, or any other actions that may harm other users or the App.</p>
      </section>

      <section className={styles.section}>
        <h2>6. Disclaimer of Warranties</h2>
        <p>
          RUMV is provided on an "as-is" and "as available" basis. The creators of RUMV make no warranties, express or implied, regarding the App's functionality, reliability, availability, or suitability for any particular purpose. You use the App at your own risk.
        </p>
      </section>

      <section className={styles.section}>
        <h2>7. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, the creators, developers, and affiliates of RUMV shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to emotional distress, lost profits, loss of data, or any other damages arising out of or related to your use of the App. This includes any harm or loss resulting from communications or interactions with other users of the App.
        </p>
      </section>

      <section className={styles.section}>
        <h2>8. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless the creators, developers, affiliates, and employees of RUMV from any claims, damages, liabilities, or expenses (including legal fees) arising out of your use of the App, your violation of this Agreement, or your violation of any rights of another user.
        </p>
      </section>

      <section className={styles.section}>
        <h2>9. Termination</h2>
        <p>
          The creators of RUMV reserve the right to suspend or terminate your account at any time, with or without notice, for any reason, including but not limited to violations of this Agreement.
        </p>
      </section>

      <section className={styles.section}>
        <h2>10. Changes to the Agreement</h2>
        <p>
          RUMV may update this Agreement from time to time. Any changes will be posted on the App, and your continued use of the App following the posting of changes constitutes your acceptance of such changes.
        </p>
      </section>

      <section className={styles.section}>
        <h2>11. Governing Law</h2>
        <p>
          This Agreement shall be governed by and construed in accordance with the laws of the State of New Jersey, without regard to its conflict of law principles.
        </p>
      </section>

      <section className={styles.section}>
        <h2>12. Severability</h2>
        <p>
          If any provision of this Agreement is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary, so that the remainder of this Agreement will otherwise remain in full force and effect.
        </p>
      </section>

      <section className={styles.section}>
        <h2>13. Entire Agreement</h2>
        <p>
          This Agreement constitutes the entire understanding between you and the creators of RUMV regarding the use of the App and supersedes all prior agreements, whether written or oral.
        </p>
      </section>

      {/* <section className={styles.section}>
        <h2>Contact Information</h2>
        <p>
          If you have any questions about this Agreement, please contact us at [Insert Contact Information].
        </p>
      </section> */}

      <p className={styles.agreement}>By using RUMV, you acknowledge that you have read, understood, and agree to be bound by this Agreement.</p>
    </div>
  );
}
