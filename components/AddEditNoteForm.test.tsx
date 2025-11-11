import React from 'react';
// FIX: Add imports for Jest globals to resolve TypeScript errors.
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AddEditNoteForm } from './AddEditNoteForm';
import { Material, MaterialType, Branch, Year } from '../types';

// Mock functions for props
const mockOnSubmit = jest.fn();
const mockOnCancel = jest.fn();

describe('AddEditNoteForm', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockOnSubmit.mockClear();
    mockOnCancel.mockClear();
  });

  it('renders correctly for adding a new note', () => {
    render(<AddEditNoteForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    expect(screen.getByRole('heading', { name: /add new note/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toHaveValue('');
    expect(screen.getByLabelText(/content/i)).toHaveValue('');
    expect(screen.getByLabelText(/tags/i)).toHaveValue('');
    expect(screen.getByRole('button', { name: /create note/i })).toBeInTheDocument();
  });

  it('renders correctly for editing an existing note', () => {
    const mockNote: Material = {
      id: 1,
      title: 'My Test Note',
      description: 'This is the content of the note.',
      tags: ['testing', 'react'],
      type: MaterialType.Notes,
      branch: Branch.Computer,
      year: Year.First,
      subject: 'Testing',
      size: 'N/A',
      downloads: 0,
      uploaded: '1/1/2024',
      isApproved: true,
    };

    render(<AddEditNoteForm note={mockNote} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    expect(screen.getByRole('heading', { name: /edit note/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toHaveValue('My Test Note');
    expect(screen.getByLabelText(/content/i)).toHaveValue('This is the content of the note.');
    expect(screen.getByLabelText(/tags/i)).toHaveValue('testing, react');
    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
  });

  it('shows validation errors on empty submission and does not submit', () => {
    render(<AddEditNoteForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    
    const submitButton = screen.getByRole('button', { name: /create note/i });
    fireEvent.click(submitButton);
    
    expect(screen.getByText('Title is required.')).toBeInTheDocument();
    expect(screen.getByText('Content is required.')).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('calls onCancel when cancel button is clicked', () => {
    render(<AddEditNoteForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);
    
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onSubmit with correct data when form is valid', () => {
    render(<AddEditNoteForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Note Title' } });
    fireEvent.change(screen.getByLabelText(/content/i), { target: { value: 'New note content.' } });
    fireEvent.change(screen.getByLabelText(/tags/i), { target: { value: 'new, tags' } });
    
    const submitButton = screen.getByRole('button', { name: /create note/i });
    fireEvent.click(submitButton);
    
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: 'New Note Title',
      description: 'New note content.',
      tags: 'new, tags',
    });
  });
});
