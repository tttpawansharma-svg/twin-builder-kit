import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, ArrowLeft } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] flex flex-col">
      {/* Premium Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-b border-border/50 backdrop-blur-[24px] bg-background/80 sticky top-0 z-50"
      >
        <div className="container mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md shadow-primary/20"
              >
                <Bot className="w-6 h-6 text-primary-foreground" />
              </motion.div>
              <div>
                <h1 className="text-lg font-semibold text-foreground tracking-tight">Alex Johnson's Digital Twin</h1>
                <p className="text-sm text-muted-foreground">Founder & CEO</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-muted-foreground font-medium">Online</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Messages Area */}
      <ScrollArea className="flex-1">
        <div className="container mx-auto px-8 py-8">
          <div className="max-w-4xl mx-auto space-y-5">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex items-start gap-3 ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md ${
                      message.role === "assistant"
                        ? "bg-gradient-to-br from-primary to-accent shadow-primary/20"
                        : "bg-muted shadow-muted/20"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <Bot className="w-5 h-5 text-primary-foreground" />
                    ) : (
                      <User className="w-5 h-5 text-muted-foreground" />
                    )}
                  </motion.div>
                  <Card
                    className={`p-5 max-w-[75%] rounded-3xl border transition-all duration-300 ${
                      message.role === "assistant"
                        ? "bg-card backdrop-blur-sm border-border/50 hover:shadow-md hover:border-primary/20"
                        : "bg-primary/8 backdrop-blur-sm border-primary/10 hover:shadow-sm"
                    }`}
                  >
                    <p className="text-foreground leading-relaxed text-[15px]">{message.content}</p>
                    <p className="text-xs text-muted-foreground/70 mt-2.5">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        </div>
      </ScrollArea>

      {/* Premium Input Area */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="border-t border-border/50 backdrop-blur-[24px] bg-background/80 sticky bottom-0 shadow-lg"
      >
        <div className="container mx-auto px-8 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 p-2.5 rounded-3xl bg-card border-2 border-border/50 focus-within:border-primary/30 transition-all duration-300 shadow-sm">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder="Ask me anything about my professional background..."
                className="flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-11 text-[15px] px-4"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim()}
                variant="premium"
                className="h-11 w-11 p-0 rounded-2xl"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-3">
              Press Enter to send • Shift + Enter for new line
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Chatbot;
