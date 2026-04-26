
interface GeminiResponse {
  text: string;
}

interface GeminiRequestBody {
  contents: {
    parts: {
      text: string;
    }[];
  }[];
}

export const sendMessageToGemini = async (
  message: string,
  apiKey: string
): Promise<GeminiResponse> => {
  try {
    // Form the request body according to Gemini API specifications
    const requestBody: GeminiRequestBody = {
      contents: [
        {
          parts: [
            {
              text: message,
            },
          ],
        },
      ],
    };

    // Using gemini-1.5-flash with v1 API endpoint (newer model that should be more widely accessible)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);
      
      // More specific error handling based on error code
      if (errorData.error && errorData.error.code === 404) {
        throw new Error(`API model not found: The model name may be incorrect or not available in your API version.`);
      } else if (errorData.error && errorData.error.code === 400) {
        throw new Error(`API request error: ${errorData.error.message}`);
      } else if (errorData.error && errorData.error.code === 403) {
        throw new Error(`API authentication error: Please check if your API key is valid and has access to the Gemini API.`);
      } else {
        throw new Error(`API call failed with status: ${response.status}`);
      }
    }

    const data = await response.json();
    
    console.log("Gemini API response:", data); // Add logging to see the full response
    
    // Extract the response text from the Gemini API response
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                         "Sorry, I couldn't process that request.";
    
    return { text: responseText };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return { text: error instanceof Error ? `Error: ${error.message}` : "Sorry, there was an error processing your request." };
  }
};
