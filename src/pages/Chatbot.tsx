// // frontend/src/components/Chatbot.tsx
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Bot, Send, User, ArrowLeft, Mail, Phone, Building, Star } from "lucide-react";
// import { useState, useRef, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { useToast } from "@/hooks/use-toast";

// interface Message {
//   id: string;
//   role: "user" | "assistant";
//   content: string;
//   timestamp: Date;
// }

// interface PublicAgent {
//   _id: string;
//   identity: {
//     name: string;
//     role: string;
//     bio: string;
//     profilePicture?: string;
//   };
//   businesses: { name: string; description: string }[];
//   personality?: { tone?: string; traits?: string[] };
//   user?: {
//     profilePicture?: string;
//     avatar?: string;
//   };
// }

// interface LeadFormData {
//   name: string;
//   email: string;
//   phone: string;
//   company: string;
//   interest: string;
// }

// interface UserProfile {
//   _id: string;
//   name: string;
//   email: string;
//   profilePicture?: string;
//   avatar?: string;
// }

// const Chatbot = () => {
//   const { id } = useParams<{ id: string }>();
//   const { toast } = useToast();
//   const [agent, setAgent] = useState<PublicAgent | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [showLeadModal, setShowLeadModal] = useState(false);
//   const [leadData, setLeadData] = useState<LeadFormData>({ name: "", email: "", phone: "", company: "", interest: "" });
//   const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Fetch user profile on component mount
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         if (!id) return;

//         const response = await fetch(`https://api.digitaltwin.techtrekkers.ai/api/auth/public/${id}`);

//         if (!response.ok) {
//           throw new Error("Failed to fetch user profile");
//         }

//         const userData = await response.json();
//         setUserProfile(userData.data);
//         setLeadData((prev) => ({ ...prev, email: userData.email }));
//       } catch (error) {
//         console.error("Failed to fetch user profile:", error);
//         setError("Unable to load user profile");
//       }
//     };

//     fetchUserProfile();
//   }, [id]);

//   // Fetch Public Digital Twin
//   useEffect(() => {
//     const fetchAgent = async () => {
//       try {
//         setError(null);
//         const res = await fetch(`https://api.digitaltwin.techtrekkers.ai/api/digital-twin/public/${id}`);
//         if (!res.ok) throw new Error("Failed to fetch digital twin data");
//         const result = await res.json();
//         const twin = result.data;
//         if (!twin || !twin.identity || !twin.identity.name) {
//           throw new Error("Digital twin data is missing required fields");
//         }
//         setAgent(twin);
//         setMessages([
//           {
//             id: "1",
//             role: "assistant",
//             content: `Hello! I'm the digital twin of ${twin.identity.name}, your ${twin.identity.role} with 20+ years in business strategy. I can share insights on my expertise, businesses, and collaboration opportunities. What sparks your interest today?`,
//             timestamp: new Date(),
//           },
//         ]);
//       } catch (err: any) {
//         console.error("Failed to fetch public agent:", err);
//         setError(err.message || "Unable to load digital twin.");
//       }
//     };
//     fetchAgent();
//   }, [id]);

//   // Auto scroll to bottom
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };
//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // Detect interest keywords to trigger lead modal
//   const checkForInterest = (content: string) => {
//     const interestKeywords = ["interested", "contact", "partnership", "collaborate", "business", "investment", "work together", "connect", "meeting", "call"];
//     return interestKeywords.some((kw) => content.toLowerCase().includes(kw));
//   };

//   // Send message to chat API
//   const handleSend = async (customInput?: string) => {
//     const messageContent = customInput || input;
//     if (!messageContent.trim() || !agent) return;

//     const userMessage: Message = {
//       id: Date.now().toString(),
//       role: "user",
//       content: messageContent,
//       timestamp: new Date(),
//     };
//     setMessages((prev) => [...prev, userMessage]);
//     if (!customInput) setInput("");
//     setLoading(true);

//     // Check for interest and trigger modal
//     if (checkForInterest(messageContent)) {
//       setLeadData((prev) => ({ ...prev, interest: messageContent }));
//       setTimeout(() => setShowLeadModal(true), 1000);
//     }

//     try {
//       const res = await fetch(`https://api.digitaltwin.techtrekkers.ai/api/chat`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           twinId: agent._id,
//           messages: [
//             ...messages.map((m) => ({
//               role: m.role,
//               content: m.content,
//             })),
//             { role: "user", content: messageContent },
//           ],
//           userEmail: userProfile?.email || "guest@example.com",
//         }),
//       });
//       if (!res.ok) throw new Error("Failed to send message");
//       const data = await res.json();
//       const aiMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         role: "assistant",
//         content: data.reply || "I'm processing that strategically—let's refine your query for deeper insights.",
//         timestamp: new Date(),
//       };
//       setMessages((prev) => [...prev, aiMessage]);
//     } catch (err) {
//       console.error("Chat API error:", err);
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: (Date.now() + 2).toString(),
//           role: "assistant",
//           content: "Apologies—my network glitched. As an experienced advisor, let's pivot: What's your core business challenge?",
//           timestamp: new Date(),
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle template button clicks
//   const handleTemplateClick = (template: string) => {
//     handleSend(template);
//   };

//   // Submit lead form
//   const handleLeadSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!leadData.name || !leadData.email || !leadData.company) return;

//     try {
//       const response = await fetch(`https://api.digitaltwin.techtrekkers.ai/api/leads`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...leadData, twinId: agent?._id }),
//       });

//       if (!response.ok) throw new Error("Failed to submit lead");

//       setShowLeadModal(false);
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: (Date.now() + 3).toString(),
//           role: "assistant",
//           content: `Thanks for sharing, ${leadData.name}! I've noted your interest in "${leadData.interest}". My human counterpart will reach out soon via ${leadData.email} to discuss opportunities at ${leadData.company}. What's next on your mind?`,
//           timestamp: new Date(),
//         },
//       ]);
//       setLeadData({ name: "", email: userProfile?.email || "", phone: "", company: "", interest: "" });

//       toast({
//         title: "Success!",
//         description: "Your interest has been recorded. We'll contact you soon.",
//       });
//     } catch (err) {
//       console.error("Lead submission error:", err);
//       toast({
//         title: "Submission failed",
//         description: "Please try again or contact us directly.",
//         variant: "destructive",
//       });
//     }
//   };

//   // Handle Enter key press
//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   const getInitials = (name?: string) => {
//     if (!name) return "??"; // Fallback for undefined or empty name
//     return name.split(" ").map((n) => n[0]).join("").toUpperCase();
//   };

// const getAgentProfilePicture = () => {
//   if (!userProfile) return null;
//   return userProfile.profilePicture
//     ? `https://api.digitaltwin.techtrekkers.ai${userProfile.profilePicture}`
//     : userProfile.avatar
//     ? `https://api.digitaltwin.techtrekkers.ai${userProfile.avatar}`
//     : null;
// };




//   const getUserProfilePicture = () => {
//     return userProfile?.profilePicture || userProfile?.avatar;
//   };

//   // Loading or Error States
//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen text-red-500">
//         <p className="text-lg font-semibold mb-4">⚠️ {error}</p>
//         <Link to="/dashboard">
//           <Button variant="outline">Go Back</Button>
//         </Link>
//       </div>
//     );
//   }
//   if (!agent) {
//     return (
//       <div className="flex items-center justify-center h-screen text-muted-foreground">
//         <div className="flex flex-col items-center gap-4">
//           <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
//           <div className="text-lg text-slate-600 font-medium">Loading digital twin...</div>
//         </div>
//       </div>
//     );
//   }

//   // Quick Templates
//   const templates = [
//     { label: "Tell me about your expertise", icon: <Star className="w-4 h-4" />, onClick: () => handleTemplateClick("Tell me about your expertise and background.") },
//     { label: "Business opportunities", icon: <Building className="w-4 h-4" />, onClick: () => handleTemplateClick("What business opportunities do you see for collaboration?") },
//     { label: "Contact for partnership", icon: <Mail className="w-4 h-4" />, onClick: () => { setLeadData((prev) => ({ ...prev, interest: "Partnership inquiry" })); setShowLeadModal(true); } },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex flex-col">
//       {/* Header */}
//       <motion.div
//         initial={{ y: -20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         className="border-b border-border/50 backdrop-blur-[24px] bg-background/80 sticky top-0 z-40"
//       >
//         <div className="container mx-auto px-4 py-4 lg:px-8 lg:py-5">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <Link to="/dashboard">
//                 <Button variant="ghost" size="icon" className="rounded-full" aria-label="Go back">
//                   <ArrowLeft className="w-5 h-5" />
//                 </Button>
//               </Link>

//               {/* Agent Profile Picture */}
//               {getAgentProfilePicture() ? (
//                 <motion.img
//                   whileHover={{ scale: 1.05 }}
//                   src={getAgentProfilePicture()}
//                   alt={agent.identity.name}
//                   className="w-12 h-12 rounded-2xl object-cover shadow-lg border border-primary/20"
//                 />
//               ) : (
//                 <motion.div
//                   whileHover={{ scale: 1.05, rotate: 5 }}
//                   className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30"
//                 >
//                   <Bot className="w-6 h-6 text-primary-foreground" />
//                 </motion.div>
//               )}

//               <div>
//                 <h1 className="text-lg font-bold text-foreground tracking-tight">{agent.identity.name}</h1>
//                 <p className="text-sm text-muted-foreground font-medium">{agent.identity.role} • Digital Twin Advisor</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-4">
//               {/* User Profile Picture */}
              

//               <div className="flex items-center gap-2">
//                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
//                 <span className="text-sm text-muted-foreground font-medium">Live Insights</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       {/* Chat Area */}
//       <ScrollArea className="flex-1">
//         <div className="container mx-auto px-4 py-6 lg:px-8 lg:py-8">
//           <div className="max-w-3xl mx-auto space-y-6">
//             <AnimatePresence>
//               {messages.map((message) => (
//                 <motion.div
//                   key={message.id}
//                   initial={{ opacity: 0, y: 20, scale: 0.98 }}
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   transition={{ duration: 0.4, ease: "easeOut" }}
//                   className={`flex items-start gap-4 ${message.role === "user" ? "flex-row-reverse" : ""}`}
//                 >
//                   {/* Message Avatar */}
//                   <div className="flex-shrink-0">
//                     {message.role === "assistant" ? (
//                       getAgentProfilePicture() ? (
//                         <img
//                           src={getAgentProfilePicture()}
//                           alt={agent.identity.name}
//                           className="w-12 h-12 rounded-2xl object-cover shadow-lg border border-primary/20"
//                         />
//                       ) : (
//                         <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
//                           <Bot className="w-6 h-6 text-primary-foreground" />
//                         </div>
//                       )
//                     ) : (
//                       getUserProfilePicture() ? (
//                         <img
//                           src={getUserProfilePicture()}
//                           alt={userProfile?.name || "User"}
//                           className="w-12 h-12 rounded-2xl object-cover shadow-lg border border-muted-foreground/20"
//                         />
//                       ) : (
//                         <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-muted to-muted-foreground/10 flex items-center justify-center shadow-lg shadow-muted/20">
//                           <User className="w-6 h-6 text-muted-foreground" />
//                         </div>
//                       )
//                     )}
//                   </div>

//                   {/* Message Content */}
//                   <Card
//                     className={`p-6 max-w-[80%] rounded-2xl border-0 shadow-sm ${
//                       message.role === "assistant" ? "bg-card/90 backdrop-blur-sm shadow-primary/10" : "bg-primary/10 shadow-primary/5"
//                     }`}
//                   >
//                     <p className="text-foreground leading-relaxed text-base whitespace-pre-wrap font-medium">{message.content}</p>
//                     <p className="text-xs text-muted-foreground/60 mt-3 flex items-center gap-1">
//                       <span>{message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
//                       {message.role === "user" && <User className="w-3 h-3" />}
//                     </p>
//                   </Card>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//             {loading && (
//               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 text-muted-foreground ml-16">
//                 <div className="flex gap-1">
//                   <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
//                   <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
//                   <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
//                 </div>
//                 <span className="text-sm italic">Strategizing response...</span>
//               </motion.div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>
//         </div>
//       </ScrollArea>

//       {/* Quick Templates */}
//       <motion.div
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="border-t border-border/30 backdrop-blur-sm bg-background/50 py-4 sticky bottom-20 z-30"
//       >
//         <div className="container mx-auto px-4">
//           <div className="flex flex-wrap gap-2 justify-center max-w-md mx-auto">
//             {templates.map((template, idx) => (
//               <Button
//                 key={idx}
//                 variant="outline"
//                 size="sm"
//                 onClick={template.onClick}
//                 className="flex items-center gap-1 rounded-full text-xs"
//                 aria-label={template.label}
//               >
//                 {template.icon}
//                 <span>{template.label}</span>
//               </Button>
//             ))}
//           </div>
//         </div>
//       </motion.div>

//       {/* Input Area */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.3 }}
//         className="border-t border-border/50 backdrop-blur-[24px] bg-background/80 sticky bottom-0 shadow-xl"
//       >
//         <div className="container mx-auto px-4 py-4 lg:px-8 lg:py-6">
//           <div className="max-w-3xl mx-auto">
//             <div className="flex items-center gap-3 p-3 rounded-2xl bg-card/80 border border-border/30 focus-within:border-primary/40 transition-all duration-300 shadow-md">
//               <Input
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={handleKeyPress}
//                 placeholder={`Chat with ${agent.identity.name}... (e.g., "How can we partner?")`}
//                 className="flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-12 text-base px-4"
//                 disabled={loading}
//                 aria-label="Type your message"
//               />
//               <Button
//                 onClick={() => handleSend()}
//                 disabled={!input.trim() || loading}
//                 variant="default"
//                 className="h-12 w-12 p-0 rounded-xl shadow-md hover:shadow-lg"
//                 aria-label="Send message"
//               >
//                 <Send className="w-5 h-5" />
//               </Button>
//             </div>
//             <p className="text-xs text-muted-foreground text-center mt-2">
//               Enter to send • Shift + Enter for new line • Guided by business templates above
//             </p>
//           </div>
//         </div>
//       </motion.div>

//       {/* Lead Capture Modal */}
//       <Dialog open={showLeadModal} onOpenChange={setShowLeadModal}>
//         <DialogContent className="sm:max-w-md rounded-2xl">
//           <DialogHeader>
//             <DialogTitle className="flex items-center gap-2 text-foreground">
//               <Building className="w-5 h-5 text-primary" />
//               Let's Connect for Business
//             </DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleLeadSubmit} className="space-y-4">
//             <div>
//               <Label htmlFor="name">Full Name *</Label>
//               <Input
//                 id="name"
//                 value={leadData.name}
//                 onChange={(e) => setLeadData((prev) => ({ ...prev, name: e.target.value }))}
//                 required
//               />
//             </div>
//             <div>
//               <Label htmlFor="email">Email *</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 value={leadData.email}
//                 onChange={(e) => setLeadData((prev) => ({ ...prev, email: e.target.value }))}
//                 required
//               />
//             </div>
//             <div>
//               <Label htmlFor="phone">Phone</Label>
//               <Input
//                 id="phone"
//                 value={leadData.phone}
//                 onChange={(e) => setLeadData((prev) => ({ ...prev, phone: e.target.value }))}
//               />
//             </div>
//             <div>
//               <Label htmlFor="company">Company *</Label>
//               <Input
//                 id="company"
//                 value={leadData.company}
//                 onChange={(e) => setLeadData((prev) => ({ ...prev, company: e.target.value }))}
//                 required
//               />
//             </div>
//             <div>
//               <Label htmlFor="interest">Area of Interest</Label>
//               <Textarea
//                 id="interest"
//                 value={leadData.interest}
//                 onChange={(e) => setLeadData((prev) => ({ ...prev, interest: e.target.value }))}
//                 placeholder="What specifically are you interested in?"
//                 rows={3}
//               />
//             </div>
//             <Button type="submit" className="w-full rounded-xl">Submit & Continue Chat</Button>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Chatbot;

// frontend/src/components/Chatbot.tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, ArrowLeft, Mail, Building, Star } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { authService, digitalTwinService, chatService, leadService } from '@/services/api.service';
import { IMAGE_BASE_URL } from '@/axios.config';

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface PublicAgent {
  _id: string;
  identity: {
    name: string;
    role: string;
    bio: string;
    profilePicture?: string;
  };
  businesses: { name: string; description: string }[];
  personality?: { tone?: string; traits?: string[] };
  user?: {
    profilePicture?: string;
    avatar?: string;
  };
}

interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  interest: string;
}

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
  avatar?: string;
}

const Chatbot = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [agent, setAgent] = useState<PublicAgent | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [leadData, setLeadData] = useState<LeadFormData>({ name: "", email: "", phone: "", company: "", interest: "" });
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!id) return;

        const userData = await authService.getPublicProfile(id);
        setUserProfile(userData.data);
        setLeadData((prev) => ({ ...prev, email: userData.email }));
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setError("Unable to load user profile");
      }
    };

    fetchUserProfile();
  }, [id]);

  // Fetch Public Digital Twin
  useEffect(() => {
    const fetchAgent = async () => {
      try {
        setError(null);
        const result = await digitalTwinService.getPublic(id!);
        const twin = result.data;
        if (!twin || !twin.identity || !twin.identity.name) {
          throw new Error("Digital twin data is missing required fields");
        }
        setAgent(twin);
        setMessages([
          {
            id: "1",
            role: "assistant",
            content: `Hello! I'm the digital twin of ${twin.identity.name}, your ${twin.identity.role} with 20+ years in business strategy. I can share insights on my expertise, businesses, and collaboration opportunities. What sparks your interest today?`,
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

  // Detect interest keywords to trigger lead modal
  const checkForInterest = (content: string) => {
    const interestKeywords = ["interested", "contact", "partnership", "collaborate", "business", "investment", "work together", "connect", "meeting", "call"];
    return interestKeywords.some((kw) => content.toLowerCase().includes(kw));
  };

  // Send message to chat API
  const handleSend = async (customInput?: string) => {
    const messageContent = customInput || input;
    if (!messageContent.trim() || !agent) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageContent,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    if (!customInput) setInput("");
    setLoading(true);

    // Check for interest and trigger modal
    if (checkForInterest(messageContent)) {
      setLeadData((prev) => ({ ...prev, interest: messageContent }));
      setTimeout(() => setShowLeadModal(true), 1000);
    }

    try {
      const data = await chatService.sendMessage({
        twinId: agent._id,
        messages: [
          ...messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          { role: "user", content: messageContent },
        ],
        userEmail: userProfile?.email || "guest@example.com",
      });
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply || "I'm processing that strategically—let's refine your query for deeper insights.",
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
          content: "Apologies—my network glitched. As an experienced advisor, let's pivot: What's your core business challenge?",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Handle template button clicks
  const handleTemplateClick = (template: string) => {
    handleSend(template);
  };

  // Submit lead form
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadData.name || !leadData.email || !leadData.company) return;

    try {
      await leadService.create({ 
        ...leadData, 
        twinId: agent?._id! 
      });

      setShowLeadModal(false);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 3).toString(),
          role: "assistant",
          content: `Thanks for sharing, ${leadData.name}! I've noted your interest in "${leadData.interest}". My human counterpart will reach out soon via ${leadData.email} to discuss opportunities at ${leadData.company}. What's next on your mind?`,
          timestamp: new Date(),
        },
      ]);
      setLeadData({ name: "", email: userProfile?.email || "", phone: "", company: "", interest: "" });

      toast({
        title: "Success!",
        description: "Your interest has been recorded. We'll contact you soon.",
      });
    } catch (err) {
      console.error("Lead submission error:", err);
      toast({
        title: "Submission failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return "??";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase();
  };

  const getAgentProfilePicture = () => {
    if (!userProfile) return null;
    return userProfile.profilePicture
      ? `${IMAGE_BASE_URL}${userProfile.profilePicture}`
      : userProfile.avatar
      ? `${IMAGE_BASE_URL}${userProfile.avatar}`
      : null;
  };

  const getUserProfilePicture = () => {
    return userProfile?.profilePicture || userProfile?.avatar;
  };

  // Loading or Error States
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#0A1929] via-[#0D2137] to-[#0A1929]">
        <p className="text-lg font-semibold mb-4 text-red-400">⚠️ {error}</p>
        <Link to="/dashboard">
          <Button variant="outline" className="border-cyan-500/30 text-white hover:bg-white/5">Go Back</Button>
        </Link>
      </div>
    );
  }
  if (!agent) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#0A1929] via-[#0D2137] to-[#0A1929]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin"></div>
          <div className="text-lg text-slate-300 font-medium">Loading digital twin...</div>
        </div>
      </div>
    );
  }

  // Quick Templates
  const templates = [
    { label: "Tell me about your expertise", icon: <Star className="w-4 h-4" />, onClick: () => handleTemplateClick("Tell me about your expertise and background.") },
    { label: "Business opportunities", icon: <Building className="w-4 h-4" />, onClick: () => handleTemplateClick("What business opportunities do you see for collaboration?") },
    { label: "Contact for partnership", icon: <Mail className="w-4 h-4" />, onClick: () => { setLeadData((prev) => ({ ...prev, interest: "Partnership inquiry" })); setShowLeadModal(true); } },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1929] via-[#0D2137] to-[#0A1929] flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-b border-cyan-500/10 backdrop-blur-[24px] bg-[#0A1929]/80 sticky top-0 z-40"
      >
        <div className="container mx-auto px-4 py-4 lg:px-8 lg:py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="icon" className="rounded-full text-slate-300 hover:text-cyan-400 hover:bg-white/5" aria-label="Go back">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>

              {/* Agent Profile Picture */}
              {getAgentProfilePicture() ? (
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={getAgentProfilePicture()!}
                  alt={agent.identity.name}
                  className="w-12 h-12 rounded-2xl object-cover shadow-lg border border-cyan-500/30"
                />
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-400 flex items-center justify-center shadow-lg shadow-cyan-500/30"
                >
                  <Bot className="w-6 h-6 text-white" />
                </motion.div>
              )}

              <div>
                <h1 className="text-lg font-bold text-white tracking-tight">{agent.identity.name}</h1>
                <p className="text-sm text-cyan-300 font-medium">{agent.identity.role} • Digital Twin Advisor</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <span className="text-sm text-slate-300 font-medium">Live Insights</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Chat Area */}
      <ScrollArea className="flex-1">
        <div className="container mx-auto px-4 py-6 lg:px-8 lg:py-8">
          <div className="max-w-3xl mx-auto space-y-6">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`flex items-start gap-4 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  {/* Message Avatar */}
                  <div className="flex-shrink-0">
                    {message.role === "assistant" ? (
                      getAgentProfilePicture() ? (
                        <img
                          src={getAgentProfilePicture()!}
                          alt={agent.identity.name}
                          className="w-12 h-12 rounded-2xl object-cover shadow-lg border border-cyan-500/30"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-400 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                          <Bot className="w-6 h-6 text-white" />
                        </div>
                      )
                    ) : (
                      getUserProfilePicture() ? (
                        <img
                          src={getUserProfilePicture()}
                          alt={userProfile?.name || "User"}
                          className="w-12 h-12 rounded-2xl object-cover shadow-lg border border-slate-400/20"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-500 flex items-center justify-center shadow-lg shadow-slate-500/20">
                          <User className="w-6 h-6 text-white" />
                        </div>
                      )
                    )}
                  </div>

                  {/* Message Content */}
                  <Card
                    className={`p-6 max-w-[80%] rounded-2xl border-0 shadow-sm ${
                      message.role === "assistant" ? "bg-white/10 backdrop-blur-sm shadow-cyan-500/10 border border-cyan-500/10" : "bg-cyan-500/20 shadow-cyan-500/5 border border-cyan-500/20"
                    }`}
                  >
                    <p className="text-white leading-relaxed text-base whitespace-pre-wrap font-medium">{message.content}</p>
                    <p className="text-xs text-slate-400 mt-3 flex items-center gap-1">
                      <span>{message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                      {message.role === "user" && <User className="w-3 h-3" />}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
            {loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 text-slate-300 ml-16">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                <span className="text-sm italic">Strategizing response...</span>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </ScrollArea>

      

      {/* Input Area */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="border-t border-cyan-500/10 backdrop-blur-[24px] bg-[#0A1929]/80 sticky bottom-0 shadow-xl"
      >
        <div className="container mx-auto px-4 py-4 lg:px-8 lg:py-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-cyan-500/20 focus-within:border-cyan-500/40 transition-all duration-300 shadow-md">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={`Chat with ${agent.identity.name}... (e.g., "How can we partner?")`}
                className="flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-12 text-base px-4 text-white placeholder:text-slate-500"
                disabled={loading}
                aria-label="Type your message"
              />
              <Button
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                variant="default"
                className="h-12 w-12 p-0 rounded-xl shadow-md hover:shadow-lg bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-600 hover:to-teal-500 border-0"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-slate-400 text-center mt-2">
              Enter to send • Shift + Enter for new line • Guided by business templates above
            </p>
          </div>
        </div>
      </motion.div>

      {/* Quick Templates */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-t border-cyan-500/10 backdrop-blur-sm bg-[#0A1929]/50 py-4   bottom-20 z-30"
      >
        <div className="container mx-auto px-4">
          <div className="flex gap-4 justify-center max-w-md mx-auto">
            {templates.map((template, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                onClick={template.onClick}
                className="flex items-center gap-1 rounded-full text-xs border-cyan-500/30 text-black hover:bg-white/5 hover:text-cyan-400 hover:border-cyan-500/50"
                aria-label={template.label}
              >
                {template.icon}
                <span>{template.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Lead Capture Modal */}
      <Dialog open={showLeadModal} onOpenChange={setShowLeadModal}>
        <DialogContent className="sm:max-w-md rounded-2xl bg-[#132F4C] border border-cyan-500/20">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white">
              <Building className="w-5 h-5 text-cyan-400" />
              Let's Connect for Business
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleLeadSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-slate-300">Full Name *</Label>
              <Input
                id="name"
                value={leadData.name}
                onChange={(e) => setLeadData((prev) => ({ ...prev, name: e.target.value }))}
                required
                className="bg-white/5 border-cyan-500/30 text-white placeholder:text-slate-500 focus:ring-cyan-500/50 focus:border-cyan-500/50"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-slate-300">Email *</Label>
              <Input
                id="email"
                type="email"
                value={leadData.email}
                onChange={(e) => setLeadData((prev) => ({ ...prev, email: e.target.value }))}
                required
                className="bg-white/5 border-cyan-500/30 text-white placeholder:text-slate-500 focus:ring-cyan-500/50 focus:border-cyan-500/50"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-slate-300">Phone</Label>
              <Input
                id="phone"
                value={leadData.phone}
                onChange={(e) => setLeadData((prev) => ({ ...prev, phone: e.target.value }))}
                className="bg-white/5 border-cyan-500/30 text-white placeholder:text-slate-500 focus:ring-cyan-500/50 focus:border-cyan-500/50"
              />
            </div>
            <div>
              <Label htmlFor="company" className="text-slate-300">Company *</Label>
              <Input
                id="company"
                value={leadData.company}
                onChange={(e) => setLeadData((prev) => ({ ...prev, company: e.target.value }))}
                required
                className="bg-white/5 border-cyan-500/30 text-white placeholder:text-slate-500 focus:ring-cyan-500/50 focus:border-cyan-500/50"
              />
            </div>
            <div>
              <Label htmlFor="interest" className="text-slate-300">Area of Interest</Label>
              <Textarea
                id="interest"
                value={leadData.interest}
                onChange={(e) => setLeadData((prev) => ({ ...prev, interest: e.target.value }))}
                placeholder="What specifically are you interested in?"
                rows={3}
                className="bg-white/5 border-cyan-500/30 text-white placeholder:text-slate-500 focus:ring-cyan-500/50 focus:border-cyan-500/50 resize-none"
              />
            </div>
            <Button type="submit" className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-600 hover:to-teal-500 border-0">
              Submit & Continue Chat
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Chatbot;