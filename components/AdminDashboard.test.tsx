import React from 'react';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AdminDashboard } from './AdminDashboard';
import { Material, User, MaterialType, Branch, Year } from '../types';

// Mock data
const mockCurrentUser: User = {
  email: 'admin@sppu.com',
  role: 'admin',
  name: 'Admin User',
  avatar: '',
};

const mockUsers: User[] = [
  mockCurrentUser,
  { email: 'student1@sppu.com', role: 'user', name: 'Student One', avatar: '' },
  { email: 'student2@sppu.com', role: 'admin', name: 'Another Admin', avatar: '' },
];

const mockMaterials: Material[] = [
  {
    id: 1,
    title: 'Pending Document',
    subject: 'Test Subject',
    isApproved: false,
    uploaderEmail: 'student1@sppu.com',
    branch: Branch.Computer,
    year: Year.First,
    description: '',
    size: '1MB',
    downloads: 0,
    uploaded: '1/1/2024',
    type: MaterialType.Notes,
  },
  {
    id: 2,
    title: 'Approved Document',
    subject: 'Test Subject',
    isApproved: true,
    uploaderEmail: 'student1@sppu.com',
    branch: Branch.Computer,
    year: Year.First,
    description: '',
    size: '2MB',
    downloads: 10,
    uploaded: '1/1/2024',
    type: MaterialType.Notes,
  },
];

// Mock handlers
const mockOnApproval = jest.fn();
const mockOnDelete = jest.fn();
const mockOnAnnouncementChange = jest.fn();
const mockOnRegistrationsToggle = jest.fn();
const mockOnUserRoleChange = jest.fn();

const renderComponent = () => {
  render(
    <AdminDashboard
      materials={mockMaterials}
      users={mockUsers}
      currentUser={mockCurrentUser}
      onApproval={mockOnApproval}
      onDelete={mockOnDelete}
      announcement={{ message: 'Test Banner', active: true }}
      onAnnouncementChange={mockOnAnnouncementChange}
      registrationsEnabled={true}
      onRegistrationsToggle={mockOnRegistrationsToggle}
      onUserRoleChange={mockOnUserRoleChange}
    />
  );
};

describe('AdminDashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all sections and initial data correctly', () => {
    renderComponent();
    expect(screen.getByRole('heading', { name: /admin dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /admin settings/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /material management/i })).toBeInTheDocument();
    
    // Check if materials are rendered
    expect(screen.getByText('Pending Document')).toBeInTheDocument();
    expect(screen.getByText('Approved Document')).toBeInTheDocument();

    // Check if users are rendered in the role management table
    expect(screen.getByText('Student One')).toBeInTheDocument();
    expect(screen.getByText('Another Admin')).toBeInTheDocument();
  });

  it('handles material approval and revocation', () => {
    renderComponent();
    
    // Approve a pending item
    const approveButton = screen.getByRole('button', { name: 'Approve' });
    fireEvent.click(approveButton);
    expect(mockOnApproval).toHaveBeenCalledWith(1, true);

    // Revoke an approved item
    const revokeButton = screen.getByRole('button', { name: 'Revoke' });
    fireEvent.click(revokeButton);
    expect(mockOnApproval).toHaveBeenCalledWith(2, false);
  });

  it('handles material deletion', () => {
    renderComponent();
    const deleteButtons = screen.getAllByRole('button', { name: 'Delete' });
    fireEvent.click(deleteButtons[0]);
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });
  
  it('handles global settings changes', () => {
    renderComponent();

    // Test announcement text change
    const announcementInput = screen.getByPlaceholderText(/enter announcement text/i);
    fireEvent.change(announcementInput, { target: { value: 'New Announcement' } });
    expect(mockOnAnnouncementChange).toHaveBeenCalledWith({ message: 'New Announcement', active: true });

    // Test registration toggle
    const registrationToggle = screen.getAllByRole('button').find(btn => btn.textContent === 'Enabled' || btn.textContent === 'Disabled');
    if (registrationToggle) {
        fireEvent.click(registrationToggle);
        expect(mockOnRegistrationsToggle).toHaveBeenCalledWith(false);
    }
  });

  it('handles user role changes', () => {
    renderComponent();

    // Promote a user
    const promoteButton = screen.getByRole('button', { name: /promote to admin/i });
    fireEvent.click(promoteButton);
    expect(mockOnUserRoleChange).toHaveBeenCalledWith('student1@sppu.com', 'admin');

    // Demote an admin
    const demoteButton = screen.getByRole('button', { name: /demote to user/i });
    fireEvent.click(demoteButton);
    expect(mockOnUserRoleChange).toHaveBeenCalledWith('student2@sppu.com', 'user');
  });

  it('prevents an admin from changing their own role', () => {
    renderComponent();
    
    // The button for the current admin should be disabled.
    // We find the table row for the current admin and then find the button within it.
    const adminRow = screen.getByText(mockCurrentUser.email).closest('tr');
    const selfDemoteButton = adminRow?.querySelector('button');

    expect(selfDemoteButton).toBeDisabled();
  });
});
