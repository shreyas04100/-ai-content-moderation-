import sys
print(f"Python: {sys.executable}")
print(f"Python version: {sys.version}")

try:
    import flask
    print(f"Flask installed: {flask.__version__}")
except ImportError:
    print("Flask NOT installed - installing now...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "flask", "flask-cors", "python-dotenv"])
    print("Flask installed successfully!")

try:
    from flask import Flask
    app = Flask(__name__)
    
    @app.route('/')
    def home():
        return {"message": "Flask is working!"}
    
    print("\nFlask test successful! Starting server...")
    app.run(debug=True, port=5000)
except Exception as e:
    print(f"Error: {e}")
