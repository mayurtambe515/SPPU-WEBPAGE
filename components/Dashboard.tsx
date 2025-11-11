import React, { useState } from 'react';
import { User, StudyTask } from '../types';
import { studyTasks as mockTasks } from '../constants';

interface DashboardProps {
  user: User;
}

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4 transition-colors duration-300">
        <div className="bg-indigo-100 dark:bg-indigo-800 p-3 rounded-full">{icon}</div>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
        </div>
    </div>
);

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
    const [tasks, setTasks] = useState<StudyTask[]>(mockTasks);

    const toggleTask = (taskId: number) => {
        setTasks(tasks.map(task => task.id === taskId ? {...task, isCompleted: !task.isCompleted} : task));
    };

    const completedTasks = tasks.filter(t => t.isCompleted).length;
    const pendingTasks = tasks.length - completedTasks;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome back, {user.name}!</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Here's your study snapshot for today.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                <StatCard title="Pending Tasks" value={pendingTasks.toString()} icon={<TaskIcon className="text-indigo-600 dark:text-indigo-300"/>} />
                <StatCard title="Completed Tasks" value={completedTasks.toString()} icon={<CheckIcon className="text-green-600 dark:text-green-300"/>} />
                <StatCard title="Downloads" value="12" icon={<DownloadIcon className="text-orange-600 dark:text-orange-300"/>} />
                <StatCard title="Bookmarks" value="5" icon={<BookmarkIcon className="text-blue-600 dark:text-blue-300"/>} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                {/* Study Planner */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-300">
                    <h2 className="text-xl font-bold mb-4">Study Planner</h2>
                    <div className="space-y-4">
                        {tasks.map(task => (
                            <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                                <div className="flex items-center">
                                    <input type="checkbox" checked={task.isCompleted} onChange={() => toggleTask(task.id)} className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                    <div className="ml-3">
                                        <p className={`font-medium ${task.isCompleted ? 'line-through text-gray-500' : ''}`}>{task.title}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{task.subject}</p>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{task.dueDate}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-300">
                     <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                     <ul className="space-y-4">
                         <li className="flex items-start space-x-3">
                            <DownloadIcon className="w-5 h-5 mt-1 text-gray-400"/>
                            <div>
                                <p className="text-sm font-medium">You downloaded "DSA PYQs.pdf"</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                            </div>
                         </li>
                         <li className="flex items-start space-x-3">
                            <UploadIcon className="w-5 h-5 mt-1 text-gray-400"/>
                             <div>
                                <p className="text-sm font-medium">You uploaded "M1 Notes.docx"</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
                            </div>
                         </li>
                          <li className="flex items-start space-x-3">
                            <BookmarkIcon className="w-5 h-5 mt-1 text-gray-400"/>
                             <div>
                                <p className="text-sm font-medium">You bookmarked "Thermodynamics..."</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">3 days ago</p>
                            </div>
                         </li>
                     </ul>
                </div>
            </div>
        </div>
    );
}


// Icons
const TaskIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>;
const CheckIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;
const BookmarkIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>;
const UploadIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;
