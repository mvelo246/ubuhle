#!/bin/bash

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🔧 Fixing Login Issues${NC}\n"

# Step 1: Check PostgreSQL
echo -e "${YELLOW}Step 1: Checking PostgreSQL...${NC}"
if psql -U mvelomlangeni -d postgres -c "SELECT 1" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ PostgreSQL is running${NC}"
else
    echo -e "${RED}❌ PostgreSQL is not running${NC}"
    echo -e "${YELLOW}Starting PostgreSQL...${NC}"
    brew services start postgresql@16 2>/dev/null || brew services start postgresql 2>/dev/null
    sleep 2
fi

# Step 2: Check if database exists
echo -e "\n${YELLOW}Step 2: Checking database...${NC}"
if psql -U mvelomlangeni -d ubuhle -c "SELECT 1" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Database 'ubuhle' exists${NC}"
else
    echo -e "${YELLOW}⚠️  Database 'ubuhle' does not exist. Creating...${NC}"
    psql -U mvelomlangeni -d postgres -c "CREATE DATABASE ubuhle;" 2>/dev/null
    echo -e "${GREEN}✅ Database created${NC}"
fi

# Step 3: Check .env file
echo -e "\n${YELLOW}Step 3: Checking .env file...${NC}"
if [ -f "server/.env" ]; then
    if grep -q "DB_USER=mvelomlangeni" server/.env; then
        echo -e "${GREEN}✅ .env file is configured correctly${NC}"
    else
        echo -e "${YELLOW}⚠️  Updating .env file...${NC}"
        cat > server/.env << EOF
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
EOF
        echo -e "${GREEN}✅ .env file updated${NC}"
    fi
else
    echo -e "${RED}❌ .env file not found. Creating...${NC}"
    cat > server/.env << EOF
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
EOF
    echo -e "${GREEN}✅ .env file created${NC}"
fi

# Step 4: Check if backend is running
echo -e "\n${YELLOW}Step 4: Checking backend server...${NC}"
if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend is running${NC}"
    BACKEND_RUNNING=true
else
    echo -e "${YELLOW}⚠️  Backend is not running${NC}"
    BACKEND_RUNNING=false
fi

# Step 5: Create admin user if backend is running
if [ "$BACKEND_RUNNING" = true ]; then
    echo -e "\n${YELLOW}Step 5: Creating admin user...${NC}"
    RESPONSE=$(curl -s -X POST http://localhost:5000/api/auth/register \
      -H "Content-Type: application/json" \
      -d '{
        "username": "admin",
        "email": "admin@example.com",
        "password": "admin123"
      }')
    
    if echo "$RESPONSE" | grep -q '"success":true'; then
        echo -e "${GREEN}✅ Admin user created successfully!${NC}"
    elif echo "$RESPONSE" | grep -q "already exists"; then
        echo -e "${GREEN}✅ Admin user already exists${NC}"
    else
        echo -e "${YELLOW}⚠️  Could not create user (might already exist)${NC}"
    fi
    
    echo -e "\n${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}Login Credentials:${NC}"
    echo -e "  Email:    ${GREEN}admin@example.com${NC}"
    echo -e "  Password: ${GREEN}admin123${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
else
    echo -e "\n${YELLOW}Step 5: Starting backend server...${NC}"
    echo -e "${BLUE}Please run the backend in a separate terminal:${NC}"
    echo -e "  ${GREEN}cd server && npm run dev${NC}"
    echo -e "\n${YELLOW}Then run this script again to create the admin user.${NC}"
fi

echo -e "\n${BLUE}Next steps:${NC}"
echo -e "1. Make sure backend is running: ${GREEN}cd server && npm run dev${NC}"
echo -e "2. Make sure frontend is running: ${GREEN}npm run dev${NC}"
echo -e "3. Login at: ${GREEN}http://localhost:5173/dashboard/login${NC}"
echo ""
