import React, { useEffect } from 'react';
import { ToastNotification } from '../types';

interface ToastProps {
    notification: ToastNotification | null;
    onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ notification, onClose }) => {
    if (!notification) {
        return null;
    }
    
    const baseClasses = "fixed top-5 right-5 z-[100] max-w-sm w-full p-4 rounded-lg shadow-lg flex items-center space-x-3 transition-transform transform";
    const typeClasses = {
        success: "bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200",
        error: "bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200"
    };

    return (
        <div className={`${baseClasses} ${typeClasses[notification.type]}`} role="alert">
            {notification.type === 'success' ? <SuccessIcon /> : <ErrorIcon />}
            <span className="flex-1">{notification.message}</span>
            <button onClick={onClose} className="p-1 rounded-md hover:bg-black/10">
                <CloseIcon />
            </button>
        </div>
    );
};

const SuccessIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ErrorIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
