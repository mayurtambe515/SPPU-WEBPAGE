import React, { useState } from 'react';
import { Material, User } from '../types';
import { FileTypeIcon } from './FileTypeIcon';

interface MaterialCardProps {
  material: Material;
  user: User | null;
  onDownload: (materialId: number) => void;
  onEditNoteClick?: (noteId: number) => void;
  onDeleteNoteClick?: (noteId: number) => void;
}

interface PreviewModalProps {
    material: Material;
    onClose: () => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ material, onClose }) => {
    const getMimeType = (dataUrl: string) => {
        return dataUrl.substring(dataUrl.indexOf(':') + 1, dataUrl.indexOf(';'));
    };

    const renderPreviewContent = () => {
        if (!material.fileContent || !material.fileName) {
            return <div className="p-8 text-center text-gray-500 dark:text-gray-400">Preview is not available for this material. Please download to view.</div>;
        }

        const mimeType = getMimeType(material.fileContent);
        const base64Data = material.fileContent.split(',')[1];

        if (mimeType.startsWith('image/')) {
            return <img src={material.fileContent} alt={material.title} className="max-w-full max-h-[70vh] object-contain mx-auto" />;
        }

        if (mimeType === 'application/pdf') {
            return <iframe src={material.fileContent} className="w-full h-[75vh]" title={material.title} />;
        }
        
        if (mimeType === 'text/plain') {
            try {
                const textContent = atob(base64Data);
                return <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-200">{textContent}</pre>;
            } catch (e) {
                console.error("Error decoding base64 content:", e);
                return <p className="p-8 text-center text-red-500">Could not display preview for this text file.</p>;
            }
        }

        // Fallback for unsupported types like docx, pptx
        return (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <p className="font-semibold text-lg">Preview Not Available</p>
                <p className="mt-2">Live preview is not supported for <span className="font-mono bg-gray-100 dark:bg-gray-700 px-1 rounded">{material.fileName}</span>.</p>
                <p className="mt-1">Please download the file to view its contents.</p>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="preview-title">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col transition-colors duration-300 modal-content" onClick={e => e.stopPropagation()}>
                <header className="flex justify-between items-center p-4 border-b dark:border-gray-700 flex-shrink-0">
                    <h3 id="preview-title" className="text-lg font-bold text-gray-800 dark:text-white truncate">{material.title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-full" aria-label="Close preview">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </header>
                <main className="p-4 overflow-auto flex-1">
                    {renderPreviewContent()}
                </main>
            </div>
        </div>
    );
};


export const MaterialCard: React.FC<MaterialCardProps> = ({ material, user, onDownload, onEditNoteClick, onDeleteNoteClick }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleDownload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onDownload(material.id); // Track the download
    const { fileContent, fileName, title, description, type } = material;

    if (type === 'Notes' && !fileContent) {
        // Handle downloading text-only notes
        const noteContent = `Title: ${title}\n\n${description}`;
        const blob = new Blob([noteContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${title.replace(/ /g, '_')}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    } else if (fileContent && fileName) {
        // For files uploaded during the session via data URL
        const link = document.createElement('a');
        link.href = fileContent;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        // For pre-existing mock materials with files
        const dummyContent = `This is a dummy file for: ${title}\n\nActual content would be downloaded here.`;
        const blob = new Blob([dummyContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName || `${title.replace(/ /g, '_')}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
  };
  
  const isNote = material.type === 'Notes';
  const canModify = isNote && user && (user.role === 'admin' || user.email === material.uploaderEmail);

  return (
    <>
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out">
        <div>
          <div className="flex justify-between items-start">
              <div className="flex items-center mr-4 flex-1 min-w-0">
                <FileTypeIcon fileName={isNote ? 'note.txt' : material.fileName} className="w-7 h-7 mr-3 flex-shrink-0 text-gray-400 dark:text-gray-500" />
                <h5 className="text-lg font-bold text-gray-800 dark:text-white truncate">{material.title}</h5>
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                {user?.role === 'admin' && (
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${material.isApproved ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'}`}>
                    {material.isApproved ? 'Approved' : 'Pending'}
                  </span>
                )}
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{material.size}</span>
              </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{material.subject} • {material.type}</p>
          <p className="text-base text-gray-600 dark:text-gray-300 mt-3 line-clamp-2 h-12">{material.description}</p>
          
          {isNote && material.tags && material.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
                {material.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300 px-2 py-1 rounded-full">
                        #{tag}
                    </span>
                ))}
            </div>
          )}

          <div className="text-xs text-gray-400 dark:text-gray-500 mt-3">
              <span>{material.downloads} downloads</span> • <span>Uploaded: {material.uploaded}</span>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between gap-2">
            <div className="flex-1">
                <button onClick={handleDownload} aria-label={`Download ${material.title}`} className="w-full text-center bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2">
                    <DownloadIcon className="w-4 h-4" />
                    <span>Download</span>
                </button>
            </div>
            <div className="flex items-center gap-2">
              {canModify && onEditNoteClick ? (
                <button onClick={() => onEditNoteClick(material.id)} aria-label={`Edit note: ${material.title}`} className="text-center bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200 p-2 rounded-md text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors flex items-center justify-center">
                    <EditIcon className="w-5 h-5" />
                </button>
              ) : !isNote ? (
                <button onClick={() => setIsPreviewOpen(true)} aria-label={`Preview ${material.title}`} className="text-center bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200 p-2 rounded-md text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors flex items-center justify-center">
                    <EyeIcon className="w-5 h-5" />
                </button>
              ) : null}
              {canModify && onDeleteNoteClick && (
                 <button onClick={() => onDeleteNoteClick(material.id)} aria-label={`Delete note: ${material.title}`} className="text-center bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400 p-2 rounded-md text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900 transition-colors flex items-center justify-center">
                    <DeleteIcon className="w-5 h-5" />
                </button>
              )}
            </div>
        </div>
      </div>
      {isPreviewOpen && <PreviewModal material={material} onClose={() => setIsPreviewOpen(false)} />}
    </>
  );
};

const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;
const EyeIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
const EditIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
const DeleteIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;