"use client"
import { Checkbox, Button, FormControl, FormHelperText, Link } from "@mui/joy";
import { signOut, useSession } from "next-auth/react"
import { useEffect } from "react";

export default function PromptClose() {
  const {data: session} = useSession();

  async function handleSubmit(e) {
    e.preventDefault();
    fetch('/api/agreement', {
      method: "POST",
      body: JSON.stringify({ email: session?.user?.email})
    })
    .then(() => {
      document.querySelector("dialog")!.close();
    })
  }

  useEffect(() => {
    document.querySelector("dialog")!.showModal();
  }, []);

  return (
    <form style={{display: "flex", margin: "2px auto", gap: "20px"}} onSubmit={handleSubmit}>
      <Button data-close-modal 
      type="submit" 
      >Accept</Button>
      <Button color="danger" onClick={() => signOut()}>Decline</Button>
    </form>
  );
}