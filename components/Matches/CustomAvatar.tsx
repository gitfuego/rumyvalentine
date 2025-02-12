"use client"
import { Avatar, Box, IconButton, Tooltip, Typography } from "@mui/joy";
import { ContentCopy } from "@mui/icons-material";
import { useState } from "react";
import styles from './Matches.module.scss';

export default function CustomAvatar({ user }) {
  const [copied, setCopied] = useState(false);

  // Function to get the label based on ctype
  const getCtypeLabel = () => {
    switch (user.ctype) {
      case 'p': return "Phone";
      case 'i': return "Instagram";
      case 'e': return "Email";
      case 'o': return "Contact";
      default: return "Contact";
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(user.contact).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset tooltip after 2s
    });
  };

  return (
    <Box className={styles.matchContainer}>
      <Avatar sx={{ width: 130, height: 130 }} alt={user.name} src={user.profile_pic} />
      <Box className={styles.details}>
        
        {/* Name Field */}
        <Box className={styles.infoContainer}>
          <Typography level="body-sm" className={styles.label}>Name</Typography>
          <Box className={styles.valueContainer}>{user.name}</Box>
        </Box>
        
        {/* Contact Field */}
        <Box className={styles.infoContainer}>
          <Typography level="body-sm" className={styles.label}>{getCtypeLabel()}</Typography>
          <Box className={styles.valueContainer}>{user.contact}</Box>
          <Tooltip title={copied ? "Copied!" : "Copy Contact"}>
            <IconButton sx={{borderRadius: 100, backgroundColor: "white", width: "fit-content", alignSelf: "flex-end"}} size="sm" onClick={copyToClipboard}>
              <ContentCopy fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

      </Box>
    </Box>
  );
}
