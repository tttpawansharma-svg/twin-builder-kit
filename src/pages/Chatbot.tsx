import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const Chatbot = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm Alex Johnson's digital twin. I can help you learn about my professional background, businesses, and expertise. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "This is a demo response. In production, this would connect to an AI model that represents the digital twin's knowledge and personality.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border/50 backdrop-blur-xl bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Alex Johnson's Digital Twin</h1>
              <p className="text-sm text-muted-foreground">Founder & CEO</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 container mx-auto px-6 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-4 ${
                message.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  message.role === "assistant"
                    ? "bg-gradient-to-br from-primary to-accent"
                    : "bg-muted"
                }`}
              >
                {message.role === "assistant" ? (
                  <Bot className="w-5 h-5 text-primary-foreground" />
                ) : (
                  <User className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
              <Card
                className={`p-4 max-w-[80%] ${
                  message.role === "assistant"
                    ? "bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl border-border/50"
                    : "bg-muted border-border/50"
                }`}
              >
                <p className="text-foreground leading-relaxed">{message.content}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </Card>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-border/50 backdrop-blur-xl bg-background/80 sticky bottom-0">
        <div className="container mx-auto px-6 py-4">
          <div className="max-w-3xl mx-auto flex items-center gap-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything about my professional background..."
              className="flex-1 bg-background/50 border-border/50 focus:border-primary h-12"
            />
            <Button
              onClick={handleSend}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg shadow-primary/30 h-12 px-6"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
