import React, { createContext, useState, useContext } from 'react';
import Toast from './components/Toast';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ isSuccess: false, message: '' });

  const showMessage = (isSuccess, message) => {
    setToast({ isSuccess, message });

    setTimeout(() => setToast({ isSuccess: false, message: '' }), 3000);
  };

  return (
    <ToastContext.Provider value={{ showMessage }}>
      {children}
      <Toast
        message={toast.message}
        isSuccess={toast.isSuccess}
        onClose={() => setToast({ isSuccess: false, message: '' })}
      />
    </ToastContext.Provider>
  );
};
