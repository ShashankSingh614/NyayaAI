# Legal Voice Nexus - Setup & Installation Guide

This guide provides step-by-step instructions to set up the entire Legal Voice Nexus monorepo.

## System Requirements

- **Node.js**: v18+ (https://nodejs.org/)
- **Python**: 3.8+ (https://www.python.org/)
- **MongoDB**: Local or Atlas account (https://www.mongodb.com/)
- **Git**: (https://git-scm.com/)
- **Tesseract OCR**: For document processing

## Quick Setup (All-in-One)

### 1. Install Prerequisites

#### Windows
```powershell
# Install Node.js from https://nodejs.org/
# Install Python from https://www.python.org/
# Install Git from https://git-scm.com/

# Install Tesseract OCR
# Download: https://github.com/UB-Mannheim/tesseract/wiki
# Run installer and note the installation path
```

#### macOS
```bash
# Using Homebrew
brew install node python tesseract git
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt-get update
sudo apt-get install nodejs npm python3 python3-pip git tesseract-ocr
```

### 2. Clone Repository
```bash
cd e:\
git clone <your-repo-url> Nyaya
cd Nyaya
```

### 3. Setup Frontend (apps/web)

```bash
cd apps/web

# Install dependencies
npm install

# Start development server
npm run dev
```
Access: **http://localhost:5173**

### 4. Setup Backend (apps/server/server)

```bash
cd apps/server/server

# Install dependencies
npm install

# Create .env file
copy .env.example .env
# Edit .env with your MongoDB credentials

# Start development server
npm run dev
```
Access: **http://localhost:3000**

### 5. Setup AI Module (apps/ai)

```bash
cd apps/ai

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate

# macOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Create .env file
copy .env.example .env
# Edit .env with your Groq API key and Tesseract path
```

## Detailed Setup Instructions

### Frontend Setup (React + Vite)

```bash
cd apps/web

# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Build for production
npm run build

# 4. Run linter
npm run lint
```

**Available Scripts**:
- `npm run dev` - Start Vite dev server on port 5173
- `npm run build` - Build optimized production bundle
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend Setup (Express + MongoDB)

```bash
cd apps/server/server

# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.example .env
```

**Edit `.env`**:
```env
MONGODB_URI=mongodb://localhost:27017/legal-voice
PORT=3000
JWT_SECRET=your_secret_key_here
NODE_ENV=development
GROQ_API_KEY=your_groq_api_key
```

**Start Backend**:
```bash
npm run dev
```

**Available Scripts**:
- `npm run dev` - Start with TypeScript hot-reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm test` - Run tests

### AI Module Setup (Python)

```bash
cd apps/ai

# 1. Create virtual environment
python -m venv venv

# 2. Activate environment (Windows)
venv\Scripts\activate

# 3. Activate environment (macOS/Linux)
source venv/bin/activate

# 4. Install dependencies
pip install -r requirements.txt

# 5. Create environment file
cp .env.example .env
```

**Edit `.env`**:
```env
GROQ_API_KEY=your_groq_api_key_here
TESSERACT_PATH=C:\Program Files\Tesseract-OCR\tesseract.exe
MONGODB_URI=mongodb://localhost:27017/legal-voice
```

**Verify Installation**:
```bash
python -c "import ai_models; print('AI Models installed successfully')"
```

### MongoDB Setup

#### Local MongoDB
```bash
# Download and install from https://www.mongodb.com/try/download/community

# Start MongoDB service:
# Windows: Services app or mongod.exe
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod

# Verify connection:
mongosh "mongodb://localhost:27017"
```

#### MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create account and cluster
3. Get connection string
4. Add to `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/legal-voice
```

### Tesseract OCR Setup

#### Windows
1. Download installer: https://github.com/UB-Mannheim/tesseract/wiki
2. Run `tesseract-ocr-w64-setup-5.5.0.exe`
3. Note installation path (default: `C:\Program Files\Tesseract-OCR`)
4. Add to `.env`:
```env
TESSERACT_PATH=C:\Program Files\Tesseract-OCR\tesseract.exe
```

#### macOS
```bash
brew install tesseract
# Path will be: /usr/local/bin/tesseract
```

#### Linux
```bash
sudo apt-get install tesseract-ocr
# Path will be: /usr/bin/tesseract
```

## Running All Services

### Option 1: Separate Terminals

**Terminal 1 - Frontend**
```bash
cd e:\Nyaya\apps\web
npm run dev
```

**Terminal 2 - Backend**
```bash
cd e:\Nyaya\apps\server\server
npm run dev
```

**Terminal 3 - AI Module** (if needed)
```bash
cd e:\Nyaya\apps\ai
source venv/bin/activate  # or venv\Scripts\activate
python -m ai_models
```

### Option 2: Docker (Optional)

```bash
# Build Docker images
docker-compose build

# Start all services
docker-compose up
```

## Environment Variables

### Backend (apps/server/server/.env)
```env
MONGODB_URI=mongodb://localhost:27017/legal-voice
PORT=3000
JWT_SECRET=dev_secret_key_change_in_production
NODE_ENV=development
GROQ_API_KEY=your_groq_api_key
```

### AI Module (apps/ai/.env)
```env
GROQ_API_KEY=your_groq_api_key
TESSERACT_PATH=C:\Program Files\Tesseract-OCR\tesseract.exe
MONGODB_URI=mongodb://localhost:27017/legal-voice
FLASK_ENV=development
LOG_LEVEL=INFO
```

## Troubleshooting

### Node Modules Not Found
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### MongoDB Connection Error
```bash
# Check if MongoDB is running
# Windows: Check Services
# macOS: brew services list
# Linux: sudo systemctl status mongod

# Verify connection string
mongosh "mongodb://localhost:27017"
```

### Python Module Not Found
```bash
# Ensure virtual environment is activated
# Windows:
venv\Scripts\activate

# macOS/Linux:
source venv/bin/activate

# Reinstall packages
pip install -r requirements.txt
```

### Port Already in Use
```bash
# Find process on port (macOS/Linux)
lsof -i :5173

# Kill process
kill -9 <PID>
```

### Tesseract Not Found
```bash
# Verify installation
tesseract --version

# Update .env with correct path
# Windows: C:\Program Files\Tesseract-OCR\tesseract.exe
# macOS: /usr/local/bin/tesseract
# Linux: /usr/bin/tesseract
```

## IDE Setup

### VS Code Extensions
```
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Python
- Pylance
- MongoDB for VS Code
```

### VS Code Settings
Create `.vscode/settings.json`:
```json
{
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": true,
  "python.formatting.provider": "black",
  "[python]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "ms-python.python"
  },
  "[javascript]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## Testing

### Frontend Testing
```bash
cd apps/web
# (Add testing setup as needed)
```

### Backend Testing
```bash
cd apps/server/server
npm test
```

### AI Module Testing
```bash
cd apps/ai
pytest
```

## Deployment

### Frontend Deployment
```bash
cd apps/web
npm run build
# Deploy dist/ to Netlify, Vercel, or AWS S3
```

### Backend Deployment
```bash
cd apps/server/server
npm run build
# Deploy to Heroku, AWS Lambda, or similar
```

### AI Module Deployment
```bash
cd apps/ai
# Deploy as API service or serverless function
```

## API Documentation

- Backend API docs: `http://localhost:3000/api/docs`
- AI Models documentation: `apps/ai/README.md`

## Additional Resources

- [React Documentation](https://react.dev)
- [Express Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Python Documentation](https://docs.python.org)
- [Groq API Documentation](https://console.groq.com)

## Support

For issues and questions:
1. Check this guide first
2. Review application README files
3. Check `.env.example` files for configuration
4. Open an issue on GitHub

## Next Steps

After setup:
1. Explore the Frontend at http://localhost:5173
2. Test the Backend API at http://localhost:3000
3. Review AI Models capabilities in `apps/ai/README.md`
4. Check authentication flows
5. Explore database models
6. Review API documentation

Happy coding! 🚀
