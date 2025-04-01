import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/tasks/stats');
      setStats(response.data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  const addTask = async (task) => {
    try {
      const response = await axios.post('/api/tasks', task);
      setTasks([...tasks, response.data]);
      await fetchStats();
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const response = await axios.put(`/api/tasks/${id}`, updates);
      setTasks(tasks.map(task => task.id === id ? response.data : task));
      await fetchStats();
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
      await fetchStats();
    } catch (err) {
      throw err;
    }
  };

  const logSession = async (sessionData) => {
    try {
      const response = await axios.post('/api/tasks/sessions', sessionData);
      await fetchStats();
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, []);

  return (
    <TaskContext.Provider value={{
      tasks,
      loading,
      error,
      stats,
      addTask,
      updateTask,
      deleteTask,
      logSession,
      fetchTasks,
      fetchStats
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);