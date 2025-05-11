# JobHive Download & Installation Guide

This guide will help you download the JobHive project and set it up on your local machine.

## Download Options

You have two main options for downloading the project:

### Option 1: Download the ZIP file (Recommended for beginners)

1. Click the "Download ZIP" button on the repository page
2. Extract the ZIP file to a location on your computer
3. Open the extracted folder

### Option 2: Clone the repository using Git

If you have Git installed, you can clone the repository:

```bash
git clone https://github.com/your-username/jobhive.git
cd jobhive
```

## Installation

After downloading the project, you have two options for installation:

### For Windows Users:

1. Double-click the `setup.bat` file
2. Follow the on-screen instructions
3. After setup completes, run `npm run dev` to start the application

### For Mac/Linux Users:

1. Open Terminal
2. Navigate to the project directory
3. Make the setup script executable (if needed):
   ```bash
   chmod +x setup.sh
   ```
4. Run the setup script:
   ```bash
   ./setup.sh
   ```
5. After setup completes, run `npm run dev` to start the application

## Manual Installation (Alternative)

If the setup scripts don't work for any reason, you can manually install:

1. Open a terminal or command prompt
2. Navigate to the project directory
3. Run:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Accessing the Application

After starting the development server, open your web browser and go to:
```
http://localhost:5000
```

## Testing the Application

You can use these test accounts:

- Student: `student@jobhive.com` / `password123`
- Employer: `employer@jobhive.com` / `password123`
- Admin: `admin@jobhive.com` / `password123`

## Troubleshooting

If you encounter any issues:

1. Make sure Node.js (v18+) is installed
2. Ensure npm is working correctly
3. Check that port 5000 is not in use by another application
4. See README.md for more detailed troubleshooting steps

## Need More Help?

Refer to the README.md file for more detailed information about the project.