'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

interface ClockProps {
  timezone: string;
  label: string;
  darkMode: boolean;
}

export default function Clock({ timezone, label, darkMode }: ClockProps) {
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const zonedTime = utcToZonedTime(time, timezone);
  const hours = zonedTime.getHours();
  const minutes = zonedTime.getMinutes();
  const seconds = zonedTime.getSeconds();

  // Calculate angles for clock hands
  const secondAngle = (seconds * 6) - 90;
  const minuteAngle = (minutes * 6 + seconds * 0.1) - 90;
  const hourAngle = ((hours % 12) * 30 + minutes * 0.5) - 90;

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
        {label}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {timezone.replace('_', ' ')}
      </p>
      
      {/* Analog Clock */}
      <div className="relative w-48 h-48 mb-4" suppressHydrationWarning>
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Clock face */}
          <circle
            cx="100"
            cy="100"
            r="95"
            fill={darkMode ? '#1f2937' : '#ffffff'}
            stroke={darkMode ? '#4b5563' : '#e5e7eb'}
            strokeWidth="4"
          />
          
          {/* Hour markers */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const x1 = Math.round((100 + 85 * Math.cos(angle)) * 100) / 100;
            const y1 = Math.round((100 + 85 * Math.sin(angle)) * 100) / 100;
            const x2 = Math.round((100 + 75 * Math.cos(angle)) * 100) / 100;
            const y2 = Math.round((100 + 75 * Math.sin(angle)) * 100) / 100;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={darkMode ? '#9ca3af' : '#6b7280'}
                strokeWidth="3"
                strokeLinecap="round"
              />
            );
          })}
          
          {/* Only render clock hands after mount to prevent hydration mismatch */}
          {mounted && (
            <>
              {/* Hour hand */}
              <line
                x1="100"
                y1="100"
                x2={100 + 50 * Math.cos(hourAngle * Math.PI / 180)}
                y2={100 + 50 * Math.sin(hourAngle * Math.PI / 180)}
                stroke={darkMode ? '#60a5fa' : '#3b82f6'}
                strokeWidth="6"
                strokeLinecap="round"
              />
              
              {/* Minute hand */}
              <line
                x1="100"
                y1="100"
                x2={100 + 70 * Math.cos(minuteAngle * Math.PI / 180)}
                y2={100 + 70 * Math.sin(minuteAngle * Math.PI / 180)}
                stroke={darkMode ? '#34d399' : '#10b981'}
                strokeWidth="4"
                strokeLinecap="round"
              />
              
              {/* Second hand */}
              <line
                x1="100"
                y1="100"
                x2={100 + 80 * Math.cos(secondAngle * Math.PI / 180)}
                y2={100 + 80 * Math.sin(secondAngle * Math.PI / 180)}
                stroke={darkMode ? '#f87171' : '#ef4444'}
                strokeWidth="2"
                strokeLinecap="round"
              />
              
              {/* Center dot */}
              <circle cx="100" cy="100" r="6" fill={darkMode ? '#818cf8' : '#6366f1'} />
            </>
          )}
        </svg>
      </div>

      {/* Digital Time */}
      <div className="text-center">
        <p className="text-3xl font-mono font-bold text-gray-800 dark:text-white" suppressHydrationWarning>
          {mounted ? format(zonedTime, 'HH:mm:ss') : '--:--:--'}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1" suppressHydrationWarning>
          {mounted ? format(zonedTime, 'EEEE, MMMM d, yyyy') : '\u00A0'}
        </p>
      </div>
    </div>
  );
}