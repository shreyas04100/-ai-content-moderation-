import re
import numpy as np

class FakeNewsDetector:
    """Detects fake news and misinformation"""
    
    def __init__(self):
        # Fake news indicators
        self.fake_indicators = [
            'shocking', 'unbelievable', 'you won\'t believe',
            'breaking', 'exclusive', 'leaked', 'secret',
            'doctors hate', 'one weird trick', 'miracle',
            'click here', 'share now', 'must read',
            'super power', 'cure all', 'amazing discovery',
            'scientists shocked', 'breakthrough', 'revolutionary',
            'instant', 'guaranteed', 'proven', 'magic'
        ]
        
        self.credible_sources = [
            'bbc', 'cnn', 'reuters', 'ap news', 'the guardian',
            'nyt', 'washington post', 'times of india', 'hindu'
        ]
    
    def preprocess_text(self, text):
        """Clean text"""
        text = text.lower()
        text = re.sub(r'http\S+|www\S+|https\S+', '', text)
        text = re.sub(r'[^\w\s]', ' ', text)
        return text.strip()
    
    def check_clickbait(self, title):
        """Check for clickbait patterns"""
        title_lower = title.lower()
        clickbait_score = 0
        
        for indicator in self.fake_indicators:
            if indicator in title_lower:
                clickbait_score += 1
        
        # Check for excessive punctuation
        if title.count('!') > 2 or title.count('?') > 2:
            clickbait_score += 1
        
        # Check for all caps words
        words = title.split()
        caps_words = sum(1 for word in words if word.isupper() and len(word) > 2)
        if caps_words > len(words) * 0.3:
            clickbait_score += 1
        
        return clickbait_score
    
    def analyze_content(self, content):
        """Analyze content credibility"""
        if not content:
            return 0.5
        
        content_lower = content.lower()
        
        # Check for credible sources
        credibility_score = 0
        for source in self.credible_sources:
            if source in content_lower:
                credibility_score += 0.2
        
        # Check content length (very short = suspicious)
        if len(content.split()) < 50:
            credibility_score -= 0.2
        
        # Check for sensational language
        sensational_count = sum(1 for indicator in self.fake_indicators if indicator in content_lower)
        credibility_score -= sensational_count * 0.1
        
        return max(0, min(1, 0.5 + credibility_score))
    
    def predict(self, title, content=""):
        """Predict if news is fake"""
        # If no title, use content as title
        if not title and content:
            title = content
        
        if not title and not content:
            return {
                "is_fake": False,
                "confidence": 0.0,
                "category": "insufficient_data",
                "credibility_score": 0.0,
                "clickbait_indicators": 0,
                "recommendation": "Please provide content to analyze"
            }
        
        # Analyze title
        clickbait_score = self.check_clickbait(title)
        
        # Analyze content
        content_credibility = self.analyze_content(content if content else title)
        
        # Calculate fake probability
        fake_probability = (clickbait_score * 0.15) + (1 - content_credibility)
        fake_probability = min(fake_probability, 1.0)
        
        is_fake = fake_probability > 0.6
        
        # Determine category
        if fake_probability > 0.8:
            category = "highly_likely_fake"
        elif fake_probability > 0.6:
            category = "likely_fake"
        elif fake_probability > 0.4:
            category = "uncertain"
        else:
            category = "likely_real"
        
        return {
            "is_fake": is_fake,
            "confidence": round(fake_probability, 2),
            "category": category,
            "credibility_score": round(content_credibility, 2),
            "clickbait_indicators": clickbait_score,
            "recommendation": "Verify from credible sources" if is_fake else "Appears credible",
            "details": {
                "title_analysis": f"Found {clickbait_score} clickbait indicators",
                "content_credibility": f"{int(content_credibility * 100)}% credible"
            }
        }

# Test function
if __name__ == "__main__":
    detector = FakeNewsDetector()
    
    test_cases = [
        {
            "title": "SHOCKING: You won't believe what happened next!",
            "content": "Click here to find out this one weird trick."
        },
        {
            "title": "Government announces new policy on education",
            "content": "According to Reuters, the government has announced a comprehensive education reform policy aimed at improving literacy rates."
        }
    ]
    
    for case in test_cases:
        result = detector.predict(case['title'], case['content'])
        print(f"\nTitle: {case['title']}")
        print(f"Result: {result}")
