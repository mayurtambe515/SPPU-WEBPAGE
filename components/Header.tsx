import React, { useState } from 'react';
import { User, Theme, Notification } from '../types';
import { notifications as mockNotifications } from '../constants';

interface HeaderProps {
  user: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLoginClick, onLogout, theme, setTheme }) => {
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications] = useState<Notification[]>(mockNotifications);
  
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="bg-gradient-to-r from-[var(--header-start)] to-[var(--header-end)] text-white shadow-md flex-shrink-0 z-20">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
             <button
              className="p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-label="Open menu"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold ml-4">EDUSPPU 2024</h1>
          </div>

          <div className="flex items-center space-x-4">
             {/* Notification Bell */}
             <div className="relative">
                <button onClick={() => setNotificationsOpen(!isNotificationsOpen)} className="p-2 rounded-full hover:bg-white/10 focus:outline-none" aria-label={`View notifications (${unreadCount} unread)`}>
                   <BellIcon className="h-6 w-6" />
                   {unreadCount > 0 && <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-[var(--primary)]" />}
                </button>
                {isNotificationsOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none text-gray-800 dark:text-white">
                       <div className="py-1">
                         <div className="px-4 py-2 font-bold border-b border-gray-200 dark:border-gray-600">Notifications</div>
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
          </div>
        </div>
      </div>
    </header>
  );
};


// Icons
const MenuIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;
const BellIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V5a2 2 0 00-4 0v.083A6 6 0 004 11v3.159c0 .538-.214 1.055-.595 1.436L2 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;