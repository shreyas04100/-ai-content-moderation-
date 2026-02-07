# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites Check
```bash
python --version  # Should be 3.8+
node --version    # Should be 16+
npm --version
```

### Step 1: Clone/Download Project
```bash
cd Desktop/major
```

### Step 2: Backend Setup (Terminal 1)
```bash
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
pip install -r requirements.txt
python app.py
```

✅ Backend running at: http://localhost:5000

### Step 3: Frontend Setup (Terminal 2)
```bash
cd frontend
npm install
npm start
```

✅ Frontend running at: http://localhost:3000

### Step 4: Test the Application

Open browser: http://localhost:3000

**Try Text Analysis:**
1. Click "Text Analysis"
2. Enter: "I hate you so much"
3. Click "Analyze Text"
4. See results!

**Try Fake News Detection:**
1. Click "Fake News Detection"
2. Enter title: "SHOCKING: You won't believe this!"
3. Enter content: "Click here now!"
4. Click "Check Authenticity"
5. See results!

**Try Image Analysis:**
1. Click "Image Analysis"
2. Upload any image
3. Click "Analyze Image"
4. See results!

---

## 🔧 Troubleshooting

### Backend won't start?
```bash
# Try installing dependencies again
pip install --upgrade pip
pip install -r requirements.txt
```

### Frontend won't start?
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules
npm install
```

### Can't connect to backend?
- Check if backend is running on port 5000
- Check firewall settings
- Try: http://127.0.0.1:5000/api/health

---

## 📝 Quick Commands

### Backend
```bash
# Start server
python app.py

# Test hate speech detector
python modules/hate_speech_detector.py

# Test fake news detector
python modules/fake_news_detector.py
```

### Frontend
```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

---

## 🎯 Next Steps

1. ✅ Read INSTALLATION.md for detailed setup
2. ✅ Check ARCHITECTURE.md to understand the system
3. ✅ Review ROADMAP.md for project timeline
4. ✅ Explore data/DATASETS.md for dataset information
5. ✅ Start customizing and improving!

---

## 📚 Important Files

- `backend/app.py` - Main Flask application
- `backend/modules/` - ML modules
- `frontend/src/App.js` - Main React component
- `frontend/src/pages/` - Page components
- `docs/` - All documentation

---

## 🆘 Need Help?

1. Check documentation in `docs/` folder
2. Read error messages carefully
3. Google the error
4. Ask your project guide
5. Check Stack Overflow

---

## ✨ Features to Try

- [x] Hate speech detection
- [x] Fake news detection
- [x] Image analysis
- [ ] Video analysis (Phase 2)
- [ ] Browser extension (Phase 2)
- [ ] Mobile app (Phase 2)

---

## 🎓 For VTU Submission

### Phase 1 Checklist:
- [ ] Working prototype
- [ ] Project report
- [ ] Presentation slides
- [ ] Demo video
- [ ] Source code on GitHub

### Phase 2 Checklist:
- [ ] Complete application
- [ ] Final report
- [ ] Research paper
- [ ] Deployed application
- [ ] User manual

---

## 🌟 Tips for Success

1. **Test frequently** - Don't wait till the end
2. **Document everything** - Write as you code
3. **Commit regularly** - Use Git properly
4. **Ask questions** - Don't struggle alone
5. **Start early** - Don't procrastinate

---

## 📞 Support

For project-related queries:
- Check documentation first
- Consult with team members
- Ask project guide
- Use online resources

---

**Good luck with your project! 🚀**
