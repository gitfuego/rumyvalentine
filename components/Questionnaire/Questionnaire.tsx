"use client"
import { FormControl, Button, FormLabel, Box, FormHelperText, Input } from '@mui/joy';
import { Modal, ModalDialog, ModalClose } from '@mui/joy';
import { useState } from 'react';
import styles from '../Profile/Profile.module.scss';
import { useRouter } from 'next/navigation';

const questions = [
  { question: "Spirituality and/or religion plays a big role in my life—higher powers, good vibes, all that." },
  { question: "Having a structured daily routine is important to me, or at least, I try to have one." },
  { question: "I live that fit life—hitting the gym, eating right, and feeling good." },
  { question: "Being outdoors is my thing. Hiking, exploring, or just vibing in nature sounds like a great time." },
  { question: "A chill night in with movies and snacks beats a wild night out any day." },
  { question: "House parties are better than frat parties. No long lines, better music, and fewer mystery spills." },
  { question: "I wear my heart on my sleeve. Expressing emotions is easy for me." },
  { question: "I’d rather avoid confrontation than address issues directly." },
  { question: "I believe in radical honesty. I communicate openly in all my relationships, romantic or not." },
  { question: "No matter what’s happening, school comes first. Prioritizing my studies is important to me." },
  { question: "If I have the option, I’d rather study at the library than anywhere else." },
  { question: "If attendance isn’t mandatory, I’m probably not showing up. No cap." },
  { question: "I actually plan my study schedule instead of last-minute cramming. Crazy, right?" },
  { question: "My ideal partner has goals. A clear vision for their future, not just vibes." },
  { question: "Walking around Passion Puddle with someone special sounds like a great time." },
  { question: "I’m a clean freak. Germaphobe status. No outside clothes on the bed, ever." },
  { question: "Why order takeout when I can cook something better myself?" },
  { question: "Rutgers has been an amazing experience for me. Would do it all over again." },
  { question: "If there’s one thing people say about me, it’s that I’m funny. Or at least, I think I am." },
  { question: "I’m competitive about everything. Even dumb stuff, like who walks faster." },
  { question: "I’m really hoping my match turns into more than just a Valentine's Day situationship." }
];


export default function Questionnaire({ user }) {
  const [formData, setFormData] = useState(Array(questions.length).fill(3));
  const [buttonLoading, setButtonLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    if (formData.includes(null)) {
      return setOpen(true);
    }

    setButtonLoading(true);
    fetch('/api/responses', {
      method: "POST",
      body: JSON.stringify({ responses: [...formData], email: user!.email })
    })
    .then(() => {
      router.push('/home');
    });
  }

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <ModalClose color="danger" />
          <br />
          <div>You missed some questions, go back and fill everything out.</div>
          <br />
        </ModalDialog>
      </Modal>
      <form className={styles.form} onSubmit={handleSubmit}>
        {questions.map((q, index) => (
          <Question key={index} data={q} setFormData={setFormData} i={index} formData={formData} />
        ))}
        <label>
          Ready to submit (can't change after!) &nbsp;
        <input type='checkbox' onChange={() => setChecked(!checked)} />
        </label>
        <Button type="submit" disabled={!checked} loading={buttonLoading}>Submit</Button>
      </form>
    </>
  );
}

function Question({ data, setFormData, i, formData }) {
  function handleChange(e) {
    const value = parseInt(e.target.value, 10);
    setFormData((prevFormData) => {
      const updatedFormData = [...prevFormData];
      updatedFormData[i] = value;
      return updatedFormData;
    });
  }

  return (
    <Box>
      <FormControl required>
        <FormLabel>Question {i + 1}</FormLabel>
        <p>{data.question}</p>
        <br/>
        <input 
          type="range" 
          min="1" 
          max="5" 
          step="1" 
          value={formData[i] ?? 3} // Default to 3 (neutral)
          onChange={handleChange} 
        />
        <FormHelperText>Selected: {formData[i] ?? 3}</FormHelperText>
      </FormControl>
    </Box>
  );
}
