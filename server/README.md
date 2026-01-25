# Backend Server - Ubuhle Bekonjana

Express.js backend with MVC architecture for the Ubuhle Bekonjana application.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the `server` directory with the following:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/ubuhle

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# CORS
CLIENT_URL=http://localhost:5173
```

### 3. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# macOS (if installed via Homebrew)
brew services start mongodb-community

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env with your Atlas connection string
```

### 4. Run the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register admin user
- `POST /api/auth/login` - Login admin
- `GET /api/auth/me` - Get current user (protected)

### Artists
- `GET /api/artists` - Get all artists
- `GET /api/artists/:id` - Get single artist
- `POST /api/artists` - Create artist (admin only)
- `PUT /api/artists/:id` - Update artist (admin only)
- `DELETE /api/artists/:id` - Delete artist (admin only)

### Models
- `GET /api/models` - Get all models
- `GET /api/models/:id` - Get single model
- `POST /api/models` - Create model (admin only)
- `PUT /api/models/:id` - Update model (admin only)
- `DELETE /api/models/:id` - Delete model (admin only)

### Events
- `GET /api/events` - Get all events
- `GET /api/events/upcoming` - Get upcoming events
- `GET /api/events/past` - Get past events
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create event (admin only)
- `PUT /api/events/:id` - Update event (admin only)
- `DELETE /api/events/:id` - Delete event (admin only)

### Songs
- `GET /api/songs` - Get all songs
- `GET /api/songs/artist/:artistId` - Get songs by artist
- `GET /api/songs/:id` - Get single song
- `POST /api/songs` - Create song (admin only)
- `PUT /api/songs/:id` - Update song (admin only)
- `DELETE /api/songs/:id` - Delete song (admin only)

### News
- `GET /api/news` - Get all news
- `GET /api/news/:id` - Get single news
- `POST /api/news` - Create news (admin only)
- `PUT /api/news/:id` - Update news (admin only)
- `DELETE /api/news/:id` - Delete news (admin only)

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics (admin only)
- `GET /api/dashboard/recent` - Get recent activity (admin only)

### Upload
- `POST /api/upload/image` - Upload image (admin only)
- `POST /api/upload/audio` - Upload audio (admin only)

## Creating First Admin User

You can create the first admin user by making a POST request to `/api/auth/register`:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "yourpassword"
  }'
```

Or use the frontend registration (if implemented) or a tool like Postman.

## Project Structure

```
server/
├── config/          # Configuration files
├── controllers/     # Route controllers (MVC)
├── models/          # Database models (MVC)
├── routes/          # API routes
├── middleware/      # Custom middleware
├── utils/          # Utility functions
├── uploads/         # Uploaded files
├── server.js        # Entry point
└── package.json
```

## Technologies Used

- Express.js - Web framework
- MongoDB - Database
- Mongoose - ODM
- JWT - Authentication
- Multer - File uploads
- bcryptjs - Password hashing
