import React from 'react';
import { Theme } from '../types';

interface SettingsPageProps {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ theme, setTheme }) => {
    
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Settings</h1>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 space-y-8">
                {/* Appearance Settings */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Appearance</h2>
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div>
                            <p className="font-medium">Theme</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Switch between light and dark mode.</p>
                        </div>
                        <div className="flex items-center">
                             <span className="mr-2 text-sm text-gray-600 dark:text-gray-400 capitalize">{theme} Mode</span>
                             <button
                                onClick={toggleTheme}
                                className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                                    theme === 'dark' ? 'bg-indigo-600' : 'bg-gray-200'
                                }`}
                                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                             >
                                <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                                    theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
                                }`} />
                             </button>
                        </div>
                    </div>
                </div>

                {/* Notification Settings */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Notifications</h2>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg space-y-4">
                        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                            Notification settings will be available in a future update.
                        </p>
                        <div className="flex items-center justify-between opacity-50">
                            <p className="font-medium">New Material Alerts</p>
                            <div className="h-6 w-11 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                        </div>
                         <div className="flex items-center justify-between opacity-50">
                            <p className="font-medium">Forum Activity</p>
                            <div className="h-6 w-11 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};