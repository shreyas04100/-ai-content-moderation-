# Installation Guide

## Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher
- pip (Python package manager)
- npm (Node package manager)

## Backend Setup

### 1. Navigate to backend directory
```bash
cd backend
```

### 2. Create virtual environment (recommended)
```bash
python -m venv venv
```

### 3. Activate virtual environment
**Windows:**
```bash
venv\Scripts\activate
```

**Linux/Mac:**
```bash
source venv/bin/activate
```

### 4. Install dependencies
```bash
pip install -r requirements.txt
```

### 5. Download required NLTK data (optional)
```python
python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords')"
```

### 6. Create .env file
```bash
copy .env.example .env
```
Edit .env file with your configurations.

### 7. Run the backend server
```bash
python app.py
```

Backend will run on: http://localhost:5000

## Frontend Setup

### 1. Navigate to frontend directory
```bash
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm start
```

Frontend will run on: http://localhost:3000

## Testing the Application

1. Open browser and go to http://localhost:3000
2. Try the different features:
   - Text Analysis
   - Image Analysis
   - Fake News Detection

## Troubleshooting

### Backend Issues

**Issue: Module not found**
```bash
pip install --upgrade -r requirements.txt
```

**Issue: Port 5000 already in use**
- Change port in app.py: `app.run(port=5001)`

### Frontend Issues

**Issue: npm install fails**
```bash
npm cache clean --force
npm install
```

**Issue: Cannot connect to backend**
- Check if backend is running on port 5000
- Check CORS settings in backend

## Production Deployment

### Backend
```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Frontend
```bash
npm run build
```

Deploy the `build` folder to your hosting service.

## Docker Deployment (Optional)

Coming soon...

## Notes

- For development, both backend and frontend must be running
- Backend API runs on port 5000
- Frontend runs on port 3000
- Make sure Python and Node.js are properly installed
