import React, { useState } from "react";
import { Upload, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { summarizeDocument } from "@/utils/huggingfaceApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const DocumentSummarySection: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState("en");
  const [pages, setPages] = useState<number | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check if file is PDF
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setError(null);
        setSummary(null);
      } else {
        setError("Please select a PDF file");
        setFile(null);
        toast({
          title: "Invalid File",
          description: "Please upload a PDF file",
          variant: "destructive",
          duration: 3000,
        });
      }
    }
  };

  const handleUploadAndSummarize = async () => {
    if (!file) {
      setError("Please select a file");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await summarizeDocument(file, language);
      setSummary(result.summary);
      setPages(result.pages);
      toast({
        title: "Success",
        description: "Document summarized successfully",
        duration: 3000,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to summarize document";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setSummary(null);
    setError(null);
    setPages(null);
  };

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "hi", label: "Hindi" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "ja", label: "Japanese" },
  ];

  return (
    <section className="section-padding bg-legal-light">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Document <span className="gradient-text">Summarization</span>
            </h2>
            <p className="text-legal-gray text-lg">
              Upload your legal documents and get instant summaries powered by AI
            </p>
          </div>

          <Card className="p-8 border-2 border-dashed border-legal-gold/30 hover:border-legal-gold/60 transition-colors">
            {!summary ? (
              <div className="space-y-6">
                {/* File Upload Area */}
                <div className="text-center">
                  <label
                    className="cursor-pointer inline-block w-full"
                    htmlFor="pdf-upload"
                  >
                    <div className="flex flex-col items-center justify-center py-12 space-y-4">
                      <div className="bg-legal-gold/10 p-6 rounded-full">
                        <Upload className="h-12 w-12 text-legal-gold" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-legal-dark">
                          {file ? file.name : "Click to upload PDF"}
                        </p>
                        <p className="text-sm text-legal-gray mt-2">
                          or drag and drop your legal documents here
                        </p>
                      </div>
                    </div>
                  </label>
                  <input
                    id="pdf-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                {/* Error Display */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-red-700">{error}</p>
                  </div>
                )}

                {/* Language Selection */}
                {file && (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <label htmlFor="language-select" className="text-sm font-medium">
                        Output Language:
                      </label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          {languageOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                {file && (
                  <div className="flex gap-4 justify-center">
                    <Button
                      onClick={handleUploadAndSummarize}
                      disabled={isLoading}
                      className="bg-legal-gold hover:bg-legal-gold/90 text-white px-8"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Summarizing...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Summarize Document
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="px-8"
                    >
                      Clear
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Success Message */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-green-700">Document summarized successfully</p>
                </div>

                {/* Document Info */}
                {pages && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
                    📄 Document: {pages} page(s) • Language: {languageOptions.find(l => l.value === language)?.label}
                  </div>
                )}

                {/* Summary Content */}
                <div className="bg-white rounded-lg p-6 border border-legal-gold/20">
                  <h3 className="text-xl font-semibold text-legal-dark mb-4">
                    Summary
                  </h3>
                  <p className="text-legal-gray leading-relaxed whitespace-pre-wrap">
                    {summary}
                  </p>
                </div>

                {/* Reset Button */}
                <div className="flex justify-center">
                  <Button
                    onClick={handleReset}
                    className="bg-legal-gold hover:bg-legal-gold/90 text-white px-8"
                  >
                    Summarize Another Document
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Info Box */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-semibold text-blue-900 mb-2">📄 Supported Formats</h4>
            <p className="text-blue-800 text-sm">
              Currently supports PDF files. Our AI summarization service extracts key information from your legal documents and presents it in an easy-to-understand format. Available in multiple languages.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
