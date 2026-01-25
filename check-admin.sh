#!/bin/bash

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}👤 Checking Admin Users${NC}\n"

# Check if backend is running
if ! curl -s http://localhost:5001/api/health > /dev/null 2>&1 && ! curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
    echo -e "${RED}❌ Backend server is not running!${NC}"
    echo -e "${YELLOW}Please start the backend first:${NC}"
    echo -e "  ${GREEN}cd server && npm run dev${NC}\n"
    exit 1
fi

# Determine which port the backend is using
BACKEND_PORT="5001"
if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
    BACKEND_PORT="5000"
fi

echo -e "${YELLOW}Backend is running on port ${BACKEND_PORT}${NC}\n"

# Try to get users via API (if there's an endpoint)
echo -e "${BLUE}Checking users via database...${NC}\n"

# Check database directly
USERS=$(psql -U mvelomlangeni -d ubuhle -t -c "SELECT COUNT(*) FROM users;" 2>/dev/null | xargs)

if [ "$?" -eq 0 ] && [ ! -z "$USERS" ]; then
    echo -e "${GREEN}✅ Found ${USERS} user(s) in database${NC}\n"
    
    echo -e "${BLUE}User Details:${NC}"
    psql -U mvelomlangeni -d ubuhle -c "SELECT id, username, email, role, created_at FROM users ORDER BY id;" 2>/dev/null
    
    if [ "$USERS" -eq "0" ]; then
        echo -e "\n${YELLOW}⚠️  No users found. Create an admin user?${NC}"
        read -p "Create admin user? (y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            echo -e "\n${BLUE}Creating admin user...${NC}"
            RESPONSE=$(curl -s -X POST http://localhost:${BACKEND_PORT}/api/auth/register \
              -H "Content-Type: application/json" \
              -d '{
                "username": "admin",
                "email": "admin@example.com",
                "password": "admin123"
              }')
            
            if echo "$RESPONSE" | grep -q '"success":true'; then
                echo -e "${GREEN}✅ Admin user created!${NC}"
                echo -e "\n${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
                echo -e "${GREEN}Login Credentials:${NC}"
                echo -e "  Email:    ${GREEN}admin@example.com${NC}"
                echo -e "  Password: ${GREEN}admin123${NC}"
                echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
            else
                echo -e "${RED}❌ Failed to create user${NC}"
                echo "$RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$RESPONSE"
            fi
        fi
    fi
else
    echo -e "${RED}❌ Could not connect to database${NC}"
    echo -e "${YELLOW}Make sure:${NC}"
    echo -e "  1. PostgreSQL is running"
    echo -e "  2. Database 'ubuhle' exists"
    echo -e "  3. User 'mvelomlangeni' has access\n"
fi

echo ""
