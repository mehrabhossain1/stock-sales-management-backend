# 🔐 Role-Based Authentication API (Express + JWT)

This is a backend API built with **Node.js**, **Express**, and **JWT** that supports **role-based access control** with 3 user roles:  
`admin`, `manager`, and `user`.

## 🌐 Deployed Link

[https://stock-sales-management-backend.onrender.com](https://stock-sales-management-backend.onrender.com)

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
│   ├── productController.js
│   └── saleController.js
├── middlewares/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
├── models/
│   ├── Product.js
│   └── Sale.js
├── routes/
│   ├── userRoutes.js
│   ├── productRoutes.js
│   └── saleRoutes.js
├── .env
├── src/index.js
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

### 💸 Sales Endpoints (`/api/sales`) – Admin and Manager

| Method | Endpoint          | Roles Allowed      | Description                          |
| ------ | ----------------- | ------------------ | ------------------------------------ |
| POST   | `/api/sales`      | `admin`, `manager` | Record a sale                        |
| GET    | `/api/sales`      | `admin`, `manager` | Get all sales (role-based filtering) |
| GET    | `/api/sales/dues` | `admin`, `manager` | Get all due (unpaid) sales           |

## 🛡️ Middleware Usage

✅ `verifyToken`
Checks for a valid JWT in the request header.

✅ `authorizeRoles(...allowedRoles)`
Restricts route access to users with specified roles.

🔁 Sales are linked to `product` and `soldBy` using Mongoose `.populate()`  
📉 Product stock is automatically reduced on each sale  
🧾 Dues are calculated by `total - paid`

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
