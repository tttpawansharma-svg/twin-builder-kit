import { Button } from "@/components/ui/button";
import { Bot, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "#about" }
  ];

  return (
    <>
      {/* Animated Background with Teal Tint */}
      <div className="fixed top-0 left-0 right-0 h-40 pointer-events-none z-40" style={{
        background: 'linear-gradient(180deg, #0a1628 0%, #0d2137 50%, transparent 100%)'
      }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 right-1/4 w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-[90px]"
        />
      </div>

      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Glass Morphism Background with Teal Tint */}
        <div className="absolute inset-0 backdrop-blur-[24px] border-b border-slate-700/30" style={{
          background: 'linear-gradient(135deg, rgba(10, 22, 40, 0.85) 0%, rgba(13, 33, 55, 0.85) 50%, rgba(10, 30, 46, 0.85) 100%)'
        }} />
        
        {/* Gradient Line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

        <div className="container mx-auto px-6 lg:px-8 py-4 relative">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 cursor-pointer"
              >
                <Bot className="w-6 h-6 text-white" />
                <motion.div 
                  animate={{ 
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 rounded-2xl bg-cyan-400/30 blur-md"
                />
              </motion.div>
              <span className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Proptr
              </span>
            </motion.div>
            </a>

            {/* Desktop Navigation */}
            {/* <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="hidden lg:flex items-center gap-1"
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                  whileHover={{ y: -2 }}
                  className="relative px-4 py-2 text-lg font-medium text-slate-300 hover:text-white transition-colors group"
                >
                  {link.name}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </motion.div> */}

            {/* Desktop CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="hidden lg:flex items-center gap-3"
            >
                  <a href="/signup">
              <Button 
                variant="ghost" 
                className="rounded-full font-medium text-slate-300 hover:text-white hover:bg-slate-800/70 transition-all"
              >
                Sign Up
              </Button>
              </a>
              <a href="/login">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="rounded-full font-medium bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all">
                  Login
                </Button>
              </motion.div>
                </a>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-xl bg-slate-800/50 hover:bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[73px] left-0 right-0 z-40 lg:hidden backdrop-blur-[24px] bg-slate-950/95 border-b border-slate-800/50 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-6">
              <div className="flex flex-col gap-2">
                {/* {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all"
                  >
                    {link.name}
                  </motion.a>
                ))} */}
                <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent my-2" />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col gap-2 pt-2"
                >
                  <a href="/signup">
                  <Button 
                    variant="ghost" 
                    className="w-full rounded-xl font-medium text-slate-300 hover:text-white hover:bg-slate-800/70"
                  >
                    Sign Up
                  </Button>
                  </a>
                   <a href="/login">
                  <Button className="w-full rounded-xl font-medium bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/30">
                    Login
                  </Button>
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;