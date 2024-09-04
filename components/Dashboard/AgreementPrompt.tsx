"use client"
import { useState } from 'react';
import {Modal, ModalDialog} from "@mui/joy";
import PromptClose from './PromptClose';

export default function AgreementPrompt() {
  const [open, setOpen] = useState(true);

  return (
    <Modal open={open} onClose={() => undefined}>
    <ModalDialog >
      <br />
      <span>By using this app, you acknowledge that you have read, understood, and agree to be bound by the <a target="_blank" href="/user-agreement">User Agreement</a>.</span>
      <br />
      <PromptClose setOpen={setOpen} />
    </ModalDialog>
  </Modal>
  )
}
