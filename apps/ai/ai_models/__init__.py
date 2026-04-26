"""
Legal Voice Nexus - AI Models Module

This module provides AI-powered legal document processing capabilities including:
- Document summarization
- OCR processing
- Language translation
- Legal document analysis
"""

__version__ = "1.0.0"
__author__ = "Legal Voice Team"

from . import document_summarizer
from . import ocr_processor
from . import translator
from . import utils

__all__ = [
    "document_summarizer",
    "ocr_processor", 
    "translator",
    "utils",
]
