# Fix Login Issues - Step by Step

## Problem: Cannot Sign In

Here's how to fix it:

---

## Step 1: Make Sure Backend is Running

**Check if backend is running:**
```bash
lsof -i :5001 | grep LISTEN
```

**If not running, start it:**
```bash
cd server
npm run dev
```

**You should see:**
```
PostgreSQL Connected Successfully
Database models synchronized
Server running in development mode on port 5001
```

**Keep this terminal open!**

---

## Step 2: Create Admin User (if doesn't exist)

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

**If user already exists:**
```json
{
  "success": false,
  "message": "User already exists"
}
```
→ That's OK! User exists, proceed to login.

---

## Step 3: Test Login via API

```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

**If successful, you'll get a token.**
**If it fails, check the error message.**

---

## Step 4: Login via Frontend

1. **Make sure frontend is running:**
   ```bash
   npm run dev
   ```

2. **Go to:** http://localhost:5173/dashboard/login

3. **Enter credentials:**
   - Email: `admin@example.com`
   - Password: `admin123`

4. **Click "Sign in"**

---

## Common Issues & Solutions

### Issue 1: "Cannot connect to server"
**Solution:** Backend is not running
- Start backend: `cd server && npm run dev`
- Wait for "Server running" message
- Try again

### Issue 2: "Invalid credentials"
**Solution:** User doesn't exist or wrong password
- Create user using Step 2 above
- Or check if you're using the correct email/password

### Issue 3: Backend won't start
**Check:**
- PostgreSQL is running: `brew services list | grep postgresql`
- Database exists: `psql -U mvelomlangeni -d ubuhle -c "SELECT 1;"`
- `.env` file has correct settings

### Issue 4: CORS errors in browser console
**Solution:** Check `CLIENT_URL` in `server/.env` matches frontend URL
- Should be: `CLIENT_URL=http://localhost:5173`

### Issue 5: Network permission errors
**Solution:** This is a macOS security issue
- Try restarting the backend
- Check System Preferences > Security & Privacy
- Or use a different port

---

## Quick Diagnostic Commands

### Check Backend Health:
```bash
curl http://localhost:5001/api/health
```
Should return: `{"success":true,"message":"Server is running"}`

### Check if User Exists:
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

### Create User:
```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","email":"admin@example.com","password":"admin123"}'
```

---

## Default Credentials

- **Email:** `admin@example.com`
- **Password:** `admin123`
- **Username:** `admin`

---

## Still Not Working?

1. **Check browser console** (F12) for errors
2. **Check backend terminal** for error messages
3. **Verify:**
   - Backend is running on port 5001
   - Frontend is running on port 5173
   - PostgreSQL is running
   - Database 'ubuhle' exists
   - User exists in database

4. **Clear browser cache and localStorage:**
   - Open browser DevTools (F12)
   - Go to Application/Storage tab
   - Clear localStorage
   - Refresh page

---

## Need More Help?

Check the terminal output when you try to login - it will show the exact error message.
