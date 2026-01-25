#!/bin/bash

echo "🔍 Checking Ubuhle Setup..."
echo ""

# Check PostgreSQL
echo "1. Checking PostgreSQL..."
if command -v psql &> /dev/null; then
    if psql -U mvelomlangeni -d postgres -c "SELECT 1;" &> /dev/null; then
        echo "   ✅ PostgreSQL is running"
        
        # Check if database exists
        if psql -U mvelomlangeni -d postgres -c "\l" | grep -q "ubuhle"; then
            echo "   ✅ Database 'ubuhle' exists"
        else
            echo "   ⚠️  Database 'ubuhle' does not exist"
            echo "   Run: psql -U mvelomlangeni -d postgres -c \"CREATE DATABASE ubuhle;\""
        fi
    else
        echo "   ❌ PostgreSQL is not running"
        echo "   Run: brew services start postgresql"
    fi
else
    echo "   ❌ PostgreSQL is not installed"
fi

echo ""

# Check Backend
echo "2. Checking Backend..."
if [ -d "server" ]; then
    if [ -f "server/.env" ]; then
        echo "   ✅ Backend .env file exists"
    else
        echo "   ⚠️  Backend .env file is missing"
    fi
    
    if [ -d "server/node_modules" ]; then
        echo "   ✅ Backend dependencies installed"
    else
        echo "   ⚠️  Backend dependencies not installed"
        echo "   Run: cd server && npm install"
    fi
else
    echo "   ❌ Server directory not found"
fi

echo ""

# Check Frontend
echo "3. Checking Frontend..."
if [ -d "node_modules" ]; then
    echo "   ✅ Frontend dependencies installed"
else
    echo "   ⚠️  Frontend dependencies not installed"
    echo "   Run: npm install"
fi

echo ""

# Check if ports are in use
echo "4. Checking Ports..."
if lsof -Pi :5000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "   ✅ Port 5000 (backend) is in use"
else
    echo "   ⚠️  Port 5000 (backend) is available"
fi

if lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "   ✅ Port 5173 (frontend) is in use"
else
    echo "   ⚠️  Port 5173 (frontend) is available"
fi

echo ""
echo "📝 To start everything:"
echo "   Terminal 1: cd server && npm run dev"
echo "   Terminal 2: npm run dev"
echo ""
