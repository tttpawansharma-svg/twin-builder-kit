import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bot, Plus, Download, ExternalLink, LogOut, Sparkles, Zap, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import QRCode from "react-qr-code";
import { motion, AnimatePresence } from "framer-motion";

interface DigitalTwin {
  id: string;
  name: string;
  role: string;
  createdAt: string;
  qrUrl: string;
}

const Dashboard = () => {
  const [twins, setTwins] = useState<DigitalTwin[]>([
    {
      id: "1",
      name: "Alex Johnson",
      role: "Founder & CEO",
      createdAt: "2025-01-15",
      qrUrl: `${window.location.origin}/chatbot/1`,
    },
  ]);

  const downloadQR = (id: string) => {
    const svg = document.getElementById(`qr-${id}`);
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `digital-twin-qr-${id}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      img.src = "data:image/svg+xml;base64," + btoa(svgData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
      {/* Apple-style Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-b border-border/30 backdrop-blur-3xl bg-background/60 sticky top-0 z-50 shadow-sm"
      >
        <div className="container mx-auto px-8 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="w-11 h-11 rounded-[1.2rem] bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20"
            >
              <Bot className="w-6 h-6 text-primary-foreground" />
            </motion.div>
            <span className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Proptr
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="text-foreground/70 hover:text-foreground hover:bg-muted/50 rounded-full px-5">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="container mx-auto px-8 pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-16"
        >
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-6xl md:text-7xl font-bold mb-4 tracking-tight leading-none">
                Your Digital
                <br />
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Twins
                </span>
              </h1>
              <p className="text-xl text-muted-foreground/80 max-w-2xl leading-relaxed">
                Manage your AI-powered professional personas with elegance
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-8 mt-8"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-muted-foreground">{twins.length} Active</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">100% Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-sm text-muted-foreground">Instant Response</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/wizard">
              <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-2xl shadow-primary/40 h-14 px-8 rounded-[1.2rem] text-base font-medium hover:scale-105 transition-all duration-300">
                <Plus className="w-5 h-5 mr-2" />
                Create New Twin
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Twins Grid */}
      <div className="container mx-auto px-8 pb-16">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {twins.map((twin, index) => (
              <motion.div
                key={twin.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="relative overflow-hidden p-8 bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-2xl border border-border/40 hover:border-primary/30 rounded-[2rem] shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 group">
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-foreground mb-2 tracking-tight">{twin.name}</h3>
                        <p className="text-sm text-muted-foreground/80">{twin.role}</p>
                      </div>
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className="w-14 h-14 rounded-[1.2rem] bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30"
                      >
                        <Bot className="w-7 h-7 text-primary-foreground" />
                      </motion.div>
                    </div>

                    {/* QR Code */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white p-6 rounded-[1.5rem] mb-8 flex items-center justify-center shadow-inner relative overflow-hidden group/qr"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover/qr:opacity-100 transition-opacity duration-300" />
                      <div id={`qr-${twin.id}`} className="relative z-10">
                        <QRCode
                          value={twin.qrUrl}
                          size={200}
                          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                          viewBox={`0 0 200 200`}
                        />
                      </div>
                    </motion.div>

                    {/* Actions */}
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full border-border/40 hover:border-primary/40 hover:bg-primary/5 rounded-[1rem] h-12 font-medium transition-all duration-300"
                        onClick={() => downloadQR(twin.id)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download QR
                      </Button>
                      <Link to={`/chatbot/${twin.id}`} className="block">
                        <Button className="w-full bg-gradient-to-r from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 text-foreground border border-border/40 hover:border-primary/40 rounded-[1rem] h-12 font-medium transition-all duration-300">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Open Chatbot
                        </Button>
                      </Link>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 pt-6 border-t border-border/30">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground/70">
                          Created {new Date(twin.createdAt).toLocaleDateString()}
                        </p>
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          <span className="text-xs text-muted-foreground/70">Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
