import React from 'react';
import { User, View } from '../types';

interface SidebarProps {
  user: User | null;
  currentView: View;
  setView: (view: View) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onUploadClick: () => void;
}

const NavLink: React.FC<{
  isCurrent: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ isCurrent, onClick, children }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors group ${
      isCurrent
        ? 'bg-indigo-800 text-white'
        : 'text-indigo-100 hover:bg-indigo-600 hover:bg-opacity-75'
    }`}
  >
    {children}
  </button>
);


export const Sidebar: React.FC<SidebarProps> = ({ user, currentView, setView, isOpen, setIsOpen, onUploadClick }) => {
    const mainNavItems = [
        { view: 'home', label: 'Home', icon: <HomeIcon />, requiresAuth: false },
        { view: 'dashboard', label: 'Dashboard', icon: <DashboardIcon />, requiresAuth: true },
        { view: 'materials', label: 'Materials', icon: <DocumentIcon />, requiresAuth: false },
        { view: 'notes', label: 'Notes', icon: <NoteIcon />, requiresAuth: false },
        { view: 'questionBank', label: 'Question Bank', icon: <ClipboardCheckIcon />, requiresAuth: false },
        { view: 'downloads', label: 'Downloads', icon: <DownloadCloudIcon />, requiresAuth: false },
        { view: 'forum', label: 'Forum', icon: <ForumIcon />, requiresAuth: true },
    ] as const;
    
    const adminNavItems = [
        { view: 'admin', label: 'Admin Panel', icon: <AdminIcon />, requiresAuth: true, adminOnly: true },
    ] as const;

  const handleSetView = (view: View) => {
    setView(view);
    if (window.innerWidth < 1024) { // Close sidebar on mobile after navigation
        setIsOpen(false);
    }
  }

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden ${isOpen ? 'block' : 'hidden'}`}
        onClick={() => setIsOpen(false)}
      ></div>
      <div
        className={`fixed top-0 left-0 h-full bg-indigo-700 text-white w-64 flex flex-col z-30 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0 lg:flex-shrink-0`}
      >
        <div className="flex items-center justify-center h-16 border-b border-indigo-800">
          <h1 className="text-2xl font-bold">EduSPPU 2024</h1>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-2">
            {mainNavItems.map(item => (
                (!item.requiresAuth || user) && (
                     <NavLink
                        key={item.view}
                        isCurrent={currentView === item.view}
                        onClick={() => handleSetView(item.view)}
                     >
                        <span className="w-6 h-6 mr-3">{item.icon}</span>
                        {item.label}
                    </NavLink>
                )
            ))}

            {user && (
                 <div className="pt-4 mt-4 border-t border-indigo-800 space-y-2">
                    {adminNavItems.map(item => (
                        (user.role === 'admin') && (
                            <NavLink
                                key={item.view}
                                isCurrent={currentView === item.view}
                                onClick={() => handleSetView(item.view)}
                            >
                                <span className="w-6 h-6 mr-3">{item.icon}</span>
                                {item.label}
                            </NavLink>
                        )
                    ))}
                    <button onClick={onUploadClick} className="w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors group bg-orange-500 hover:bg-orange-600">
                         <span className="w-6 h-6 mr-3"><UploadIcon /></span>
                         Upload File
                    </button>
                </div>
            )}
        </nav>
      </div>
    </>
  );
};

// Icons
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const DocumentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
const NoteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
const ClipboardCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>;
const DownloadCloudIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" /></svg>;
const ForumIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V10a2 2 0 012-2h8z" /></svg>;
const AdminIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;
