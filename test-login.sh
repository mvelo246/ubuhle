#!/bin/bash

echo "🔍 Testing Login Setup..."
echo ""

# Check backend
echo "1. Checking backend server..."
if curl -s http://localhost:5001/api/health > /dev/null 2>&1; then
    echo "   ✅ Backend is running on port 5001"
    BACKEND_OK=true
else
    echo "   ❌ Backend is NOT running on port 5001"
    echo "   → Start it with: cd server && npm run dev"
    BACKEND_OK=false
fi

echo ""

# Test login
if [ "$BACKEND_OK" = true ]; then
    echo "2. Testing login..."
    RESPONSE=$(curl -s -X POST http://localhost:5001/api/auth/login \
      -H "Content-Type: application/json" \
      -d '{"email":"admin@example.com","password":"admin123"}')
    
    if echo "$RESPONSE" | grep -q '"success":true'; then
        echo "   ✅ Login works! Admin user exists."
    elif echo "$RESPONSE" | grep -q "Invalid credentials"; then
        echo "   ⚠️  Login failed - user doesn't exist or wrong password"
        echo ""
        echo "   Creating admin user..."
        CREATE_RESPONSE=$(curl -s -X POST http://localhost:5001/api/auth/register \
          -H "Content-Type: application/json" \
          -d '{"username":"admin","email":"admin@example.com","password":"admin123"}')
        
        if echo "$CREATE_RESPONSE" | grep -q '"success":true'; then
            echo "   ✅ Admin user created!"
            echo ""
            echo "   Login Credentials:"
            echo "   Email: admin@example.com"
            echo "   Password: admin123"
        elif echo "$CREATE_RESPONSE" | grep -q "already exists"; then
            echo "   ℹ️  User already exists but password might be wrong"
        else
            echo "   ❌ Failed to create user"
            echo "$CREATE_RESPONSE"
        fi
    else
        echo "   ❌ Login test failed"
        echo "   Response: $RESPONSE"
    fi
else
    echo "2. Skipping login test (backend not running)"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Next steps:"
echo "1. Make sure backend is running: cd server && npm run dev"
echo "2. Make sure frontend is running: npm run dev"
echo "3. Go to: http://localhost:5173/dashboard/login"
echo "4. Login with: admin@example.com / admin123"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
