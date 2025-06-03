# 🔗 MERN URL Shortener

A full-featured **URL shortening platform** built using the **MERN Stack (MongoDB, Express, React, Node.js)**. This project allows users to register/login, shorten long URLs, optionally set custom short URLs, and track their own list of shortened links.

## ✨ Features

- 🔐 **Authentication & Authorization**  
  Users can sign up and log in using JWT-based authentication.

- 🔗 **URL Shortening**  
  Shorten any valid URL to a custom domain.

- 🧑‍💼 **Custom Slugs**  
  Logged-in users can create custom short URLs (e.g., `yourdomain.com/my-link`).

- 📋 **User Dashboard**  
  Authenticated users can view a list of their created URLs along with click statistics.

- 📦 **Fully Modular Codebase**  
  Cleanly separated backend and frontend code for scalability and maintainability.

---

## 🛠️ Tech Stack

| Layer         | Technology                                      |
|---------------|--------------------------------------------------|
| Frontend      | React, React Redux, TailwindCSS, TanStack Query |
| Backend       | Node.js, Express                                 |
| Database      | MongoDB                                          |
| Authentication| JWT (JSON Web Token)                             |

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js & npm
- MongoDB
- Git

### 📁 Project Structure

- backend
- frontend


### 📦 Installation

#### 1. Clone the repository

```bash
git clone https://github.com/your-username/url-shortener-mern.git
cd url-shortener-mern

```

#### 2. backend-setup

- cd backend
- npm run dev


##### ./env file

- PORT=5000
- MONGO_URI(compass) =http://localhost:5000/
- JWT_SECRET=  your key


#### Run backend
- cd Backend
- npm run dev

### Run frontend
- cd Frontend
- npm run dev
 