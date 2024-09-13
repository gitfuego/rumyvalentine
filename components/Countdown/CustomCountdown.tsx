"use client"
import Countdown from 'react-countdown';
import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';

export default function CustomCountdown() {

  return (
    <Countdown
      date={new Date('2025-02-10T00:00:00')}
      renderer={renderer}
    />
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
  return <span>{days}:{hours}:{minutes}:{seconds}</span>
}