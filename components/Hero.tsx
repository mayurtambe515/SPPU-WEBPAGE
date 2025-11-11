import React, { useState } from 'react';

interface HeroProps {
    onSearch: (searchTerm: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(inputValue);
    };

    return (
        <div className="bg-indigo-600 dark:bg-indigo-800 pb-32 pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
                    Your Complete SPPU Study Platform
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-xl text-indigo-200">
                    Access notes, PYQs, study planners, and a community of fellow students for the 2024 pattern curriculum.
                </p>
                <form onSubmit={handleSearch} className="mt-8 max-w-xl mx-auto">
                    <div className="flex rounded-md shadow-sm">
                        <div className="relative flex-grow focus-within:z-10">
                            <input
                                type="text"
                                name="search"
                                id="search"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="focus:ring-orange-500 focus:border-orange-500 block w-full rounded-none rounded-l-md pl-4 py-3 text-lg border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Search for subjects, notes, or PYQs..."
                            />
                        </div>
                        <button
                            type="submit"
                            className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                            <SearchIcon className="h-5 w-5" />
                            <span>Search</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);