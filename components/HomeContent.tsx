
import React from 'react';
import { View } from '../types';
import { homeGridCards } from '../constants';

interface HomeContentProps {
    setView: (view: View) => void;
}

export const HomeContent: React.FC<HomeContentProps> = ({ setView }) => {
    return (
        <div className="space-y-8">
            {/* Main Navigation Grid */}
            <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">What are you looking for?</h2>
                <div className="grid grid-cols-2 gap-4">
                    {homeGridCards.map(card => (
                        <div key={card.id} onClick={() => setView(card.view)} className={`home-grid-card ${card.bgColor} cursor-pointer`}>
                            <h3 className="font-bold text-md">{card.title}</h3>
                            <div className="flex justify-between items-center">
                                <img src="https://img.icons8.com/color/48/university.png" alt="logo" className="w-8 h-8 rounded-full bg-white/20 p-1" />
                                <ArrowRightIcon />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Featured Course Banner */}
            <div>
                 <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Featured Courses</h2>
                 <img src="https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg?w=1060&t=st=1716386815~exp=1716387415~hmac=c39a7b632943e1d6e1596a2412803b9f8f4a74a10753f7f08d0b2f3a39e2f61e" alt="Featured Course" className="rounded-lg shadow-md w-full" />
            </div>

            {/* Free Content */}
            <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Free Content</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-100 dark:bg-green-900/50 p-4 rounded-lg flex items-center justify-between text-green-800 dark:text-green-200">
                        <div>
                            <h3 className="font-bold">Recorded Videos</h3>
                        </div>
                        <PlayIcon />
                    </div>
                     <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg flex items-center justify-between text-gray-800 dark:text-gray-200">
                        <div>
                            <h3 className="font-bold">Study Material</h3>
                        </div>
                        <FolderIcon />
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div>
                 <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">What our students have to say</h2>
                 <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center relative">
                    <p className="text-3xl font-serif text-gray-400 absolute top-2 left-4">“</p>
                    <p className="text-gray-600 dark:text-gray-300 italic">Sppu Second year IT branch study material</p>
                    <div className="flex items-center justify-center mt-4">
                        <img src="https://api.dicebear.com/8.x/initials/svg?seed=Vikas%20Sharma" alt="Vikas Sharma" className="w-12 h-12 rounded-full" />
                        <div className="ml-4 text-left">
                            <p className="font-bold">Vikas Sharma</p>
                            <p className="text-sm text-gray-500">SE IT - 481/500</p>
                        </div>
                    </div>
                 </div>
            </div>

            {/* Connect With Us */}
            <div>
                 <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Connect With Us</h2>
                 <div className="grid grid-cols-4 gap-4">
                    <a href="#" className="bg-red-500 text-white p-4 rounded-lg flex justify-center items-center aspect-square"><YoutubeIcon /></a>
                    <a href="#" className="bg-green-500 text-white p-4 rounded-lg flex justify-center items-center aspect-square"><WhatsappIcon /></a>
                    <a href="#" className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-4 rounded-lg flex justify-center items-center aspect-square"><InstagramIcon /></a>
                    <a href="#" className="bg-blue-400 text-white p-4 rounded-lg flex justify-center items-center aspect-square"><TelegramIcon /></a>
                 </div>
            </div>

        </div>
    );
};


// Icons
const ArrowRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>;
const PlayIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>;
const FolderIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>;
const YoutubeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor"><path d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.73,18.78 17.93,18.84C17.13,18.91 16.44,18.94 15.84,18.94L15,19C12.81,19 11.2,18.84 10.17,18.56C9.27,18.31 8.69,17.73 8.44,16.83C8.31,16.36 8.22,15.73 8.16,14.93C8.09,14.13 8.06,13.44 8.06,12.84L8,12C8,9.81 8.16,8.2 8.44,7.17C8.69,6.27 9.27,5.69 10.17,5.44C11.2,5.16 12.81,5 15,5L15.84,5.06C16.44,5.06 17.13,5.09 17.93,5.16C18.73,5.22 19.36,5.31 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z" /></svg>;
const WhatsappIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.36 21.85 12.04 21.85C17.5 21.85 21.95 17.4 21.95 11.94C21.95 9.3 20.98 6.81 19.13 4.96C17.28 3.11 14.79 2.13 12.04 2.13L12.04 2M12.04 3.67C14.24 3.67 16.31 4.5 17.87 6.05C19.42 7.61 20.28 9.68 20.28 11.93C20.28 16.47 16.63 20.12 12.04 20.12C10.56 20.12 9.14 19.71 7.92 19L7.5 18.75L4.23 19.77L5.25 16.59L5 16.17C4.2 14.9 3.79 13.44 3.79 11.92C3.79 7.38 7.44 3.67 12.04 3.67M9.13 7.5C8.91 7.5 8.7 7.58 8.55 7.73C8.4 7.88 8.1 8.19 8.1 8.78C8.1 9.37 8.55 9.92 8.68 10.08C8.8 10.23 9.76 11.82 11.33 12.53C13.25 13.39 13.63 13.23 13.96 13.19C14.53 13.11 15.28 12.45 15.46 11.86C15.64 11.27 15.64 10.78 15.58 10.68C15.52 10.58 15.38 10.53 15.15 10.43C14.92 10.33 13.84 9.78 13.63 9.7C13.42 9.62 13.28 9.58 13.13 9.81C12.98 10.04 12.5 10.58 12.37 10.73C12.24 10.88 12.11 10.9 11.88 10.8C11.65 10.7 10.92 10.45 10.06 9.7C9.37 9.11 8.92 8.36 8.81 8.13C8.7 7.9 8.79 7.79 8.89 7.69C8.98 7.59 9.08 7.45 9.18 7.33C9.28 7.21 9.33 7.14 9.38 7.06C9.43 6.98 9.4 6.88 9.35 6.78C9.3 6.68 9.13 6.5 9.13 6.5L9.13 7.5Z" /></svg>;
const InstagramIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" /></svg>;
const TelegramIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor"><path d="M9.78,18.65L10.26,14.21L18.73,5.74L9.78,18.65M11.19,16.32L12.87,17.1L17.23,8.44L11.19,16.32M12.5,17.5L13.23,19.09C13.44,19.53 13.9,19.69 14.29,19.43L16.2,18.06L12.5,17.5M4.74,10.59L19.26,4.62C19.7,4.45 20.15,4.82 20.03,5.31L16.43,20.12C16.26,20.8 15.45,21.08 14.93,20.64L11.83,18.04L9.3,19.45C8.75,19.76 8.28,19.41 8.35,18.8L9.2,12.72L4.5,11.08C3.93,10.87 3.94,10.24 4.52,10.05L4.74,10.59Z" /></svg>;
