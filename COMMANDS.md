# Commands Reference

## Quick Command Reference for Your Project

---

## 🐍 Backend Commands

### Setup & Installation
```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment (Windows)
venv\Scripts\activate

# Activate virtual environment (Linux/Mac)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Upgrade pip
pip install --upgrade pip
```

### Running Backend
```bash
# Start Flask server
python app.py

# Start with debug mode
python app.py --debug

# Run on different port
# Edit app.py: app.run(port=5001)
```

### Testing Backend Modules
```bash
# Test hate speech detector
python modules/hate_speech_detector.py

# Test fake news detector
python modules/fake_news_detector.py

# Test image moderator
python modules/image_moderator.py
```

### Package Management
```bash
# Install single package
pip install package-name

# Update requirements.txt
pip freeze > requirements.txt

# Install from requirements
pip install -r requirements.txt

# Uninstall package
pip uninstall package-name
```

---

## ⚛️ Frontend Commands

### Setup & Installation
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Install specific package
npm install package-name

# Install dev dependency
npm install --save-dev package-name
```

### Running Frontend
```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject (not recommended)
npm run eject
```

### Package Management
```bash
# Update package
npm update package-name

# Remove package
npm uninstall package-name

# Check outdated packages
npm outdated

# Clean cache
npm cache clean --force
```

---

## 🔧 Git Commands

### Initial Setup
```bash
# Initialize repository
git init

# Add remote
git remote add origin <url>

# Check status
git status
```

### Daily Workflow
```bash
# Add all files
git add .

# Add specific file
git add filename

# Commit changes
git commit -m "Your message"

# Push to remote
git push origin main

# Pull from remote
git pull origin main
```

### Branching
```bash
# Create new branch
git checkout -b feature-name

# Switch branch
git checkout branch-name

# List branches
git branch

# Merge branch
git merge branch-name

# Delete branch
git branch -d branch-name
```

---

## 🧪 Testing Commands

### Backend Testing
```bash
# Run pytest
pytest

# Run with coverage
pytest --cov

# Run specific test
pytest tests/test_file.py
```

### Frontend Testing
```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test
npm test -- TextAnalysis.test.js
```

### API Testing with curl
```bash
# Health check
curl http://localhost:5000/api/health

# Test text analysis
curl -X POST http://localhost:5000/api/analyze-text \
  -H "Content-Type: application/json" \
  -d "{\"text\":\"test message\"}"

# Test fake news
curl -X POST http://localhost:5000/api/check-fake-news \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"test\",\"content\":\"test content\"}"
```

---

## 📦 Environment Management

### Python Virtual Environment
```bash
# Create venv
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (Linux/Mac)
source venv/bin/activate

# Deactivate
deactivate

# Remove venv
rmdir /s venv  # Windows
rm -rf venv    # Linux/Mac
```

### Environment Variables
```bash
# Create .env file
copy .env.example .env  # Windows
cp .env.example .env    # Linux/Mac

# Edit .env file
notepad .env  # Windows
nano .env     # Linux/Mac
```

---

## 🗄️ Database Commands (Future)

### MongoDB
```bash
# Start MongoDB
mongod

# Connect to MongoDB
mongo

# Show databases
show dbs

# Use database
use content_moderation

# Show collections
show collections
```

### PostgreSQL
```bash
# Start PostgreSQL
pg_ctl start

# Connect to database
psql -U username -d database_name

# List databases
\l

# Connect to database
\c database_name
```

---

## 🐳 Docker Commands (Future)

### Basic Docker
```bash
# Build image
docker build -t project-name .

# Run container
docker run -p 5000:5000 project-name

# List containers
docker ps

# Stop container
docker stop container-id

# Remove container
docker rm container-id
```

### Docker Compose
```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs
```

---

## 🌐 Deployment Commands

### Heroku
```bash
# Login
heroku login

# Create app
heroku create app-name

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### AWS
```bash
# Configure AWS CLI
aws configure

# Deploy to S3
aws s3 sync build/ s3://bucket-name

# Deploy to EC2
scp -i key.pem file user@ip:/path
```

---

## 🔍 Debugging Commands

### Python Debugging
```bash
# Run with debugger
python -m pdb app.py

# Print debug info
python -v app.py

# Check syntax
python -m py_compile file.py
```

### Node Debugging
```bash
# Run with debugger
node --inspect app.js

# Check for errors
npm run lint

# Fix linting errors
npm run lint -- --fix
```

---

## 📊 Performance Commands

### Backend Performance
```bash
# Profile Python code
python -m cProfile app.py

# Memory profiling
python -m memory_profiler app.py

# Time execution
time python app.py
```

### Frontend Performance
```bash
# Analyze bundle size
npm run build -- --stats

# Lighthouse audit
lighthouse http://localhost:3000
```

---

## 🧹 Cleanup Commands

### Backend Cleanup
```bash
# Remove __pycache__
find . -type d -name __pycache__ -exec rm -r {} +

# Remove .pyc files
find . -name "*.pyc" -delete

# Clean pip cache
pip cache purge
```

### Frontend Cleanup
```bash
# Remove node_modules
rm -rf node_modules

# Remove build
rm -rf build

# Clean npm cache
npm cache clean --force
```

---

## 📝 Documentation Commands

### Generate Documentation
```bash
# Python docstrings to docs
pydoc -w module_name

# JSDoc for JavaScript
jsdoc src/**/*.js
```

---

## 🔐 Security Commands

### Check Dependencies
```bash
# Python security check
pip-audit

# Node security check
npm audit

# Fix vulnerabilities
npm audit fix
```

---

## 💾 Backup Commands

### Backup Project
```bash
# Create backup
tar -czf backup.tar.gz major/

# Extract backup
tar -xzf backup.tar.gz

# Copy to external drive
xcopy /E /I major D:\backup\major
```

---

## 🚀 Quick Start Commands

### Start Everything
```bash
# Terminal 1 - Backend
cd backend
venv\Scripts\activate
python app.py

# Terminal 2 - Frontend
cd frontend
npm start
```

### Stop Everything
```bash
# Stop backend: Ctrl+C
# Stop frontend: Ctrl+C
```

---

## 📱 Useful Shortcuts

### VS Code
- `Ctrl+P` - Quick file open
- `Ctrl+Shift+P` - Command palette
- `Ctrl+`` - Toggle terminal
- `Ctrl+/` - Toggle comment
- `Ctrl+D` - Select next occurrence
- `Alt+Up/Down` - Move line up/down

### Terminal
- `Ctrl+C` - Stop process
- `Ctrl+L` - Clear screen
- `Tab` - Auto-complete
- `Up Arrow` - Previous command
- `Ctrl+R` - Search history

---

## 🎯 Common Workflows

### Daily Development
```bash
1. git pull origin main
2. cd backend && venv\Scripts\activate && python app.py
3. cd frontend && npm start
4. Make changes
5. Test changes
6. git add .
7. git commit -m "message"
8. git push origin main
```

### Before Submission
```bash
1. Run all tests
2. Update documentation
3. Clean code
4. Create backup
5. Build production version
6. Test production build
7. Create submission package
```

---

## 📞 Help Commands

### Get Help
```bash
# Python help
python --help
pip --help

# Node help
npm --help
node --help

# Git help
git --help
git command --help

# Command manual
man command  # Linux/Mac
help command # Windows
```

---

## 🎓 Learning Commands

### Interactive Python
```bash
# Start Python REPL
python

# Start IPython
ipython

# Run Jupyter
jupyter notebook
```

### Node REPL
```bash
# Start Node REPL
node

# Run JavaScript file
node file.js
```

---

**Pro Tip**: Save this file for quick reference during development!

**Bookmark**: Keep this file open in a separate tab while coding.

---

*Last Updated: January 2024*
