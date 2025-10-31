import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Bot, QrCode, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse delay-500" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-border/50 backdrop-blur-xl bg-background/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Proptr
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg shadow-primary/30">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 pt-24 pb-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm text-foreground/90">AI-Powered Digital Twin Platform</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Your Professional
            </span>
            <br />
            <span className="text-foreground">Digital Twin</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Create an AI-powered replica of yourself that networks, engages, and represents 
            your professional identity 24/7 through personalized QR-accessible chatbots.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-xl shadow-primary/40 h-14 px-8 text-lg group">
                Create Your Twin
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/wizard">
              <Button size="lg" variant="outline" className="border-border/50 backdrop-blur-sm h-14 px-8 text-lg hover:bg-card/50">
                See How It Works
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="p-8 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border-border/50 hover:shadow-xl hover:shadow-primary/20 transition-all duration-500 group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Bot className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-foreground">AI Digital Twin</h3>
            <p className="text-muted-foreground leading-relaxed">
              Build an intelligent AI persona that captures your professional identity, 
              communication style, and expertise.
            </p>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border-border/50 hover:shadow-xl hover:shadow-accent/20 transition-all duration-500 group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <QrCode className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-foreground">QR Code Access</h3>
            <p className="text-muted-foreground leading-relaxed">
              Generate unique QR codes that instantly connect people to your AI twin 
              for seamless networking.
            </p>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border-border/50 hover:shadow-xl hover:shadow-secondary/20 transition-all duration-500 group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-foreground">Always Available</h3>
            <p className="text-muted-foreground leading-relaxed">
              Your digital twin works around the clock, engaging with prospects and 
              building connections while you focus on what matters.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-6 py-24">
        <Card className="max-w-4xl mx-auto p-12 bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl border-border/50 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Ready to Transform Your Networking?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join professionals who are scaling their presence with AI-powered digital twins.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-xl shadow-primary/40 h-14 px-12 text-lg">
              Get Started Free
            </Button>
          </Link>
        </Card>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 backdrop-blur-xl bg-background/50 py-8">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>© 2025 Proptr. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
