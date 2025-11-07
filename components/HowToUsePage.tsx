import React from 'react';

const FeatureStep: React.FC<{ title: string, description: string, icon: React.ReactNode }> = ({ title, description, icon }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-800/50 p-3 rounded-full">
            {icon}
        </div>
        <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-1">{description}</p>
        </div>
    </div>
);

export const HowToUsePage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">How to Use the App</h1>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 space-y-8">
                <FeatureStep 
                    title="1. Navigating the App" 
                    icon={<NavigateIcon />} 
                    description="Use the bottom navigation bar to switch between the main sections: Home, Material, Notes, and your Profile. The active tab is highlighted for easy reference."
                />
                <FeatureStep 
                    title="2. Finding Study Material" 
                    icon={<SearchIcon />} 
                    description="Go to the 'Material' tab to browse all uploaded content. You can preview files by clicking the eye icon or download them directly to your device."
                />
                <FeatureStep 
                    title="3. Managing Your Notes" 
                    icon={<NoteIcon />} 
                    description="In the 'Notes' tab, you can create, edit, and delete your personal study notes. Use the search bar and tags to quickly find what you're looking for."
                />
                 <FeatureStep 
                    title="4. Uploading Content" 
                    icon={<UploadIcon />} 
                    description="Want to contribute? Click the 'Upload New' button in the 'Material' section. Your submission will be reviewed by an admin before it becomes visible to everyone."
                />
                <FeatureStep 
                    title="5. Using the AI Assistant" 
                    icon={<AIIcon />} 
                    description="Click the floating chat bubble to open the AI Study Assistant. Ask it anything about the SPPU curriculum, exam patterns, or important topics for your subjects."
                />
            </div>
        </div>
    );
};

// Icons
const NavigateIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l-7-7 7-7 7 7-7 7z" /></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const NoteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;
const AIIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;