'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Moon, Sun } from 'lucide-react';
import Clock from './Clock';
import Chatbot from './Chatbot';

interface ClockConfig {
  id: string;
  timezone: string;
  label: string;
}

const POPULAR_TIMEZONES = [
  { value: 'America/New_York', label: 'New York (EST)' },
  { value: 'America/Los_Angeles', label: 'Los Angeles (PST)' },
  { value: 'America/Chicago', label: 'Chicago (CST)' },
  { value: 'Europe/London', label: 'London (GMT)' },
  { value: 'Europe/Paris', label: 'Paris (CET)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
  { value: 'Asia/Shanghai', label: 'Shanghai (CST)' },
  { value: 'Asia/Dubai', label: 'Dubai (GST)' },
  { value: 'Australia/Sydney', label: 'Sydney (AEDT)' },
  { value: 'Pacific/Auckland', label: 'Auckland (NZDT)' },
];

export default function ClockDashboard() {
  const [clocks, setClocks] = useState<ClockConfig[]>([
    { id: '1', timezone: 'America/New_York', label: 'New York' },
    { id: '2', timezone: 'Europe/London', label: 'London' },
    { id: '3', timezone: 'Asia/Tokyo', label: 'Tokyo' },
  ]);
  const [selectedTimezone, setSelectedTimezone] = useState('America/New_York');
  const [customLabel, setCustomLabel] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference for dark mode
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  const addClock = () => {
    if (selectedTimezone) {
      const newClock: ClockConfig = {
        id: Date.now().toString(),
        timezone: selectedTimezone,
        label: customLabel || POPULAR_TIMEZONES.find(tz => tz.value === selectedTimezone)?.label.split(' ')[0] || selectedTimezone,
      };
      setClocks([...clocks, newClock]);
      setCustomLabel('');
    }
  };

  const removeClock = (id: string) => {
    setClocks(clocks.filter(clock => clock.id !== id));
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            🕐 Clock Dashboard
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-6 h-6 text-yellow-500" />
            ) : (
              <Moon className="w-6 h-6 text-indigo-600" />
            )}
          </button>
        </div>

        {/* Add Clock Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8 transition-colors duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            Add New Clock
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={selectedTimezone}
              onChange={(e) => setSelectedTimezone(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none transition-colors"
            >
              {POPULAR_TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Custom label (optional)"
              value={customLabel}
              onChange={(e) => setCustomLabel(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none transition-colors"
            />
            <button
              onClick={addClock}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Add Clock
            </button>
          </div>
        </div>

        {/* Clocks Grid */}
        {clocks.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
            <p className="text-xl text-gray-500 dark:text-gray-400">
              No clocks yet. Add your first clock above! 👆
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clocks.map((clock) => (
              <div
                key={clock.id}
                className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                <button
                  onClick={() => removeClock(clock.id)}
                  className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  aria-label="Remove clock"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <Clock timezone={clock.timezone} label={clock.label} darkMode={darkMode} />
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}