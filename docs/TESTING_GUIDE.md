# Testing Guide

## Testing Strategy for Content Moderation Platform

---

## 1. Unit Testing

### Backend Module Tests

#### Test Hate Speech Detector
```python
# Run from backend directory
python modules/hate_speech_detector.py

# Expected output: Test results for sample texts
```

**Test Cases:**
```python
test_cases = [
    ("I love this product!", False),  # Safe
    ("You are stupid and ugly", True),  # Hate speech
    ("This is a normal sentence", False),  # Safe
    ("I hate you so much", True),  # Hate speech
]
```

#### Test Fake News Detector
```python
python modules/fake_news_detector.py

# Test with sample news articles
```

**Test Cases:**
- Clickbait title → Should detect as fake
- Credible news → Should detect as real
- Mixed signals → Should show uncertainty

#### Test Image Moderator
```python
python modules/image_moderator.py

# Requires sample images
```

---

## 2. API Testing

### Using Postman

#### Test 1: Health Check
```
GET http://localhost:5000/api/health
Expected: { "status": "healthy" }
```

#### Test 2: Text Analysis
```
POST http://localhost:5000/api/analyze-text
Headers: Content-Type: application/json
Body:
{
  "text": "You are stupid"
}

Expected Response:
{
  "success": true,
  "hate_speech": {
    "is_hate_speech": true,
    "confidence": 0.88,
    "category": "hate_speech",
    "severity": "high"
  }
}
```

#### Test 3: Fake News Check
```
POST http://localhost:5000/api/check-fake-news
Headers: Content-Type: application/json
Body:
{
  "title": "SHOCKING: You won't believe this!",
  "content": "Click here to find out..."
}

Expected: Fake news detected
```

#### Test 4: Image Analysis
```
POST http://localhost:5000/api/analyze-image
Headers: Content-Type: multipart/form-data
Body: Form-data with image file

Expected: Image analysis results
```

---

## 3. Frontend Testing

### Manual Testing Checklist

#### Home Page
- [ ] Page loads correctly
- [ ] All three feature cards visible
- [ ] Navigation buttons work
- [ ] Responsive design works

#### Text Analysis Page
- [ ] Text input field works
- [ ] Analyze button functional
- [ ] Loading state shows
- [ ] Results display correctly
- [ ] Error handling works
- [ ] Back button works

#### Image Analysis Page
- [ ] File upload works
- [ ] Image preview shows
- [ ] Analyze button functional
- [ ] Results display correctly
- [ ] Supports multiple formats (jpg, png)

#### Fake News Detection Page
- [ ] Title and content inputs work
- [ ] Check button functional
- [ ] Results display correctly
- [ ] Confidence visualization works

---

## 4. Integration Testing

### End-to-End Test Scenarios

#### Scenario 1: Complete Text Analysis Flow
1. Start backend server
2. Start frontend server
3. Navigate to Text Analysis
4. Enter test text
5. Click Analyze
6. Verify results appear
7. Check console for errors

#### Scenario 2: Image Upload and Analysis
1. Navigate to Image Analysis
2. Select image file
3. Verify preview appears
4. Click Analyze
5. Wait for processing
6. Verify results
7. Try different image

#### Scenario 3: Fake News Detection
1. Navigate to Fake News page
2. Enter title and content
3. Click Check Authenticity
4. Verify verdict
5. Check confidence score
6. Verify recommendations

---

## 5. Performance Testing

### Response Time Tests

```bash
# Using curl to test response time
time curl -X POST http://localhost:5000/api/analyze-text \
  -H "Content-Type: application/json" \
  -d '{"text":"test message"}'
```

**Expected Response Times:**
- Text Analysis: < 2 seconds
- Image Analysis: < 5 seconds
- Fake News Check: < 3 seconds

### Load Testing (Optional)

```bash
# Using Apache Bench
ab -n 100 -c 10 http://localhost:5000/api/health
```

---

## 6. Error Handling Tests

### Test Invalid Inputs

#### Empty Text
```json
POST /api/analyze-text
{ "text": "" }
Expected: Error message
```

#### Missing Fields
```json
POST /api/check-fake-news
{ "title": "" }
Expected: Error message
```

#### Invalid Image Format
```
POST /api/analyze-image
Upload: .txt file
Expected: Error message
```

#### Large File
```
POST /api/analyze-image
Upload: 50MB image
Expected: File size error
```

---

## 7. Browser Compatibility Testing

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Safari (if available)

---

## 8. Responsive Design Testing

Test on different screen sizes:
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

---

## 9. Security Testing

### Basic Security Checks

- [ ] CORS properly configured
- [ ] No sensitive data in responses
- [ ] File upload size limits enforced
- [ ] Input sanitization working
- [ ] No SQL injection vulnerabilities
- [ ] XSS protection enabled

---

## 10. Accuracy Testing

### Hate Speech Detection

**Test Dataset:**
- 100 hate speech samples
- 100 normal text samples

**Metrics to Calculate:**
- Accuracy
- Precision
- Recall
- F1-Score
- Confusion Matrix

### Fake News Detection

**Test Dataset:**
- 50 fake news articles
- 50 real news articles

**Metrics:**
- Accuracy
- False Positive Rate
- False Negative Rate

### Image Analysis

**Test Dataset:**
- 30 safe images
- 30 unsafe images

**Metrics:**
- Accuracy
- Detection rate

---

## 11. User Acceptance Testing (UAT)

### Test with Real Users

**Feedback Form:**
1. Is the interface easy to use? (1-5)
2. Are results accurate? (1-5)
3. Is response time acceptable? (1-5)
4. Any suggestions for improvement?

**Test Users:**
- 5-10 people
- Different backgrounds
- Collect feedback

---

## 12. Regression Testing

After any code changes:
- [ ] Run all unit tests
- [ ] Test all API endpoints
- [ ] Verify frontend functionality
- [ ] Check for new bugs

---

## 13. Test Data

### Sample Hate Speech Texts
```
1. "I love this product!" (Safe)
2. "You are stupid and ugly" (Hate)
3. "Kill all [group]" (Hate)
4. "This is amazing work" (Safe)
5. "I hate you so much" (Hate)
```

### Sample Fake News Titles
```
1. "SHOCKING: You won't believe what happened!"
2. "Government announces new policy"
3. "One weird trick doctors hate"
4. "Study shows benefits of exercise"
5. "BREAKING: Celebrity scandal exposed!"
```

### Sample Images
- Safe: Landscapes, food, animals
- Unsafe: Violence, weapons, hate symbols

---

## 14. Automated Testing (Future)

### Backend Tests
```python
# tests/test_hate_speech.py
import pytest
from modules.hate_speech_detector import HateSpeechDetector

def test_hate_speech_detection():
    detector = HateSpeechDetector()
    result = detector.predict("You are stupid")
    assert result['is_hate_speech'] == True
```

### Frontend Tests
```javascript
// tests/TextAnalysis.test.js
import { render, screen } from '@testing-library/react';
import TextAnalysis from './pages/TextAnalysis';

test('renders text analysis page', () => {
  render(<TextAnalysis />);
  const element = screen.getByText(/Analyze Text/i);
  expect(element).toBeInTheDocument();
});
```

---

## 15. Bug Tracking

### Bug Report Template
```
Title: [Brief description]
Severity: Critical/High/Medium/Low
Steps to Reproduce:
1. 
2. 
3. 
Expected Result:
Actual Result:
Screenshots:
Environment: Browser, OS
```

---

## 16. Test Results Documentation

### Test Report Template
```
Date: [Date]
Tester: [Name]
Module: [Module Name]

Test Cases Executed: X
Passed: Y
Failed: Z
Pass Rate: Y/X * 100%

Issues Found:
1. 
2. 

Recommendations:
1. 
2. 
```

---

## 17. Continuous Testing

### Daily Checks
- [ ] Backend server starts
- [ ] Frontend builds successfully
- [ ] All API endpoints respond
- [ ] No console errors

### Weekly Checks
- [ ] Run full test suite
- [ ] Check performance metrics
- [ ] Review error logs
- [ ] Update test cases

---

## 18. Pre-Deployment Checklist

Before deploying:
- [ ] All tests passing
- [ ] No critical bugs
- [ ] Performance acceptable
- [ ] Security checks done
- [ ] Documentation updated
- [ ] Backup created

---

## 19. Testing Tools

**Recommended Tools:**
- Postman (API testing)
- Chrome DevTools (Frontend debugging)
- pytest (Python testing)
- Jest (React testing)
- Lighthouse (Performance)

---

## 20. Common Issues & Solutions

### Issue 1: Backend not responding
**Solution:** Check if Flask server is running on port 5000

### Issue 2: CORS errors
**Solution:** Verify Flask-CORS is installed and configured

### Issue 3: Model loading errors
**Solution:** Check if transformers library is installed

### Issue 4: Image upload fails
**Solution:** Check file size and format

### Issue 5: Slow response
**Solution:** Optimize model, use caching

---

## Testing Best Practices

1. **Test Early, Test Often**
2. **Automate Where Possible**
3. **Document All Tests**
4. **Test Edge Cases**
5. **Keep Test Data Separate**
6. **Review Test Results**
7. **Fix Bugs Immediately**
8. **Retest After Fixes**

---

## Conclusion

Regular testing ensures:
- ✅ High quality code
- ✅ Fewer bugs in production
- ✅ Better user experience
- ✅ Confident deployment
- ✅ Successful project

---

**Remember:** Testing is not a one-time activity. It's continuous throughout development!
