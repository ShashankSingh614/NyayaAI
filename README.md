# Nyaya: A Multilingual AI Framework for Scalable Legal Assistance, Professional Collaboration, and Document Intelligence

A comprehensive legal technology platform combining React frontend, Express backend with MongoDB, and AI-powered document processing.

## Project Structure

This is a **monorepo** containing three main applications:

```
e:\Nyaya/
├── apps/
│   ├── web/              (React + Vite + Tailwind)
│   ├── server/           (Express + MongoDB + TypeScript)
│   └── ai/               (Python AI Models + Document Processing)
├── README.md             (This file)
└── requirements.txt      (All Python dependencies)
```

## Applications

### 1. **web/** - React Frontend
- **Tech Stack**: React, Vite, TypeScript, Tailwind CSS, shadcn/ui
- **Port**: http://localhost:5173
- **Features**:
  - Legal case search and filtering
  - Lawyer directory
  - Real-time chat interface
  - Document upload and analysis

### 2. **server/** - Express Backend
- **Tech Stack**: Express, MongoDB, TypeScript, JWT Authentication
- **Port**: http://localhost:3000
- **Features**:
  - RESTful API
  - MongoDB database
  - JWT authentication
  - Lawyer profiles and case management
  - Document storage

### 3. **ai/** - AI Models
- **Tech Stack**: Python, Groq API, Transformers
- **Features**:
  - Document summarization
  - OCR processing
  - Language translation
  - Legal document analysis
  - AI chatbot integration

## Quick Start

### Prerequisites

- **Node.js** 18+ (for web and server)
- **Python** 3.8+ (for AI models)
- **MongoDB** (running locally or Atlas connection string)
- **npm** or **bun** package manager
- **Tesseract OCR** (for document processing)

### Installation

#### 1. Clone and Navigate
```bash
cd e:\Nyaya
```

#### 2. Setup Frontend (apps/web)
```bash
cd apps/web
npm install
npm run dev
```
Frontend runs on: **http://localhost:5173**

#### 3. Setup Backend (apps/server/server)
```bash
cd apps/server/server
npm install
npm run dev
```
Backend runs on: **http://localhost:3000**

Create `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/legal-voice
PORT=3000
JWT_SECRET=your_secret_key_here
```

#### 4. Setup AI Module (apps/ai)
```bash
cd apps/ai
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
```

### Tesseract OCR Installation

**Windows:**
- Download: https://github.com/UB-Mannheim/tesseract/wiki
- Run installer: `tesseract-ocr-w64-setup-5.5.0.exe`
- Add to environment variables (if not auto-added):
  ```
  TESSERACT_PATH=C:\Program Files\Tesseract-OCR\tesseract.exe
  ```

**macOS:**
```bash
brew install tesseract
```

**Linux:**
```bash
sudo apt-get install tesseract-ocr
```

## Running Everything

### Terminal 1 - Frontend
```bash
cd apps/web
npm run dev
```

### Terminal 2 - Backend
```bash
cd apps/server/server
npm run dev
```

### Terminal 3 - AI Module (if needed)
```bash
cd apps/ai
source venv/bin/activate  # or venv\Scripts\activate on Windows
python -m ai_models.server  # if applicable
```

## Environment Variables

### Backend (.env in apps/server/server/)
```env
MONGODB_URI=mongodb://localhost:27017/legal-voice
PORT=3000
JWT_SECRET=your_jwt_secret
NODE_ENV=development
GROQ_API_KEY=your_groq_api_key
```

### AI Module (.env in apps/ai/)
```env
GROQ_API_KEY=your_groq_api_key
TESSERACT_PATH=/path/to/tesseract
```

## Project Commands

### Frontend
```bash
cd apps/web
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend
```bash
cd apps/server/server
npm run dev          # Start with hot-reload
npm run build        # Build TypeScript
npm test             # Run tests
```

### AI Module
```bash
cd apps/ai
python -m pip install -r requirements.txt  # Install dependencies
python -m ai_models.document_summarizer    # Run specific modules
```

## Database Setup

### MongoDB Local
```bash
# Install MongoDB Community Edition
# Run MongoDB:
mongod

# Connect to default database:
# mongodb://localhost:27017/legal-voice
```

### MongoDB Atlas (Cloud)
```
mongodb+srv://username:password@cluster.mongodb.net/legal-voice
```

## Deployment

### Frontend
```bash
cd apps/web
npm run build
# Deploy dist/ folder to Netlify, Vercel, or AWS S3
```

### Backend
```bash
cd apps/server/server
npm run build
# Deploy to Heroku, AWS, or DigitalOcean
```

### AI Module
```bash
cd apps/ai
# Deploy as API service or scheduled jobs
```

## Troubleshooting

### Port Already in Use
```bash
# Find and kill process on port
# Windows:
netstat -ano | findstr :5173

# macOS/Linux:
lsof -i :5173
kill -9 <PID>
```

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Verify credentials if using Atlas

### Tesseract Not Found
- Verify installation path
- Set `TESSERACT_PATH` environment variable
- Restart terminal after installation

### Node Modules Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## API Documentation

API endpoints and Postman collection available in `apps/server/server/docs/`

## Contributing

1. Create feature branch: `git checkout -b feature/name`
2. Commit changes: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/name`
4. Open Pull Request

## License

MIT License

## Support

For issues and questions, please open an issue on GitHub or contact the development team.
