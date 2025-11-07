import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Header } from './Header';
import { MaterialsList } from './MaterialsList';
import { AIAssistant } from './AIAssistant';
import { Branch, Year, MaterialType, Material, User, View, ToastNotification } from '../types';
import { materials as initialMaterials } from '../constants';
import { AuthModal } from './AuthModal';
import { UploadModal } from './UploadModal';
import { Dashboard } from './Dashboard';
import { Forum } from './Forum';
import { AdminDashboard } from './AdminDashboard';
import { DownloadsPage } from './DownloadsPage';
import { Toast } from './Toast';
import { AdminLoginModal } from './AdminLoginModal';
import { AddEditNoteForm } from './AddEditNoteForm';
import { BottomNavBar } from './BottomNavBar';
import { HomeContent } from './HomeContent';
import { ProfilePage } from './ProfilePage';
import { UnauthorizedAccess } from './UnauthorizedAccess';
import { SettingsPage } from './SettingsPage';
import { HowToUsePage } from './HowToUsePage';
import { PrivacyPolicyPage } from './PrivacyPolicyPage';

// In a real app, this would be an empty array, and users would be fetched from a DB.
const initialUsers: User[] = [
    { email: 'student@sppu.com', password: 'password123', role: 'user', name: 'Mayur Tambe', avatar: `https://api.dicebear.com/8.x/initials/svg?seed=Mayur Tambe` },
    { email: 'admin@sppu.com', password: 'Admin@Pass123', role: 'admin', name: 'Admin User', avatar: `https://api.dicebear.com/8.x/initials/svg?seed=Admin`, adminEmail: 'admin@sppu.com' }
];

const NOTES_PER_PAGE = 6;

function App() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>('home');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme;
    }
    return 'light';
  });

  // Global Settings (Managed by Admin)
  const [announcement, setAnnouncement] = useState<{ message: string; active: boolean }>({ message: '', active: false });
  const [registrationsEnabled, setRegistrationsEnabled] = useState<boolean>(true);


  // Global search from Hero
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for Notes page specifically
  const [notesSearchTerm, setNotesSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [toast, setToast] = useState<ToastNotification | null>(null);
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);


  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Check for JWT on initial load to maintain session
  useEffect(() => {
    try {
        const token = localStorage.getItem('jwt_token');
        if (token) {
            // In a real app, you'd verify the token with a backend.
            // Here, we simulate decoding it.
            const decodedToken = JSON.parse(atob(token));
            if (decodedToken && decodedToken.email && decodedToken.exp > Date.now()) {
                const loggedInUser = users.find(u => u.email === decodedToken.email);
                if (loggedInUser) {
                    setCurrentUser(loggedInUser);
                }
            } else {
                 localStorage.removeItem('jwt_token');
            }
        }
    } catch(e) {
        console.error("Failed to parse token", e);
        localStorage.removeItem('jwt_token');
    }
  }, [users]);

  useEffect(() => {
    const fetchMaterials = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        setMaterials(initialMaterials);
      } catch (err) {
        const errorMessage = 'Failed to load resources from the server. Please check your connection and try again.';
        setError(errorMessage);
        console.error("API Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMaterials();
  }, []);
  
  const showToast = (message: string, type: 'success' | 'error') => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 5000); 
  };

  const handleUploadClick = () => {
    if (!currentUser) {
      showToast("You must be logged in to upload files.", "error");
      setIsAuthModalOpen(true);
      return;
    }
    setIsUploadModalOpen(true);
  };

  const handleUploadSubmit = (newMaterialData: Omit<Material, 'id' | 'downloads' | 'uploaded' | 'size' | 'fileContent' | 'fileName' | 'isApproved' | 'uploaderEmail' | 'tags'>, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const newMaterial: Material = {
        ...newMaterialData,
        id: materials.length + 1,
        downloads: 0,
        uploaded: new Date().toLocaleDateString(),
        size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
        fileName: file.name,
        fileContent: e.target?.result as string,
        isApproved: false,
        uploaderEmail: currentUser?.email,
      };
      setMaterials(prev => [newMaterial, ...prev]);
      setIsUploadModalOpen(false);
      showToast("File uploaded successfully! It is now pending admin approval.", "success");
    };
    reader.readAsDataURL(file);
  };

  const handleNoteSubmit = async (data: { title: string; description: string; tags: string }) => {
    const tagsArray = data.tags.split(',').map(tag => tag.trim()).filter(Boolean);
    if (editingNoteId !== null) {
      setMaterials(materials.map(m => 
        m.id === editingNoteId 
        ? { ...m, title: data.title, description: data.description, tags: tagsArray, uploaded: new Date().toLocaleDateString() } 
        : m
      ));
      showToast("Note updated successfully!", "success");
    } else {
      const newNote: Material = {
        id: Date.now(),
        branch: Branch.Computer, // Default for now
        year: Year.First, // Default for now
        subject: 'General Notes',
        title: data.title,
        description: data.description,
        size: 'N/A',
        downloads: 0,
        uploaded: new Date().toLocaleDateString(),
        type: MaterialType.Notes,
        isApproved: true,
        uploaderEmail: currentUser?.email,
        tags: tagsArray,
      };
      setMaterials(prev => [newNote, ...prev]);
      showToast("Note created successfully!", "success");
    }

    setEditingNoteId(null);
    setCurrentView('notes');
  };
  
  const handleUserLogin = (email: string, password: string): boolean => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    // In a real app, you'd compare a bcrypt hash. Here we compare plain text.
    if (user && user.password === password) {
      // Simulate creating and storing a JWT
      const tokenPayload = { email: user.email, exp: Date.now() + 86400000 }; // Expires in 24 hours
      const token = btoa(JSON.stringify(tokenPayload));
      localStorage.setItem('jwt_token', token);
      
      setCurrentUser(user);
      setIsAuthModalOpen(false);
      setCurrentView('home');
      showToast(`Welcome, ${user.name}!`, 'success');
      return true;
    } else {
      showToast('Invalid email or password.', 'error');
      return false;
    }
  };
  
  const handleUserRegister = (email: string, password: string): boolean => {
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        showToast('An account with this email already exists.', 'error');
        return false;
    }
    
    const newUser: User = {
        email: email,
        // In a real app, the backend would hash this password with bcrypt
        password: password,
        role: 'user',
        name: 'New Student', // Could be collected from a form field
        avatar: `https://api.dicebear.com/8.x/initials/svg?seed=${email}`
    };
    
    setUsers(prev => [...prev, newUser]);
    showToast('Registration successful! Logging you in...', 'success');
    
    // Automatically log the user in after registration
    return handleUserLogin(email, password);
  };
  
  const handleAdminLogin = (email: string, password: string) => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.role === 'admin');
    if (!user || user.password !== password) {
        showToast('Invalid admin credentials.', 'error');
        return;
    }
    setCurrentUser(user);
    setIsAdminLoginModalOpen(false);
    setCurrentView('admin');
    showToast(`Welcome, Admin!`, 'success');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('jwt_token');
    setCurrentView('home');
    showToast("You have been logged out.", "success");
  };

  const handleMaterialApproval = (materialId: number, isApproved: boolean) => {
      setMaterials(materials.map(m => m.id === materialId ? {...m, isApproved} : m));
      showToast(`Material status updated.`, "success");
  };
  
  const handleMaterialDelete = (materialId: number) => {
    if (window.confirm("Are you sure you want to permanently delete this material? This includes notes.")) {
        setMaterials(materials.filter(m => m.id !== materialId));
        showToast("Material deleted successfully.", "success");
    }
  };

  const handleDownloadCount = (materialId: number) => {
    setMaterials(materials.map(m => m.id === materialId ? { ...m, downloads: m.downloads + 1 } : m));
  };
  
  const handleEditNote = (noteId: number) => {
    setEditingNoteId(noteId);
    setCurrentView('addEditNote');
  };
  
  const handleAddNote = () => {
    if (!currentUser) {
      showToast("You must be logged in to add notes.", "error");
      setIsAuthModalOpen(true);
      return;
    }
    setEditingNoteId(null);
    setCurrentView('addEditNote');
  };
  
  const handleUserRoleChange = (email: string, newRole: 'admin' | 'user') => {
    setUsers(users.map(u => u.email === email ? { ...u, role: newRole } : u));
    // If an admin demotes themselves, update their current session
    if (currentUser?.email === email && currentUser.role !== newRole) {
        setCurrentUser(prev => prev ? { ...prev, role: newRole } : null);
        if (newRole === 'user') {
            setCurrentView('profile'); // Move them out of admin view
        }
    }
    showToast(`User role updated successfully.`, 'success');
  };

  const allNoteTags = useMemo(() => {
    const tagsSet = new Set<string>();
    materials
      .filter(m => m.type === MaterialType.Notes && m.tags)
      .forEach(m => m.tags!.forEach(tag => tagsSet.add(tag)));
    return ['All Tags', ...Array.from(tagsSet)];
  }, [materials]);
  
  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [notesSearchTerm, selectedTag]);

  const { paginatedMaterials, totalPages } = useMemo(() => {
      const baseFiltered = materials.filter(material => {
          if (currentUser?.role !== 'admin' && !material.isApproved) return false;
          let viewMatch = false;
          if (currentView === 'materials') viewMatch = true; // Show all types
          else if (currentView === 'notes') viewMatch = material.type === MaterialType.Notes;
          else if (['home', 'downloads', 'addEditNote', 'profile', 'admin', 'settings', 'howToUse', 'privacyPolicy'].includes(currentView)) viewMatch = true;
          return viewMatch;
      });

      if (currentView === 'notes') {
          let notes = baseFiltered.filter(m => m.type === MaterialType.Notes);
          // Apply tag filter
          if (selectedTag && selectedTag !== 'All Tags') {
              notes = notes.filter(note => note.tags?.includes(selectedTag));
          }
          // Apply search filter
          if (notesSearchTerm) {
              notes = notes.filter(note => 
                  note.title.toLowerCase().includes(notesSearchTerm.toLowerCase()) ||
                  note.description.toLowerCase().includes(notesSearchTerm.toLowerCase())
              );
          }
          const totalPages = Math.ceil(notes.length / NOTES_PER_PAGE);
          const startIndex = (currentPage - 1) * NOTES_PER_PAGE;
          const paginated = notes.slice(startIndex, startIndex + NOTES_PER_PAGE);
          return { paginatedMaterials: paginated, totalPages };
      }

      // General search for other views
      const finalFiltered = baseFiltered.filter(material => {
          return searchTerm === '' ||
              material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
              material.subject.toLowerCase().includes(searchTerm.toLowerCase());
      });

      return { paginatedMaterials: finalFiltered, totalPages: 1 };

  }, [materials, searchTerm, currentView, currentUser, notesSearchTerm, selectedTag, currentPage]);


  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          <p className="ml-4 text-lg font-semibold text-gray-600 dark:text-gray-300">Loading Resources...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-800">
          <h3 className="font-bold text-xl">Oops! Something went wrong.</h3>
          <p className="mt-2">{error}</p>
        </div>
      );
    }
    
    switch (currentView) {
        case 'profile':
            return <ProfilePage 
                        user={currentUser} 
                        materials={materials}
                        users={users}
                        onLogout={handleLogout} 
                        onAdminLoginClick={() => setIsAdminLoginModalOpen(true)}
                        onLoginClick={() => setIsAuthModalOpen(true)}
                        setView={setCurrentView}
                        // Global settings for admin quick controls
                        announcement={announcement}
                        onAnnouncementChange={setAnnouncement}
                        registrationsEnabled={registrationsEnabled}
                        onRegistrationsToggle={setRegistrationsEnabled}
                    />;
        case 'settings':
            return <SettingsPage theme={theme} setTheme={setTheme} />;
        case 'howToUse':
            return <HowToUsePage />;
        case 'privacyPolicy':
            return <PrivacyPolicyPage />;
        case 'addEditNote':
            return <AddEditNoteForm
                note={materials.find(m => m.id === editingNoteId)}
                onSubmit={handleNoteSubmit}
                onCancel={() => {
                    setEditingNoteId(null);
                    setCurrentView('notes');
                }}
            />;
        case 'materials':
             return (
                 <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 transition-colors duration-300">
                    <MaterialsList
                        materials={paginatedMaterials.filter(m => m.type !== MaterialType.Notes)}
                        title={"Study Material"}
                        user={currentUser}
                        onUploadClick={handleUploadClick}
                        onDownload={handleDownloadCount}
                    />
                 </div>
            );
        case 'notes':
             return (
                 <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 transition-colors duration-300">
                    <MaterialsList
                        materials={paginatedMaterials}
                        title="Notes" 
                        user={currentUser}
                        onUploadClick={handleUploadClick}
                        onDownload={handleDownloadCount}
                        onAddNoteClick={handleAddNote}
                        onEditNoteClick={handleEditNote}
                        onDeleteNoteClick={handleMaterialDelete}
                        // Search, filter and pagination props for notes
                        notesSearchTerm={notesSearchTerm}
                        onNotesSearchChange={setNotesSearchTerm}
                        allNoteTags={allNoteTags}
                        selectedTag={selectedTag}
                        onTagSelect={setSelectedTag}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                 </div>
            );
        case 'admin':
            if (currentUser?.role !== 'admin') {
                return <UnauthorizedAccess onGoHome={() => setCurrentView('home')} />;
            }
            return <AdminDashboard 
                        materials={materials} 
                        onApproval={handleMaterialApproval} 
                        onDelete={handleMaterialDelete}
                        // Global Settings Props
                        announcement={announcement}
                        onAnnouncementChange={setAnnouncement}
                        registrationsEnabled={registrationsEnabled}
                        onRegistrationsToggle={setRegistrationsEnabled}
                        // User Management Props
                        users={users}
                        currentUser={currentUser}
                        onUserRoleChange={handleUserRoleChange}
                    />;
        case 'home':
        default:
            return <HomeContent setView={setCurrentView} />;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-200">
      <Toast notification={toast} onClose={() => setToast(null)} />
      <div className="flex flex-col h-screen">
       <Header 
          user={currentUser} 
          onLoginClick={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
          theme={theme}
          setTheme={setTheme}
        />
        <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
             {announcement.active && announcement.message && (
                <div className="bg-yellow-100 dark:bg-yellow-900/50 border-b-2 border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200 p-3 text-center text-sm font-semibold">
                    {announcement.message}
                </div>
            )}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {renderContent()}
            </div>
        </main>
        <BottomNavBar currentView={currentView} setView={setCurrentView} />
      </div>
      
      <AIAssistant isOpen={isAiAssistantOpen} setIsOpen={setIsAiAssistantOpen} />
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleUserLogin}
        onRegister={handleUserRegister}
        registrationsEnabled={registrationsEnabled}
      />
      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onLogin={handleAdminLogin}
      />
      {currentUser && (
          <UploadModal
            isOpen={isUploadModalOpen}
            onClose={() => setIsUploadModalOpen(false)}
            onUpload={handleUploadSubmit}
            showToast={showToast}
          />
      )}
    </div>
  );
}

export default App;