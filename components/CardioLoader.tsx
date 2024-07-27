"use client"
import { cardio } from "ldrs";


export default function CardioLoader() {
  cardio.register();
  return (
    <l-cardio
      size="80"
      stroke="4"
      speed="1.3" 
      color="#CC0033" 
    />
  );
}