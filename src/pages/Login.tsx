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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call - Replace with your actual API endpoint
      const response = await fetch("https://your-api-endpoint.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        });
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      // For demo purposes, simulate successful login
      console.log("Login attempt:", { email, password });
      toast({
        title: "Demo Mode",
        description: "Login successful! (Frontend only)",
      });
      setTimeout(() => navigate("/dashboard"), 1000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden flex items-center justify-center p-6">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="relative z-10 w-full max-w-md p-10 rounded-[2.5rem] bg-card/95 backdrop-blur-2xl border-border/50 shadow-2xl">
          <motion.div 
            className="flex flex-col items-center mb-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 shadow-lg shadow-primary/30">
              <Bot className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your Proptr account</p>
          </motion.div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="email" className="text-base">Email</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="rounded-2xl">
                      <p>Enter your registered email address</p>
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
                className="h-14 rounded-2xl bg-background/50 border-border/50 focus:border-primary text-base"
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
                      <p>Your secure password</p>
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
                className="h-14 rounded-2xl bg-background/50 border-border/50 focus:border-primary text-base"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 rounded-2xl text-lg bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-[1.02]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            <div className="text-center space-y-4 pt-4">
              <p className="text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:text-accent transition-colors font-semibold">
                  Sign up
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

export default Login;
