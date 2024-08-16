"use client"
import { cardio } from "ldrs";


cardio.register();

export default function CardioLoader() {
  return (
    <l-cardio
      size="80"
      stroke="4"
      speed="1.3" 
      color="#CC0033" 
    />
    // <div></div>
  );
}