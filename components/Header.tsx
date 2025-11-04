import React, { useState } from 'react';
import { User, Theme, Notification } from '../types';
import { notifications as mockNotifications } from '../constants';

interface HeaderProps {
  user: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
  onMenuClick: () => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLoginClick, onLogout, onMenuClick, theme, setTheme }) => {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications] = useState<Notification[]>(mockNotifications);
  
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm flex-shrink-0 z-20 transition-colors duration-300">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-label="Open sidebar"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
            <div className="hidden lg:block ml-4">
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">EduSPPU 2024</h1>
            </div>
          </div>

          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
             {/* Search bar can be added here if needed */}
          </div>
          
          <div className="flex items-center space-x-4">
             {user ? (
               <div className="flex items-center space-x-4">
                 {/* Notification Bell */}
                 <div className="relative">
                    <button onClick={() => setNotificationsOpen(!isNotificationsOpen)} className="p-1 rounded-full text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-white focus:outline-none" aria-label={`View notifications (${unreadCount} unread)`}>
                       <BellIcon className="h-6 w-6" />
                       {unreadCount > 0 && <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800" />}
                    </button>
                    {isNotificationsOpen && (
                        <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
                           <div className="py-1">
                             <div className="px-4 py-2 font-bold text-gray-700 dark:text-white border-b border-gray-200 dark:border-gray-600">Notifications</div>
                             {notifications.map(n => (
                                <a key={n.id} href="#" className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
                                  <p className={!n.isRead ? 'font-semibold' : ''}>{n.message}</p>
                                  <p className="text-xs text-gray-400">{n.timestamp}</p>
                                </a>
                             ))}
                           </div>
                        </div>
                    )}
                 </div>
                 
                 {/* Profile Dropdown */}
                 <div className="relative">
                   <button onClick={() => setProfileOpen(!isProfileOpen)} className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" aria-label="Open user menu" aria-haspopup="true" aria-expanded={isProfileOpen}>
                     <img className="h-8 w-8 rounded-full" src={user.avatar} alt="User avatar" />
                   </button>
                   {isProfileOpen && (
                     <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
                       <div className="px-4 py-2 text-sm text-gray-700 dark:text-white border-b border-gray-200 dark:border-gray-600">
                         Signed in as<br/><strong className="truncate">{user.email}</strong>
                       </div>
                       <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Your Profile</a>
                       <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Settings</a>
                       <div className="border-t border-gray-200 dark:border-gray-600 my-1"/>
                       <div className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                          <span>Theme</span>
                          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
                            {theme === 'light' ? <MoonIcon className="w-5 h-5"/> : <SunIcon className="w-5 h-5"/>}
                          </button>
                       </div>
                       <div className="border-t border-gray-200 dark:border-gray-600 my-1"/>
                       <button onClick={onLogout} className="w-full text-left block px-4 py-2 text-sm text-red-500 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600">
                         Logout
                       </button>
                     </div>
                   )}
                 </div>
               </div>
            ) : (
              <button onClick={onLoginClick} className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                Login / Register
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};


// Icons
const MenuIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;
const BellIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V5a2 2 0 00-4 0v.083A6 6 0 004 11v3.159c0 .538-.214 1.055-.595 1.436L2 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;
const MoonIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>;
const SunIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;