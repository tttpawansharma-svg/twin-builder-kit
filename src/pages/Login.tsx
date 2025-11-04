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
    <div className="min-h-screen bg-[hsl(var(--background))] relative overflow-hidden flex items-center justify-center p-6">
      {/* Premium animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 40, 0],
            y: [0, -25, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1.15, 1, 1.15],
            x: [0, -40, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Card className="relative z-10 w-full max-w-md p-10 rounded-[3rem] bg-card/95 backdrop-blur-sm border border-border/50 shadow-xl">
          <motion.div 
            className="flex flex-col items-center mb-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              whileHover={{ rotate: 360, scale: 1.05 }}
              transition={{ duration: 0.6 }}
              className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 shadow-lg shadow-primary/20"
            >
              <Bot className="w-10 h-10 text-primary-foreground" />
            </motion.div>
            <h1 className="text-4xl font-bold mb-2 tracking-tight">Welcome Back</h1>
            <p className="text-muted-foreground text-[15px]">Sign in to your Proptr account</p>
          </motion.div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button type="button" className="focus:outline-none">
                        <Info className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="rounded-xl">
                      <p className="text-xs">Enter your registered email address</p>
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
                className="h-12 rounded-2xl"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button type="button" className="focus:outline-none">
                        <Info className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="rounded-xl">
                      <p className="text-xs">Your secure password</p>
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
                className="h-12 rounded-2xl"
                required
              />
            </div>

            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button
                type="submit"
                disabled={isLoading}
                variant="premium"
                className="w-full h-12 rounded-2xl text-base font-medium"
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
            </motion.div>

            <div className="text-center space-y-3 pt-4">
              <p className="text-muted-foreground text-sm">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:text-accent transition-colors font-medium">
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
