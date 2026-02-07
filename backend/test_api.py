import requests

# Test hate speech detection
response = requests.post(
    'http://localhost:5000/api/analyze-text',
    json={'text': 'You are stupid and ugly'}
)
print("Hate Speech Test:")
print(f"Status: {response.status_code}")
print(f"Response: {response.text}")
if response.status_code == 200:
    print(response.json())
else:
    print(f"Error: {response.text}")

# Test fake news detection
response = requests.post(
    'http://localhost:5000/api/check-fake-news',
    json={
        'title': 'SHOCKING: You won\'t believe this!',
        'content': 'Click here now!'
    }
)
print("\nFake News Test:")
print(response.json())
