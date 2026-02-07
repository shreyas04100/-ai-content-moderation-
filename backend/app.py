from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Import moderation modules
from modules.hate_speech_detector import HateSpeechDetector
from modules.fake_news_detector import FakeNewsDetector

load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize detectors
hate_detector = HateSpeechDetector()
fake_news_detector = FakeNewsDetector()

@app.route('/')
def home():
    return jsonify({
        "message": "AI Content Moderation API",
        "version": "1.0",
        "endpoints": [
            "/api/analyze-text",
            "/api/analyze-image",
            "/api/check-fake-news"
        ]
    })

@app.route('/api/analyze-text', methods=['POST'])
def analyze_text():
    """Analyze text for hate speech and toxicity"""
    try:
        data = request.json
        text = data.get('text', '')
        
        if not text:
            return jsonify({"error": "No text provided"}), 400
        
        # Detect hate speech
        hate_result = hate_detector.predict(text)
        
        return jsonify({
            "success": True,
            "text": text,
            "hate_speech": hate_result
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/check-fake-news', methods=['POST'])
def check_fake_news():
    """Check if news is fake or real"""
    try:
        data = request.json
        title = data.get('title', '')
        content = data.get('content', '')
        
        if not title and not content:
            return jsonify({"error": "No content provided"}), 400
        
        # Detect fake news
        result = fake_news_detector.predict(title, content)
        
        return jsonify({
            "success": True,
            "result": result
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/analyze-image', methods=['POST'])
def analyze_image():
    """Analyze image for harmful content"""
    return jsonify({"error": "Image analysis not available. Install opencv-python first."}), 501

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "message": "API is running"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
