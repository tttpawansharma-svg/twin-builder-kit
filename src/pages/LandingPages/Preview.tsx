import { Check, Sparkles } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import dashboardImg from "@/Images/ChatGPT Image Nov 13, 2025, 02_02_42 PM.png"

const PreviewSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  
  const isSectionInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-50px" });
  const isImageInView = useInView(imageRef, { once: true, margin: "-100px", amount: 0.3 });
  const isContentInView = useInView(contentRef, { once: true, margin: "-100px", amount: 0.3 });

  const features = [
    "Real-time analytics and insights",
    "One-click QR code generation",
    "Seamless client management",
    "Advanced conversation tracking"
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-[#0a1628]"
    >
      {/* Vignette Effect - Dark Corners */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large Glowing Orbs */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={isSectionInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-20 -left-40 w-[650px] h-[650px] bg-cyan-500/8 rounded-full blur-[140px]"
        />
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={isSectionInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-20 -right-40 w-[700px] h-[700px] bg-blue-600/8 rounded-full blur-[150px]"
        />
        
        {/* Grid Pattern */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isSectionInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:80px_80px]"
        />

        {/* Floating Particles */}
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 0 }}
            animate={isSectionInView ? { opacity: [0, 0.4, 0], y: [-100, -800] } : {}}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: "100%",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-24"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isHeaderInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 border border-cyan-500/20 mb-8 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-400 tracking-wide">PREVIEW</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-[1.1] tracking-tight"
          >
            See It In{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              Action
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.3, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Experience the seamless interface designed for modern professionals
          </motion.p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Image Side */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            animate={isImageInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative group"
          >
            {/* Glow Effect */}
            <motion.div
              animate={isImageInView ? { 
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.5, 0.3]
              } : {}}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -inset-8 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-[4rem] blur-3xl"
            />
            
            {/* Image Container */}
            <div className="relative rounded-[2.5rem] overflow-hidden border border-cyan-500/20 group-hover:border-cyan-500/40 transition-all duration-500 shadow-2xl shadow-cyan-500/10">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={dashboardImg} 
                  alt="Dashboard Preview" 
                  className="w-full h-auto"
                />
              </motion.div>
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Decorative Elements */}
            <motion.div
              animate={isImageInView ? { rotate: 360 } : {}}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -top-4 -right-4 w-24 h-24 border border-cyan-500/20 rounded-full"
            />
            <motion.div
              animate={isImageInView ? { rotate: -360 } : {}}
              transition={{ 
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -bottom-6 -left-6 w-32 h-32 border border-blue-500/20 rounded-full"
            />
          </motion.div>

          {/* Text Content Side */}
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, x: 50 }}
            animate={isContentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Intuitive Dashboard
              </h3>
              <p className="text-xl text-slate-400 leading-relaxed font-light">
                Manage all your digital twins from one beautiful interface. Track conversations, 
                generate QR codes, and monitor engagement with ease.
              </p>
            </motion.div>

            {/* Features List */}
            <div className="space-y-5">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isContentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.15 + index * 0.05,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="flex items-start gap-4 group/item"
                >
                  {/* Check Icon */}
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.4 }}
                    className="relative flex-shrink-0 mt-1"
                  >
                    <motion.div
                      animate={isContentInView ? { 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                      } : {}}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2
                      }}
                      className="absolute inset-0 bg-cyan-400/40 rounded-full blur-md"
                    />
                    <div className="relative w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center group-hover/item:border-cyan-400/60 transition-all duration-300">
                      <Check className="w-4 h-4 text-cyan-400 group-hover/item:text-cyan-300 transition-colors" strokeWidth={2.5} />
                    </div>
                  </motion.div>
                  
                  <span className="text-lg text-slate-300 group-hover/item:text-white transition-colors duration-300">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(6, 182, 212, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="group/btn relative mt-8 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg shadow-2xl shadow-cyan-500/30 overflow-hidden"
            >
              <a href="/signup">
               <span className="relative z-10">Explore Dashboard</span>
              </a>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PreviewSection;