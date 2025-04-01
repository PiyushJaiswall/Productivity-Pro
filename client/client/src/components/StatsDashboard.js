import React from 'react';
import { useTasks } from '../contexts/TaskContext';
import { CalendarIcon, CheckIcon, ClockIcon } from '@radix-ui/react-icons';

const StatsDashboard = () => {
  const { stats } = useTasks();

  if (!stats) return <div className="loading-message">Loading statistics...</div>;

  const completionPercentage = Math.round(stats.tasks.completionRate);
  const remainingPercentage = 100 - completionPercentage;

  return (
    <div className="dashboard-container">
      <div className="stats-card">
        <h2>Task Statistics</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-icon primary">
              <CheckIcon />
            </div>
            <div className="stat-title">Tasks Completed</div>
            <div className="stat-value">{stats.tasks.completed}</div>
            <div className="stat-desc">out of {stats.tasks.total}</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon secondary">
              <CalendarIcon />
            </div>
            <div className="stat-title">Completion Rate</div>
            <div className="stat-value">{completionPercentage}%</div>
            <div className="stat-desc">of all tasks</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon accent">
              <ClockIcon />
            </div>
            <div className="stat-title">Focus Time</div>
            <div className="stat-value">{stats.sessions.totalFocusMinutes}</div>
            <div className="stat-desc">minutes</div>
          </div>
        </div>
        
        <div className="visualization">
          <h3>Task Completion</h3>
          <div className="progress-bar">
            <div 
              className="progress-completed" 
              style={{ width: `${completionPercentage}%` }}
            ></div>
            <div 
              className="progress-remaining" 
              style={{ width: `${remainingPercentage}%` }}
            ></div>
          </div>
          <div className="progress-labels">
            <span>Completed: {completionPercentage}%</span>
            <span>Remaining: {remainingPercentage}%</span>
          </div>
        </div>
      </div>
      
      <div className="stats-card">
        <h2>Focus Sessions</h2>
        <div className="focus-visualization">
          <h3>Total Focus Time: {stats.sessions.totalFocusMinutes} minutes</h3>
          <div className="focus-bar">
            <div 
              className="focus-progress" 
              style={{ width: `${Math.min(stats.sessions.totalFocusMinutes / 10, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;