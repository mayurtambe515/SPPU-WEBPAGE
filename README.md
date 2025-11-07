# EDUSPPU 2024 - Complete Study Platform

## 1. Objective

EDUSPPU 2024 is a modern, all-in-one web application designed to be the ultimate study companion for engineering students at Savitribai Phule Pune University (SPPU) following the 2024 curriculum pattern. The platform provides centralized access to study materials, a personal note-taking system, and an intelligent AI assistant to streamline the learning process.

This project demonstrates a feature-rich, responsive, and accessible frontend application built with React and TypeScript, simulating a full-stack experience with client-side state management.

## 2. Key Features

- **Centralized Resource Hub**: Access previous year question papers (PYQs), notes, and assignments for all engineering branches (1st to 4th year).
- **User Authentication**: Secure registration and login system for a personalized experience. User sessions are persisted using a simulated JWT in `localStorage`.
- **Personal Notes Management**: Logged-in users can perform full CRUD (Create, Read, Update, Delete) operations on their private notes.
- **Advanced Filtering & Search**:
    - Notes can be organized with comma-separated tags.
    - A debounced search bar and clickable tag chips allow for efficient filtering of notes by title, content, or tag.
    - The notes list is paginated to handle a large number of entries gracefully.
- **User Contributions**: Authenticated users can upload their own study materials, which are then queued for admin approval.
- **Admin Dashboard**: A protected view for administrators to review, approve, or reject user-submitted materials.
- **AI Study Assistant**: An integrated chatbot powered by the Google Gemini API to answer curriculum-specific questions and provide study help.
- **Responsive & Accessible UI**: A mobile-first design that works seamlessly across all devices. The UI includes a dark/light mode toggle and follows accessibility best practices (ARIA attributes, semantic HTML).

## 3. Tech Stack & Architecture

This is a client-side rendered (CSR) application built on a modern frontend stack.

- **Framework**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom global styles for forms, animations, and responsiveness.
- **AI Integration**: Google Gemini API (`@google/genai`) for the AI Assistant.
- **Testing**: Unit tests for components written with Jest and React Testing Library.

### Architecture

The application is currently **frontend-only**. It simulates a full-stack environment by managing all data (materials, users, notes) in React's component state. There is no backend server or database connected. All "API calls" and data manipulations, including user authentication and CRUD operations, are handled client-side. This architecture is perfect for demonstration and rapid prototyping of the user interface.

## 4. Project Setup & Installation

The application is designed to run in a specific web-based development environment and requires no local installation.

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari).
- A Google Gemini API key.

### Configuration
1.  **API Key**: The AI Assistant requires a Google Gemini API key. This key must be configured as an environment variable named `API_KEY`. The application code reads this key via `process.env.API_KEY`.

## 5. Running the Application

This project is intended to be run within its designated online IDE. There are no local installation or run commands like `npm install` or `npm start`. Simply open the project in the environment, ensure the `API_KEY` is set, and the application will load automatically.

## 6. Deployment

### Frontend (Deploy to Vercel, Netlify, etc.)
The frontend can be easily deployed to any static hosting provider.

1.  **Connect Git Repository**: Link your GitHub/GitLab repository to Vercel.
2.  **Configure Build Settings**:
    - **Build Command**: `vite build` or `npm run build`
    - **Output Directory**: `dist`
    - **Install Command**: `npm install`
3.  **Add Environment Variable**:
    - In the Vercel project settings, add an environment variable:
    - **Name**: `VITE_API_KEY` (for Vite) or `REACT_APP_API_KEY` (for Create React App).
    - **Value**: Your Google Gemini API key.
4.  **Deploy**: Trigger a deployment. Vercel will automatically build and deploy the application.

### Backend
The current version is frontend-only and does not have a backend to deploy. If a Node.js/Express backend were to be implemented, it could be deployed to services like **Render** or **Heroku** using a `Dockerfile` or a `Procfile`.

## 7. Simulated API Usage (with cURL)

The following `curl` commands are examples of what the API endpoints would look like if a real backend were implemented. **These endpoints are not live.**

### Fetch Notes (GET)
```bash
# Get all notes for the authenticated user
curl -X GET http://localhost:3001/api/notes \
  -H "Authorization: Bearer <your_jwt_token>"

# Search notes by title/content and filter by tag
curl -X GET "http://localhost:3001/api/notes?search=thermodynamics&tag=unit-1" \
  -H "Authorization: Bearer <your_jwt_token>"
```

### Add a Note (POST)
```bash
curl -X POST http://localhost:3001/api/notes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_jwt_token>" \
  -d '{
    "title": "Important Formulas for M1",
    "content": "List of integration and differentiation formulas...",
    "tags": ["maths", "formulas", "exam-prep"]
  }'
```

### Update a Note (PUT)
```bash
curl -X PUT http://localhost:3001/api/notes/123 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_jwt_token>" \
  -d '{
    "title": "Updated M1 Formulas",
    "content": "Adding Laplace transforms to the list...",
    "tags": ["maths", "formulas", "laplace"]
  }'
```

### Delete a Note (DELETE)
```bash
curl -X DELETE http://localhost:3001/api/notes/123 \
  -H "Authorization: Bearer <your_jwt_token>"
```

### User Login (POST)
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@sppu.com",
    "password": "password123"
  }'
# Expected response would contain a JWT token
```