import React from 'react';

interface UnauthorizedAccessProps {
  onGoHome: () => void;
}

export const UnauthorizedAccess: React.FC<UnauthorizedAccessProps> = ({ onGoHome }) => {
  return (
    <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-800 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">🚫 Access Denied</h2>
      <p className="text-lg mb-6">You do not have permission to view this page. This area is restricted to administrators only.</p>
      <button
        onClick={onGoHome}
        className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
      >
        Return to Home
      </button>
    </div>
  );
};
