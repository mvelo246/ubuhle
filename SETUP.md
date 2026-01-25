# Setup Guide - Ubuhle Bekonjana Full Stack Application

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Quick Start

### 1. Install Frontend Dependencies

```bash
npm install
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

### 3. Setup Environment Variables

#### Backend (.env file in `server/` directory)

Create `server/.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ubuhle
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
CLIENT_URL=http://localhost:5173
```

#### Frontend (.env file in root directory - optional)

Create `.env` in root directory (optional, defaults work):

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Start MongoDB

**Option A: Local MongoDB**
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
# Start MongoDB service from Services
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `server/.env`

### 5. Start the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 6. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Admin Dashboard: http://localhost:5173/dashboard/login

### 7. Create First Admin User

**Option A: Using curl**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

**Option B: Using Postman or similar tool**
- POST to `http://localhost:5000/api/auth/register`
- Body (JSON):
```json
{
  "username": "admin",
  "email": "admin@example.com",
  "password": "admin123"
}
```

Then login at http://localhost:5173/dashboard/login

## Project Structure

```
ubuhle/
├── src/                    # React frontend
│   ├── components/         # Reusable components
│   ├── pages/              # Page components
│   ├── dashboard/          # Dashboard pages
│   ├── services/           # API service layer
│   ├── context/            # React Context (Auth)
│   └── data/               # Mock data (legacy)
│
├── server/                  # Express backend
│   ├── config/             # Configuration
│   ├── controllers/        # Controllers (MVC)
│   ├── models/             # Database models (MVC)
│   ├── routes/             # API routes
│   ├── middleware/         # Middleware
│   └── uploads/            # Uploaded files
│
└── public/                 # Static assets
```

## Features

### Backend
- ✅ Express.js with MVC architecture
- ✅ MongoDB with Mongoose
- ✅ JWT Authentication
- ✅ File upload (images & audio)
- ✅ RESTful API
- ✅ Protected routes
- ✅ Error handling

### Frontend
- ✅ React with React Router
- ✅ Admin Dashboard
- ✅ Protected routes
- ✅ API integration
- ✅ Toast notifications
- ✅ Responsive design

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `server/.env`
- For Atlas, ensure IP is whitelisted

### Port Already in Use
- Change `PORT` in `server/.env`
- Or kill process using port 5000

### CORS Errors
- Ensure `CLIENT_URL` in `server/.env` matches frontend URL
- Default: `http://localhost:5173`

### Authentication Issues
- Clear browser localStorage
- Check JWT token in browser DevTools
- Verify `JWT_SECRET` in `server/.env`

## Development

### Backend Development
```bash
cd server
npm run dev  # Uses nodemon for auto-reload
```

### Frontend Development
```bash
npm run dev  # Vite dev server with HMR
```

## Production Build

### Frontend
```bash
npm run build
```

### Backend
```bash
cd server
npm start
```

## License

All Rights Reserved - Momentum Code © 2025
