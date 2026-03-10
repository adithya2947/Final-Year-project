# Flask Backend API

This is the Flask backend for the Next.js frontend project.

## Setup Instructions

### 1. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 2. Set Up Environment Variables

Copy the `.env` file and update the values:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:
- `SECRET_KEY`: Change this to a secure random string
- `DATABASE_URL`: Database connection string (default: SQLite)

### 3. Run the Backend

```bash
# From the backend directory
python run.py
```

Or using Flask directly:

```bash
flask run --host=0.0.0.0 --port=5000
```

## API Endpoints

### Base URL: `http://localhost:5000`

### General
- `GET /` - API status
- `GET /api/health` - Health check

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user

### Analytics
- `GET /api/analytics` - Get analytics data
- `POST /api/analytics` - Create analytics entry

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

### Recommendations
- `GET /api/recommendations` - Get recommendations

## Database

The app uses SQLAlchemy ORM with SQLite by default. The database file (`app.db`) will be created automatically on first run.

## CORS

The backend is configured to accept requests from:
- `http://localhost:3000`
- `http://127.0.0.1:3000`

## Development

For development with hot reload:

```bash
export FLASK_ENV=development
export FLASK_DEBUG=True
python run.py
```

## Production

For production deployment:
1. Set `FLASK_ENV=production`
2. Use a production database (PostgreSQL/MySQL)
3. Set a strong `SECRET_KEY`
4. Use a WSGI server like Gunicorn:

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 run:app
```
