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
  const [ formData, setFormData ] = useState([]);
  const [ errors, setErrors ] : [boolean[], any] = useState([]);
  const {data: session} = useSession();
  const router = useRouter();

  return (
    <form
    onSubmit={(event) => {
    event.preventDefault();
    let errorFound = false;
    for (let i = 0; i < questions.length; i++) {
      if (!formData[i]) {
        errorFound = true;
        const newErrors: boolean[] = [...errors];
        newErrors[i] = true;
        setErrors(newErrors)
      }
    }
    if (errorFound) return;
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
      error={errors[index]}/>)}
      <Button type="submit">Submit</Button>
    </form>
  );
}

function Question({ data, setFormData, i, error }) {
  function handleChange(e) {
    setFormData((formData) => {
      formData[i] = e.target.value;
      return formData;
    })
  }

  return (
    <FormControl required error={error}>
      <FormLabel>{data.question}</FormLabel>
      <RadioGroup name={i} onChange={handleChange}>
        <Radio value="a" label={data.a} variant="outlined" />
        <Radio value="b" label={data.b} variant="outlined" />
        <Radio value="c" label={data.c} variant="outlined" />
        <Radio value="d" label={data.d} variant="outlined" />
      </RadioGroup>
      {error ? <FormHelperText>Please select an option.</FormHelperText> : <br/>}
    </FormControl>
  );
}