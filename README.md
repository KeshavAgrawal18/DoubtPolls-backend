# 🗳️ Doubtpolls (Backend)

A scalable and secure backend for an online voting system, built with Node.js, Express, Sequelize, and PostgreSQL. It supports poll creation, voting functionality, user authentication, and admin controls.

---

## 📦 Features

- 🏗️ **Modular MVC Architecture**  
- 🧑‍💼 **User Authentication** (JWT-based)  
- 🗳️ **Poll & Voting System**  
- 🔐 **Role-based Access Control** (Admin/User)  
- 🌐 **CORS & HTTPS Support** (e.g. Neon DB SSL support)  
- 🔒 **Rate Limiting** to prevent abuse  
- 📊 **View Results with Associations**  
- 🧹 Clean & maintainable codebase with services, repositories, and middlewares

---

## ⚙️ Tech Stack

- **Backend**: Node.js, Express.js  
- **Database**: PostgreSQL (via Sequelize ORM)  
- **Authentication**: JWT + Bcrypt  
- **Utilities**: Winston (logging), Helmet (security), Express-rate-limit  
- **Dev Tools**: Nodemon, ESLint, Jest

---

## 📁 Project Structure

```
src/
├── api/                  # Contains route definitions and API handlers
├── config/               # Configuration files for the application (e.g., database, logging, swagger)
├── controllers/          # Contains business logic for handling incoming requests
├── dataAccess/           # Handles interaction with the database (repositories)
├── db/                   # Database connection setup and initialization
├── middlewares/          # Middleware functions for handling requests (e.g., authentication, rate limiting)
├── models/               # Database models or schema definitions
├── services/             # Contains service files for application-specific logic
└── utils/                # Utility functions and helpers used across the project
```

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/online-voting-system.git
cd online-voting-system
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Rename `.env.example` to `.env` and update the values:

```bash
# Server Configuration
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# JWT Configuration
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=1d

# CORS Configuration
CORS_ORIGIN=http://localhost:3001

# Environment
NODE_ENV=development

# Optional
LOG_LEVEL=info

```

### 4. Start the Server

```bash
npm run dev  # for development with nodemon
```

Server runs at: `http://localhost:3000`

---

## 🔐 API Endpoints

### 🧑 User

| Method | Endpoint               | Description              |
|--------|------------------------|--------------------------|
| POST   | `/api/users/register`  | Register a new user      |
| POST   | `/api/users/login`     | Login user and return JWT|

### 📊 Polls

| Method | Endpoint                        | Description                        |
|--------|----------------------------------|------------------------------------|
| POST   | `/api/polls/`                   | Create a new poll (auth required)  |
| GET    | `/api/polls/all`                | Get all polls for user (auth required) |
| GET    | `/api/polls/:pollId`            | Get poll details by ID             |
| PUT    | `/api/polls/:pollId`            | Update a poll (auth + admin only)  |
| DELETE | `/api/polls/:pollId`            | Delete a poll (auth + admin only)  |
| GET    | `/api/polls/:pollId/results`    | Get results for a poll (auth required) |

### 🗳️ Voting

| Method | Endpoint                   | Description                                      |
|--------|----------------------------|--------------------------------------------------|
| POST   | `/api/votes/`              | Cast a vote                                      |
| GET    | `/api/votes/user`          | Get all votes cast by the authenticated user     |
| GET    | `/api/votes/:pollId`       | Check if the user has voted in the specified poll|

---

## 🛠️ Scripts

- `npm start` – Start production server
- `npm run dev` – Start with nodemon (dev)
- `npm run lint` – Lint code using ESLint

---

## 🔒 Security

- **Helmet** for setting HTTP headers
- **Rate Limiting** with `express-rate-limit`
- **JWT-based Auth** for protecting routes
- **CORS** enabled for frontend integration

---

## 📝 Notes
- Associations are set up between Poll, User, and Vote models for relational querying.

---

## ✅ TODO

- [ ] Add pagination and filtering
- [ ] WebSocket support for real-time updates (optional)

---

## 👨‍💻 Author

**Keshav Agrawal**  
[GitHub](https://github.com/Keshavagrawal18)
