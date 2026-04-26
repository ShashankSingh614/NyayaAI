
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ApiKeyDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  apiKeyInput: string;
  setApiKeyInput: (key: string) => void;
  saveApiKey: () => void;
}

const ApiKeyDialog: React.FC<ApiKeyDialogProps> = ({
  isOpen,
  onOpenChange,
  apiKeyInput,
  setApiKeyInput,
  saveApiKey,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle>Enter Gemini API Key</DialogTitle>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-2">
            <p className="text-sm text-muted-foreground">
              Please enter your Gemini API key to enable AI chat functionality.
              You can get a free key from the Google AI Studio at{" "}
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                https://aistudio.google.com/app/apikey
              </a>
            </p>
            <Alert className="bg-amber-50 border-amber-200 mb-2">
              <AlertCircle className="h-4 w-4 text-amber-700" />
              <AlertTitle className="text-amber-700">Important</AlertTitle>
              <AlertDescription className="text-amber-700">
                We're using the model "gemini-1.5-flash" with the v1 API.
                Make sure your API key has access to Gemini 1.5 models.
              </AlertDescription>
            </Alert>
            <input
              type="text"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="Paste your API key here"
              className="rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <Button onClick={saveApiKey}>Save API Key</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyDialog;
