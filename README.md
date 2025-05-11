# JobHive - Job Portal for Students and Fresh Graduates

## Overview

JobHive is a comprehensive job portal designed for students and fresh graduates, providing an engaging and modern job search platform with advanced personalization features.

## Features

- Interactive job listings with filtering capabilities
- Resume builder with multiple templates (Modern, Minimal, Creative, Professional, Academic)
- Role-based access (Student, Employer, Admin)
- Responsive design for all devices
- PDF generation for resumes

## Setup Instructions

### Prerequisites

- Node.js (v18 or later)
- npm (v8 or later)

### Installation

#### Option 1: Using the Setup Scripts (Recommended)

1. Clone or download this repository to your local machine

2. Navigate to the project directory:
   ```
   cd jobhive
   ```

3. Run the appropriate setup script:
   
   **For Windows:**
   ```
   setup.bat
   ```
   
   **For Mac/Linux:**
   ```
   ./setup.sh
   ```
   
   **Alternative (all platforms):**
   ```
   node setup.js
   ```
   
   These scripts will check your environment, install dependencies, and guide you through the setup process.

4. Start the development server:
   
   **Option A: Using start scripts**
   
   For Windows:
   ```
   start.bat
   ```
   
   For Mac/Linux:
   ```
   ./start.sh
   ```
   
   **Option B: Using npm**
   ```
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:5000
   ```

#### Option 2: Manual Installation

1. Clone or download this repository to your local machine

2. Navigate to the project directory:
   ```
   cd jobhive
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   
   **Option A: Using start scripts**
   
   For Windows:
   ```
   start.bat
   ```
   
   For Mac/Linux:
   ```
   ./start.sh
   ```
   
   **Option B: Using npm**
   ```
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:5000
   ```

#### For More Detailed Instructions

See [DOWNLOAD_GUIDE.md](DOWNLOAD_GUIDE.md) for more detailed download and installation instructions.

## Testing Credentials

You can use the following credentials to test different roles:

- Student: `student@jobhive.com` / `password123`
- Employer: `employer@jobhive.com` / `password123`
- Admin: `admin@jobhive.com` / `password123`

## Project Structure

- `client/` - Frontend React application
  - `src/components/` - Reusable UI components
  - `src/pages/` - Main application pages
  - `src/hooks/` - Custom React hooks
  - `src/contexts/` - React context providers
  - `src/utils/` - Utility functions
  - `src/data/` - Sample data for development
  
- `server/` - Backend Express API
  - `routes.ts` - API routes
  - `storage.ts` - Data storage interface
  
- `shared/` - Shared code between frontend and backend
  - `schema.ts` - Database schema definitions

## Resume Builder

The resume builder allows students to create professional resumes. Features include:

- 5 professionally designed templates
- Step-by-step creation process
- PDF download functionality
- Local storage to save progress

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Troubleshooting

### Common Issues and Solutions

1. **Node.js Version Issues**
   - Error: "JobHive requires Node.js v18.0.0 or higher"
   - Solution: Update your Node.js installation from [nodejs.org](https://nodejs.org/)

2. **Port Already in Use**
   - Error: "Error: listen EADDRINUSE: address already in use :::5000"
   - Solution: Either close the application using port 5000 or modify the port in `server/index.ts`

3. **Missing Dependencies**
   - Error: "Cannot find module '...' "
   - Solution: Run `npm install` again to ensure all dependencies are properly installed

4. **Database Connection Issues**
   - Error: "Could not connect to database"
   - Solution: By default, the application uses in-memory storage and doesn't require a database connection. If you've configured a database connection that's failing, check your connection settings.

### Still Having Issues?

If you encounter any problems not listed here, please refer to the project's GitHub issues page or submit a new issue.

## License

This project is licensed under the MIT License.