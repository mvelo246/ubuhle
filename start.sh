#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting Ubuhle Bekonjana Application...${NC}\n"

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Check if PostgreSQL is running
echo -e "${YELLOW}Checking PostgreSQL...${NC}"
if ! psql -U mvelomlangeni -d postgres -c "SELECT 1" > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  PostgreSQL might not be running. Attempting to start...${NC}"
    brew services start postgresql@16 2>/dev/null || brew services start postgresql 2>/dev/null
    sleep 2
fi
echo -e "${GREEN}✅ PostgreSQL check complete${NC}\n"

# Function to cleanup on exit
cleanup() {
    echo -e "\n${YELLOW}🛑 Stopping servers...${NC}"
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
    fi
    exit 0
}

# Trap Ctrl+C and other signals
trap cleanup INT TERM EXIT

# Start backend server
echo -e "${BLUE}📦 Starting backend server (port 5000)...${NC}"
cd "$SCRIPT_DIR/server"
npm run dev &
BACKEND_PID=$!
cd "$SCRIPT_DIR"

# Wait a bit for backend to start
sleep 3

# Start frontend server
echo -e "${BLUE}⚛️  Starting frontend server (port 5173)...${NC}"
npm run dev &
FRONTEND_PID=$!

echo -e "\n${GREEN}✅ Both servers are starting!${NC}\n"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  Backend:  http://localhost:5000${NC}"
echo -e "${GREEN}  Frontend: http://localhost:5173${NC}"
echo -e "${GREEN}  API:      http://localhost:5000/api${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
echo -e "${YELLOW}Press Ctrl+C to stop both servers${NC}\n"

# Wait for processes (this keeps the script running)
wait $BACKEND_PID $FRONTEND_PID 2>/dev/null
