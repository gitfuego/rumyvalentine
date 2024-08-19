"use client"
import { FormControl, Radio, RadioGroup, Button, FormLabel, FormHelperText } from '@mui/joy';
import { useState } from 'react';
import styles from './Questionnaire.module.scss';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const questions = [
  {
    question: "What is your favorite campus?",
    a: "College Ave",
    b: "Busch",
    c: "Livingston",
    d: "Cook/Douglass"
  },
  {
    question: "What is your favorite campus?",
    a: "College Ave",
    b: "Busch",
    c: "Livingston",
    d: "Cook/Douglass"
  },
  {
    question: "What is your favorite campus?",
    a: "College Ave",
    b: "Busch",
    c: "Livingston",
    d: "Cook/Douglass"
  },
];

export default function Questionnaire() {
  const {data: session} = useSession();
  const [ formData, setFormData ] = useState([]);
  const [ buttonLoading, setButtonLoading ] = useState(false);
  const router = useRouter();

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
    onSubmit={(event) => {
    event.preventDefault();
    let errorFound = false;
    for (let i = 0; i < questions.length; i++) {
      if (!formData[i]) {
        errorFound = true;
      }
    }
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
    }}
    >
      {questions.map((q, index) => <Question 
      key={'qgroup' + index}
      data={q}
      setFormData={setFormData}
      i={index}
      />)}
      <Button type="submit" 
      loading={buttonLoading}
      >Submit</Button>
    </form>
    </>
  );
}

function Question({ data, setFormData, i}) {
  function handleChange(e) {
    setFormData((formData) => {
      formData[i] = e.target.value;
      return formData;
    })
  }

  return (
    <FormControl required>
      <FormLabel>{data.question}</FormLabel>
      <RadioGroup name={i} onChange={handleChange}>
        <Radio value="a" label={data.a} variant="outlined" />
        <Radio value="b" label={data.b} variant="outlined" />
        <Radio value="c" label={data.c} variant="outlined" />
        <Radio value="d" label={data.d} variant="outlined" />
      </RadioGroup>
    </FormControl>
  );
}