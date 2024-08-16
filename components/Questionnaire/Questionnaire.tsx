"use client"
import { FormControl, Radio, RadioGroup, Button, FormLabel} from '@mui/joy';
import { useState } from 'react';
import styles from './Questionnaire.module.scss';
import { useSession } from 'next-auth/react';

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
  const {data: session} = useSession();


  return (
    <form
    onSubmit={(event) => {
    event.preventDefault();
    console.log(formData);
    fetch('/api/responses', {
      method: "POST",
      body: JSON.stringify({responses: [...formData], email: session?.user?.email})
    })
    }}
    >
      {questions.map((q, index) => <Question 
      key={'qgroup' + index}
      data={q}
      setFormData={setFormData}
      i={index}/>)}
      <Button type="submit">Submit</Button>
    </form>
  );
}

function Question({ data, setFormData, i }) {
  function handleChange(e) {
    setFormData((formData) => {
      formData[i] = e.target.value;
      return formData;
    })
  }

  return (
    <FormControl>
      <FormLabel>{data.question}</FormLabel>
      <RadioGroup defaultValue="outlined" name={i} onChange={handleChange}>
        <Radio value="a" label={data.a} variant="outlined" />
        <Radio value="b" label={data.b} variant="outlined" onChange={handleChange}/>
        <Radio value="c" label={data.c} variant="outlined" onChange={handleChange}/>
        <Radio value="d" label={data.d} variant="outlined" onChange={handleChange}/>
      </RadioGroup>
    </FormControl>
  );
}