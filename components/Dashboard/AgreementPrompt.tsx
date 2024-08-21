import styles from './Dashboard.module.scss';
import PromptClose from './PromptClose';

export default function AgreementPrompt() {

  return (
    <dialog data-modal className={styles.errorModal}>
        <div className={styles.modalContainer}>
          <span>By using this app, you acknowledge that you have read, understood, and agree to be bound by the <a target="_blank" href="/user-agreement">User Agreement</a>.</span>
          <br/>
          <PromptClose />
        </div>
    </dialog>
  )
}
