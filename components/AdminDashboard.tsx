
import React, { useState, useMemo } from 'react';
import { Material } from '../types';

interface AdminDashboardProps {
  materials: Material[];
  onApproval: (materialId: number, isApproved: boolean) => void;
  onDelete: (materialId: number) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ materials, onApproval, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMaterials = useMemo(() => {
    if (!searchTerm.trim()) {
      return materials;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return materials.filter(m =>
      m.title.toLowerCase().includes(lowercasedFilter) ||
      m.subject.toLowerCase().includes(lowercasedFilter) ||
      m.uploaderEmail?.toLowerCase().includes(lowercasedFilter)
    );
  }, [materials, searchTerm]);

  const pendingMaterials = filteredMaterials.filter(m => !m.isApproved);
  const approvedMaterials = filteredMaterials.filter(m => m.isApproved);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Admin Dashboard</h1>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by title, subject, or uploader email..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-300">
        <h2 className="text-xl font-bold mb-4">Pending Approvals ({pendingMaterials.length})</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title / Subject</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Uploader</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Uploaded</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {pendingMaterials.map((material) => (
                <tr key={material.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {material.title}
                    <div className="text-xs text-gray-500">{material.subject}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{material.uploaderEmail}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{material.uploaded}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button onClick={() => onApproval(material.id, true)} className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">Approve</button>
                    <button onClick={() => onDelete(material.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">Reject</button>
                  </td>
                </tr>
              ))}
               {pendingMaterials.length === 0 && (
                 <tr><td colSpan={4} className="text-center py-4 text-gray-500 dark:text-gray-400">No pending materials found.</td></tr>
               )}
            </tbody>
          </table>
        </div>
      </div>

       <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-300">
        <h2 className="text-xl font-bold mb-4">Approved Materials ({approvedMaterials.length})</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title / Subject</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Uploader</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Downloads</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {approvedMaterials.map((material) => (
                <tr key={material.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {material.title}
                    <div className="text-xs text-gray-500">{material.subject}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{material.uploaderEmail}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{material.downloads}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button onClick={() => onApproval(material.id, false)} className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300">Unapprove</button>
                    <button onClick={() => onDelete(material.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">Delete</button>
                  </td>
                </tr>
              ))}
               {approvedMaterials.length === 0 && (
                 <tr><td colSpan={4} className="text-center py-4 text-gray-500 dark:text-gray-400">No approved materials found.</td></tr>
               )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
