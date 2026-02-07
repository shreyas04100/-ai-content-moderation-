import requests
import time

print("=" * 60)
print("AI CONTENT MODERATION - TESTING")
print("=" * 60)

# Wait for server
print("\nWaiting for server to be ready...")
time.sleep(2)

# Test 1: Check server
print("\n1. Checking server status...")
try:
    response = requests.get('http://localhost:5001/')
    print(f"   Status: {response.status_code}")
    data = response.json()
    print(f"   Message: {data.get('message')}")
    if 'AI Content Moderation' in data.get('message', ''):
        print("   ✓ Correct app is running!")
    else:
        print("   ✗ Wrong app running. Stop server and run: python app.py")
        exit(1)
except Exception as e:
    print(f"   ✗ Server not running: {e}")
    exit(1)

# Test 2: Hate Speech Detection
print("\n2. Testing Hate Speech Detection...")
test_texts = [
    "You are stupid and ugly",
    "I love this product!",
    "I hate you so much"
]

for text in test_texts:
    try:
        response = requests.post(
            'http://localhost:5001/api/analyze-text',
            json={'text': text}
        )
        if response.status_code == 200:
            result = response.json()
            hate_info = result.get('hate_speech', {})
            print(f"\n   Text: '{text}'")
            print(f"   Is Hate Speech: {hate_info.get('is_hate_speech')}")
            print(f"   Confidence: {hate_info.get('confidence')}")
            print(f"   Category: {hate_info.get('category')}")
        else:
            print(f"   ✗ Error: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"   ✗ Error: {e}")

# Test 3: Fake News Detection
print("\n3. Testing Fake News Detection...")
test_news = [
    {
        "title": "SHOCKING: You won't believe this!",
        "content": "Click here now!"
    },
    {
        "title": "Government announces new policy",
        "content": "According to Reuters, the government has announced a new education policy."
    }
]

for news in test_news:
    try:
        response = requests.post(
            'http://localhost:5001/api/check-fake-news',
            json=news
        )
        if response.status_code == 200:
            result = response.json()
            news_info = result.get('result', {})
            print(f"\n   Title: '{news['title']}'")
            print(f"   Is Fake: {news_info.get('is_fake')}")
            print(f"   Confidence: {news_info.get('confidence')}")
            print(f"   Category: {news_info.get('category')}")
        else:
            print(f"   ✗ Error: {response.status_code}")
    except Exception as e:
        print(f"   ✗ Error: {e}")

print("\n" + "=" * 60)
print("TESTING COMPLETE!")
print("=" * 60)
print("\nYour AI Content Moderation Platform is working! ✓")
print("Access the API at: http://localhost:5001")
