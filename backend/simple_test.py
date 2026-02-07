import requests

try:
    response = requests.post(
        'http://localhost:5000/api/analyze-text',
        json={'text': 'You are stupid and ugly'}
    )
    print(f"Status Code: {response.status_code}")
    print(f"Response Text: {response.text}")
    if response.status_code == 200:
        print(f"JSON: {response.json()}")
except Exception as e:
    print(f"Error: {e}")
