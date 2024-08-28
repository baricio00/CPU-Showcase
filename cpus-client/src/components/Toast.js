import React from 'react';
import './Toast.css';

const Toast = ({ message, isSuccess, onClose }) => {
  if (!message) return null;

  return (
    <div className={`toast ${isSuccess ? 'toast-success' : 'toast-error'}`}>
      {message}
      <button className="toast-close" onClick={onClose}>×</button>
    </div>
  );
};

export default Toast;
