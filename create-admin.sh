#!/bin/bash

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}👤 Create Admin User${NC}\n"

# Default values
USERNAME="${1:-admin}"
EMAIL="${2:-admin@example.com}"
PASSWORD="${3:-admin123}"

echo -e "${YELLOW}Creating user with:${NC}"
echo -e "  Username: ${GREEN}${USERNAME}${NC}"
echo -e "  Email:    ${GREEN}${EMAIL}${NC}"
echo -e "  Password: ${GREEN}${PASSWORD}${NC}\n"

# Check if backend is running
if ! curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
    echo -e "${RED}❌ Backend server is not running!${NC}"
    echo -e "${YELLOW}Please start the backend server first:${NC}"
    echo -e "  cd server && npm run dev"
    exit 1
fi

echo -e "${BLUE}Registering user...${NC}\n"

# Register user
RESPONSE=$(curl -s -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{
    \"username\": \"${USERNAME}\",
    \"email\": \"${EMAIL}\",
    \"password\": \"${PASSWORD}\"
  }")

# Check if successful
if echo "$RESPONSE" | grep -q '"success":true'; then
    echo -e "${GREEN}✅ User created successfully!${NC}\n"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}Login Credentials:${NC}"
    echo -e "  Email:    ${GREEN}${EMAIL}${NC}"
    echo -e "  Password: ${GREEN}${PASSWORD}${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
    echo -e "${BLUE}You can now login at:${NC}"
    echo -e "  ${GREEN}http://localhost:5173/dashboard/login${NC}\n"
else
    echo -e "${RED}❌ Failed to create user${NC}\n"
    echo -e "${YELLOW}Response:${NC}"
    echo "$RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$RESPONSE"
    echo ""
    
    # Check if user already exists
    if echo "$RESPONSE" | grep -q "already exists"; then
        echo -e "${YELLOW}ℹ️  User already exists. You can login with these credentials.${NC}\n"
    fi
fi
