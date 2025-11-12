import { ArrowRight, Sparkles } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CTASection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  
  const isSectionInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isContentInView = useInView(contentRef, { once: true, margin: "-100px", amount: 0.3 });

  return (
    <section 
      ref={sectionRef} 
      className="relative py-12 overflow-hidden bg-[#0a1628]"
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
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[150px]"
        />
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={isSectionInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-20 -right-40 w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-[120px]"
        />
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={isSectionInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-20 -left-40 w-[600px] h-[600px] bg-cyan-600/8 rounded-full blur-[120px]"
        />
        
        {/* Grid Pattern */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isSectionInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:80px_80px]"
        />
        
        {/* Floating Particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 0 }}
            animate={isSectionInView ? { 
              opacity: [0, 0.5, 0],
              y: [-100, -800],
            } : {}}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: '100%',
            }}
          />
        ))}

        {/* Animated Rings */}
        <motion.div
          animate={isSectionInView ? { 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            rotate: 360
          } : {}}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-cyan-500/10 rounded-full"
        />
        <motion.div
          animate={isSectionInView ? { 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
            rotate: -360
          } : {}}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-blue-500/10 rounded-full"
        />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isContentInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 border border-cyan-500/20 mb-8 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-400 tracking-wide">GET STARTED TODAY</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-[1.1] tracking-tight"
          >
            Ready to{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              Get Started?
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Join thousands of professionals using Proptr to scale their presence and never miss an opportunity
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isContentInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, delay: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 25px 70px rgba(6, 182, 212, 0.5)" 
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-12 py-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg md:text-xl shadow-2xl shadow-cyan-500/40 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                Create Your Digital Twin
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </span>
              
              {/* Button Hover Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />

              {/* Animated Border */}
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-50 blur-xl" />
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isContentInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.45 }}
            className="mt-8 text-sm md:text-base text-slate-500 font-light"
          >
            No credit card required • Get started in 2 minutes
          </motion.p>

        
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;