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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10 flex flex-col">
      {/* Apple-style Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-b border-border/30 backdrop-blur-3xl bg-background/60 sticky top-0 z-50 shadow-sm"
      >
        <div className="container mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted/50">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="w-12 h-12 rounded-[1.2rem] bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20"
              >
                <Bot className="w-6 h-6 text-primary-foreground" />
              </motion.div>
              <div>
                <h1 className="text-xl font-semibold text-foreground tracking-tight">Alex Johnson's Digital Twin</h1>
                <p className="text-sm text-muted-foreground/70">Founder & CEO</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-muted-foreground/70">Online</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Messages Area */}
      <ScrollArea className="flex-1">
        <div className="container mx-auto px-8 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`flex items-start gap-4 ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`w-11 h-11 rounded-[1.2rem] flex items-center justify-center flex-shrink-0 shadow-lg ${
                      message.role === "assistant"
                        ? "bg-gradient-to-br from-primary to-accent shadow-primary/30"
                        : "bg-gradient-to-br from-muted to-muted/60 shadow-muted/30"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <Bot className="w-5 h-5 text-primary-foreground" />
                    ) : (
                      <User className="w-5 h-5 text-muted-foreground" />
                    )}
                  </motion.div>
                  <Card
                    className={`p-5 max-w-[75%] rounded-[1.5rem] border shadow-lg transition-all duration-300 ${
                      message.role === "assistant"
                        ? "bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-2xl border-border/30 hover:shadow-xl hover:shadow-primary/10"
                        : "bg-gradient-to-br from-muted/80 to-muted/60 backdrop-blur-xl border-border/20 hover:shadow-xl"
                    }`}
                  >
                    <p className="text-foreground leading-relaxed text-[15px]">{message.content}</p>
                    <p className="text-xs text-muted-foreground/60 mt-3">
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

      {/* Input Area */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="border-t border-border/30 backdrop-blur-3xl bg-background/60 sticky bottom-0 shadow-lg"
      >
        <div className="container mx-auto px-8 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 p-2 rounded-[1.5rem] bg-gradient-to-br from-card via-card to-card/80 border border-border/30 shadow-xl">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder="Ask me anything about my professional background..."
                className="flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-12 text-[15px] px-4"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 disabled:opacity-40 shadow-lg shadow-primary/30 h-12 w-12 p-0 rounded-[1.2rem] transition-all duration-300 hover:scale-105"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground/60 text-center mt-3">
              Press Enter to send • Shift + Enter for new line
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Chatbot;
