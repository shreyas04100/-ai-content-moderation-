import subprocess
import sys

# Install Flask quickly
print("Installing Flask...")
subprocess.run([sys.executable, "-m", "pip", "install", "-q", "flask", "flask-cors", "python-dotenv"])
print("Done! Now run: python app.py")
