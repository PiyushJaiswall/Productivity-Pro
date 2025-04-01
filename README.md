# Productivity Pro 🚀

A full-stack productivity application with task management, Pomodoro timer, and analytics.

![App Screenshot](/client/public/screenshot.png) <!-- Add your screenshot here -->

## Features ✨

- **Task Management**:
  - Create, edit, and delete tasks
  - Set priorities (High/Medium/Low)
  - Categorize tasks (Work/Personal/Study)
  - Set due dates and descriptions
  - Mark tasks as complete

- **Productivity Timer**:
  - Pomodoro-style timer that persists across tabs
  - Visual countdown display
  - Automatic session logging
  - Background time tracking (works when tab is inactive)

- **Analytics Dashboard**:
  - Task completion statistics
  - Time spent per category
  - Productivity trends

## Tech Stack 💻

**Frontend**:
- React with Hooks
- React Router for navigation
- Context API for state management
- Radix UI for accessible components
- Axios for API calls
- CSS Modules for styling

**Backend**:
- Express.js
- MongoDB (with Mongoose)
- RESTful API design
- JWT Authentication (optional)

## File Structure 📁
```bash
productivity-app/
├── client/ # React frontend
│ ├── public/ # Static assets
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── contexts/ # React context providers
│ │ ├── pages/ # Route-level components
│ │ ├── services/ # API service layer
│ │ ├── App.css # Main styles
│ │ ├── App.js # Root component
│ │ └── index.js # Entry point
│ └── package.json
├── server/ # Express backend
│ ├── db/ # Database connection
│ ├── models/ # Mongoose models
│ ├── routes/ # API routes
│ ├── app.js # Express setup
│ └── package.json
└── README.md

  ```
## Installation ⚙️

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/productivity-app.git
   cd productivity-app
   ```
2. **Set up backend**:
     ```bash 
    npm install
    cp .env.example .env  # Update with your MongoDB URI
    npm start
    ```
3. **Set up frontend**:
     ```bash
     cd ../client
    npm install
    npm start
    ```
4. **Access the app at http://localhost:3000**

## Configuration ⚙️

**Create .env files in both client and server directories:**

**server/.env:**
  ```bash
  MONGODB_URI=your_mongodb_connection_string
  PORT=5000
  JWT_SECRET=your_jwt_secret_here
  ```
**client/.env:**
  ```bash
  REACT_APP_API_BASE_URL=http://localhost:5000
 ```

## Available Scripts 📜

**Frontend (client):**
  ```bash
-npm start: Runs the app in development mode

-npm build: Builds for production

-npm test: Runs tests

-npm eject: Ejects from Create React App
 ```
**Backend (server):**

  ```bash
-npm start: Starts the server

-npm dev: Starts with nodemon for development

-npm test: Runs tests
```

## Context Structure 🧠
The app uses these React Contexts:

**1. TaskContext:**

   - Manages all task-related state

   - Handles timer functionality

   - Provides CRUD operations for tasks

**2. ThemeContext:**

   - Manages light/dark mode

   - Persists theme preference


## Future Improvements 🔮

- User authentication

- Task reminders

- Mobile app version

- Team collaboration features

- Calendar integration

## Contributing 🤝

Contributions are welcome! Please follow these steps:

1. Fork the repository

2. Create your feature branch (git checkout -b feature/AmazingFeature)

3. Commit your changes (git commit -m 'Add some AmazingFeature')

4. Push to the branch (git push origin feature/AmazingFeature)

5. Open a Pull Request
