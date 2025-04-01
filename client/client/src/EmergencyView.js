import React from 'react';

const EmergencyView = () => {
  return (
    <div style={{
      padding: '2rem',
      backgroundColor: '#f0f0f0',
      minHeight: '100vh'
    }}>
      <h1>App is Loading</h1>
      <p>If you see this, the main app failed to render.</p>
      <p>Check:
        <ul>
          <li>Backend server is running</li>
          <li>No console errors</li>
          <li>React components are properly exported</li>
        </ul>
      </p>
    </div>
  );
};

export default EmergencyView;