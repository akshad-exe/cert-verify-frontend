# Certificate Verification System - Frontend

## Project Overview

This is the frontend part of the Certificate Verification System, a web application built with React and Vite. It provides the user interface for verifying certificates and the administrative interface for managing certificate records.

## Features

- Public Certificate Verification Page
- Admin Login Page
- Admin Dashboard and Certificate Management (Add, Edit, Delete, Search)
- Responsive UI
- Light/Dark Mode Toggle

## Technology Stack

- React.js with Vite
- Tailwind CSS
- Shadcn UI
- Axios (for API calls)
- React Router DOM (for routing)

## Prerequisites

- Node.js (Latest LTS) and npm/pnpm/Bun
- Access to the running backend server.

## Setup Instructions

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install # or pnpm install or bun install
    ```

3.  **Environment Variables:**
    - Create a `.env` file in the `frontend` directory.
    - Add the backend API URL:
      ```env
      VITE_API_URL=http://localhost:8080/api # Replace with deployed backend URL in production
      ```

## How to Run

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Start the development server:**
    ```bash
    npm run dev # or pnpm dev or bun dev
    ```

    The frontend application should be accessible in your browser, usually at `http://localhost:5173`.

## Connection to Backend

The frontend communicates with the backend API using Axios. Ensure the `VITE_API_URL` environment variable is correctly set to the backend server's address.
