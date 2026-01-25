# PostgreSQL Setup Guide

The application has been migrated from MongoDB to PostgreSQL using Sequelize ORM.

## Prerequisites

1. **Install PostgreSQL**
   - macOS: `brew install postgresql@14` or download from https://www.postgresql.org/download/
   - Linux: `sudo apt-get install postgresql` (Ubuntu/Debian)
   - Windows: Download from https://www.postgresql.org/download/windows/

2. **Start PostgreSQL Service**

   **macOS:**
   ```bash
   brew services start postgresql@14
   # Or
   pg_ctl -D /usr/local/var/postgres start
   ```

   **Linux:**
   ```bash
   sudo systemctl start postgresql
   sudo systemctl enable postgresql
   ```

   **Windows:**
   - Start PostgreSQL service from Services panel

## Database Setup

### 1. Create Database

Connect to PostgreSQL:
```bash
psql postgres
```

Create database and user:
```sql
-- Create database
CREATE DATABASE ubuhle;

-- Create user (optional, or use default 'postgres' user)
CREATE USER ubuhle_user WITH PASSWORD 'your_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE ubuhle TO ubuhle_user;

-- Exit
\q
```

### 2. Update .env File

Edit `server/.env`:

```env
# PostgreSQL Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ubuhle
DB_USER=postgres          # or your custom user
DB_PASSWORD=your_password # leave empty if no password
```

**For PostgreSQL with password:**
```env
DB_USER=ubuhle_user
DB_PASSWORD=your_password
```

**For default postgres user (no password):**
```env
DB_USER=postgres
DB_PASSWORD=
```

## Running the Application

### 1. Start PostgreSQL (if not running)
```bash
# Check if running
psql -U postgres -c "SELECT version();"

# If not running, start it (see Prerequisites above)
```

### 2. Start Backend Server
```bash
cd server
npm run dev
```

The server will:
- Connect to PostgreSQL
- Automatically create all tables (in development mode)
- Sync database models

### 3. Verify Connection

You should see:
```
PostgreSQL Connected Successfully
Database models synchronized
Server running in development mode on port 5000
```

## Database Tables

The following tables will be automatically created:

- `users` - Admin users
- `artists` - Artists data
- `models` - Models data
- `events` - Events data
- `songs` - Songs data
- `news` - News data

## Troubleshooting

### Connection Refused
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solution:** Ensure PostgreSQL is running
```bash
# Check status
brew services list  # macOS
sudo systemctl status postgresql  # Linux
```

### Authentication Failed
```
Error: password authentication failed
```
**Solution:** 
1. Check username/password in `.env`
2. Verify PostgreSQL user exists
3. Check `pg_hba.conf` for authentication settings

### Database Does Not Exist
```
Error: database "ubuhle" does not exist
```
**Solution:** Create the database (see Database Setup above)

### Permission Denied
```
Error: permission denied for database
```
**Solution:** Grant privileges to your user:
```sql
GRANT ALL PRIVILEGES ON DATABASE ubuhle TO your_user;
```

## Using PostgreSQL with Docker (Alternative)

If you prefer Docker:

```bash
# Run PostgreSQL in Docker
docker run --name ubuhle-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=ubuhle \
  -p 5432:5432 \
  -d postgres:14

# Update .env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ubuhle
DB_USER=postgres
DB_PASSWORD=postgres
```

## Migration Notes

### Key Changes from MongoDB:
- `_id` → `id` (integer, auto-increment)
- Mongoose → Sequelize ORM
- NoSQL → SQL relational database
- JSON documents → Relational tables

### Model Changes:
- All models now use Sequelize syntax
- Foreign keys properly defined (e.g., Song → Artist)
- Associations set up for relationships
- Timestamps automatically managed

## Production Considerations

For production:
1. Use connection pooling (already configured)
2. Set `NODE_ENV=production`
3. Disable auto-sync (remove `sequelize.sync()`)
4. Use migrations instead of `sync()`
5. Set strong `JWT_SECRET`
6. Use environment-specific database credentials

## Next Steps

1. ✅ Install PostgreSQL
2. ✅ Create database
3. ✅ Update `.env` file
4. ✅ Start PostgreSQL service
5. ✅ Run `npm run dev` in server directory
6. ✅ Verify connection success
7. ✅ Create first admin user via API

Your application is now using PostgreSQL! 🎉
