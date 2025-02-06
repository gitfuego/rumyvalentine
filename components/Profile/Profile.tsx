"use client"
import { FormControl, Radio, RadioGroup, Button, FormLabel, Input, Select, Option, Box, FormHelperText } from '@mui/joy';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import styles from "./Profile.module.scss";
import { useRouter } from 'next/navigation';

export default function Profile({ user }) {
  const { register, handleSubmit } = useForm({ defaultValues: {
    name: user.name,
    sex: user.sex,
    pref: user.pref,
    contact: user.contact,
  }});

  const [contactType, setContactType] = useState(user.ctype);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(user.profile_pic || '/images/profileIcon.svg'); // Store preview URL
  const router = useRouter();

  function onSubmit(data) {
    setButtonLoading(true);
    
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("sex", data.sex);
    formData.append("pref", data.pref);
    formData.append("contact", data.contact);
    formData.append("ctype", contactType);
    formData.append("email", user.email);
    if (selectedFile) {
      formData.append("profile_pic", selectedFile);
    }

    fetch('/api/profileUpdate', {
      method: "POST",
      body: formData
    })
    .then(response => response.json())
    .then(() => {
      router.push('/home');
    })
    .catch(error => console.error(error))
    .finally(() => setButtonLoading(false));
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Update preview with the new file
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <FormControl required>
          <FormLabel>Preferred Name</FormLabel>
          <Input {...register("name", { required: true, minLength: 1, maxLength: 20 })}
            placeholder='Type here...'
          />
        </FormControl>
      </Box>
      <Box>
        <FormControl required>
          <FormLabel>Biological Sex</FormLabel>
          <FormHelperText>All gender identities are welcome!</FormHelperText>
          <RadioGroup defaultValue={user.sex}>
            <Radio value="m" label="Male" variant="outlined" {...register("sex", { required: true })} />
            <Radio value="f" label="Female" variant="outlined" {...register("sex", { required: true })} />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box>
        <FormControl required>
          <FormLabel>Looking For...</FormLabel>
          <RadioGroup defaultValue={user.pref}>
            <Radio value="m" label="Males" variant="outlined" {...register("pref", { required: true })} />
            <Radio value="f" label="Females" variant="outlined" {...register("pref", { required: true })} />
            <Radio value="a" label="Any" variant="outlined" {...register("pref", { required: true })} />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box>
        <FormControl required>
          <FormLabel>Contact Type</FormLabel>
          <FormHelperText>How will your matches contact you?</FormHelperText>
          <Select placeholder="Pick One" value={contactType} onChange={(e, newVal) => setContactType(newVal)}>
            <Option value="p">Phone Number</Option>
            <Option value="i">Instagram</Option>
            <Option value="e">Email</Option>
            <Option value="o">Other (specify)</Option>
          </Select>
        </FormControl>
        <br />
        <FormControl required>
          <FormLabel>Contact</FormLabel>
          <Input {...register("contact", { required: true, minLength: 1, maxLength: 50 })}
            placeholder="Type here..."
          />
        </FormControl>
      </Box>
      <Box style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <FormControl>
          <FormLabel>Profile Picture</FormLabel>
          <img 
            src={preview} 
            alt="Profile Preview" 
            style={{ width: "300px", height: "300px", borderRadius: "20px", objectFit: "cover", marginBottom: "10px" }} 
          />
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </FormControl>
      </Box>
      <Box component="span">
        <Button type="submit" loading={buttonLoading}>Save</Button>
        <Button type="button" color='neutral' onClick={() => router.back()}>Cancel</Button>
      </Box>
    </form>
  );
}
