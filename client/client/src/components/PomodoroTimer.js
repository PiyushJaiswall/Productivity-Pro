import React, { useState, useEffect, useRef } from 'react';
import { useTasks } from '../contexts/TaskContext';
import { PlayIcon, PauseIcon, ResetIcon } from '@radix-ui/react-icons';

const PomodoroTimer = () => {
  const { logSession } = useTasks();
  const [mode, setMode] = useState('focus'); // 'focus' or 'break'
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [cycles, setCycles] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    setTimeLeft(mode === 'focus' ? focusDuration * 60 : breakDuration * 60);
  }, [mode, focusDuration, breakDuration]);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      // Timer completed
      audioRef.current.play();
      const sessionType = mode;
      const sessionDuration = mode === 'focus' ? focusDuration : breakDuration;
      
      logSession({
        type: sessionType,
        duration: sessionDuration
      });

      // Switch mode
      setMode(prev => prev === 'focus' ? 'break' : 'focus');
      setTimeLeft(mode === 'focus' ? breakDuration * 60 : focusDuration * 60);
      
      if (mode === 'focus') {
        setCycles(prev => prev + 1);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, focusDuration, breakDuration, logSession]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'focus' ? focusDuration * 60 : breakDuration * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (timeLeft / (mode === 'focus' ? focusDuration * 60 : breakDuration * 60)) * 100;

  return (
    <div className="timer-container">
      <h2 className="timer-mode">{mode === 'focus' ? 'Focus Time' : 'Break Time'}</h2>
      
      <div className="timer-circle" style={{
        background: `conic-gradient(${
          mode === 'focus' ? 'var(--primary)' : 'var(--accent)'
        } ${progress}%, var(--light-card) ${progress}%)`
      }}>
        <div className="timer-display">
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="timer-controls">
        <button
          onClick={toggleTimer}
          className={`timer-btn ${isRunning ? 'pause-btn' : 'start-btn'}`}
        >
          {isRunning ? (
            <>
              <PauseIcon className="timer-icon" />
              Pause
            </>
          ) : (
            <>
              <PlayIcon className="timer-icon" />
              Start
            </>
          )}
        </button>
        <button
          onClick={resetTimer}
          className="timer-btn reset-btn"
        >
          <ResetIcon className="timer-icon" />
          Reset
        </button>
      </div>

      <div className="timer-settings">
        <div className="timer-setting-group">
          <label className="timer-label">Focus (min)</label>
          <input
            type="number"
            min="1"
            max="60"
            value={focusDuration}
            onChange={(e) => setFocusDuration(parseInt(e.target.value) || 25)}
            className="timer-input"
            disabled={isRunning}
          />
        </div>
        <div className="timer-setting-group">
          <label className="timer-label">Break (min)</label>
          <input
            type="number"
            min="1"
            max="30"
            value={breakDuration}
            onChange={(e) => setBreakDuration(parseInt(e.target.value) || 5)}
            className="timer-input"
            disabled={isRunning}
          />
        </div>
      </div>

      <div className="timer-cycles">
        Completed focus sessions: <span className="cycles-count">{cycles}</span>
      </div>

      <audio ref={audioRef} src="/notification.mp3" preload="auto" />
    </div>
  );
};

export default PomodoroTimer;