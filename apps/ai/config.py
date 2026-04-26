"""
AI Models Configuration

This file centralizes all configuration for the AI module.
"""

import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# ============================================
# API Configuration
# ============================================
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
TESSERACT_PATH = os.getenv("TESSERACT_PATH", "/usr/bin/tesseract")

# ============================================
# Database Configuration
# ============================================
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/legal-voice")

# ============================================
# Flask Configuration
# ============================================
FLASK_ENV = os.getenv("FLASK_ENV", "development")
FLASK_PORT = int(os.getenv("FLASK_PORT", 5000))

# ============================================
# Logging Configuration
# ============================================
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

# ============================================
# Model Configuration
# ============================================
MODEL_NAME = "all-MiniLM-L6-v2"  # Sentence transformer model
MAX_DOCUMENT_LENGTH = 50000  # Max characters to process
CHUNK_SIZE = 1000  # Document chunk size for processing

# ============================================
# Feature Flags
# ============================================
ENABLE_OCR = os.getenv("ENABLE_OCR", "true").lower() == "true"
ENABLE_TRANSLATION = os.getenv("ENABLE_TRANSLATION", "true").lower() == "true"
ENABLE_SUMMARIZATION = os.getenv("ENABLE_SUMMARIZATION", "true").lower() == "true"
