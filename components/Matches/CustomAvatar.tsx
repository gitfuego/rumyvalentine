"use client"
import { Avatar, Box } from "@mui/joy";

export default function CustomAvatar({user}) {
  return (
    <Avatar alt={user.name}></Avatar>
  );
}