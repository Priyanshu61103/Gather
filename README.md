# Gather - Full-Stack Social Media Platform

Gather is a responsive, feature-rich full-stack social media web application built using the MERN stack. Designed with a clean separation of concerns, the platform features a custom-built token authentication system, structured Model-View-Controller (MVC) backend architecture, dynamic user interactions, and robust state management.

## 🚀 Live Demo
* **Live Link:** https://gather-frontend-j3wm.onrender.com
## 🛠️ Tech Stack

- **Frontend:** React.js, Redux Toolkit, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (via Mongoose ODM)
- **Authentication:** Custom JWT (JSON Web Tokens) & Bcrypt password hashing
- **Deployment:** Render

## ✨ Core Features

- **Custom Authentication System:** Built entirely from scratch using secure password hashing via `bcrypt` and session management via JSON Web Tokens (`JWT`).
- **Dynamic Content Streams:** A fully interactive frontend featuring live news feeds and personalized user profiles.
- **Centralized State Management:** Utilizes Redux Toolkit to seamlessly manage global application state, handling complex user interactions and real-time feed updates with minimized component re-renders.
- **Robust MVC Backend Architecture:** Clean separation of routes, controllers, and models to ensure scalable and maintainable server-side logic.
- **Secure Cross-Origin Sharing:** Configured custom environment-driven CORS rules to ensure secure communication between the frontend and database.

## 📂 Project Structure

```text
Gather/
├── backend/
│   ├── config/          # Database connection management
│   ├── controllers/     # Core route handling logic
│   ├── models/          # Mongoose database schemas
│   ├── routes/          # Express API route endpoints
│   ├── middleware/      # Auth and error handling utilities
│   ├── utils/           # Nodemailer like services 
│   └── server.js        # Entry point for backend
└── frontend/
    ├── src/
    │   ├── Components/  # Modular Reusable UI parts
    │   ├── Redux/    # Redux slices and state management
    │   ├── pages/       # Layouts (Feed, Login, Profile)
    │   └── App.js       # Main routing definitions
