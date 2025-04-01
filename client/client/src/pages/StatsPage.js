import React from 'react';
import { useTasks } from '../contexts/TaskContext';
import { CheckIcon, ClockIcon } from '@radix-ui/react-icons';

const StatsPage = () => {
  const { stats } = useTasks();

  if (!stats) return <div className="stats-loading">Loading statistics...</div>;

  const completionPercentage = Math.round(stats.tasks.completionRate);
  const remainingPercentage = 100 - completionPercentage;

  return (
    <div className="stats-container">
      <h1 className="stats-header">Productivity Dashboard</h1>
      
      <div className="stats-grid">
        {/* Task Stats Widget */}
        <div className="stats-widget">
          <h2 className="widget-title">
            <CheckIcon className="widget-icon" />
            Task Statistics
          </h2>
          <div className="widget-stats">
            <div className="stat-card">
              <div className="stat-value">{stats.tasks.completed}</div>
              <div className="stat-label">Completed</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.tasks.total}</div>
              <div className="stat-label">Total Tasks</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{completionPercentage}%</div>
              <div className="stat-label">Completion Rate</div>
            </div>
          </div>
          
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <div className="progress-labels">
              <span>Completed: {completionPercentage}%</span>
              <span>Remaining: {remainingPercentage}%</span>
            </div>
          </div>
        </div>

        {/* Focus Stats Widget */}
        <div className="stats-widget">
          <h2 className="widget-title">
            <ClockIcon className="widget-icon" />
            Focus Sessions
          </h2>
          <div className="widget-stats">
            <div className="stat-card">
              <div className="stat-value">{stats.sessions.focusCount}</div>
              <div className="stat-label">Sessions</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.sessions.totalFocusMinutes}</div>
              <div className="stat-label">Minutes</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">
                {Math.floor(stats.sessions.totalFocusMinutes / 60)}h {stats.sessions.totalFocusMinutes % 60}m
              </div>
              <div className="stat-label">Total Time</div>
            </div>
          </div>
          
          <div className="focus-chart">
            <div className="chart-bar" style={{ height: `${Math.min(stats.sessions.totalFocusMinutes / 10, 100)}%` }}>
              <div className="chart-value">{stats.sessions.totalFocusMinutes}</div>
            </div>
            <div className="chart-label">Focus Minutes</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;