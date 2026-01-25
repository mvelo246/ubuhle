# How to Run Everything - Ubuhle Bekonjana

## Quick Start Guide

This application consists of:
1. **PostgreSQL Database** (must be running)
2. **Backend Server** (Node.js/Express on port 5000)
3. **Frontend** (React/Vite on port 5173)

---

## Step-by-Step Instructions

### 1. Ensure PostgreSQL is Running

**Check if PostgreSQL is running:**
```bash
psql -U mvelomlangeni -d postgres -c "SELECT version();"
```

**If not running, start it:**
```bash
# macOS (Homebrew)
brew services start postgresql@14
# Or
brew services start postgresql

# Check status
brew services list | grep postgresql
```

**Verify database exists:**
```bash
psql -U mvelomlangeni -d postgres -c "\l" | grep ubuhle
```

If the `ubuhle` database doesn't exist, create it:
```bash
psql -U mvelomlangeni -d postgres -c "CREATE DATABASE ubuhle;"
```

---

### 2. Start the Backend Server

**Open Terminal 1:**
```bash
cd /Users/mvelomlangeni/Workspace/ubuhle/server
npm run dev
```

**You should see:**
```
PostgreSQL Connected Successfully
Database models synchronized
Server running in development mode on port 5000
```

**Keep this terminal open!**

---

### 3. Start the Frontend

**Open Terminal 2 (new terminal window):**
```bash
cd /Users/mvelomlangeni/Workspace/ubuhle
npm run dev
```

**You should see:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

**Keep this terminal open!**

---

### 4. Access the Application

- **Frontend (Public Website):** http://localhost:5173
- **Backend API:** http://localhost:5000/api
- **Admin Dashboard:** http://localhost:5173/dashboard/login
- **API Health Check:** http://localhost:5000/api/health

---

## Using Two Terminal Windows

### Terminal 1 - Backend:
```bash
cd server
npm run dev
```

### Terminal 2 - Frontend:
```bash
npm run dev
```

---

## Troubleshooting

### Backend won't start:
- ✅ Check PostgreSQL is running: `brew services list | grep postgresql`
- ✅ Verify `.env` file exists in `server/` directory
- ✅ Check database credentials in `server/.env`
- ✅ Ensure port 5000 is not in use: `lsof -i :5000`

### Frontend won't start:
- ✅ Check if backend is running first
- ✅ Verify port 5173 is not in use: `lsof -i :5173`
- ✅ Check if dependencies are installed: `npm install`

### Database connection errors:
- ✅ Verify PostgreSQL is running
- ✅ Check `DB_USER` in `server/.env` matches your system username
- ✅ Ensure `ubuhle` database exists

### CORS errors:
- ✅ Ensure backend is running on port 5000
- ✅ Check `CLIENT_URL` in `server/.env` matches frontend URL

---

## Environment Variables

### Backend (`server/.env`):
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ubuhle
DB_USER=mvelomlangeni
DB_PASSWORD=
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

### Frontend (optional `.env` in root):
```env
VITE_API_URL=http://localhost:5000/api
```

---

## Creating Your First Admin User

After both servers are running, create an admin account:

**Using curl:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

**Or use Postman/Thunder Client:**
- Method: POST
- URL: `http://localhost:5000/api/auth/register`
- Body (JSON):
```json
{
  "username": "admin",
  "email": "admin@example.com",
  "password": "admin123"
}
```

Then login at: http://localhost:5173/dashboard/login

---

## Stopping Everything

1. **Stop Frontend:** Press `Ctrl+C` in Terminal 2
2. **Stop Backend:** Press `Ctrl+C` in Terminal 1
3. **Stop PostgreSQL (optional):**
   ```bash
   brew services stop postgresql
   ```

---

## Development Tips

- Backend uses **nodemon** - automatically restarts on file changes
- Frontend uses **Vite** - hot module replacement (HMR) for instant updates
- Both servers watch for file changes and auto-reload
- Check terminal output for any errors

---

## Need Help?

- Check the terminal output for error messages
- Verify all services are running
- Check `.env` files are configured correctly
- Ensure all dependencies are installed: `npm install` in both root and `server/` directories
