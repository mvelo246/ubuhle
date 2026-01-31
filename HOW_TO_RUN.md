# How to Run Ubuhle Bekonjana

## Prerequisites

- **Node.js** (with npm)
- **PostgreSQL 16**
- **Homebrew** (macOS, for managing PostgreSQL)

## Environment Setup

Create a `.env` file in the `server/` directory with:

```
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173

DB_NAME=ubuhle
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432

JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d

MAX_FILE_SIZE=5242880
```

## Installation

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
```

## Create the Database

```bash
createdb -U postgres ubuhle
```

## Running the Project

### Option 1: Start Everything at Once (Recommended)

```bash
npm start
```

This runs `start.sh` which starts PostgreSQL, the backend (port 5000), and the frontend (port 5173) together.

### Option 2: Start Separately

**Backend:**

```bash
cd server
npm run dev
```

**Frontend (from project root):**

```bash
npm run dev
```

## Access Points

| Service   | URL                        |
|-----------|----------------------------|
| Frontend  | http://localhost:5173       |
| Backend   | http://localhost:5000       |
| API       | http://localhost:5000/api   |

## Dashboard

The admin dashboard is accessible from the frontend. You need an admin account to access it. The dashboard allows you to manage:

- **Artists** - Add, edit, delete artists
- **Songs** - Add songs with YouTube URLs, edit, delete (managed per artist)
- **Models** - Manage model profiles
- **Events** - Create and manage events
- **News** - Publish news items

## Stopping

Press **Ctrl+C** to stop both servers when running via `npm start`.
