# How to Check for Admin Users

## Method 1: Using the API (Recommended)

If your backend is running, you can check by trying to create a user or login:

### Check if admin exists by trying to register:

```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

**If user exists:** You'll get: `{"success":false,"message":"User already exists"}`
**If user doesn't exist:** You'll get: `{"success":true,"data":{...}}` (user created)

### Try to login:

```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

**If login succeeds:** Admin user exists!
**If login fails:** User doesn't exist or wrong password

---

## Method 2: Using the Script

Run the check script:

```bash
./check-admin.sh
```

This will:
- Check if backend is running
- Query the database for users
- Show all admin users
- Offer to create one if none exists

---

## Method 3: Direct Database Query

If you have database access:

```bash
psql -U mvelomlangeni -d ubuhle -c "SELECT id, username, email, role FROM users;"
```

Or if that doesn't work due to permissions:

```bash
psql -h localhost -U mvelomlangeni -d ubuhle -c "SELECT id, username, email, role FROM users;"
```

---

## Method 4: Through the Frontend

1. Go to: http://localhost:5173/dashboard/login
2. Try to login with:
   - Email: `admin@example.com`
   - Password: `admin123`

If login works → Admin exists
If login fails → Admin doesn't exist or wrong credentials

---

## Quick Commands

### Create Admin (if doesn't exist):
```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","email":"admin@example.com","password":"admin123"}'
```

### Test Login:
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

---

## Default Admin Credentials

If you created an admin using the default script:
- **Email:** `admin@example.com`
- **Password:** `admin123`
- **Username:** `admin`
- **Role:** `admin`
