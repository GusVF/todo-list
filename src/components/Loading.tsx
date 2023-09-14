import React from 'react';
import '.././styles/LoadingPopup.css'; // Import a CSS file for styling

const LoadingPopup: React.FC<{ trigger: boolean }> = ({ trigger }) => {
  if (!trigger) {
    return null; // Don't render the loading component if trigger is false
  }
  return (
    <div className="loading-popup">
      <div className="loading-content">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default LoadingPopup;
