import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Plus, QrCode, Download, Eye, Settings, LogOut, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import QRCode from "react-qr-code";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import dashboardPreview from "@/assets/dashboard-preview.jpg";

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
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-xl bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Proptr
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-foreground hover:text-primary">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Your Digital Twins
            </h1>
            <p className="text-muted-foreground">Manage your AI-powered professional personas</p>
          </div>
          <Link to="/wizard">
            <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg shadow-primary/30 h-12">
              <Plus className="w-5 h-5 mr-2" />
              Create New Twin
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {twins.map((twin) => (
            <Card
              key={twin.id}
              className="p-6 bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl border-border/50 hover:shadow-xl hover:shadow-primary/20 transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{twin.name}</h3>
                  <p className="text-sm text-muted-foreground">{twin.role}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Bot className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl mb-6 flex items-center justify-center">
                <div id={`qr-${twin.id}`}>
                  <QRCode
                    value={twin.qrUrl}
                    size={180}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    viewBox={`0 0 180 180`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full border-border/50 hover:bg-card/50"
                  onClick={() => downloadQR(twin.id)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download QR Code
                </Button>
                <Link to={`/chatbot/${twin.id}`} className="block">
                  <Button variant="outline" className="w-full border-border/50 hover:bg-card/50">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Chatbot
                  </Button>
                </Link>
              </div>

              <div className="mt-4 pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground">
                  Created {new Date(twin.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
