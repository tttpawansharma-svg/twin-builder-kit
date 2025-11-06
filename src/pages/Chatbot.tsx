// frontend/src/components/Chatbot.tsx
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

interface PublicAgent {
  _id: string;
  identity: { name: string; role: string; bio: string };
  businesses: { name: string; description: string }[];
  personality?: { tone?: string; traits?: string[] };
}

const Chatbot = () => {
  const { id } = useParams<{ id: string }>();
  const [agent, setAgent] = useState<PublicAgent | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState("user@example.com"); // Replace with actual user auth

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch Public Digital Twin
  useEffect(() => {
    const fetchAgent = async () => {
      try {
        setError(null);
        const res = await fetch(`https://api.digitaltwin.techtrekkers.ai/api/digital-twin/public/${id}`);
        if (!res.ok) throw new Error("Failed to fetch digital twin data");

        const result = await res.json();
        const twin = result.data;

        if (!twin || !twin.identity || !twin.identity.name) {
          throw new Error("Digital twin data is missing required fields");
        }

        setAgent(twin);
        setMessages([
          {
            id: "1",
            role: "assistant",
            content: `Hello! I'm ${twin.identity.name}'s digital twin. I can tell you about my background, businesses, and expertise. What would you like to know?`,
            timestamp: new Date(),
          },
        ]);
      } catch (err: any) {
        console.error("Failed to fetch public agent:", err);
        setError(err.message || "Unable to load digital twin.");
      }
    };

    fetchAgent();
  }, [id]);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Send message to chat API
  const handleSend = async () => {
    if (!input.trim() || !agent) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`https://api.digitaltwin.techtrekkers.ai/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          twinId: agent._id,
          messages: [
            ...messages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
            { role: "user", content: input },
          ],
          userEmail, // Include user email for lead generation
        }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      const data = await res.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          data.reply ||
          "I'm still processing that — could you please rephrase your question?",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Chat API error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          role: "assistant",
          content:
            "Oops! Something went wrong while connecting to my knowledge base. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Loading or Error States
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-500">
        <p className="text-lg font-semibold mb-4">⚠️ {error}</p>
        <Link to="/dashboard">
          <Button variant="outline">Go Back</Button>
        </Link>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="flex items-center justify-center h-screen text-muted-foreground">
        Loading digital twin...
      </div>
    );
  }

  // Main Chat UI
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] flex flex-col">
      {/* Header */}
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
                <h1 className="text-lg font-semibold text-foreground tracking-tight">
                  {agent?.identity?.name || "Digital Twin"}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {agent?.identity?.role || "AI Assistant"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-muted-foreground font-medium">Online</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Chat area */}
      <ScrollArea className="flex-1">
        <div className="container mx-auto px-8 py-8">
          <div className="max-w-4xl mx-auto space-y-5">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-start gap-3 ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
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
                  </div>
                  <Card
                    className={`p-5 max-w-[75%] rounded-3xl border ${
                      message.role === "assistant"
                        ? "bg-card backdrop-blur-sm border-border/50"
                        : "bg-primary/8 backdrop-blur-sm border-primary/10"
                    }`}
                  >
                    <p className="text-foreground leading-relaxed text-[15px] whitespace-pre-wrap">
                      {message.content}
                    </p>
                    <p className="text-xs text-muted-foreground/70 mt-2.5">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>

            {loading && (
              <p className="text-sm text-muted-foreground italic ml-4">Thinking...</p>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </ScrollArea>

      {/* Input Area */}
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
                onKeyDown={handleKeyPress}
                placeholder={`Ask ${agent?.identity?.name || "the twin"}...`}
                className="flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-11 text-[15px] px-4"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || loading}
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