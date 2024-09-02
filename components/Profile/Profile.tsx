"use client"
import { FormControl, Radio, RadioGroup, Button, FormLabel, Input, Box } from '@mui/joy';
import { Modal, ModalDialog, ModalClose } from '@mui/joy';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import styles from "./Profile.module.scss";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { error } from 'console';



export default function Profile() {
  const {data: session} = useSession();
  const { register, handleSubmit } = useForm();
  const [ buttonLoading, setButtonLoading ] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function onSubmit(d) {
    setButtonLoading(true);
    fetch('/api/profileUpdate', {
      method: "POST",
      body: JSON.stringify({responses: {...d}, email: session?.user?.email})
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
        <div>Make sure everything is filled out.</div>
        <br />
      </ModalDialog>
    </Modal>
    <form
    className={styles.form}
    onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl required>
        <FormLabel>Name</FormLabel>
        <Input {...register("name", {required: true, minLength: 1, maxLength: 20})} 
        placeholder='Display Name'
        />
      </FormControl>
      <FormControl required>
        <FormLabel>Biological Sex</FormLabel>
        <RadioGroup>
          <Radio value="m" label="Male" variant="outlined" {...register("sex", {required: true})}/>
          <Radio value="f" label="Female" variant="outlined" {...register("sex", {required: true})}/>
        </RadioGroup>
      </FormControl>
      <FormControl required>
        <FormLabel>Looking For...</FormLabel>
        <RadioGroup>
          <Radio value="m" label="Males" variant="outlined" {...register("pref", {required: true})}/>
          <Radio value="f" label="Females" variant="outlined" {...register("pref", {required: true})} />
          <Radio value="a" label="Any" variant="outlined" {...register("pref", {required: true})}/>
        </RadioGroup>
      </FormControl>
      <Box component="span">
        <Button type="submit" 
        loading={buttonLoading}
        >Submit</Button>
        <Button type="button" color='neutral'
        onClick={() => router.back()}>Cancel</Button>
      </Box>
    </form>
    </>
  );
}