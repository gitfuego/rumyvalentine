"use client"
import { Avatar, Box } from "@mui/joy";
import styles from './Matches.module.scss'

export default function CustomAvatar({user}) {
  let ctype;
  switch (user.ctype) {
    case 'p':
      ctype="Phone";
      break;
    case 'i':
      ctype="Instagram";
      break;
    case 'e':
      ctype="Email";
      break;
    case 'o':
      ctype="Contact";
      break;
    default:
      ctype="Contact";
      break;
  }
  return (
    <Box className={styles.matchContainer}>
      <Avatar sx={{ width: 80, height: 80 }} alt={user.name} src={user.profile_pic}></Avatar>
      <Box className={styles.details}>
        <Box>Name: {user.name}</Box>
        <Box>Sex: {user.sex == 'm' ? "Male" : "Female"}</Box>
        <Box>{ctype}: {user.contact}</Box>
      </Box>
    </Box>
  );
}