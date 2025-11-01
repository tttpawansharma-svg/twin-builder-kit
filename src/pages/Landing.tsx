import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bot, Sparkles, Zap, Shield, QrCode, Users, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import heroImage from "@/assets/hero-3d.jpg";
import dashboardPreview from "@/assets/dashboard-preview.jpg";

const Landing = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50"
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-[2rem] bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
              <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Proptr
            </span>
          </motion.div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="rounded-full">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button className="rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg shadow-primary/30">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-32">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />
          <img 
            src={heroImage} 
            alt="3D AI Interface"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[150px] animate-pulse delay-700" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="inline-block px-6 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 backdrop-blur-sm border border-primary/20">
                ✨ The Future of Digital Identity
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-7xl md:text-8xl font-bold mb-8 leading-tight"
            >
              Your AI-Powered
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Digital Twin
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Create an intelligent persona that represents you professionally. 
              Connect with clients through AI-powered conversations, available 24/7.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Link to="/wizard">
                <Button 
                  size="lg" 
                  className="rounded-full text-lg px-10 py-7 bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-all duration-300 hover:scale-105"
                >
                  Create Your Twin
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline"
                className="rounded-full text-lg px-10 py-7 border-2 backdrop-blur-sm bg-background/50 hover:bg-background/80"
              >
                Watch Demo
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-20 flex items-center justify-center gap-12 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <span>Setup in 5 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <span>Enterprise ready</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Preview Section */}
      <PreviewSection />

      {/* Stats Section */}
      <StatsSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Proptr</span>
            </div>
            <p className="text-muted-foreground">
              © 2024 Proptr. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
    <section ref={ref} className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Powerful Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create and manage your professional digital presence
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, description, index, isInView }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="p-8 rounded-[2.5rem] bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-border/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 group">
        <div className="w-16 h-16 rounded-[2rem] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-2xl font-semibold mb-4">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </Card>
    </motion.div>
  );
};

const PreviewSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 to-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            See It In Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the seamless interface designed for modern professionals
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/10 border-border/50">
              <img src={dashboardPreview} alt="Dashboard Preview" className="w-full" />
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-4xl font-bold">Intuitive Dashboard</h3>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Manage all your digital twins from one beautiful interface. Track conversations, 
              generate QR codes, and monitor engagement with ease.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span className="text-muted-foreground">Real-time analytics and insights</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span className="text-muted-foreground">One-click QR code generation</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span className="text-muted-foreground">Seamless client management</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    { value: "10K+", label: "Active Digital Twins" },
    { value: "1M+", label: "Conversations" },
    { value: "99.9%", label: "Uptime" },
    { value: "4.9/5", label: "User Rating" }
  ];

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3">
                {stat.value}
              </div>
              <div className="text-lg text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6"
      >
        <Card className="relative rounded-[3rem] overflow-hidden border-border/50 bg-gradient-to-br from-card via-card to-primary/10 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-50" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />
          
          <div className="relative z-10 py-24 px-8 text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Join thousands of professionals using Proptr to scale their presence
            </p>
            <Link to="/signup">
              <Button 
                size="lg" 
                className="rounded-full text-lg px-12 py-7 bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-2xl shadow-primary/40 hover:scale-105 transition-all duration-300"
              >
                Create Your Digital Twin
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>
    </section>
  );
};

export default Landing;
