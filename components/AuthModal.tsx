

import React, { useState, useEffect } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => boolean;
  onRegister: (email: string, password: string) => boolean;
  registrationsEnabled: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin, onRegister, registrationsEnabled }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  // Reset state when modal is opened/closed or view changes
  useEffect(() => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  }, [isOpen, isLoginView]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
        setError('Please fill in all fields.');
        return;
    }

    if (isLoginView) {
        onLogin(email, password);
    } else {
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        onRegister(email, password);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
            <h2 id="auth-modal-title" className="text-2xl font-bold text-gray-800 dark:text-white">{isLoginView ? 'Login' : 'Create Account'}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" aria-label="Close authentication modal">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {isLoginView 
                ? 'Sign in to your account to upload files and participate in the forum.'
                : 'Create an account to get started with EduSPPU.'
            }
        </p>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 form-input"
                    placeholder="you@example.com"
                    required
                />
            </div>
             <div>
                <label htmlFor="password"  className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 form-input"
                    placeholder="••••••••"
                    required
                />
            </div>
             {!isLoginView && (
                 <div>
                    <label htmlFor="confirmPassword"  className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1 form-input"
                        placeholder="••••••••"
                        required
                    />
                </div>
             )}
            {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
          </div>

          <div className="mt-6">
            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                {isLoginView ? 'Sign In' : 'Create Account'}
            </button>
          </div>
        </form>
         <div className="mt-4 text-center">
             {registrationsEnabled && (
                <button onClick={() => setIsLoginView(!isLoginView)} className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                    {isLoginView ? "Don't have an account? Register" : "Already have an account? Login"}
                </button>
             )}
         </div>
      </div>
    </div>
  );
};