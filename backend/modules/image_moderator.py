import cv2
import numpy as np
from PIL import Image
import pytesseract

class ImageModerator:
    """Analyzes images for harmful content"""
    
    def __init__(self):
        # Initialize with basic thresholds
        self.nsfw_threshold = 0.7
        self.violence_threshold = 0.6
    
    def detect_text_in_image(self, image_path):
        """Extract text from image using OCR"""
        try:
            img = Image.open(image_path)
            text = pytesseract.image_to_string(img)
            return text.strip()
        except Exception as e:
            print(f"OCR Error: {e}")
            return ""
    
    def analyze_image_properties(self, image_path):
        """Analyze basic image properties"""
        try:
            img = cv2.imread(image_path)
            
            if img is None:
                return None
            
            # Get image dimensions
            height, width, channels = img.shape
            
            # Calculate brightness
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            brightness = np.mean(gray)
            
            # Calculate color distribution
            hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
            
            # Detect red dominance (potential violence indicator)
            red_mask = cv2.inRange(hsv, np.array([0, 50, 50]), np.array([10, 255, 255]))
            red_percentage = (np.sum(red_mask > 0) / (height * width)) * 100
            
            return {
                "dimensions": f"{width}x{height}",
                "brightness": round(brightness, 2),
                "red_percentage": round(red_percentage, 2)
            }
        except Exception as e:
            print(f"Image analysis error: {e}")
            return None
    
    def detect_faces(self, image_path):
        """Detect faces in image"""
        try:
            img = cv2.imread(image_path)
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            
            # Load face cascade
            face_cascade = cv2.CascadeClassifier(
                cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
            )
            
            faces = face_cascade.detectMultiScale(gray, 1.1, 4)
            return len(faces)
        except Exception as e:
            print(f"Face detection error: {e}")
            return 0
    
    def check_violence_indicators(self, properties):
        """Check for violence indicators"""
        if not properties:
            return 0.0
        
        violence_score = 0.0
        
        # High red percentage might indicate blood/violence
        if properties['red_percentage'] > 30:
            violence_score += 0.3
        
        # Very dark images might be suspicious
        if properties['brightness'] < 50:
            violence_score += 0.2
        
        return min(violence_score, 1.0)
    
    def analyze(self, image_path):
        """Complete image analysis"""
        try:
            # Extract text from image
            extracted_text = self.detect_text_in_image(image_path)
            
            # Analyze image properties
            properties = self.analyze_image_properties(image_path)
            
            # Detect faces
            face_count = self.detect_faces(image_path)
            
            # Check for violence indicators
            violence_score = self.check_violence_indicators(properties)
            
            # Simple hate speech check in extracted text
            hate_keywords = ['hate', 'kill', 'stupid', 'ugly', 'racist']
            text_lower = extracted_text.lower()
            hate_in_text = any(keyword in text_lower for keyword in hate_keywords)
            
            # Determine if image is safe
            is_safe = violence_score < 0.5 and not hate_in_text
            
            return {
                "is_safe": is_safe,
                "confidence": round(0.7 if is_safe else 0.8, 2),
                "extracted_text": extracted_text[:200] if extracted_text else "No text found",
                "has_hate_text": hate_in_text,
                "violence_score": round(violence_score, 2),
                "face_count": face_count,
                "properties": properties,
                "warnings": self._generate_warnings(violence_score, hate_in_text, extracted_text)
            }
        
        except Exception as e:
            return {
                "error": str(e),
                "is_safe": True,
                "confidence": 0.0
            }
    
    def _generate_warnings(self, violence_score, hate_in_text, text):
        """Generate warning messages"""
        warnings = []
        
        if violence_score > 0.5:
            warnings.append("Potential violent content detected")
        
        if hate_in_text:
            warnings.append("Hate speech detected in image text")
        
        if not text:
            warnings.append("No text found in image")
        
        return warnings if warnings else ["Image appears safe"]

# Test function
if __name__ == "__main__":
    moderator = ImageModerator()
    print("Image Moderator initialized successfully")
    print("Note: Requires actual image file for testing")
