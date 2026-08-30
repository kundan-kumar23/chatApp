# 💬 Real-Time Chat Application

A full-stack real-time chat application built using the **MERN stack** with **Socket.IO**. Users can securely register, log in, chat in real time, share images, see online users, and update their profile pictures.

## 🚀 Live Demo

👉 https://chatapp-q3w9.onrender.com

> Note: The application is hosted on Render's free plan, so the first request may take some time if the server is sleeping.

---

## ✨ Features

- 🔐 User Signup & Login
- 🔑 JWT-based Authentication
- 🍪 Secure Cookie-based Authentication
- 💬 Real-time messaging with Socket.IO
- 🟢 Online user status
- 🖼️ Image sharing in chat
- 👤 Profile picture upload
- ☁️ Cloudinary image storage
- 🔊 Message/keyboard sound effects
- 📱 Responsive design for mobile and desktop
- 🔒 Protected routes
- 🗄️ MongoDB database
- ⚡ Fast React frontend with Vite
- 🌐 Deployed on Render

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Zustand
- Axios
- Socket.IO Client
- Tailwind CSS
- DaisyUI
- Lucide React
- React Hot Toast

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT
- bcrypt.js
- Cookie Parser
- CORS

### Services

- MongoDB Atlas
- Cloudinary
- Render

---

## 📁 Project Structure

```text
chatApp/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── hooks/
│   │   └── lib/
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── server.js
│   │
│   ├── models/
│   ├── lib/
│   ├── utils/
│   ├── emails/
│   └── package.json
│
└── README.md
