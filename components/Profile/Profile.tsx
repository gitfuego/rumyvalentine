"use client"
import { FormControl, Radio, RadioGroup, Button, FormLabel, Input, Select, Option, Box, FormHelperText } from '@mui/joy';
// import { Modal, ModalDialog, ModalClose } from '@mui/joy';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import styles from "./Profile.module.scss";
import { useRouter } from 'next/navigation';


export default function Profile({user}) {
  const { register, handleSubmit } = useForm({ defaultValues: {
    name: user.name,
    sex: user.sex,
    pref: user.pref,
    contact: user.contact,
    }
  });
  // const [open, setOpen] = useState(false);
  const [contactType, setContactType] = useState(user.ctype);
  const [ buttonLoading, setButtonLoading ] = useState(false);
  const router = useRouter();

  function onSubmit(d) {
    setButtonLoading(true);
    fetch('/api/profileUpdate', {
      method: "POST",
      body: JSON.stringify({responses: {...d, ctype: contactType}, email: user.email})
    })
    .then(() => {
      router.push('/home');
    })
  }

  return (
    <>
    {/* <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog >
        <ModalClose 
        color='danger'
        />
        <br />
        <div>Make sure everything is filled out.</div>
        <br />
      </ModalDialog>
    </Modal> */}
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}
    >
      <Box>
      <FormControl required>
        <FormLabel>Preferred Name</FormLabel>
        <Input {...register("name", {required: true, minLength: 1, maxLength: 20})} 
        placeholder='Type here...'
        />
      </FormControl>
      </Box>
      <Box>
      <FormControl required>
        <FormLabel>Biological Sex</FormLabel>
        <FormHelperText>All gender identities are welcome!</FormHelperText>
        <RadioGroup defaultValue={user.sex}>
          <Radio value="m" label="Male" variant="outlined" {...register("sex", {required: true})}/>
          <Radio value="f" label="Female" variant="outlined" {...register("sex", {required: true})}/>
        </RadioGroup>
      </FormControl>
      </Box>
      <FormControl required>
        <FormLabel>Looking For...</FormLabel>
        <RadioGroup defaultValue={user.pref}>
          <Radio value="m" label="Males" variant="outlined" {...register("pref", {required: true})}/>
          <Radio value="f" label="Females" variant="outlined" {...register("pref", {required: true})} />
          <Radio value="a" label="Any" variant="outlined" {...register("pref", {required: true})}/>
        </RadioGroup>
      </FormControl>
      <Box>
      <Box>
        <FormControl required>
          <FormLabel>Contact Type</FormLabel>
          <FormHelperText>How will your matches contact you?</FormHelperText>
          <Select placeholder="Pick One" value={contactType} onChange={(e, newVal) => setContactType(newVal)}>
            <Option value="p" >Phone Number</Option>
            <Option value="i" >Instagram</Option>
            <Option value="e">Email</Option>
            <Option value="o">Other (specify)</Option>
          </Select>
        </FormControl>
        </Box>
        <br />
        <FormControl required>
          <FormLabel>Contact</FormLabel>
          <Input {...register("contact", {required: true, minLength: 1, maxLength: 50})} 
          placeholder="Type here..."
          />
        </FormControl>
      </Box>
      <Box component="span">
        <Button type="submit" 
        loading={buttonLoading}
        >Save</Button>
        <Button type="button" color='neutral'
        onClick={() => router.back()}>Cancel</Button>
      </Box>
    </form>
    </>
  );
}