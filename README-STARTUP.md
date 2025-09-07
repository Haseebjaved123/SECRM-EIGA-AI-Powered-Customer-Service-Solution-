# 🚀 How to Run SECRM-EIGA Every Time

## Quick Start Options

### Option 1: Double-Click to Start (Easiest)
1. **Double-click `start.bat`** in the main folder
2. The script will:
   - Install dependencies automatically
   - Start the backend server
   - Open your browser to http://localhost:5000
   - Keep everything running

### Option 2: PowerShell Script
1. **Right-click `start.ps1`** → "Run with PowerShell"
2. Same automatic setup as above

### Option 3: Manual Commands
If you prefer manual control:

```bash
# Navigate to project folder
cd "C:\Users\owner\Downloads\New folder\secrm-eiga-app"

# Install dependencies (first time only)
py -m pip install -r backend/requirements.txt

# Start the server
cd backend
py app.py
```

Then open http://localhost:5000 in your browser.

## 🔧 Troubleshooting

### If Python is not found:
```bash
# Try these alternatives:
python app.py
python3 app.py
py -3 app.py
```

### If port 5000 is busy:
The app will automatically try port 5001, 5002, etc.

### If browser doesn't open automatically:
Manually go to: http://localhost:5000

## 📁 Project Structure
```
secrm-eiga-app/
├── start.bat          ← Double-click this to start!
├── start.ps1          ← PowerShell version
├── backend/
│   ├── app.py         ← Main Flask server
│   └── services/      ← AI modules
├── frontend/
│   ├── index.html     ← Main webpage
│   ├── styles.css     ← Styling
│   └── main.js        ← Frontend logic
└── README-STARTUP.md  ← This file
```

## 🎯 What Happens When You Start

1. **Backend Server Starts** - Flask app runs on http://localhost:5000
2. **Browser Opens** - Automatically navigates to your app
3. **AI Pipeline Ready** - SECRM-EIGA system is active
4. **All Features Available** - Analytics, demo, pipeline, etc.

## 💡 Pro Tips

- **Keep the terminal window open** - Closing it stops the server
- **Use Ctrl+C** in terminal to stop the server when done
- **Bookmark http://localhost:5000** for quick access
- **The app remembers your data** while the server is running

## 🔄 Daily Usage

Just **double-click `start.bat`** every time you want to use SECRM-EIGA!

The script handles everything automatically:
- ✅ Dependencies installation
- ✅ Server startup
- ✅ Browser opening
- ✅ Error handling

---

**Need help?** Check the main README.md for detailed documentation.
