import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Bot, Info, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call - Replace with your actual API endpoint
      const response = await fetch("https://your-api-endpoint.com/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      if (response.ok) {
        toast({
          title: "Account created!",
          description: "Welcome to Proptr. Let's create your digital twin.",
        });
        setTimeout(() => navigate("/wizard"), 1000);
      } else {
        throw new Error("Signup failed");
      }
    } catch (error) {
      // For demo purposes, simulate successful signup
      console.log("Signup attempt:", { name, email, password });
      toast({
        title: "Demo Mode",
        description: "Account created! (Frontend only)",
      });
      setTimeout(() => navigate("/wizard"), 1000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(220,25%,97%)] via-[hsl(210,40%,96%)] to-[hsl(213,94%,98%)] relative overflow-hidden flex items-center justify-center p-6">
      {/* Premium animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-primary/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-accent/20 rounded-full blur-[120px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="relative z-10 w-full max-w-md p-12 rounded-[3rem] bg-white/95 backdrop-blur-[40px] border border-white/50 shadow-elegant">
          <motion.div 
            className="flex flex-col items-center mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
          >
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.7 }}
              className="w-24 h-24 rounded-[2.2rem] bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center mb-6 shadow-elegant"
            >
              <Bot className="w-12 h-12 text-primary-foreground" />
            </motion.div>
            <h1 className="text-5xl font-bold mb-3 tracking-tight">Create Account</h1>
            <p className="text-muted-foreground text-base">Start building your digital twin</p>
          </motion.div>

          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="name" className="text-base">Full Name</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="rounded-2xl">
                      <p>Your professional name</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="name"
                type="text"
                placeholder="Alex Johnson"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-16 rounded-[1.5rem] bg-white/80 border-white/40 focus:border-primary text-base shadow-soft hover:shadow-soft transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="email" className="text-base">Email</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="rounded-2xl">
                      <p>We'll send confirmation to this email</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-16 rounded-[1.5rem] bg-white/80 border-white/40 focus:border-primary text-base shadow-soft hover:shadow-soft transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="password" className="text-base">Password</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="rounded-2xl">
                      <p>At least 8 characters</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-16 rounded-[1.5rem] bg-white/80 border-white/40 focus:border-primary text-base shadow-soft hover:shadow-soft transition-all"
                required
                minLength={8}
              />
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-16 rounded-[1.5rem] text-lg font-semibold bg-gradient-to-r from-primary via-accent to-primary hover:opacity-90 shadow-elegant transition-all duration-500"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </motion.div>

            <div className="text-center space-y-4 pt-4">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:text-accent transition-colors font-semibold">
                  Sign in
                </Link>
              </p>
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors block">
                ← Back to home
              </Link>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default Signup;
