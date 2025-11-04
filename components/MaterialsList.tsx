import React, { useState, useEffect, useCallback } from 'react';
import { Material, User } from '../types';
import { MaterialCard } from './MaterialCard';

// Debounce hook
function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}


interface MaterialsListProps {
  materials: Material[];
  title: string;
  user: User | null;
  onUploadClick: () => void;
  onDownload: (materialId: number) => void;
  onAddNoteClick?: () => void;
  onEditNoteClick?: (noteId: number) => void;
  onDeleteNoteClick?: (noteId: number) => void;
  // Props for Notes view specifically
  notesSearchTerm?: string;
  onNotesSearchChange?: (term: string) => void;
  allNoteTags?: string[];
  selectedTag?: string | null;
  onTagSelect?: (tag: string) => void;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export const MaterialsList: React.FC<MaterialsListProps> = ({ 
    materials, 
    title, 
    user, 
    onUploadClick, 
    onDownload, 
    onAddNoteClick, 
    onEditNoteClick, 
    onDeleteNoteClick,
    notesSearchTerm,
    onNotesSearchChange,
    allNoteTags,
    selectedTag,
    onTagSelect,
    currentPage,
    totalPages,
    onPageChange,
}) => {
  const isNotesView = title === 'Notes';
  
  const [localSearchTerm, setLocalSearchTerm] = useState(notesSearchTerm || '');
  const debouncedSearchTerm = useDebounce(localSearchTerm, 300);

  useEffect(() => {
    if (onNotesSearchChange) {
      onNotesSearchChange(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onNotesSearchChange]);

  const handleTagClick = (tag: string) => {
    if(onTagSelect) {
        onTagSelect(tag === 'All Tags' ? null : tag);
    }
  };

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-6 border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
        <div className="flex space-x-2">
            {user && (
                isNotesView && onAddNoteClick ? (
                    <button
                    onClick={onAddNoteClick}
                    className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                    >
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Add New Note
                    </button>
                ) : title !== 'Recent Uploads' && (
                    <button
                    onClick={onUploadClick}
                    className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                    >
                    <UploadIcon className="w-4 h-4 mr-2" />
                    Upload New
                    </button>
                )
            )}
        </div>
      </div>
      
       {isNotesView && (
            <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Search your notes by title or content..."
                        value={localSearchTerm}
                        onChange={(e) => setLocalSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                       <SearchIcon className="h-5 w-5 text-gray-400" />
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    {allNoteTags?.map(tag => (
                        <button
                            key={tag}
                            onClick={() => handleTagClick(tag)}
                            className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                                selectedTag === tag || (tag === 'All Tags' && !selectedTag)
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500'
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
       )}

      {materials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((material) => (
            <MaterialCard 
                key={material.id} 
                material={material} 
                user={user} 
                onDownload={onDownload} 
                onEditNoteClick={isNotesView ? onEditNoteClick : undefined}
                onDeleteNoteClick={isNotesView ? onDeleteNoteClick : undefined}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
            <p className="text-gray-500 dark:text-gray-400">No materials found for the selected criteria.</p>
        </div>
      )}

      {isNotesView && totalPages && totalPages > 1 && (
        <div className="mt-8 flex justify-between items-center">
            <button
                onClick={() => onPageChange && onPageChange(currentPage! - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Previous
            </button>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={() => onPageChange && onPageChange(currentPage! + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Next
            </button>
        </div>
      )}
    </div>
  );
};

const UploadIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;
const PlusIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>;
const SearchIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;