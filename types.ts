

export enum Branch {
  Computer = 'Computer',
  IT = 'IT',
  Mechanical = 'Mechanical',
  Civil = 'Civil',
  Electrical = 'Electrical',
  ENTC = 'ENTC',
}

export enum Year {
  First = 'First Year',
  Second = 'Second Year',
  Third = 'Third Year',
  Fourth = 'Fourth Year',
}

export enum MaterialType {
  Notes = 'Notes',
  PYQ = 'PYQs',
  Assignment = 'Assignments',
  ModelPaper = 'Model Papers',
}

export interface Material {
  id: number;
  branch: Branch;
  year: Year;
  subject: string;
  title: string;
  description: string;
  size: string;
  downloads: number;
  uploaded: string;
  type: MaterialType;
  fileName?: string;
  fileContent?: string; // data URL
  isApproved: boolean;
  uploaderEmail?: string;
  tags?: string[];
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export interface User {
  email: string;
  password?: string; // Note: In a real app, this would NEVER be stored on the client.
  role: 'admin' | 'user';
  name: string;
  avatar: string;
  adminEmail?: string;
}

export type View = 'home' | 'dashboard' | 'materials' | 'notes' | 'questionBank' | 'forum' | 'downloads' | 'planner' | 'profile' | 'admin' | 'addEditNote' | 'settings' | 'howToUse' | 'privacyPolicy';

export type Theme = 'light' | 'dark';

export interface ToastNotification {
  message: string;
  type: 'success' | 'error';
}

export interface ForumPost {
    id: number;
    author: {
        name: string;
        avatar: string;
    };
    title: string;
    content: string;
    timestamp: string;
    replies: number;
    isAnonymous: boolean;
}

export interface StudyTask {
    id: number;
    title: string;
    subject: string;
    dueDate: string;
    isCompleted: boolean;
}

export interface Notification {
    id: number;
    message: string;
    timestamp: string;
    isRead: boolean;
}

export interface HomeGridCard {
    id: string;
    title: string;
    bgColor: string;
    view: View;
}