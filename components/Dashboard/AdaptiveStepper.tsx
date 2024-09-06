"use client"

import Stepper from '@mui/joy/Stepper';
import { useState, useEffect } from 'react';

export default function AdaptiveStepper({children}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768 ?? false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <Stepper orientation={isMobile ? "vertical": "horizontal"} sx={{width: "100%"}} >
      { children }
    </Stepper>
  )
}