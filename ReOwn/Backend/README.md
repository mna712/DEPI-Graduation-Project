# ReOwn Backend

The backend service for **ReOwn**, a full-stack marketplace platform for buying and selling second-hand products within local communities.

This backend provides:

- RESTful APIs
- Authentication & Authorization
- Product Management
- Real-Time Chat System
- Conversation Management
- Image Upload Handling
- Admin Features
- MongoDB Database Integration

---

# 🚀 Tech Stack

## Core Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose

## Authentication & Security

- JSON Web Token (JWT)
- bcrypt.js

## Real-Time Communication

- Socket.IO
- Redis Adapter (Scalable Socket Rooms)

## File Upload & Media

- Multer
- Cloudinary

## Utilities & Tools

- dotenv
- CORS
- Nodemon

---

# 📌 Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Role-Based Authorization

---

## Products

- Create Product Listings
- Edit Product Listings
- Delete Products
- Upload Multiple Images
- Product Filtering
- Product Search
- Product Details API

---

## Real-Time Chat System

- Real-Time Messaging
- Socket.IO Integration
- Conversation Rooms
- Authenticated Socket Connections
- Typing Indicators
- Persistent Message Storage
- Buyer–Seller Conversations

---

## Admin Features

- Manage Users
- Manage Products
- Manage Categories
- Remove Listings
- Platform Monitoring

---

# 📁 Backend Structure

```txt
Backend/
│
├── config/
│   ├── dbConnection.js
│   └── cloudinary.js
│
├── controllers/
│
├── middlewares/
│
├── models/
│
├── routes/
│
├── utilities/
│
├── app.js
│
├── package.json
│
└── .env
````

---

# ⚙️ Environment Variables

Create a `.env` file inside the Backend folder:

```env
PORT=3000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_jwt_secret

CLOUDINARY_NAME=your_cloudinary_name

CLOUDINARY_KEY=your_cloudinary_key

CLOUDINARY_SECRET=your_cloudinary_secret

REDIS_URL=redis://127.0.0.1:6379
```

---

# ⚙️ Installation & Setup

## Clone Repository

```bash
git clone https://github.com/mna712/DEPI-Graduation-Project
```

---

## Navigate to Backend

```bash
cd DEPI-Graduation-Project/ReOwn/Backend
```

---

## Install Dependencies

```bash
npm install
```

---

## Run Development Server

```bash
npm run dev
```

---

# 📡 API Endpoints

## Authentication Routes

```txt
POST /api/auth/register
POST /api/auth/login
```

---

## Product Routes

```txt
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

---

## Chat Routes

```txt
POST /api/chat/conversation
GET  /api/chat/conversations
GET  /api/chat/messages/:conversationId
```

---

# 🔌 Socket.IO Events

## Client → Server

```txt
joinConversation
sendMessage
typing
```

---

## Server → Client

```txt
receiveMessage
typing
```

---

# 🔐 Socket Authentication

Socket connections are protected using JWT authentication.

Example:

```js
const socket = io("http://localhost:3000", {
  auth: {
    token: userToken,
  },
});
```

---

# 💬 Real-Time Chat Flow

1. User logs in
2. JWT token is generated
3. Client connects to Socket.IO
4. User joins conversation room
5. Messages are sent in real-time
6. Messages are stored in MongoDB
7. Conversation members receive updates instantly

---

# 🧠 Architecture

The backend follows a modular MVC architecture:

* **Models** → Database Schemas
* **Controllers** → Business Logic
* **Routes** → API Endpoints
* **Middlewares** → Authentication & Validation
* **Utilities** → Helper Functions
* **Config** → Database & External Services

---

# 📈 Future Enhancements

* Message Seen Status
* Online/Offline Presence
* Push Notifications
* File Sharing
* Voice Notes
* Video Calls
* AI-Based Recommendations
* Notifications System
* Message Reactions

---

# 🛠️ Development Tools

* Git & GitHub
* Postman
* VS Code
* MongoDB Compass

---

# 📜 License

This project was developed as part of the DEPI Graduation Project.

```

