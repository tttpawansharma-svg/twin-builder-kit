import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles } from "lucide-react";

const StatsSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const statsRef = useRef(null);
  
  const isSectionInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-50px" });
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px", amount: 0.3 });

  const stats = [
    { value: "10+", label: "Active Digital Twins" },
    { value: "1K+", label: "Conversations" },
    { value: "99.9%", label: "Uptime" },
    { value: "4.9/5", label: "User Rating" }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="relative py-12 sm:py-16 md:py-20 overflow-hidden bg-[#0a1628]"
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
          className="absolute top-10 sm:top-20 -left-20 sm:-left-40 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px] bg-cyan-500/8 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px]"
        />
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={isSectionInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-10 sm:bottom-20 -right-20 sm:-right-40 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px] bg-blue-600/8 rounded-full blur-[90px] sm:blur-[110px] md:blur-[130px]"
        />
        
        {/* Grid Pattern */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isSectionInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:60px_60px] md:bg-[size:80px_80px]"
        />
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 0 }}
            animate={isSectionInView ? { 
              opacity: [0, 0.4, 0],
              y: [-100, -800],
            } : {}}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
            className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: '100%',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isHeaderInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 border border-cyan-500/20 mb-4 sm:mb-6 md:mb-8 backdrop-blur-sm"
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
            <span className="text-xs sm:text-sm font-medium text-cyan-400 tracking-wide">TRUSTED WORLDWIDE</span>
          </motion.div>

          {/* Title */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] sm:leading-[1.1] tracking-tight px-4"
          >
            Trusted by{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              Professionals
            </span>
          </motion.h2>
        </motion.div>

        {/* Stats Grid */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12 max-w-7xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={isStatsInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 30 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.05, 
                ease: [0.34, 1.56, 0.64, 1]
              }}
              className="relative group text-center"
            >
              {/* Glow Effect */}
              <motion.div
                animate={isStatsInView ? { 
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2]
                } : {}}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.3
                }}
                className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl group-hover:blur-2xl sm:group-hover:blur-3xl transition-all duration-500"
              />

              {/* Content Container */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="relative p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-cyan-500/20 group-hover:border-cyan-400/40 transition-all duration-300"
              >
                {/* Value */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isStatsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.05 + 0.1,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4"
                >
                  {stat.value}
                </motion.div>

                {/* Label */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={isStatsInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 + 0.2 }}
                  className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-slate-400 font-light group-hover:text-slate-300 transition-colors duration-300 leading-tight sm:leading-normal"
                >
                  {stat.label}
                </motion.div>

                {/* Bottom Accent Line */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={isStatsInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 + 0.3, ease: "easeOut" }}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 sm:w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;