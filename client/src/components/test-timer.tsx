import React, { useState, useEffect, useRef } from 'react';
import { formatTime } from '@/lib/utils';

interface TestTimerProps {
  durationInMinutes: number;
  onTimeEnd?: () => void;
  initialSeconds?: number;
}

export const TestTimer: React.FC<TestTimerProps> = ({ 
  durationInMinutes, 
  onTimeEnd,
  initialSeconds = 0
}) => {
  // Convert duration to seconds
  const totalDuration = durationInMinutes * 60;
  
  // Calculate remaining time based on duration and initial seconds
  const [remainingSeconds, setRemainingSeconds] = useState(
    initialSeconds > 0 ? initialSeconds : totalDuration
  );
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Effect to handle the countdown
  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Start a new timer
    timerRef.current = setInterval(() => {
      setRemainingSeconds(prev => {
        if (prev <= 1) {
          // Time's up
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          
          // Call the onTimeEnd callback if provided
          if (onTimeEnd) {
            onTimeEnd();
          }
          
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Cleanup when component unmounts
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [onTimeEnd]);
  
  // Calculate percentage of time remaining
  const percentageRemaining = (remainingSeconds / totalDuration) * 100;
  
  // Determine color based on remaining time
  let timerColor = 'text-green-600';
  if (percentageRemaining < 50) {
    timerColor = 'text-amber-500';
  }
  if (percentageRemaining < 20) {
    timerColor = 'text-red-600';
  }
  
  return (
    <div className="flex items-center">
      <div className="w-6 h-6 mr-2 animate-pulse">
        <svg 
          className={`w-full h-full ${timerColor}`} 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      </div>
      <div className={`font-bold ${timerColor}`}>
        {formatTime(remainingSeconds)}
      </div>
    </div>
  );
};

export default TestTimer;