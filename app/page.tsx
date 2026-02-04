'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(10);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const startCountdown = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    if (totalSeconds > 0) {
      setTimeLeft(totalSeconds);
      setIsRunning(true);
      setIsFinished(false);
    }
  };

  const pauseCountdown = () => {
    setIsRunning(false);
  };

  const resetCountdown = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setIsFinished(false);
  };

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return {
      hours: String(h).padStart(2, '0'),
      minutes: String(m).padStart(2, '0'),
      seconds: String(s).padStart(2, '0'),
    };
  };

  const displayTime = formatTime(timeLeft);

  return (
    <div className={`min-h-screen transition-colors duration-500 animate-gradient relative overflow-hidden ${
      darkMode
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 via-indigo-900 to-gray-900'
        : 'bg-gradient-to-br from-blue-50 via-purple-50 via-pink-50 to-orange-50'
    }`}>
      {/* Floating Decorative Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`float-circle absolute top-20 left-10 w-32 h-32 sm:w-64 sm:h-64 rounded-full blur-3xl ${
          darkMode ? 'bg-purple-600/20' : 'bg-purple-300/30'
        }`}></div>
        <div className={`float-circle absolute bottom-20 right-10 w-40 h-40 sm:w-80 sm:h-80 rounded-full blur-3xl ${
          darkMode ? 'bg-indigo-600/20' : 'bg-pink-300/30'
        }`}></div>
        <div className={`float-circle absolute top-1/2 left-1/3 w-36 h-36 sm:w-72 sm:h-72 rounded-full blur-3xl ${
          darkMode ? 'bg-pink-600/20' : 'bg-blue-300/30'
        }`}></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Dark Mode Toggle */}
        <div className="flex justify-end mb-4 md:mb-8">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2.5 sm:p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
              darkMode
                ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300'
                : 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
            }`}
          >
            {darkMode ? (
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-12 transition-colors ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            倒數計時器
          </h1>

          {/* Time Display */}
          <div className={`relative ${isFinished ? 'animate-bounce' : ''}`}>
            <div className={`flex gap-2 sm:gap-3 md:gap-4 mb-8 md:mb-12 p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl backdrop-blur-lg transition-all duration-500 ${
              darkMode
                ? 'bg-white/10 shadow-2xl shadow-purple-500/50'
                : 'bg-white/70 shadow-2xl shadow-purple-200'
            } ${isFinished ? 'scale-110 ring-4 ring-green-500' : ''}`}>
              {['hours', 'minutes', 'seconds'].map((unit, idx) => (
                <div key={unit} className="flex flex-col items-center">
                  <div className={`text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tabular-nums transition-colors ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  } ${isFinished ? 'text-green-500' : ''}`}>
                    {displayTime[unit as keyof typeof displayTime]}
                  </div>
                  <div className={`text-xs sm:text-sm md:text-base mt-1 md:mt-2 uppercase tracking-wider transition-colors ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {unit === 'hours' ? '小時' : unit === 'minutes' ? '分鐘' : '秒'}
                  </div>
                </div>
              ))}
            </div>

            {/* Finished Animation */}
            {isFinished && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="animate-ping absolute h-full w-full rounded-2xl md:rounded-3xl bg-green-500 opacity-20"></div>
                <div className="text-4xl sm:text-5xl md:text-6xl animate-pulse">🎉</div>
              </div>
            )}
          </div>

          {/* Time Input */}
          {!isRunning && timeLeft === 0 && (
            <div className={`flex gap-2 sm:gap-3 md:gap-4 mb-6 md:mb-8 p-4 sm:p-5 md:p-6 rounded-xl md:rounded-2xl backdrop-blur-lg transition-all ${
              darkMode ? 'bg-white/10' : 'bg-white/70'
            }`}>
              <div className="flex flex-col">
                <label className={`text-xs sm:text-sm mb-1 sm:mb-2 transition-colors ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>小時</label>
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={hours}
                  onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
                  className={`w-16 sm:w-20 px-2 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl text-center text-lg sm:text-xl font-semibold transition-colors ${
                    darkMode
                      ? 'bg-gray-800 text-white border-gray-700'
                      : 'bg-white text-gray-800 border-gray-300'
                  } border-2 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
              </div>
              <div className="flex flex-col">
                <label className={`text-xs sm:text-sm mb-1 sm:mb-2 transition-colors ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>分鐘</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={minutes}
                  onChange={(e) => setMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                  className={`w-16 sm:w-20 px-2 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl text-center text-lg sm:text-xl font-semibold transition-colors ${
                    darkMode
                      ? 'bg-gray-800 text-white border-gray-700'
                      : 'bg-white text-gray-800 border-gray-300'
                  } border-2 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
              </div>
              <div className="flex flex-col">
                <label className={`text-xs sm:text-sm mb-1 sm:mb-2 transition-colors ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>秒</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={seconds}
                  onChange={(e) => setSeconds(Math.max(0, parseInt(e.target.value) || 0))}
                  className={`w-16 sm:w-20 px-2 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl text-center text-lg sm:text-xl font-semibold transition-colors ${
                    darkMode
                      ? 'bg-gray-800 text-white border-gray-700'
                      : 'bg-white text-gray-800 border-gray-300'
                  } border-2 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
              </div>
            </div>
          )}

          {/* Control Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
            {!isRunning && timeLeft === 0 ? (
              <button
                onClick={startCountdown}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                開始倒數
              </button>
            ) : (
              <>
                <button
                  onClick={isRunning ? pauseCountdown : startCountdown}
                  className={`px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 ${
                    isRunning
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                      : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                  }`}
                >
                  {isRunning ? '暫停' : '繼續'}
                </button>
                <button
                  onClick={resetCountdown}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  重置
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
