import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Bot, Info, Loader2, Scan, CreditCard, Sparkles, Users, MessageCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { GoogleOAuth } from "@/components/GoogleOAuth";
import logoImg from "@/Images/ChatGPT_Image_Nov_13__2025__08_06_06_PM-removebg-preview.png"


const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signup } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signup(name, email, password);
      navigate("/wizard");
    } catch (error) {
      // Error handling is done in the auth context
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: Scan,
      title: "Smart Scanner",
      description: "Scan business cards instantly"
    },
    {
      icon: CreditCard,
      title: "NFC Integration",
      description: "Tap to share your digital profile"
    },
    {
      icon: MessageCircle,
      title: "AI Networking",
      description: "Your twin talks for you"
    },
    {
      icon: Users,
      title: "Smart Connections",
      description: "Build meaningful relationships"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden flex items-center justify-center p-6 pt-24">
      {/* Premium animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-[700px] h-[700px] bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
            x: [0, -60, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/25 to-pink-500/25 rounded-full blur-[100px]"
        />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-7xl w-full items-center">
        {/* Left side - Features */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block"
        >
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-white">The Future of Networking</span>
              </motion.div>
              
              <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent mb-6">
                Your Digital Twin Awaits
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Revolutionize how you network with AI-powered digital twins, 
                smart scanning, and NFC technology. Let your digital presence 
                work for you 24/7.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-3">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-8 pt-8"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-sm text-gray-400">Active Twins</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">1M+</div>
                <div className="text-sm text-gray-400">Connections Made</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">99%</div>
                <div className="text-sm text-gray-400">Satisfaction</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right side - Signup Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center"
        >
          <Card className="relative z-10 w-full max-w-md p-10 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-xl -z-10" />
            
            <motion.div 
              className="flex flex-col items-center mb-10"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="w-24 h-24 rounded-3xl  flex items-center justify-center mb-6 shadow-2xl shadow-cyan-500/25"
              >
                <img src={logoImg} alt="logo" />
              </motion.div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                Join Digital Twin
              </h1>
              <p className="text-gray-400 text-[15px] text-center">
                Create your digital twin and transform your networking experience
              </p>
            </motion.div>

            <form onSubmit={handleSignup} className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-200">Full Name</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button type="button" className="focus:outline-none">
                          <Info className="w-3.5 h-3.5 text-gray-500" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="rounded-xl bg-slate-800 border-slate-700">
                        <p className="text-xs text-white">Your professional name</p>
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
                  className="h-12 rounded-2xl bg-slate-800/50 border-slate-600 text-white placeholder:text-gray-500 focus:border-cyan-500 transition-colors"
                  required
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-200">Email</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button type="button" className="focus:outline-none">
                          <Info className="w-3.5 h-3.5 text-gray-500" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="rounded-xl bg-slate-800 border-slate-700">
                        <p className="text-xs text-white">We'll send confirmation to this email</p>
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
                  className="h-12 rounded-2xl bg-slate-800/50 border-slate-600 text-white placeholder:text-gray-500 focus:border-cyan-500 transition-colors"
                  required
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-200">Password</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button type="button" className="focus:outline-none">
                          <Info className="w-3.5 h-3.5 text-gray-500" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="rounded-xl bg-slate-800 border-slate-700">
                        <p className="text-xs text-white">At least 8 characters</p>
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
                  className="h-12 rounded-2xl bg-slate-800/50 border-slate-600 text-white placeholder:text-gray-500 focus:border-cyan-500 transition-colors"
                  required
                  minLength={8}
                />
              </div>

              <motion.div 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                className="pt-4"
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 rounded-2xl text-base font-medium bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white border-none shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating Your Twin...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Create Digital Twin
                    </>
                  )}
                </Button>
              </motion.div>

              {/* <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-slate-900 text-gray-400">Or continue with</span>
                </div>
              </div> */}

              {/* <GoogleOAuth type="signup" /> */}

              <div className="text-center space-y-4 pt-6">
                <p className="text-gray-400 text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
                    Sign in to your twin
                  </Link>
                </p>
                <Link to="/" className="text-sm text-gray-500 hover:text-gray-300 transition-colors block">
                  ← Back to home
                </Link>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;