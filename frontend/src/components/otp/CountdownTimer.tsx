// CountdownTimer.tsx
import { useState, useEffect, useRef } from 'react';

interface CountdownTimerProps {
  initialSeconds: number;
  onComplete: () => void;
  onTick?: (remaining: number) => void; // Optional: Handle remaining time externally
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialSeconds,
  onComplete,
  onTick,
}) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const timerRef = useRef<number | null>(null); // Using ref to manage intervals

  useEffect(() => {
    if (seconds <= 0) {
      onComplete();
      return;
    }

    // Optional callback for external updates
    if (onTick) onTick(seconds);

    timerRef.current = window.setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [seconds, onComplete, onTick]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = String(seconds % 60).padStart(2, '0');

  return (
    <span
      aria-live="polite"
      className="text-sm text-gray-600 font-mono"
    >
      {minutes}:{remainingSeconds}
    </span>
  );
};
