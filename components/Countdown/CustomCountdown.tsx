"use client"
import Countdown from 'react-countdown';

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
    <span>You are good to go!</span>
  );
} 

// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return <span>{days}:{hours}:{minutes}:{seconds}</span>;
  }
};