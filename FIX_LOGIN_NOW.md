# Fix Login Issues - Step by Step

## Problem: Can't Login

Follow these steps in order:

---

## Step 1: Start the Backend Server

**Open a terminal and run:**
```bash
cd /Users/mvelomlangeni/Workspace/ubuhle/server
npm run dev
```

**Wait until you see:**
```
PostgreSQL Connected Successfully
Database models synchronized
Server running in development mode on port 5001
```

**Keep this terminal open!** Don't close it.

---

## Step 2: Create Admin User

**Open a NEW terminal** and run:

```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

**If successful, you'll see:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "role": "admin",
    "token": "..."
  }
}
```

**If you see "User already exists":**
- That's OK! The user exists, proceed to login.

---

## Step 3: Test Login

**In the same terminal, test login:**
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

**If successful, you'll get a token back.**

---

## Step 4: Login via Frontend

1. **Make sure frontend is running:**
   ```bash
   cd /Users/mvelomlangeni/Workspace/ubuhle
   npm run dev
   ```

2. **Go to:** http://localhost:5173/dashboard/login

3. **Enter credentials:**
   - **Email:** `admin@example.com`
   - **Password:** `admin123`

4. **Click "Sign in"**

---

## Common Error Messages & Solutions

### "Cannot connect to server"
**Problem:** Backend is not running
**Solution:** 
- Go to Step 1 above
- Make sure backend terminal shows "Server running on port 5001"
- Wait a few seconds after starting

### "Invalid email or password"
**Problem:** User doesn't exist or wrong password
**Solution:**
- Go to Step 2 above to create the user
- Make sure you're using: `admin@example.com` / `admin123`

### "Network Error" or "ECONNREFUSED"
**Problem:** Backend not accessible
**Solution:**
- Check backend is running: `lsof -i :5001`
- Restart backend: `cd server && npm run dev`
- Check firewall/security settings

### Backend won't start
**Problem:** Database connection issue
**Solution:**
1. Check PostgreSQL is running:
   ```bash
   brew services list | grep postgresql
   ```

2. Start PostgreSQL:
   ```bash
   brew services start postgresql@16
   ```

3. Wait 5 seconds, then start backend again

---

## Quick Test Commands

**Test backend health:**
```bash
curl http://localhost:5001/api/health
```
Should return: `{"success":true,"message":"Server is running"}`

**Create admin user:**
```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","email":"admin@example.com","password":"admin123"}'
```

**Test login:**
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

---

## Default Credentials

- **Email:** `admin@example.com`
- **Password:** `admin123`
- **Username:** `admin`

---

## Still Not Working?

1. **Check browser console (F12)** for errors
2. **Check backend terminal** for error messages
3. **Clear browser cache and localStorage:**
   - Open DevTools (F12)
   - Go to Application tab
   - Clear Local Storage
   - Refresh page

4. **Verify:**
   - Backend is running on port 5001
   - Frontend is running on port 5173
   - PostgreSQL is running
   - User exists in database

---

## Need Help?

Share the exact error message you see when trying to login, and I can help you fix it!
