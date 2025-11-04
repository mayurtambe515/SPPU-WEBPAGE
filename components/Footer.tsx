
import React from 'react';

interface FooterProps {
    onAdminLoginClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onAdminLoginClick }) => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4 text-center text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
            <p>&copy; {new Date().getFullYear()} EduSPPU 2024. All Rights Reserved.</p>
            <button onClick={onAdminLoginClick} className="mt-2 text-xs text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 hover:underline">
                Admin Login
            </button>
        </footer>
    );
};
