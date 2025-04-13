# PackRat - Inventory Management System

## About PackRat

PackRat is a Single Page Application (SPA) designed to help users manage and track their inventory across multiple hobbies. I was inspired by video game inventory user interfaces (Zelda BOTW in particular), PackRat provides a visually appealing way to categorize and organize collections of items.

This application was created for MDIA-4294 Web Scripting 3 Term Project, with the goal of aiding those who need help tracking inventory across multiple hobbies or collections.

## Features

- **User Authentication**: Secure login and registration system
- **Category Management**: Create and organize items into custom categories
- **Visual Item Display**: Interactive "orb" display inspired by game inventories and the movie Inside Out
- **Item Details**: View and edit item information
- **Responsive Design**: Works across desktop and mobile devices
- **Modern UI**: Beautiful interactive backgrounds and animations

## How It Works

PackRat uses a modern React frontend with a Node.js/Express backend and MySQL database. The application follows a Single Page Application architecture where users can:

1. Create an account or log in to an existing one
2. Create custom categories for different collections or hobbies
3. Add items to these categories with names, descriptions, and images
4. View items in an interactive orb-based grid
5. Click on items to see detailed information
6. Update or delete items as needed

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- MySQL (v8+)
- npm or yarn

### Database Setup

1. Create a MySQL database named `packrat`
2. Import the database schema from `packrat_db.sql` in the project root:
   ```bash
   mysql -u root -p packrat < packrat_db.sql

### Backend Setup
1. Navigate to the api directory:
```bash
    cd api
```
2. Install dependencies:
```bash
    npm install
```
3.  Configure your database connection in db.js if needed:
``` bash
    const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'packrat',
  port: 8889 // Adjust as needed for your MySQL configuration
});
```

4.  Start the backend server:
``` bash
    npm start
```
The server will run on http://localhost:3000

### Frontend Setup
1. Navigate to the web directory:
``` bash
    cd web
```

2. Install dependencies:
```bash
    npm install
```

3. Start the development server:
```bash
    npm run dev
```

The application will be available at http://localhost:5173

## Technologies Used

- **Frontend**: React, React Router, Tailwind CSS, Three.js
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JSON Web Tokens (JWT)
- **Other**: Multer for file uploads, bcrypt for password hashing

## Project Structure

- `/api` - Backend Express server and API endpoints
  - `/routers` - API route handlers
  - `/public` - Static files including uploaded images
  
- `/web` - React frontend
  - `/src/components` - Reusable React components
  - `/src/pages` - Page components
  - `/public` - Static assets

## Credits
Developed by Samuel Park for MDIA-4294 Web Scripting 3 taught by Airrick Dunfield Term Project.
GitHub Copilot for bug fixing, teaching concepts, and implementation guidance.
The Ballpit background component found on [ReactBits](https://www.reactbits.dev/) is inspired by [Kevin Levron](https://x.com/soju22/status/1858925191671271801).
