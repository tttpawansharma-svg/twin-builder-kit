import { Bot } from "lucide-react";
import { motion } from "framer-motion";
import logoImg from "@/Images/ChatGPT_Image_Nov_13__2025__08_06_06_PM-removebg-preview.png"

const AppFooter = () => {
  return (
    <footer className="relative border-t border-slate-700/30 py-12 backdrop-blur-[24px] overflow-hidden" style={{
      background: 'linear-gradient(135deg, rgba(10, 22, 40, 0.85) 0%, rgba(13, 33, 55, 0.85) 50%, rgba(10, 30, 46, 0.85) 100%)'
    }}>
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      
      {/* Subtle Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/8 rounded-full blur-[100px]"
        />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo Section */}
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 group"
          >
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              {/* Glow behind logo */}
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
              
              {/* Logo Container */}
              <div className="relative w-11 h-11 rounded-2xl items-center justify-center shadow-lg shadow-cyan-500/30">
                <img src={logoImg} alt="logo" />
              </div>
            </motion.div>
            
            <span className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Digital Twin
            </span>
          </motion.div>

          {/* Links Section */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-8"
          >
            {['Features', 'How It Works', 'Pricing', 'About', 'Privacy', 'Terms', 'Contact'].map((link, index) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.15 + index * 0.05 }}
                whileHover={{ y: -2 }}
                className="text-slate-300 hover:text-white transition-colors duration-300 text-sm font-medium"
              >
                {link}
              </motion.a>
            ))}
          </motion.div> */}

          {/* Copyright Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col items-center md:items-end gap-2"
          >
            <p className="text-slate-400 text-sm font-light">
              © 2024 Digital Twin. All rights reserved.
            </p>
            <p className="text-slate-500 text-xs">
              Built with 💙 for professionals
            </p>
          </motion.div>
        </div>

      
      </div>
    </footer>
  );
};

export default AppFooter;