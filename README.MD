# 🔐 Role-Based Authentication API (Express + JWT)

This is a backend API built with **Node.js**, **Express**, and **JWT** that supports **role-based access control** with 3 user roles:  
`admin`, `manager`, and `user`.

## ✅ Features

-   🔐 JWT-based Authentication
-   🔒 Protected Routes
-   🛂 Role-Based Access Control
-   ✅ Middleware for token verification and role checks
-   🧩 Modular route and middleware structure

## 🏗️ Tech Stack

#### 📦 Backend

-   **Node.js** – JavaScript runtime environment
-   **Express.js** – Web framework for Node.js
-   **MongoDB** – NoSQL database
-   **Mongoose** – MongoDB object modeling for Node.js

#### 🔐 Authentication & Security

-   **bcryptjs** – For password hashing
-   **jsonwebtoken (JWT)** – For secure token-based authentication
-   **dotenv** – For managing environment variables securely

#### 🔧 Development Tools

-   **nodemon** – For hot-reloading during development

## 🚀 Installation

```bash
git clone https://github.com/mehrabhossain1/stock-sales-management-backend
cd stock-sales-management-backend
npm install
```

## ⚙️ Environment Variables

Create a .env file in the root with the following:

```bash
PORT=5000
JWT_SECRET=your_jwt_secret
CONNECTION_STRING=your_mongodb_connection_string
```

## ▶️ Run the Server

```bash
npm run dev
```

## 📁 Folder Structure

```bash
├── controllers/
│   └── productController.js
├── middlewares/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
├── models/
│   └── Product.js
├── routes/
│   ├── userRoutes.js
│   └── productRoutes.js
├── .env
├── index.js
└── package.json

```

## 🔄 API Endpoints

| Method | Endpoint   | Roles Allowed              | Description             |
| ------ | ---------- | -------------------------- | ----------------------- |
| GET    | `/admin`   | `admin`                    | Only Admin can access   |
| GET    | `/manager` | `admin`, `manager`         | Admin or Manager access |
| GET    | `/user`    | `admin`, `manager`, `user` | All roles can access    |

### 📦 Product Endpoints (`/api/products`) – Admin Only

| Method | Endpoint            | Roles Allowed | Description      |
| ------ | ------------------- | ------------- | ---------------- |
| GET    | `/api/products`     | `admin`       | Get all products |
| POST   | `/api/products`     | `admin`       | Create product   |
| PUT    | `/api/products/:id` | `admin`       | Update product   |
| DELETE | `/api/products/:id` | `admin`       | Delete product   |

## 🛡️ Middleware Usage

✅ `verifyToken`
Checks for a valid JWT in the request header.

✅ `authorizeRoles(...allowedRoles)`
Restricts route access to users with specified roles.

## 📦 Example Request (using token)

```bash
GET /admin
Authorization: Bearer <your_token>
```

📌 Example: `authorizeRoles("admin")` protects routes only for admin users.

## 📄 License

This project is licensed under the MIT License.

## 🙌 Author

Made with ❤️ by Meharab Hossan Munna
