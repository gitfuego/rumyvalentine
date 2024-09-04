"use client"
import { Button} from "@mui/joy";
import { signOut, useSession } from "next-auth/react"

export default function PromptClose({setOpen}) {
  const {data: session} = useSession();

  async function handleSubmit(e) {
    e.preventDefault();
    fetch('/api/agreement', {
      method: "POST",
      body: JSON.stringify({ email: session?.user?.email})
    })
    .then(() => {
      setOpen(false);
    })
  }


  return (
    <form style={{display: "flex", margin: "2px auto", gap: "20px"}} onSubmit={handleSubmit}>
      <Button
      type="submit" 
      >Accept</Button>
      <Button color="danger" onClick={() => signOut()}>Decline</Button>
    </form>
  );
}