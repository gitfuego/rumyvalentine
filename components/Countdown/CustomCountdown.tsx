"use client"
import Countdown from 'react-countdown';
import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import styles from "./CustomCountdown.module.scss";
import { Box } from '@mui/joy';

export default function CustomCountdown() {

  return (
    <Box className={styles.container}>
      <h4>Countdown to matches: </h4>
      <br/>
      <Countdown
        date={new Date('2025-02-10T00:00:00')}
        renderer={renderer}
        />
    </Box>
  )
}


function Completionist() {

  return (
    <span>Matches are now available!</span>
  );
} 

// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return <Counter days={days} hours={hours} minutes={minutes} seconds={seconds} />
  }
};

function Counter({days, hours, minutes, seconds}) {
  const [loading, setLoading ] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [])

  if (loading) return <Loader />;
  return (
    <div className={styles.subContainer}>
      <span>{days}:{hours}:{minutes}:{seconds}</span>
      <div className={styles.heart}/>
    </div>
  );
}