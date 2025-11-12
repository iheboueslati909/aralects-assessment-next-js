"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, User, Bot } from "lucide-react";
import { Badge } from "./ui/badge";

type Message = { A?: string; B?: string };
type Dialogue = {
  topic: string;
  dialogue: Message[];
};

export default function DialogueCard({ 
  dialogue, 
  index 
}: { 
  dialogue: Dialogue; 
  index: number;
}) {
  return (
    <Card className="w-full border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
            <CardTitle className="text-xl font-semibold text-foreground">
              {dialogue.topic}
            </CardTitle>
          </div>
          <Badge variant="secondary" className="px-3 py-1 text-sm">
            Dialogue {index + 1}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          {dialogue.dialogue.map((msg, idx) => (
            <div key={idx} className="flex items-start gap-3 group">
              {/* Speaker A (Right side) */}
              {msg.A && (
                <div className="ml-auto max-w-[80%]">
                  <div className="flex items-center gap-2 justify-end mb-1">
                    <span className="text-sm font-medium text-blue-600">Speaker A</span>
                    <div className="p-1 bg-blue-500 rounded-full">
                      <User className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-2xl rounded-br-md shadow-md group-hover:shadow-lg transition-shadow">
                    <p className="text-white/95 leading-relaxed text-right">{msg.A}</p>
                  </div>
                </div>
              )}
              
              {/* Speaker B (Left side) */}
              {msg.B && (
                <div className="max-w-[80%]">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="p-1 bg-gray-500 rounded-full">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-600">Speaker B</span>
                  </div>
                  <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-2xl rounded-bl-md shadow-md group-hover:shadow-lg transition-shadow border">
                    <p className="text-gray-700 leading-relaxed">{msg.B}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-border/50 flex justify-between items-center text-sm text-muted-foreground">
          <span>{dialogue.dialogue.length} messages</span>
          <span className="font-arabic">اللغة العربية</span>
        </div>
      </CardContent>
    </Card>
  );
}