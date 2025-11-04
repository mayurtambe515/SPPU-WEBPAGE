import React, { useState, useEffect } from 'react';
import { Branch, Year, MaterialType, Material } from '../types';
import { branches, years, materialTypes } from '../constants';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (data: Omit<Material, 'id' | 'downloads' | 'uploaded' | 'size' | 'fileContent' | 'fileName' | 'isApproved' | 'uploaderEmail' | 'tags'>, file: File) => void;
  showToast: (message: string, type: 'success' | 'error') => void;
}

type FormData = {
  title: string;
  subject: string;
  description: string;
  branch: Branch;
  year: Year;
  type: MaterialType;
};

const initialFormData: FormData = {
    title: '',
    subject: '',
    description: '',
    branch: Branch.Computer,
    year: Year.First,
    type: MaterialType.Notes,
};

const ALLOWED_FILE_TYPES = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
    'text/plain', // .txt
    'image/jpeg',
    'image/png',
    'image/gif'
];

export const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onUpload, showToast }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  
  useEffect(() => {
    // Reset form when modal is closed
    if (!isOpen) {
        setFormData(initialFormData);
        setFile(null);
        setIsUploading(false);
        setUploadProgress(0);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
        if (!ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
            showToast('Invalid file type. Please upload PDF, DOCX, PPTX, TXT, or images.', 'error');
            setFile(null);
            e.target.value = ''; // Reset file input
            return;
        }
        setFile(selectedFile);
    } else {
        setFile(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
        showToast('Please select a file to upload.', 'error');
        return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
        setUploadProgress(prev => {
            if (prev >= 95) {
                return prev;
            }
            return prev + Math.floor(Math.random() * 10) + 5;
        });
    }, 200);

    // Simulate upload completion
    setTimeout(() => {
        clearInterval(interval);
        setUploadProgress(100);
        setTimeout(() => {
            onUpload(formData, file);
        }, 300);
    }, 2500);
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={isUploading ? undefined : onClose} role="dialog" aria-modal="true" aria-labelledby="upload-modal-title">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
            <h2 id="upload-modal-title" className="text-2xl font-bold text-gray-800 dark:text-white">Upload New Material</h2>
            {!isUploading && (
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" aria-label="Close upload modal">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            )}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
            <fieldset disabled={isUploading}>
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                    <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 form-input" />
                </div>
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                    <input type="text" name="subject" id="subject" value={formData.subject} onChange={handleChange} required className="mt-1 form-input" />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                    <textarea name="description" id="description" value={formData.description} onChange={handleChange} required rows={3} className="mt-1 form-textarea" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="branch" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Branch</label>
                        <select name="branch" id="branch" value={formData.branch} onChange={handleChange} className="mt-1 form-select">
                            {branches.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Year</label>
                        <select name="year" id="year" value={formData.year} onChange={handleChange} className="mt-1 form-select">
                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Material Type</label>
                    <select name="type" id="type" value={formData.type} onChange={handleChange} className="mt-1 form-select">
                        {materialTypes.filter(t => t !== 'All').map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">File</label>
                    <div className="mt-1 flex items-center">
                        <label
                            htmlFor="file-upload"
                            className="cursor-pointer bg-white dark:bg-gray-700 py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <span>Choose File</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} required />
                        </label>
                        <span className="ml-4 text-sm text-gray-700 dark:text-gray-300 font-medium truncate">
                            {file ? file.name : 'PDF, DOCX, PPTX, images...'}
                        </span>
                    </div>
                </div>
                
                 {isUploading && (
                    <div className="mt-4">
                        <div className="flex justify-between mb-1">
                            <span className="text-base font-medium text-indigo-700 dark:text-white">Uploading...</span>
                            <span className="text-sm font-medium text-indigo-700 dark:text-white">{uploadProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%`, transition: 'width 0.3s ease-in-out' }}></div>
                        </div>
                    </div>
                )}
            </fieldset>

            <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={onClose} disabled={isUploading} className="bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200 px-4 py-2 rounded-md font-medium hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50">
                    Cancel
                </button>
                <button type="submit" disabled={isUploading} className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isUploading ? 'Please wait...' : 'Upload Material'}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};