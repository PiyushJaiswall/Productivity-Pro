import React, { useState } from 'react';
import { useTasks } from '../contexts/TaskContext';
import { CheckIcon, TrashIcon, Pencil1Icon, ClockIcon, TimerIcon } from '@radix-ui/react-icons';
import { Dialog, DialogContent, DialogTitle } from '@radix-ui/react-dialog';
import { Tooltip, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip';

const priorityColors = {
  High: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
  Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
  Low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
};

const categoryColors = {
  Work: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
  Personal: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
  Study: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100'
};

const TaskItem = ({ task }) => {
  const { 
    updateTask, 
    deleteTask, 
    startTimer, 
    stopTimer, 
    timeLeft, 
    isTimerRunning, 
    activeTaskId 
  } = useTasks();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  const [showTimerInput, setShowTimerInput] = useState(false);
  const [timerDuration, setTimerDuration] = useState(25); // Default 25 minutes

  const handleComplete = async () => {
    await updateTask(task.id, { completed: !task.completed });
    // Stop timer if completing the active task
    if (activeTaskId === task.id && isTimerRunning) {
      stopTimer();
    }
  };

  const handleDelete = async () => {
    await deleteTask(task.id);
    // Stop timer if deleting the active task
    if (activeTaskId === task.id && isTimerRunning) {
      stopTimer();
    }
  };

  const handleEdit = async () => {
    await updateTask(task.id, editedTask);
    setIsEditing(false);
  };

  const toggleTimer = () => {
    if (isTimerRunning && activeTaskId === task.id) {
      stopTimer();
    } else {
      setShowTimerInput(true);
    }
  };

  const startTaskTimer = () => {
    const durationInSeconds = timerDuration * 60;
    startTimer(durationInSeconds, task.id);
    setShowTimerInput(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const renderTimerStatus = () => {
    if (activeTaskId === task.id) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className={`task-tag ${isTimerRunning ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}>
              <TimerIcon className="inline mr-1" />
              {formatTime(timeLeft)}
            </span>
          </TooltipTrigger>
          <TooltipContent className="tooltip-content" side="top" align="center">
            {isTimerRunning ? 'Timer running' : 'Timer paused'}
          </TooltipContent>
        </Tooltip>
      );
    }
    return null;
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <div className="task-main">
          <button
            onClick={handleComplete}
            className={`task-checkbox ${task.completed ? 'completed' : ''}`}
            aria-label={task.completed ? 'Mark task incomplete' : 'Mark task complete'}
          >
            {task.completed && <CheckIcon className="check-icon" />}
          </button>
          
          <div className="task-details">
            <div className="task-header">
              <h3 className={`task-title ${task.completed ? 'completed' : ''}`}>
                {task.title}
              </h3>
              <div className="task-actions">
                <button
                  onClick={toggleTimer}
                  className={`action-btn ${activeTaskId === task.id && isTimerRunning ? 'timer-active' : ''}`}
                  aria-label={activeTaskId === task.id && isTimerRunning ? 'Stop timer' : 'Start timer'}
                >
                  <TimerIcon className="action-icon" />
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="action-btn edit-btn"
                  aria-label="Edit task"
                >
                  <Pencil1Icon className="action-icon" />
                </button>
                <button
                  onClick={handleDelete}
                  className="action-btn delete-btn"
                  aria-label="Delete task"
                >
                  <TrashIcon className="action-icon" />
                </button>
              </div>
            </div>
            
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}
            
            <div className="task-meta">
              <span className={`task-tag ${priorityColors[task.priority]}`}>
                {task.priority}
              </span>
              <span className={`task-tag ${categoryColors[task.category]}`}>
                {task.category}
              </span>
              {task.dueDate && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="task-due-date">
                      <ClockIcon className="due-date-icon" />
                      {formatDate(task.dueDate)}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="tooltip-content" side="top" align="center">
                    Due on {new Date(task.dueDate).toLocaleDateString()}
                  </TooltipContent>
                </Tooltip>
              )}
              {renderTimerStatus()}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="edit-dialog">
          <DialogTitle className="dialog-title">Edit Task</DialogTitle>
          <div className="dialog-form">
            <div className="form-group">
              <label className="form-label">Title</label>
              <input
                type="text"
                value={editedTask.title}
                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                className="form-input"
                placeholder="Enter task title"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                value={editedTask.description || ''}
                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                className="form-textarea"
                rows="3"
                placeholder="Enter task description"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Priority</label>
                <select
                  value={editedTask.priority}
                  onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
                  className="form-select"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  value={editedTask.category}
                  onChange={(e) => setEditedTask({ ...editedTask, category: e.target.value })}
                  className="form-select"
                >
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Study">Study</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Due Date</label>
              <input
                type="date"
                value={editedTask.dueDate ? editedTask.dueDate.split('T')[0] : ''}
                onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="dialog-actions">
              <button
                onClick={() => setIsEditing(false)}
                className="cancel-btn"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                className="save-btn"
                type="button"
              >
                Save Changes
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Timer Input Dialog */}
      <Dialog open={showTimerInput} onOpenChange={setShowTimerInput}>
        <DialogContent className="timer-dialog">
          <DialogTitle className="dialog-title">Set Timer</DialogTitle>
          <div className="dialog-form">
            <div className="form-group">
              <label className="form-label">Duration (minutes)</label>
              <input
                type="number"
                min="1"
                max="120"
                value={timerDuration}
                onChange={(e) => setTimerDuration(Math.max(1, Math.min(120, parseInt(e.target.value) || 25)))}
                className="form-input"
              />
            </div>
            <div className="dialog-actions">
              <button
                onClick={() => setShowTimerInput(false)}
                className="cancel-btn"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={startTaskTimer}
                className="save-btn"
                type="button"
              >
                Start Timer
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskItem;