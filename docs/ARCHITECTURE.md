# Project Architecture

## System Overview

The AI-Based Content Moderation Platform is a full-stack web application that uses Machine Learning and Deep Learning to detect harmful content, fake news, and hate speech.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Text Analysis│  │Image Analysis│  │ Fake News    │     │
│  │    Page      │  │    Page      │  │  Detection   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                          │                                   │
│                    API Service Layer                         │
└──────────────────────────┼──────────────────────────────────┘
                           │
                    REST API (HTTP)
                           │
┌──────────────────────────┼──────────────────────────────────┐
│                    Backend (Flask)                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  API Endpoints                        │  │
│  │  /api/analyze-text  /api/analyze-image               │  │
│  │  /api/check-fake-news                                │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              ML Modules                               │  │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐   │  │
│  │  │Hate Speech  │ │Fake News    │ │Image        │   │  │
│  │  │Detector     │ │Detector     │ │Moderator    │   │  │
│  │  └─────────────┘ └─────────────┘ └─────────────┘   │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           AI/ML Models                                │  │
│  │  • BERT/DistilBERT (NLP)                             │  │
│  │  • OpenCV (Computer Vision)                          │  │
│  │  • Tesseract OCR                                     │  │
│  └──────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **Framework**: React 18
- **UI Library**: Material-UI (MUI)
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **State Management**: React Hooks

### Backend
- **Framework**: Flask (Python)
- **CORS**: Flask-CORS
- **ML/DL**: TensorFlow, PyTorch, Transformers
- **CV**: OpenCV, Pillow
- **NLP**: NLTK, spaCy
- **OCR**: Tesseract

### AI/ML Components
- **Text Classification**: BERT, DistilBERT
- **Image Processing**: OpenCV, ResNet
- **OCR**: Tesseract
- **Face Detection**: Haar Cascades

## Module Descriptions

### 1. Hate Speech Detector
**Purpose**: Detect toxic and hateful content in text

**Features**:
- Text preprocessing
- BERT-based classification
- Rule-based fallback
- Confidence scoring
- Severity levels (high/medium/low)

**Input**: Text string
**Output**: 
```json
{
  "is_hate_speech": boolean,
  "confidence": float,
  "category": string,
  "severity": string
}
```

### 2. Fake News Detector
**Purpose**: Verify news authenticity

**Features**:
- Clickbait detection
- Content credibility analysis
- Source verification
- Sensational language detection

**Input**: Title and content
**Output**:
```json
{
  "is_fake": boolean,
  "confidence": float,
  "category": string,
  "credibility_score": float,
  "recommendation": string
}
```

### 3. Image Moderator
**Purpose**: Analyze images for harmful content

**Features**:
- OCR text extraction
- Violence detection
- Face detection
- Color analysis
- Hate speech in images

**Input**: Image file
**Output**:
```json
{
  "is_safe": boolean,
  "confidence": float,
  "extracted_text": string,
  "violence_score": float,
  "warnings": array
}
```

## API Endpoints

### 1. POST /api/analyze-text
Analyze text for hate speech
- **Request**: `{ "text": "string" }`
- **Response**: Hate speech analysis result

### 2. POST /api/check-fake-news
Check news authenticity
- **Request**: `{ "title": "string", "content": "string" }`
- **Response**: Fake news analysis result

### 3. POST /api/analyze-image
Analyze image for harmful content
- **Request**: FormData with image file
- **Response**: Image analysis result

### 4. GET /api/health
Health check endpoint
- **Response**: `{ "status": "healthy" }`

## Data Flow

### Text Analysis Flow
1. User enters text in frontend
2. Frontend sends POST request to `/api/analyze-text`
3. Backend preprocesses text
4. ML model predicts hate speech
5. Result returned to frontend
6. Frontend displays results with visualization

### Image Analysis Flow
1. User uploads image
2. Frontend sends image via FormData
3. Backend saves image temporarily
4. OCR extracts text
5. CV algorithms analyze image properties
6. Combined analysis performed
7. Result returned and temp file deleted
8. Frontend displays comprehensive results

### Fake News Detection Flow
1. User enters title and content
2. Frontend sends data to backend
3. Backend analyzes clickbait patterns
4. Content credibility assessed
5. Combined score calculated
6. Result with recommendations returned
7. Frontend displays verdict with details

## Security Considerations

1. **Input Validation**: All inputs sanitized
2. **File Upload**: Size limits enforced
3. **CORS**: Configured for specific origins
4. **Rate Limiting**: To be implemented
5. **Data Privacy**: No data stored permanently

## Scalability

### Current Architecture
- Single server deployment
- Synchronous processing
- In-memory model loading

### Future Enhancements
- Microservices architecture
- Asynchronous task queue (Celery)
- Model serving with TensorFlow Serving
- Load balancing
- Caching layer (Redis)
- Database for analytics

## Performance Optimization

1. **Model Optimization**
   - Use DistilBERT instead of BERT
   - Quantization for faster inference
   - Batch processing

2. **Caching**
   - Cache frequent requests
   - Model caching in memory

3. **Async Processing**
   - Background tasks for heavy operations
   - WebSocket for real-time updates

## Deployment Architecture

### Development
- Backend: localhost:5000
- Frontend: localhost:3000

### Production
- Backend: Gunicorn + Nginx
- Frontend: Static hosting (Netlify/Vercel)
- Database: MongoDB/PostgreSQL
- Cloud: AWS/Azure/GCP

## Monitoring & Logging

- Request/Response logging
- Error tracking
- Performance metrics
- Model accuracy tracking

## Future Enhancements

1. Video content moderation
2. Real-time streaming analysis
3. Multi-language support expansion
4. Deepfake detection
5. Browser extension
6. Mobile application
7. Admin dashboard
8. User authentication
9. Content reporting system
10. Analytics dashboard
