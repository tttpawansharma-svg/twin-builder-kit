import { Bot, Sparkles, Zap, Shield, QrCode, Users } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const FeatureCard = ({ icon: Icon, title, description, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { 
    once: true, 
    margin: "-50px",
    amount: 0.3 // Trigger when 30% of card is visible
  });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="group relative"
    >
      {/* Floating Icon with Glow */}
      <motion.div 
        whileHover={{ y: -5, scale: 1.05 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative mb-6"
      >
        {/* Animated Glow */}
        <motion.div
          animate={isInView ? { 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          } : {}}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.3
          }}
          className="absolute inset-0 bg-gradient-to-br from-cyan-400/40 to-blue-500/40 rounded-2xl blur-xl"
        />
        
        {/* Icon Container */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
          transition={{ 
            duration: 0.2, 
            delay: index * 0.1 + 0.2,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="relative w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-cyan-500/20 group-hover:border-cyan-400/40 transition-all duration-500"
        >
          <Icon className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.2, delay: index * 0.1 + 0.4 }}
        className="space-y-3"
      >
        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-slate-400 text-lg leading-relaxed">
          {description}
        </p>
      </motion.div>

      {/* Subtle Bottom Accent */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.6, ease: "easeOut" }}
        className="absolute -bottom-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent origin-left"
      />
    </motion.div>
  );
};

const FeaturesSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const ctaRef = useRef(null);
  
  const isSectionInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-50px" });
  const isCtaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Bot,
      title: "AI-Powered Intelligence",
      description: "Your digital twin learns your communication style, expertise, and personality to represent you authentically."
    },
    {
      icon: QrCode,
      title: "Instant QR Access",
      description: "Generate unique QR codes for each client. They scan and connect with your AI twin instantly."
    },
    {
      icon: Sparkles,
      title: "24/7 Availability",
      description: "Never miss an opportunity. Your digital twin is always available to engage with potential clients."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Enterprise-grade security ensures your data and conversations remain private and protected."
    },
    {
      icon: Zap,
      title: "Instant Responses",
      description: "Provide immediate, intelligent responses to inquiries without any delay or waiting time."
    },
    {
      icon: Users,
      title: "Multi-Client Management",
      description: "Manage multiple digital twins and client relationships from a single elegant dashboard."
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden bg-[#0a1628]">
      {/* Vignette Effect - Dark Corners */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large Glowing Orbs */}
       <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px]"
        />
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]"
        />
        
        {/* Grid Pattern */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isSectionInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:80px_80px]"
        />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
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
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: '100%',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          ref={headerRef}
          initial={{ opacity: 0, y: 60 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-24"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isHeaderInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 border border-cyan-500/20 mb-8 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-400 tracking-wide">FEATURES</span>
          </motion.div>
          
          {/* Title */}
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-[1.1] tracking-tight"
          >
            Powerful Features for
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              Modern Professionals
            </span>
          </motion.h2>
          
          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Everything you need to create and manage your professional digital presence with cutting-edge AI technology
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-20 max-w-7xl mx-auto mb-24">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <motion.p 
            initial={{ opacity: 0 }}
            animate={isCtaInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="text-slate-400 text-lg mb-8 font-light"
          >
            Ready to experience the future of professional networking?
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isCtaInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(6, 182, 212, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-10 py-5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg shadow-2xl shadow-cyan-500/30 overflow-hidden"
          >
            <span className="relative z-10">Get Started Today</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;