import React, { useState, useMemo } from 'react';
import { Material, User } from '../types';

interface DownloadsPageProps {
  materials: Material[];
  currentUser: User | null;
  onDelete: (materialId: number) => void;
  onDownload: (materialId: number) => void;
}

export const DownloadsPage: React.FC<DownloadsPageProps> = ({ materials, currentUser, onDelete, onDownload }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('All');

  const subjects = useMemo(() => ['All', ...Array.from(new Set(materials.map(m => m.subject)))], [materials]);

  const filteredMaterials = useMemo(() => {
    return materials.filter(m => {
      const searchMatch = m.title.toLowerCase().includes(searchTerm.toLowerCase()) || m.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const subjectMatch = filterSubject === 'All' || m.subject === filterSubject;
      return searchMatch && subjectMatch;
    });
  }, [materials, searchTerm, filterSubject]);

  const handleDownload = (e: React.MouseEvent<HTMLButtonElement>, material: Material) => {
    e.preventDefault();
    onDownload(material.id); // Track download
    const { fileContent, fileName, title } = material;
    if (fileContent && fileName) {
        const link = document.createElement('a');
        link.href = fileContent;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        const dummyContent = `This is a dummy file for: ${title}`;
        const blob = new Blob([dummyContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${title.replace(/ /g, '_')}.txt`;
        link.click();
        URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-300">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">All Materials</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
        <input
          type="text"
          placeholder="Search by title or subject..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent focus:ring-indigo-500 focus:border-indigo-500"
        />
        <select
          value={filterSubject}
          onChange={e => setFilterSubject(e.target.value)}
          className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent focus:ring-indigo-500 focus:border-indigo-500"
        >
          {subjects.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Materials Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Subject</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Uploader</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden sm:table-cell">Downloads</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredMaterials.map((material) => (
              <tr key={material.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{material.title}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{material.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{material.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">{material.uploaderEmail || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 hidden sm:table-cell">{material.downloads}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button onClick={(e) => handleDownload(e, material)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">Download</button>
                  {currentUser && (currentUser.role === 'admin' || currentUser.email === material.uploaderEmail) && (
                    <button onClick={() => onDelete(material.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">Delete</button>
                  )}
                </td>
              </tr>
            ))}
            {filteredMaterials.length === 0 && (
                <tr><td colSpan={5} className="text-center py-8 text-gray-500 dark:text-gray-400">No materials found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
