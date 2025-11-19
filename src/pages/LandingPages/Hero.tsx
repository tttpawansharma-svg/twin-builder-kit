import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import personImg from "../../Images/ChatGPT Image Nov 11, 2025, 04_13_07 PM.png";

const HeroSection = () => {
  return (
    <section className="relative mt-6 sm:mt-8 md:mt-10 min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-1/4 sm:top-1/3 right-1/4 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] bg-cyan-500/10 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] lg:blur-[140px]"
        />
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-1/4 sm:bottom-1/3 left-1/4 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] bg-blue-500/10 rounded-full blur-[70px] sm:blur-[90px] md:blur-[110px] lg:blur-[120px]"
        />
        
        {/* Grid Pattern */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:60px_60px] md:bg-[size:80px_80px]"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-20">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 leading-[1.1] sm:leading-[1.08] md:leading-[1.05] tracking-tight text-white"
            >
              Your AI-Powered
              <br />
              <span className="text-cyan-400">
                Digital Twin
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg md:text-xl text-slate-300 mb-6 sm:mb-8 md:mb-10 leading-relaxed max-w-xl"
            >
              Create an intelligent person that represents you professionally. 
              Connect with clients through AI-powered conversations, available 24/7.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 sm:gap-4"
            >
              <a href="/signup" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto rounded-full text-sm sm:text-base px-6 sm:px-8 md:px-10 h-12 sm:h-13 md:h-14 font-medium bg-cyan-500 hover:bg-cyan-400 text-white shadow-lg shadow-cyan-500/30"
                >
                  Create Your Twin
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </a>
              <Button 
                onClick={() => {
                  document.getElementById("demoVideo")?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
                size="lg"
                variant="outline"
                className="w-full sm:w-auto rounded-full text-sm sm:text-base px-6 sm:px-8 md:px-10 h-12 sm:h-13 md:h-14 font-medium border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Portrait */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center lg:justify-end mt-8 lg:mt-0"
          >
            {/* Circular Tech Rings */}
            <div className="relative">
              {/* Outer Ring */}
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.3, rotate: 360 }}
                transition={{ 
                  scale: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 },
                  opacity: { duration: 0.8, delay: 0.5 },
                  rotate: { duration: 20, repeat: Infinity, ease: "linear", delay: 1.5 }
                }}
                className="absolute inset-0 -m-6 sm:-m-8 md:-m-10 lg:-m-12"
              >
                <svg className="w-full h-full" viewBox="0 0 500 500">
                  <circle cx="250" cy="250" r="230" fill="none" stroke="url(#gradient1)" strokeWidth="1" strokeDasharray="5 5" /> 
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>

              {/* Middle Ring */}
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.4, rotate: -360 }}
                transition={{ 
                  scale: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.6 },
                  opacity: { duration: 0.8, delay: 0.6 },
                  rotate: { duration: 15, repeat: Infinity, ease: "linear", delay: 1.6 }
                }}
                className="absolute inset-0 -m-4 sm:-m-6 md:-m-7 lg:-m-8"
              >
                <svg className="w-full h-full" viewBox="0 0 500 500">
                  <circle cx="250" cy="250" r="210" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="10 15" />
                </svg>
              </motion.div>

              {/* Inner Ring */}
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.5, rotate: 360 }}
                transition={{ 
                  scale: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.7 },
                  opacity: { duration: 0.8, delay: 0.7 },
                  rotate: { duration: 10, repeat: Infinity, ease: "linear", delay: 1.7 }
                }}
                className="absolute inset-0 -m-2 sm:-m-3 md:-m-4"
              >
                <svg className="w-full h-full" viewBox="0 0 500 500">
                  <circle cx="250" cy="250" r="190" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="3 7" />
                </svg>
              </motion.div>

              {/* Portrait Container */}
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 1.2, 
                  delay: 0.8,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px] rounded-full overflow-hidden bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500/30 shadow-2xl shadow-cyan-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10" />
                
                {/* Placeholder Image - Replace with your image */}
                <motion.img 
                  initial={{ scale: 1.3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    duration: 1.5, 
                    delay: 1,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  src={personImg}
                  alt="AI Digital Twin"
                  className="w-full  object-cover"
                />
                
                {/* Glowing Effect */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.2 }}
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 mix-blend-overlay"
                />
              </motion.div>

              {/* Floating Particles */}
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1,
                  opacity: [0.3, 0.6, 0.3],
                  y: [0, -20, 0]
                }}
                transition={{ 
                  scale: { duration: 0.5, delay: 1.5 },
                  opacity: { duration: 3, repeat: Infinity, delay: 1.5 },
                  y: { duration: 3, repeat: Infinity, delay: 1.5 }
                }}
                className="absolute top-6 sm:top-8 md:top-10 right-6 sm:right-8 md:right-10 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"
              />
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1,
                  opacity: [0.3, 0.6, 0.3],
                  y: [0, -15, 0]
                }}
                transition={{ 
                  scale: { duration: 0.5, delay: 1.7 },
                  opacity: { duration: 2.5, repeat: Infinity, delay: 2 },
                  y: { duration: 2.5, repeat: Infinity, delay: 2 }
                }}
                className="absolute bottom-12 sm:bottom-16 md:bottom-20 left-6 sm:left-8 md:left-10 w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"
              />
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1,
                  opacity: [0.3, 0.6, 0.3],
                  y: [0, -25, 0]
                }}
                transition={{ 
                  scale: { duration: 0.5, delay: 1.9 },
                  opacity: { duration: 3.5, repeat: Infinity, delay: 2.4 },
                  y: { duration: 3.5, repeat: Infinity, delay: 2.4 }
                }}
                className="absolute top-1/3 left-3 sm:left-4 md:left-5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-300 rounded-full shadow-lg shadow-cyan-300/50"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;