# AI-Legacy

AI-Legacy is an AI-powered JavaScript modernization platform that transforms legacy JavaScript code into cleaner, modern JavaScript using Google's Gemini API.

It provides an interactive workbench where developers can paste legacy JavaScript, modernize it, inspect the changes through a diff view, and save their modernization history to MongoDB Atlas.

---

## Features

- 🤖 AI-powered JavaScript modernization using Gemini
- 🧑‍💻 Interactive JavaScript modernization workbench
- 🔀 Diff view to compare legacy and modernized code
- 🧹 Clean code view for the final modernized output
- 📋 Copy modernized code
- ⬇️ Download modernized JavaScript
- 📚 Example legacy JavaScript presets
- 🔐 JWT-based authentication
- 🔑 Password hashing using bcrypt
- 💾 Automatic saving of authenticated modernization sessions
- 🗂️ Personal modernization history
- 🔎 Search saved modernization sessions
- 🗑️ Delete saved history
- ♻️ Load previous modernization sessions back into the editor
- 🌓 Light and dark theme support
- 📱 Responsive interface

---

## What Can It Modernize?

The application includes example presets demonstrating common legacy JavaScript patterns such as:

- jQuery AJAX and DOM manipulation
- ES5 constructor/prototype patterns
- Callback-based asynchronous code
- `var` and scope-related patterns
- Loose equality (`==`)
- Legacy DOM manipulation

These presets are examples for demonstration. Users can also paste their own JavaScript code into the Workbench.

---

## How It Works

AI-Legacy follows a simple client-server architecture.

```text
User
  |
  v
React Frontend
  |
  | POST /api/modernize
  v
Express Backend
  |
  v
Gemini API
  |
  | Modernized JavaScript
  v
Express Backend
  |
  v
React Workbench
  |
  +-- Diff View
  +-- Clean Code
  +-- Copy
  +-- Download
```

For authenticated users, the modernization session is also saved to MongoDB Atlas.

```text
User Login
    |
    v
JWT Authentication
    |
    v
Modernization
    |
    v
MongoDB Atlas
    |
    v
Personal History
```

---

## Architecture

AI-Legacy is divided into three main parts.

### Frontend

Built with React and Vite.

Responsible for:

- User interface
- Authentication state
- Code input
- Modernization requests
- Diff visualization
- History interface
- Theme management

### Backend

Built with Node.js and Express.

Responsible for:

- REST API
- Gemini API communication
- Authentication
- JWT verification
- Password hashing
- History management
- MongoDB communication

### Database

MongoDB Atlas stores:

- User accounts
- Modernization history
- Original code
- Modernized code
- Explanations
- Timestamps

---

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Lucide React
- diff library

### Backend

- Node.js
- Express
- JSON Web Token (JWT)
- bcryptjs
- MongoDB
- Mongoose

### AI

- Google Gemini API

### Database

- MongoDB Atlas

---

## Project Structure

```text
AI-Legacy/
|
+-- backend/
|   |
|   +-- config/
|   |   +-- db.js
|   |
|   +-- controller/
|   |   +-- authController.js
|   |   +-- historyController.js
|   |   +-- modernizeController.js
|   |
|   +-- middleware/
|   |   +-- authMiddleware.js
|   |
|   +-- models/
|   |   +-- History.js
|   |   +-- User.js
|   |
|   +-- routes/
|   |   +-- authRoutes.js
|   |   +-- historyRoutes.js
|   |   +-- modernizeRoutes.js
|   |
|   +-- service/
|   |   +-- geminiService.js
|   |
|   +-- package.json
|   +-- server.js
|
+-- frontend/
|   |
|   +-- public/
|   |
|   +-- src/
|       |
|       +-- assets/
|       +-- components/
|       |   +-- DiffEditor.jsx
|       |   +-- Header.jsx
|       |   +-- HistoryDashboard.jsx
|       |   +-- LoginView.jsx
|       |   +-- RegisterView.jsx
|       |
|       +-- context/
|       |   +-- AuthContext.jsx
|       |   +-- ThemeContext.jsx
|       |
|       +-- data/
|       |   +-- presets.js
|       |
|       +-- pages/
|       |   +-- HistoryPage.jsx
|       |   +-- LandingPage.jsx
|       |   +-- WorkbenchPage.jsx
|       |
|       +-- App.jsx
|       +-- index.css
|       +-- main.jsx
|
|   +-- package.json
|   +-- vite.config.js
|
+-- .gitignore
+-- README.md
```

---

## Authentication

AI-Legacy uses JWT-based authentication.

### Registration

```text
User submits name, email and password
              |
              v
        Express API
              |
              v
     Password hashed with bcrypt
              |
              v
       User stored in MongoDB
              |
              v
          JWT generated
              |
              v
        Token returned
```

### Login

```text
Email + Password
       |
       v
  Express API
       |
       v
   Find User
       |
       v
Compare password using bcrypt
       |
       v
 Generate JWT
       |
       v
 Return token
```

Protected routes use the JWT in the request header:

```text
Authorization: Bearer <token>
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get authenticated user |

### Modernization

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/modernize` | Modernize JavaScript using Gemini |

### History

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/history` | Get authenticated user's history |
| POST | `/api/history` | Save a modernization session |
| DELETE | `/api/history/:id` | Delete a history record |

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd AI-Legacy
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the `backend` directory:

```text
backend/.env
```

Add your own credentials:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

Never commit your `.env` file.

### 4. Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 5. Start the Backend

From the `backend` directory:

```bash
npm start
```

The backend runs on:

```text
http://localhost:5000
```

### 6. Start the Frontend

From the `frontend` directory:

```bash
npm run dev
```

Vite will provide the local development URL.

---

## Example

A user can start with legacy JavaScript such as:

```javascript
var name = "Krishna";

console.log(name);
```

The AI modernization service can transform it into:

```javascript
const name = "Krishna";

console.log(name);
```

The Workbench then allows the user to inspect the transformation using the diff view.

---

## Security

Sensitive configuration is kept in environment variables.

The repository ignores:

```text
.env
node_modules/
dist/
build/
```

API keys, database credentials, and JWT secrets should never be committed to the repository.

---

## Future Improvements

Possible future improvements include:

- Support for additional programming languages
- More advanced static code analysis
- Improved modernization validation
- GitHub repository integration
- Automated test generation for modernized code
- Additional refactoring strategies

---

## Author

**Krishna Jaiswal**

AI-Legacy — AI-Powered JavaScript Modernization Workbench
