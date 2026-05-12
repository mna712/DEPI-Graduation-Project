
# ReOwn

ReOwn is a full-stack web application that enables users to buy and sell second-hand items within their local community. The platform provides a simple listing system with image uploads, detailed product information, and location-based browsing to help users find nearby items quickly. It also includes a real-time messaging feature for buyer–seller communication and an admin dashboard for managing users, products, and categories.
---

## 🚀 Tech Stack

### **Frontend**

* React.js
* Tailwind CSS
* React Router
* Axios

### **Backend**

* Node.js
* Express.js
* MongoDB (Mongoose)
* Cloudinary (image storage)
* Multer (file uploads)
* JSON Web Tokens (authentication)

### **Tools & Other Technologies**

* Git & GitHub
* Postman (API testing)
* Figma (UI/UX design)

---

## 📌 Features

### **User Features**

* User authentication (Sign up / Login)
* Browse and search for products
* Filter by category, location, and price range
* View product details and seller info
* Add, edit, and delete ads
* Upload multiple images per listing
* Save items to favorites
* Real-time messaging with sellers
* Manage profile and personal listings

### **Admin Features**

* Admin dashboard
* Manage users (activate, deactivate, delete)
* Manage product listings
* Approve or remove ads
* Add, edit, or delete categories
* View platform statistics

---

## 📁 Project Structure

### Backend

```
Backend/
│── controllers/
│── models/
│── routes/
│── middleware/
│── config/
│── utilities/
│── app.js
```

### Frontend

```
Frontend/
│── src/
│   ├── components/
│   ├── assets/
│   ├── context/
│   ├── data/
│   └── App.jsx
│── public/
```

---

## ⚙️ Installation & Setup

### Clone the Repository

```bash
git clone https://github.com/mna712/DEPI-Graduation-Project
```

---

## Backend Setup

```bash
cd ReOwn/Backend
npm install
```

Create `.env`:

```
PORT=3000
MONGO_URI=your-mongodb-url
JWT_SECRET=your-secret
CLOUDINARY_NAME=your-cloud-name
CLOUDINARY_KEY=your-api-key
CLOUDINARY_SECRET=your-api-secret
```

Start backend:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

---

## 📈 Future Enhancements

* Push notifications
* Advanced search
* AI-based product recommendations
* Delivery/pickup scheduling
* use google maps API to enhance nearest place feature

---

## 📜 License

This project was created as part of the DEPI training Program.

---

