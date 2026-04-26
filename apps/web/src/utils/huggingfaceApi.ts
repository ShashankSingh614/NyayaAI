/**
 * Hugging Face Spaces API Configuration and Functions
 * Connects to two Hugging Face Spaces:
 * - Chat API: BNS Legal Chatbot (godkiller596-chat.hf.space)
 * - Document Summarization API: Document Summarizer (godkiller596-summarize.hf.space)
 */

// Configure these with your actual Hugging Face Spaces URLs
const HUGGINGFACE_CONFIG = {
  // Chat API endpoint - for legal questions using BNS dataset
  CHAT_API_URL: import.meta.env.VITE_HUGGINGFACE_CHAT_URL || "https://godkiller596-chat.hf.space",
  // Document Summarization API endpoint - for PDF summarization
  SUMMARY_API_URL: import.meta.env.VITE_HUGGINGFACE_SUMMARY_URL || "https://godkiller596-summarize.hf.space",
};

interface ChatResponse {
  status: string;
  match_type?: string;
  section_number?: number;
  title?: string;
  explanation?: string;
  similarity_score?: number;
  alternatives?: Array<{
    section_number: number;
    title: string;
    similarity_score: number;
  }>;
  error?: string;
  message?: string;
}

interface SummarizeResponse {
  summary: string;
  language?: string;
  pages?: number;
  preview?: string;
  error?: string;
}

/**
 * Send a legal question to Hugging Face Chat API (BNS Chatbot)
 */
export const sendMessageToHuggingFace = async (
  query: string,
  history: Array<{ role: string; content: string }> = [],
  includeAlternatives: boolean = false,
  similarityThreshold: number = 0.3
): Promise<ChatResponse> => {
  try {
    const response = await fetch(`${HUGGINGFACE_CONFIG.CHAT_API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        history,
        include_alternatives: includeAlternatives,
        similarity_threshold: similarityThreshold,
      }),
    });

    if (!response.ok) {
      console.error(`Chat API error: ${response.status}`);
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: ChatResponse = await response.json();
    
    if (data.status === "error") {
      throw new Error(data.message || "Failed to get response from chat API");
    }

    return data;
  } catch (error) {
    console.error("Error sending message to Hugging Face:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to communicate with chat API"
    );
  }
};

/**
 * Send a PDF file to Hugging Face Summarization API
 */
export const summarizeDocument = async (
  file: File,
  language: string = "en"
): Promise<SummarizeResponse> => {
  try {
    // Validate file is PDF
    if (file.type !== "application/pdf") {
      throw new Error("Only PDF files are supported");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("language", language);

    const response = await fetch(`${HUGGINGFACE_CONFIG.SUMMARY_API_URL}/summarize`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      console.error(`Summarize API error: ${response.status}`);
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: SummarizeResponse = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error("Error summarizing document:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to summarize document"
    );
  }
};

export const getHuggingFaceConfig = () => HUGGINGFACE_CONFIG;
