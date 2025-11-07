import React from 'react';
import { User, View, Material } from '../types';

interface ProfilePageProps {
    user: User | null;
    materials: Material[];
    users: User[];
    onLogout: () => void;
    onAdminLoginClick: () => void;
    onLoginClick: () => void;
    setView: (view: View) => void;
    // Global settings for admin quick controls
    announcement: { message: string; active: boolean };
    onAnnouncementChange: (announcement: { message: string; active: boolean }) => void;
    registrationsEnabled: boolean;
    onRegistrationsToggle: (enabled: boolean) => void;
}

const MenuItem: React.FC<{ label: string, icon: React.ReactNode, hasNewLabel?: boolean, onClick?: () => void }> = ({ label, icon, hasNewLabel, onClick }) => (
    <div onClick={onClick} className={`flex items-center p-4 border-b border-gray-200 dark:border-gray-700 ${onClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50' : ''}`}>
        <div className="text-gray-500 dark:text-gray-400 mr-4">{icon}</div>
        <span className="flex-1 text-gray-800 dark:text-white font-medium">{label}</span>
        {hasNewLabel && <span className="text-xs font-bold text-white bg-blue-500 px-2 py-1 rounded-full">NEW</span>}
    </div>
);

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center space-x-4">
        <div className="bg-gray-200 dark:bg-gray-600 p-3 rounded-full">{icon}</div>
        <div>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        </div>
    </div>
);


export const ProfilePage: React.FC<ProfilePageProps> = ({ 
    user, 
    materials, 
    users, 
    onLogout, 
    onAdminLoginClick, 
    onLoginClick, 
    setView,
    announcement,
    onAnnouncementChange,
    registrationsEnabled,
    onRegistrationsToggle 
}) => {
    
    if (!user) {
        return (
            <div className="text-center p-8">
                <h2 className="text-2xl font-bold mb-4">Profile</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Please log in to view your profile and access more features.</p>
                <button
                    onClick={onLoginClick}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                    Login / Register
                </button>
            </div>
        )
    }

    // Admin-specific view
    if (user.role === 'admin') {
        const totalMaterials = materials.length;
        const pendingApprovals = materials.filter(m => !m.isApproved).length;
        const totalUsers = users.length;
        
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg space-y-6">
                {/* Admin Info Header */}
                <div className="flex items-center p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="bg-indigo-100 dark:bg-indigo-800 p-3 rounded-full">
                        <AdminIcon />
                    </div>
                    <div className="ml-4">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">{user.name}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Administrator</p>
                    </div>
                </div>
                
                {/* Quick Stats */}
                <div className="px-6">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Quick Stats</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <StatCard title="Total Materials" value={totalMaterials} icon={<TotalMaterialsIcon />} />
                        <StatCard title="Pending Approvals" value={pendingApprovals} icon={<PendingIcon />} />
                        <StatCard title="Total Users" value={totalUsers} icon={<TotalUsersIcon />} />
                    </div>
                </div>
                
                {/* Quick Settings */}
                <div className="px-6">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Quick Settings</h3>
                    <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        {/* Announcement Banner Setting */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Global Announcement</label>
                            <div className="flex items-center space-x-4">
                                <input
                                    type="text"
                                    placeholder="Enter announcement text..."
                                    value={announcement.message}
                                    onChange={(e) => onAnnouncementChange({ ...announcement, message: e.target.value })}
                                    className="flex-grow form-input text-sm"
                                />
                                <div className="flex items-center">
                                    <span className="mr-2 text-sm text-gray-600 dark:text-gray-400">{announcement.active ? 'On' : 'Off'}</span>
                                    <button
                                        onClick={() => onAnnouncementChange({ ...announcement, active: !announcement.active })}
                                        className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                                            announcement.active ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-600'
                                        }`}
                                    >
                                        <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                                            announcement.active ? 'translate-x-5' : 'translate-x-0'
                                        }`} />
                                    </button>
                                </div>
                            </div>
                        </div>
                         {/* Registration Toggle Setting */}
                        <div>
                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New User Registrations</label>
                            <div className="flex items-center">
                                <span className="mr-2 text-sm text-gray-600 dark:text-gray-400">{registrationsEnabled ? 'Enabled' : 'Disabled'}</span>
                                <button
                                    onClick={() => onRegistrationsToggle(!registrationsEnabled)}
                                    className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                                        registrationsEnabled ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-600'
                                    }`}
                                >
                                    <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                                        registrationsEnabled ? 'translate-x-5' : 'translate-x-0'
                                    }`} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Admin Panel */}
                <div className="px-6">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Main Actions</h3>
                    <button
                        onClick={() => setView('admin')}
                        className="w-full bg-indigo-600 text-white py-4 px-4 rounded-lg flex items-center justify-center font-semibold hover:bg-indigo-700 transition-colors text-base"
                    >
                        <MaterialIcon />
                        <span className="ml-3">Manage All Materials</span>
                    </button>
                </div>
                
                {/* Logout Button */}
                <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                     <button 
                        onClick={onLogout}
                        className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </div>
        );
    }

    // Default view for regular users
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            {/* User Info Header */}
            <div className="flex items-center p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="bg-gray-200 dark:bg-gray-600 p-2 rounded-full">
                    <UserIcon />
                </div>
                <div className="ml-4">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">{user.name}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Organization Code: JQLLPO</p>
                </div>
            </div>

            {/* Menu Items */}
            <div>
                <MenuItem label="Offline Downloads" icon={<DownloadIcon />} hasNewLabel />
                <MenuItem label="Free Material" icon={<MaterialIcon />} onClick={() => setView('materials')} />
                <MenuItem label="Students Testimonial" icon={<TestimonialIcon />} hasNewLabel />
                <MenuItem label="Edit Profile" icon={<EditProfileIcon />} />
                <MenuItem label="Settings" icon={<SettingsIcon />} onClick={() => setView('settings')} />
                <MenuItem label="How to use the App" icon={<HelpIcon />} hasNewLabel onClick={() => setView('howToUse')} />
                <MenuItem label="Privacy Policy" icon={<PrivacyIcon />} onClick={() => setView('privacyPolicy')} />
            </div>

            {/* Action Buttons */}
            <div className="p-6 space-y-4">
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center font-semibold hover:bg-blue-700 transition-colors">
                    <FacebookIcon />
                    <span className="ml-2">Share on facebook</span>
                </button>
                <button 
                    onClick={onLogout}
                    className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                >
                    Logout
                </button>
                <button onClick={onAdminLoginClick} className="w-full text-center mt-2 text-sm text-gray-500 dark:text-gray-400 hover:underline">
                    Switch to Admin
                </button>
            </div>
        </div>
    );
};

// Icons
const AdminIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 dark:text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-700 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>;
const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;
const MaterialIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>;
const TestimonialIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const EditProfileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const HelpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const PrivacyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
const FacebookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M18,5H15.5A3.5,3.5 0 0,0 12,8.5V11H10V14H12V21H15V14H18V11H15V9A1,1 0 0,1 16,8H18V5Z" /></svg>;

const TotalMaterialsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>;
const PendingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600 dark:text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const TotalUsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.08-1.282-.23-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.08-1.282.23-1.857m0 0A5.002 5.002 0 0112 13a5.002 5.002 0 014.77 4.143m-9.54 0A5.002 5.002 0 0012 13a5.002 5.002 0 004.77-4.143m0 0A5.002 5.002 0 0112 5a5.002 5.002 0 014.77 3.857M12 5a5.002 5.002 0 00-4.77 3.857m0 0A5.002 5.002 0 0012 13a5.002 5.002 0 00-4.77-4.143" /></svg>;