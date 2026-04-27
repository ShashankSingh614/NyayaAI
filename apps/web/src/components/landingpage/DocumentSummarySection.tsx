import React, { useState, useMemo } from "react";
import { useTranslation } from 'react-i18next';
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
  const { t, i18n } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState(i18n.language || "en");
  const [pages, setPages] = useState<number | null>(null);
  const { toast } = useToast();

  // Map i18n language codes to API language codes
  const languageMap: Record<string, string> = {
    en: "English",
    hi: "Hindi",
    ta: "Tamil",
    te: "Telugu",
    kn: "Kannada",
    ml: "Malayalam",
  };

  const languageOptions = useMemo(() => [
    { value: "en", label: "English", nativeLabel: "English" },
    { value: "hi", label: "Hindi", nativeLabel: "हिंदी" },
    { value: "ta", label: "Tamil", nativeLabel: "தமிழ்" },
    { value: "te", label: "Telugu", nativeLabel: "తెలుగు" },
    { value: "kn", label: "Kannada", nativeLabel: "ಕನ್ನಡ" },
    { value: "ml", label: "Malayalam", nativeLabel: "മലയാളം" },
  ], []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check if file is PDF
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setError(null);
        setSummary(null);
      } else {
        setError(t('documentSummary.invalidFile'));
        setFile(null);
        toast({
          title: t('documentSummary.invalidFile'),
          description: t('documentSummary.invalidFile'),
          variant: "destructive",
          duration: 3000,
        });
      }
    }
  };

  const handleUploadAndSummarize = async () => {
    if (!file) {
      setError(t('documentSummary.noFile'));
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Map to the correct language format for the API
      const apiLanguage = languageMap[language] || "English";
      const result = await summarizeDocument(file, apiLanguage);
      setSummary(result.summary);
      setPages(result.pages);
      toast({
        title: t('common.success'),
        description: t('documentSummary.summarizing'),
        duration: 3000,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : t('documentSummary.error');
      setError(errorMessage);
      toast({
        title: t('common.error'),
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

  return (
    <section className="section-padding bg-legal-light">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('documentSummary.title')} <span className="gradient-text">{t('documentSummary.summarization')}</span>
            </h2>
            <p className="text-legal-gray text-lg">
              {t('documentSummary.subtitle')}
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
                          {file ? file.name : t('documentSummary.uploadFile')}
                        </p>
                        <p className="text-sm text-legal-gray mt-2">
                          {t('documentSummary.uploadFile')}
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
                        {t('documentSummary.selectLanguage')}
                      </label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder={t('documentSummary.selectLanguage')} />
                        </SelectTrigger>
                        <SelectContent>
                          {languageOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.nativeLabel} ({option.label})
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
                          {t('documentSummary.summarizing')}
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          {t('documentSummary.uploadFile')}
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="px-8"
                    >
                      {t('common.clear')}
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Success Message */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-green-700">{t('documentSummary.summarizing')}</p>
                </div>

                {/* Document Info */}
                {pages && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
                    📄 {t('common.search')}: {pages} pages • {t('common.language')}: {languageOptions.find(l => l.value === language)?.nativeLabel}
                  </div>
                )}

                {/* Summary Content */}
                <div className="bg-white rounded-lg p-6 border border-legal-gold/20">
                  <h3 className="text-xl font-semibold text-legal-dark mb-4">
                    {t('documentSummary.summary')}
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
                    {t('documentSummary.uploadFile')}
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Info Box */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-semibold text-blue-900 mb-2">📄 Supported Formats</h4>
            <p className="text-blue-800 text-sm">
              Currently supports PDF files. Our AI summarization service extracts key information from your legal documents and presents it in an easy-to-understand format. Available in multiple Indian languages including Hindi, Tamil, Telugu, Kannada, and Malayalam.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
