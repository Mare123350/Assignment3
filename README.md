# TaskFlow Manager

TaskFlow Manager is a simple full-stack web application built with **Node.js**, **Express**, **EJS**, **Bootstrap**, and **MongoDB Atlas**.  
It allows users to create, view, update, and delete tasks with priorities, categories, due dates, and completion status.

This project was created for **INFR3120 – Assignment 3 (CRUD + Authentication Operation)**.

---

## Live Demo

- 🌐 Deployed App: **https://assignment3-e4zs.onrender.com**
- 💾 GitHub Repository: **https://github.com/Mare123350/Assignment3.git**

> The app is connected to a MongoDB Atlas cluster and uses environment variables to keep credentials secure.

---

## Features

- Home splash page with modern UI built using Bootstrap + custom CSS
- Shared navigation header and footer using EJS partials
- Task CRUD operations:
  - Create new tasks
  - View all tasks in a table
  - Edit existing tasks
  - Delete tasks (with confirmation prompt)
- Task attributes:
  - Title, description
  - Priority (Low, Medium, High)
  - Category (Work, Personal, School, Other)
  - Due date
  - Completed flag
  - Overdue indicator (based on due date)
- MongoDB Atlas database using Mongoose models
- Authentication (extra feature):
  - User registration and login with hashed passwords
  - Protected routes for creating, editing, and deleting tasks
  - Session-based authentication with Passport.js and express-session
- Secure configuration using `.env` and `.gitignore`

---

## Technologies Used

- **Node.js** & **Express.js**
- **EJS** templating engine
- **Bootstrap 5** + custom styles (`public/css/style.css`)
- **MongoDB Atlas** with **Mongoose**
- **Passport.js** with Local strategy
- **express-session**, **connect-flash**, **bcryptjs**
- Deployed to **Render** 

---

## Project Structure

```text
taskflow-manager/
├── app.js                  # Main Express app configuration
├── server.js               # Starts the HTTP server
├── package.json
├── .env                    # Environment variables (NOT committed)
├── config/
│   ├── db.js               # MongoDB connection string (from .env)
│   └── passport.js         # Passport local strategy configuration
├── models/
│   ├── Task.js             # Task schema & model
│   └── User.js             # User schema & model for authentication
├── routes/
│   ├── index.js            # Home page
│   ├── tasks.js            # Task CRUD routes
│   └── auth.js             # Register / Login / Logout routes
├── views/
│   ├── index.ejs           # Home / splash page
│   ├── error.ejs
│   ├── auth/
│   │   ├── login.ejs
│   │   └── register.ejs
│   ├── tasks/
│   │   ├── list.ejs        # List all tasks
│   │   └── form.ejs        # Create/edit form
│   └── partials/
│       ├── header.ejs
│       └── footer.ejs
└── public/
    ├── css/
    │   └── style.css       # Custom stylesheet 
    
        
