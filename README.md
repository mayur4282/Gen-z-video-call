#   Gen-Z Video Call - Real-Time Video Calling & WebRTC Platform
#  Gen-Z Real-Time Video Calling & WebRTC Platform

> ** Gen-Z Video Call is a modern, high-performance full-stack web application for real-time video conferencing, peer-to-peer video calls, screen sharing, and instant in-meeting messaging. Built using **React 19**, **Node.js**, **Express**, **Socket.IO**, **WebRTC**, and **MongoDB**.
> **  Gen-Z Video Call is a modern, high-performance full-stack web application for real-time video conferencing, peer-to-peer video calls, screen sharing, and instant in-meeting messaging. Built using **React 19**, **Node.js**, **Express**, **Socket.IO**, **WebRTC**, and **MongoDB**.

---

##  Key Features

- **Real-Time Video & Audio Calling**: Multi-user real-time peer-to-peer video & audio streaming powered by WebRTC and Socket.IO signaling.
-  **Live In-Call Chat**: Instant text messaging inside video meeting rooms with real-time broadcasting.
- 📌 **Pin Important Messages**: Ability to pin important messages inside active video rooms so all participants can reference them.
-  **Screen Sharing**: One-click screen sharing to present documents, code, or slides directly during a call.
-  **User Authentication**: Secure user registration & login system with password encryption (`bcrypt`) and token-based authentication.
-  **Meeting History**: Track and view past joined video calls and meeting codes for logged-in users.
-  **Instant Room Access**: Join meeting rooms instantly via unique room IDs/URLs without cumbersome setup.
-  **Responsive Modern UI**: Modern dark-themed user interface styled with Material-UI (MUI) and dynamic CSS animations.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: React 19 (Vite)
- **Routing**: React Router DOM (`HashRouter`)
- **UI Components**: Material-UI (`@mui/material`, `@mui/icons-material`) & Emotion
- **Real-Time Connection**: Socket.IO Client (`socket.io-client`)
- **Media Protocols**: WebRTC (`RTCPeerConnection`, `getUserMedia`, `getDisplayMedia`)
- **HTTP Client**: Axios

### **Backend**
- **Runtime**: Node.js
- **Framework**: Express 5
- **Real-Time Engine**: Socket.IO Server (WebRTC signaling, chat broadcasting, message pinning)
- **Database**: MongoDB with Mongoose ORM
- **Security**: Bcrypt (Password Hashing), Crypto

---

##  Repository Structure

```
apnavideo/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── socketManager.js       # Socket.IO event handlers & WebRTC signaling logic
│   │   │   └── user.controller.js     # Auth (Login/Register) & Meeting history handlers
│   │   ├── models/
│   │   │   ├── meeting.model.js       # MongoDB schema for meetings
│   │   │   └── user.model.js          # MongoDB schema for user accounts
│   │   ├── routes/
│   │   │   └── users.routes.js        # User authentication & history API routes
│   │   └── app.js                     # Server initialization & database connection
│   ├── .env                           # Backend environment configurations
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── contexts/                  # AuthContext for global user state management
│   │   ├── pages/                     # VideoMeet, Authentication, Home, History, Landing pages
│   │   ├── environment.js             # API Base URL & backend endpoint settings
│   │   ├── App.jsx                    # Application routing setup
│   │   └── main.jsx
│   ├── public/                        # Static assets & redirects
│   ├── vercel.json                    # Vercel deployment config
│   └── package.json
├── render.yaml                        # Render deployment configuration
└── README.md
```

---

## ⚡ Quick Start & Local Setup Guide

Follow these steps to set up and run the project locally on your machine.

### **Prerequisites**
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster URI)
- Git

---

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/apnavideo.git
cd apnavideo
```

---

### **2. Setup & Run Backend**

Navigate to the `backend` directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
PORT=8000
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/apnavideo
```

Start the backend development server:
```bash
npm run dev
# Server will run at http://localhost:8000
```

---

### **3. Setup & Run Frontend**

Open a new terminal tab/window, navigate to the `frontend` directory, and install dependencies:
```bash
cd frontend
npm install
```

Start the frontend Vite development server:
```bash
npm run dev
# Frontend will run at http://localhost:5173
```

---

##  API Endpoints Summary

### **User & Authentication Routes** (`/api/v1/users`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/users/register` | Register a new user (`name`, `username`, `password`) |
| `POST` | `/api/v1/users/login` | Authenticate user and return token (`username`, `password`) |
| `GET` | `/api/v1/users/get_all_activity` | Get user meeting history by token |
| `POST` | `/api/v1/users/add_to_activity` | Save a new meeting code to user history |

---

##  Real-Time Socket.IO & WebRTC Signaling Events

| Socket Event | Direction | Description |
| :--- | :--- | :--- |
| `join-call` | Client ➔ Server | User joins a specific meeting room |
| `user-joined` | Server ➔ Clients | Notifies participants of a newly joined user |
| `signal` | Bi-directional | Transmits WebRTC SDP offers/answers & ICE candidates |
| `chat-message` | Bi-directional | Broadcasts in-call text chat messages |
| `pin-message` | Client ➔ Server | Pins a chat message in the room |
| `pinned-message-updated` | Server ➔ Clients | Syncs pinned message to all room participants |
| `user-left` | Server ➔ Clients | Notifies participants when a peer disconnects |

---

##  Deployment

- **Frontend Deployment**: Ready for **Vercel** or **Render Static Site** (includes `vercel.json` and static rewrites).
- **Backend Deployment**: Ready for **Render**, **Railway**, or **Heroku** (configured via `render.yaml`).

---

##  Author

Created with ❤️ by **Mayur**.
