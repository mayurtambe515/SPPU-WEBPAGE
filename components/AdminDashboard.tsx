import React, { useState, useMemo } from 'react';
import { Material, User } from '../types';

interface AdminDashboardProps {
  materials: Material[];
  onApproval: (materialId: number, isApproved: boolean) => void;
  onDelete: (materialId: number) => void;
  // Global Settings Props
  announcement: { message: string; active: boolean };
  onAnnouncementChange: (announcement: { message: string; active: boolean }) => void;
  registrationsEnabled: boolean;
  onRegistrationsToggle: (enabled: boolean) => void;
  // User Management Props
  users: User[];
  currentUser: User | null;
  onUserRoleChange: (email: string, newRole: 'admin' | 'user') => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
    materials, 
    onApproval, 
    onDelete,
    announcement,
    onAnnouncementChange,
    registrationsEnabled,
    onRegistrationsToggle,
    users,
    currentUser,
    onUserRoleChange
}) => {
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

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
      
      {/* Admin Settings Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 border-b dark:border-gray-700 pb-2">Admin Settings</h2>
        <div className="space-y-6">
            {/* Announcement Banner Setting */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Global Announcement Banner</label>
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        placeholder="Enter announcement text..."
                        value={announcement.message}
                        onChange={(e) => onAnnouncementChange({ ...announcement, message: e.target.value })}
                        className="flex-grow form-input"
                    />
                    <div className="flex items-center">
                         <span className="mr-2 text-sm text-gray-600 dark:text-gray-400">{announcement.active ? 'Enabled' : 'Disabled'}</span>
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Enable New User Registrations</label>
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
                <p className="text-xs text-gray-500 mt-1">If disabled, new users will not be able to create an account.</p>
            </div>
            {/* User Role Management */}
            <div className="pt-4 border-t dark:border-gray-700">
                 <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">User Role Management</h3>
                 <div className="overflow-x-auto max-h-72">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700/50 sticky top-0">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {users.map(user => (
                                <tr key={user.email}>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{user.name}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{user.email}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                                        <span className={`capitalize font-semibold text-xs px-2 py-1 rounded-full ${user.role === 'admin' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => onUserRoleChange(user.email, user.role === 'admin' ? 'user' : 'admin')}
                                            disabled={user.email === currentUser?.email}
                                            className="px-3 py-1 text-xs rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                                                bg-gray-200 text-gray-800 hover:bg-gray-300
                                                dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                                        >
                                            {user.role === 'admin' ? 'Demote to User' : 'Promote to Admin'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                 </div>
            </div>
        </div>
      </div>


      {/* Material Management Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Material Management</h2>
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
          <h3 className="text-xl font-bold mb-4">All Materials ({filteredMaterials.length})</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title / Subject</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Uploader</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Uploaded</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredMaterials.map((material) => (
                  <tr key={material.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {material.title}
                      <div className="text-xs text-gray-500">{material.subject}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{material.uploaderEmail}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{material.uploaded}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          material.isApproved 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}>
                        {material.isApproved ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {material.isApproved ? (
                        <button onClick={() => onApproval(material.id, false)} className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300">Revoke</button>
                      ) : (
                        <button onClick={() => onApproval(material.id, true)} className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">Approve</button>
                      )}
                      <button onClick={() => onDelete(material.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">Delete</button>
                    </td>
                  </tr>
                ))}
                 {filteredMaterials.length === 0 && (
                   <tr><td colSpan={5} className="text-center py-4 text-gray-500 dark:text-gray-400">No materials found.</td></tr>
                 )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};