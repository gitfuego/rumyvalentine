"use client"
import { FormControl, Radio, RadioGroup, Button, FormLabel, Box } from '@mui/joy';
import { Modal, ModalDialog, ModalClose } from '@mui/joy';
import { useState } from 'react';
import styles from '../Profile/Profile.module.scss';
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

export default function Questionnaire({user}) {
  const [ formData, setFormData ] = useState([]);
  const [ buttonLoading, setButtonLoading ] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    let errorFound = false;
    for (let i = 0; i < questions.length; i++) {
      if (!formData[i]) {
        errorFound = true;
      }
    }
    if (errorFound) {
      return setOpen(true);
    }
    setButtonLoading(true);
    fetch('/api/responses', {
      method: "POST",
      body: JSON.stringify({responses: [...formData], email: user?.email})
    })
    .then(() => {
      router.push('/home');
    })
  }

  return (
    <>
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog >
        <ModalClose 
        color='danger'
        />
        <br />
        <div>You missed some questions, go back and fill everything out.</div>
        <br />
      </ModalDialog>
    </Modal>
    <form
    className={styles.form}
    onSubmit={handleSubmit}
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
    <Box>
      <FormControl required>
        <FormLabel>{data.question}</FormLabel>
        <RadioGroup name={i} onChange={handleChange}>
          <Radio value="a" label={data.a} variant="outlined" />
          <Radio value="b" label={data.b} variant="outlined" />
          <Radio value="c" label={data.c} variant="outlined" />
          <Radio value="d" label={data.d} variant="outlined" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}