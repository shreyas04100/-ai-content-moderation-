import requests

# Test home endpoint
print("Testing home endpoint...")
response = requests.get('http://localhost:5000/')
print(f"Status: {response.status_code}")
print(f"Response: {response.text}\n")

# Test analyze-text endpoint
print("Testing analyze-text endpoint...")
response = requests.post(
    'http://localhost:5000/api/analyze-text',
    json={'text': 'You are stupid'}
)
print(f"Status: {response.status_code}")
print(f"Response: {response.text}")
