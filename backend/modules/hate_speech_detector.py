import re
import numpy as np

class HateSpeechDetector:
    """Detects hate speech and toxic content in text"""
    
    def __init__(self):
        # Use rule-based detection (transformers needs PyTorch)
        self.classifier = None
        self.hate_keywords = [
            'hate', 'kill', 'stupid', 'idiot', 'dumb', 'ugly',
            'racist', 'sexist', 'offensive', 'abuse', 'loser',
            'worthless', 'pathetic', 'disgusting', 'trash',
            'fuck', 'fucking', 'shit', 'bitch', 'bastard',
            'damn', 'hell', 'ass', 'crap', 'suck', 'sucks',
            'retard', 'moron', 'scum', 'filth', 'garbage'
        ]
    
    def preprocess_text(self, text):
        """Clean and preprocess text"""
        text = text.lower()
        text = re.sub(r'http\S+|www\S+|https\S+', '', text)  # Remove URLs
        text = re.sub(r'@\w+', '', text)  # Remove mentions
        text = re.sub(r'#\w+', '', text)  # Remove hashtags
        text = re.sub(r'[^\w\s]', '', text)  # Remove special chars
        return text.strip()
    
    def rule_based_detection(self, text):
        """Simple rule-based detection as fallback"""
        text_lower = text.lower()
        hate_score = 0
        found_keywords = []
        
        for keyword in self.hate_keywords:
            if keyword in text_lower:
                hate_score += 1
                found_keywords.append(keyword)
        
        # Calculate confidence
        confidence = min(hate_score * 0.25, 1.0)
        is_hate = confidence > 0.4
        
        return {
            "is_hate_speech": is_hate,
            "confidence": round(confidence, 2),
            "category": "hate_speech" if is_hate else "normal",
            "severity": "high" if confidence > 0.7 else "medium" if confidence > 0.4 else "low",
            "keywords_found": found_keywords
        }
    
    def predict(self, text):
        """Predict if text contains hate speech"""
        if not text or len(text.strip()) == 0:
            return {
                "is_hate_speech": False,
                "confidence": 0.0,
                "category": "empty",
                "severity": "none"
            }
        
        # Preprocess
        clean_text = self.preprocess_text(text)
        
        # Use rule-based detection
        return self.rule_based_detection(text)

# Test function
if __name__ == "__main__":
    detector = HateSpeechDetector()
    
    test_texts = [
        "I love this product, it's amazing!",
        "You are stupid and ugly",
        "This is a normal sentence",
        "I hate you so much"
    ]
    
    for text in test_texts:
        result = detector.predict(text)
        print(f"\nText: {text}")
        print(f"Result: {result}")
