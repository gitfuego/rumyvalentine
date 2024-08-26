"use client"
import { FormControl, Radio, RadioGroup, Button, FormLabel, FormHelperText } from '@mui/joy';
import { useState } from 'react';
import styles from "./Profile.module.scss";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';



export default function Profile() {
  const {data: session} = useSession();
  const [ formData, setFormData ] = useState([]);
  const [ buttonLoading, setButtonLoading ] = useState(false);
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    let errorFound = false;
    if (errorFound) {
      return document.querySelector("dialog")!.showModal();
    }
    setButtonLoading(true);
    fetch('/api/responses', {
      method: "POST",
      body: JSON.stringify({responses: [...formData], email: session?.user?.email})
    })
    .then(() => {
      router.push('/home');
    })
  }

  return (
    <>
    <dialog data-modal className={styles.errorModal}>
      <div className={styles.modalContainer}>
        <div>You missed some questions, go back and fill everything out.</div>
        <br />
        <Button data-close-modal 
        color='danger'
        onClick={() =>  document.querySelector("dialog")!.close()}>Close</Button>
      </div>
    </dialog>
    <form
    onSubmit={handleSubmit}
    > 
      <Button type="submit" 
      loading={buttonLoading}
      >Submit</Button>
    </form>
    </>
  );
}