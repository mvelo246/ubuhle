# Backend Implementation Plan - Express.js with MVC Architecture

## 📋 Overview
Transform the frontend-only application into a full-stack application with Express.js backend following MVC design principles, including a secure admin dashboard.

---

## 🏗️ Architecture Overview

### Project Structure
```
ubuhle/
├── client/                    # React frontend (existing)
│   └── src/
│
├── server/                    # Express.js backend (NEW)
│   ├── config/                # Configuration files
│   │   ├── database.js        # DB connection
│   │   ├── multer.js          # File upload config
│   │   └── auth.js            # JWT config
│   │
│   ├── controllers/           # Controllers (MVC)
│   │   ├── authController.js
│   │   ├── artistController.js
│   │   ├── modelController.js
│   │   ├── eventController.js
│   │   ├── songController.js
│   │   ├── newsController.js
│   │   └── dashboardController.js
│   │
│   ├── models/                # Database models (MVC)
│   │   ├── User.js
│   │   ├── Artist.js
│   │   ├── Model.js
│   │   ├── Event.js
│   │   ├── Song.js
│   │   └── News.js
│   │
│   ├── routes/                # API routes
│   │   ├── authRoutes.js
│   │   ├── artistRoutes.js
│   │   ├── modelRoutes.js
│   │   ├── eventRoutes.js
│   │   ├── songRoutes.js
│   │   ├── newsRoutes.js
│   │   └── dashboardRoutes.js
│   │
│   ├── middleware/            # Custom middleware
│   │   ├── auth.js            # JWT authentication
│   │   ├── upload.js          # File upload handling
│   │   ├── validation.js      # Input validation
│   │   └── errorHandler.js    # Error handling
│   │
│   ├── utils/                 # Utility functions
│   │   ├── logger.js
│   │   └── helpers.js
│   │
│   ├── uploads/               # Uploaded files
│   │   ├── images/
│   │   └── audio/
│   │
│   ├── .env                   # Environment variables
│   ├── server.js              # Entry point
│   └── package.json
│
└── package.json               # Root package.json (optional)
```

---

## 🗄️ Database Schema Design

### Technology Choice
**MongoDB with Mongoose** (recommended for flexibility) OR **PostgreSQL with Sequelize** (for relational data)

### Models

#### 1. User Model
```javascript
{
  username: String (unique, required),
  email: String (unique, required),
  password: String (hashed, required),
  role: String (enum: ['admin', 'user']),
  createdAt: Date,
  updatedAt: Date
}
```

#### 2. Artist Model
```javascript
{
  name: String (required),
  image: String (URL or file path),
  bio: String,
  email: String,
  phone: String,
  socialLinks: {
    facebook: String,
    instagram: String,
    twitter: String,
    tiktok: String,
  },
  createdAt: Date,
  updatedAt: Date
}
```

#### 3. Model Model (Fashion Model)
```javascript
{
  name: String (required),
  image: String (URL or file path),
  bio: String,
  gallery: [String], // Array of image URLs
  createdAt: Date,
  updatedAt: Date,
  socialLinks: {
    facebook: String,
    instagram: String,
    twitter: String,
    tiktok: String,
  },
}
```

#### 4. Event Model
```javascript
{
  title: String (required),
  date: Date (required),
  image: String (URL or file path),
  description: String,
  status: String (enum: ['upcoming', 'past']),
  location: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### 5. Song Model
```javascript
{
  name: String (required),
  artist: ObjectId (ref: 'Artist'),
  image: String (URL or file path),
  audioUrl: String (URL or file path),
  duration: Number, // in seconds
  createdAt: Date,
  updatedAt: Date
}
```

#### 6. News Model
```javascript
{
  title: String (required),
  description: String (required),
  image: String (URL or file path),
  date: Date,
  link: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔌 API Endpoints Design

### Authentication Routes (`/api/auth`)
- `POST /api/auth/register` - Register admin user
- `POST /api/auth/login` - Login admin
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Artist Routes (`/api/artists`)
- `GET /api/artists` - Get all artists (public)
- `GET /api/artists/:id` - Get single artist (public)
- `POST /api/artists` - Create artist (admin only)
- `PUT /api/artists/:id` - Update artist (admin only)
- `DELETE /api/artists/:id` - Delete artist (admin only)

### Model Routes (`/api/models`)
- `GET /api/models` - Get all models (public)
- `GET /api/models/:id` - Get single model (public)
- `POST /api/models` - Create model (admin only)
- `PUT /api/models/:id` - Update model (admin only)
- `DELETE /api/models/:id` - Delete model (admin only)

### Event Routes (`/api/events`)
- `GET /api/events` - Get all events (public)
- `GET /api/events/upcoming` - Get upcoming events (public)
- `GET /api/events/past` - Get past events (public)
- `GET /api/events/:id` - Get single event (public)
- `POST /api/events` - Create event (admin only)
- `PUT /api/events/:id` - Update event (admin only)
- `DELETE /api/events/:id` - Delete event (admin only)

### Song Routes (`/api/songs`)
- `GET /api/songs` - Get all songs (public)
- `GET /api/songs/artist/:artistId` - Get songs by artist (public)
- `POST /api/songs` - Create song (admin only)
- `PUT /api/songs/:id` - Update song (admin only)
- `DELETE /api/songs/:id` - Delete song (admin only)

### News Routes (`/api/news`)
- `GET /api/news` - Get all news (public)
- `GET /api/news/:id` - Get single news (public)
- `POST /api/news` - Create news (admin only)
- `PUT /api/news/:id` - Update news (admin only)
- `DELETE /api/news/:id` - Delete news (admin only)

### Dashboard Routes (`/api/dashboard`)
- `GET /api/dashboard/stats` - Get dashboard statistics (admin only)
- `GET /api/dashboard/recent` - Get recent activity (admin only)

---

## 🔐 Authentication & Authorization

### Technology
- **JWT (JSON Web Tokens)** for authentication
- **bcrypt** for password hashing
- **express-session** (optional, for session-based auth)

### Middleware Flow
1. User logs in → JWT token generated
2. Token stored in localStorage (frontend) or httpOnly cookie
3. Protected routes require `Authorization: Bearer <token>` header
4. Middleware validates token and attaches user to request

### Protected Routes
- All POST, PUT, DELETE operations require admin authentication
- GET routes are public (except dashboard stats)

---

## 📁 File Upload System

### Technology
- **Multer** for handling multipart/form-data
- **Cloudinary** (optional) for cloud storage OR local storage

### Upload Endpoints
- `POST /api/upload/image` - Upload image (admin only)
- `POST /api/upload/audio` - Upload audio file (admin only)

### File Structure
```
uploads/
├── images/
│   ├── artists/
│   ├── models/
│   ├── events/
│   └── news/
└── audio/
    └── songs/
```

---

## 🎨 Admin Dashboard Enhancements

### New Features to Add

1. **Login Page**
   - Email/password authentication
   - Remember me option
   - Forgot password (future)

2. **Protected Dashboard Routes**
   - Redirect to login if not authenticated
   - Token refresh mechanism

3. **Enhanced CRUD Operations**
   - Real API calls instead of local state
   - Loading states
   - Error handling
   - Success notifications

4. **File Upload UI**
   - Image upload with preview
   - Audio upload for songs
   - Progress indicators

5. **Advanced Features**
   - Bulk operations (delete multiple)
   - Export data (CSV/JSON)
   - Activity logs
   - User management (if multiple admins)

---

## 📦 Dependencies to Install

### Backend Dependencies
```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.0", // or "sequelize" + "pg" for PostgreSQL
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "dotenv": "^16.3.1",
  "cors": "^2.8.5",
  "multer": "^1.4.5-lts.1",
  "express-validator": "^7.0.1",
  "helmet": "^7.1.0",
  "morgan": "^1.10.0",
  "compression": "^1.7.4"
}
```

### Frontend Dependencies (to add)
```json
{
  "axios": "^1.6.2",
  "react-query": "^3.39.3", // or "@tanstack/react-query"
  "react-toastify": "^9.1.3"
}
```

---

## 🔄 Frontend Integration Plan

### 1. API Service Layer
Create `src/services/api.js`:
- Axios instance with base URL
- Request interceptors (add auth token)
- Response interceptors (handle errors)

### 2. Custom Hooks
- `useAuth.js` - Authentication state management
- `useArtists.js` - Artists CRUD operations
- `useModels.js` - Models CRUD operations
- `useEvents.js` - Events CRUD operations

### 3. Context API
- `AuthContext.js` - Global authentication state
- `AppContext.js` - Global app state (optional)

### 4. Update Dashboard Pages
- Replace `useState` with API calls
- Add loading states
- Add error handling
- Add success notifications

---

## 🚀 Implementation Phases

### Phase 1: Backend Setup (Week 1)
- [ ] Initialize Express.js server
- [ ] Setup MongoDB/PostgreSQL connection
- [ ] Create database models
- [ ] Setup environment variables
- [ ] Create basic server structure

### Phase 2: Authentication (Week 1)
- [ ] Implement JWT authentication
- [ ] Create auth routes and controllers
- [ ] Add authentication middleware
- [ ] Create login/register endpoints

### Phase 3: CRUD APIs (Week 2)
- [ ] Artist CRUD endpoints
- [ ] Model CRUD endpoints
- [ ] Event CRUD endpoints
- [ ] Song CRUD endpoints
- [ ] News CRUD endpoints

### Phase 4: File Upload (Week 2)
- [ ] Setup Multer
- [ ] Create upload endpoints
- [ ] Handle image uploads
- [ ] Handle audio uploads

### Phase 5: Frontend Integration (Week 3)
- [ ] Create API service layer
- [ ] Create authentication context
- [ ] Update dashboard pages
- [ ] Add login page
- [ ] Add protected routes

### Phase 6: Testing & Polish (Week 3)
- [ ] Test all endpoints
- [ ] Add error handling
- [ ] Add loading states
- [ ] Add notifications
- [ ] Security audit

---

## 🔒 Security Considerations

1. **Password Security**
   - Hash passwords with bcrypt (salt rounds: 10+)
   - Never store plain text passwords

2. **JWT Security**
   - Use strong secret key
   - Set appropriate expiration times
   - Store tokens securely (httpOnly cookies preferred)

3. **Input Validation**
   - Validate all user inputs
   - Sanitize data before storing
   - Use express-validator

4. **File Upload Security**
   - Validate file types
   - Limit file sizes
   - Scan for malware (optional)

5. **API Security**
   - Rate limiting
   - CORS configuration
   - Helmet.js for security headers
   - SQL injection prevention (if using SQL)

---

## 📝 Environment Variables

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/ubuhle
# OR for PostgreSQL:
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=ubuhle
# DB_USER=postgres
# DB_PASSWORD=password

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=7d

# File Upload
MAX_FILE_SIZE=5242880 # 5MB
UPLOAD_PATH=./uploads

# CORS
CLIENT_URL=http://localhost:5173
```

---

## 🧪 Testing Strategy

### Backend Testing
- Unit tests for controllers
- Integration tests for routes
- Database tests for models

### Frontend Testing
- Component tests
- API integration tests
- E2E tests for critical flows

---

## 📊 Database Migration Strategy

### Option 1: Seed Script
- Create seed script to populate initial data
- Migrate existing mock data to database

### Option 2: Manual Migration
- Export mock data to JSON
- Import into database via script

---

## 🎯 Success Criteria

1. ✅ All CRUD operations work with database
2. ✅ Admin authentication is secure
3. ✅ File uploads work correctly
4. ✅ Frontend successfully communicates with backend
5. ✅ Dashboard shows real-time data
6. ✅ Public pages load data from API
7. ✅ Error handling is comprehensive
8. ✅ Application is production-ready

---

## 📚 Additional Resources

- Express.js Documentation: https://expressjs.com/
- Mongoose Documentation: https://mongoosejs.com/
- JWT Best Practices: https://jwt.io/introduction
- Multer Documentation: https://github.com/expressjs/multer

---

## 🚦 Next Steps

1. Review and approve this plan
2. Choose database (MongoDB or PostgreSQL)
3. Start with Phase 1: Backend Setup
4. Iterate through each phase
5. Test thoroughly before moving to next phase

---

**Ready to start implementation?** Let me know which database you prefer (MongoDB or PostgreSQL) and I'll begin with Phase 1!
