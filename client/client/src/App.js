import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { TaskProvider } from './contexts/TaskContext';
import HomePage from './pages/HomePage';
import StatsPage from './pages/StatsPage';
import ThemeToggle from './components/ThemeToggle';
import './App.css';
import { HomeIcon, BarChartIcon } from '@radix-ui/react-icons';
import { TooltipProvider } from '@radix-ui/react-tooltip';

const App = () => {
  return (
    <TooltipProvider>
      <ThemeProvider>
        <TaskProvider>
          <Router>
            <div className="app-container">
          <nav className="navbar">
              <div className="nav-content">
                <Link to="/" className="app-title">
                  Productivity Pro
                </Link>
                <div className="nav-links">
                  <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                  >
                    <HomeIcon className="nav-icon" />
                    Tasks
                  </NavLink>
                  <NavLink 
                    to="/stats" 
                    className={({ isActive }) => 
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                  >
                    <BarChartIcon className="nav-icon" />
                    Analytics
                  </NavLink>
                  <ThemeToggle />
                </div>
              </div>
            </nav>

            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/stats" element={<StatsPage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </TaskProvider>
    </ThemeProvider>
    </TooltipProvider>
  );
};

export default App;