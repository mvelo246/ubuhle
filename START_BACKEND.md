# How to Start the Backend Server

## The Problem
Port 5000 is being used by another process (likely Cursor or Chrome), so the backend can't start on that port.

## Solution: Use Port 5001

I've already updated your configuration to use port 5001. Here's how to start everything:

### Step 1: Start PostgreSQL (if not running)

```bash
brew services start postgresql@16
# OR
brew services start postgresql
```

Verify it's running:
```bash
brew services list | grep postgresql
```

### Step 2: Start the Backend Server

Open a terminal and run:
```bash
cd server
npm run dev
```

You should see:
```
PostgreSQL Connected Successfully
Database models synchronized
Server running in development mode on port 5001
```

**Keep this terminal open!**

### Step 3: Start the Frontend

Open a **new terminal** and run:
```bash
npm run dev
```

### Step 4: Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5001/api
- Login: http://localhost:5173/dashboard/login

## If PostgreSQL Connection Fails

If you see "Operation not permitted" errors:

1. **Restart PostgreSQL:**
   ```bash
   brew services restart postgresql@16
   ```

2. **Check PostgreSQL is accepting connections:**
   ```bash
   psql -U mvelomlangeni -d postgres -c "SELECT version();"
   ```

3. **If that fails, try using TCP connection:**
   The database config has been updated to use TCP/IP connections.

## Create Admin User

Once the backend is running, create an admin user:

```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

Then login with:
- Email: `admin@example.com`
- Password: `admin123`

## Quick Test

Test if backend is running:
```bash
curl http://localhost:5001/api/health
```

Should return: `{"success":true,"message":"Server is running"}`
