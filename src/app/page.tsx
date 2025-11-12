"use client";

import { useState } from "react";
import DialogueCard from "../components/DialogueCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Download, Languages } from "lucide-react";

type Message = { A?: string; B?: string };
type Dialogue = { topic: string; dialogue: Message[] };

export default function Home() {
  const [dialogues, setDialogues] = useState<Dialogue[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDialogues = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/generate-dialogues");
      const data = await res.json();

      let raw = data.dialogues;

      // Step 1: Remove outer quotes if present
      if (raw.startsWith('"') && raw.endsWith('"')) {
        raw = raw.slice(1, -1);
      }

      // Step 2: Remove ```json and ``` markers
      raw = raw.replace(/^```json\\n/, "").replace(/\\n```$/, "");

      // Step 3: Replace escaped quotes and newlines
      raw = raw.replace(/\\"/g, '"').replace(/\\n/g, '');

      // Step 4: Parse JSON
      const parsed = JSON.parse(raw);

      setDialogues(parsed);
    } catch (err) {
      console.error("Failed to parse dialogues:", err);
      alert("Error fetching dialogues. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="p-3 bg-blue-500 rounded-2xl shadow-lg">
              <Languages className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Arabic Dialogue Corpus
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate authentic Arabic conversations for language learning and cultural understanding
          </p>
        </div>

        {/* Action Card */}
        <Card className="max-w-2xl mx-auto mb-12 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-blue-500" />
              Generate Dialogues
            </CardTitle>
            <CardDescription>
              Click below to create realistic Arabic conversations on various topics
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button 
              onClick={fetchDialogues}
              disabled={loading}
              size="lg"
              className="gap-2 px-8 py-6 text-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg transition-all duration-200"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Dialogues
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        {dialogues.length > 0 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Generated Dialogues
              </h2>
              <p className="text-muted-foreground">
                {dialogues.length} conversation{dialogues.length > 1 ? 's' : ''} generated
              </p>
            </div>
            
            <div className="grid gap-6 md:gap-8">
              {dialogues.map((d, idx) => (
                <DialogueCard key={idx} dialogue={d} index={idx} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}