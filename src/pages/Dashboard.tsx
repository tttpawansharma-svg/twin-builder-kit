import { Bot, Plus, Download, ExternalLink, LogOut, Sparkles, Zap, TrendingUp, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";
import QRCode from "react-qr-code";
import { motion, AnimatePresence } from "framer-motion";
import { useDigitalTwin } from "@/contexts/DigitalTwinContext";
import { useToast } from "@/hooks/use-toast";

interface DigitalTwin {
  _id: string;
  identity: {
    name: string;
    role: string;
    tagline: string;
    bio: string;
  };
  isActive: boolean;
  createdAt: string;
  lastUpdated: string;
}

const Dashboard = () => {
  const { digitalTwin, isLoading, loadDigitalTwin, deleteTwin } = useDigitalTwin();
  const { toast } = useToast();
  const [twins, setTwins] = useState<DigitalTwin[]>([]);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchTwins = async () => {
      try {
        await loadDigitalTwin(); // fetches data from backend and updates context
      } catch (error: any) {
        toast({
          title: "Load failed",
          description: error.message || "Failed to load digital twin",
          variant: "destructive",
        });
      }
    };

    fetchTwins();
  }, [loadDigitalTwin, toast]);

  // Sync context digitalTwin to state
  useEffect(() => {
    if (digitalTwin) {
      setTwins([digitalTwin]); // Wrap single twin in array for list display
    }
  }, [digitalTwin]);

  const downloadQR = useCallback((id: string) => {
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
  }, []);

  const handleDelete = useCallback(async () => {
    try {
      await deleteTwin();
      setTwins([]);
      toast({
        title: "Success",
        description: "Digital twin deleted successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete digital twin.",
        variant: "destructive",
      });
    }
  }, [deleteTwin, toast]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-muted-foreground animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
            <Bot className="w-7 h-7 text-primary" />
            Your Digital Twins
          </h1>
          <Link
            to="/wizard"
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary/90 transition"
          >
            <Plus className="w-5 h-5" />
            Create New
          </Link>
        </div>

        {twins.length === 0 ? (
          <div className="text-center py-20 bg-white/70 rounded-3xl shadow-md">
            <Sparkles className="w-10 h-10 mx-auto mb-4 text-primary" />
            <p className="text-slate-600 text-lg">No Digital Twin found. Create your first one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {twins.map((twin) => (
              <motion.div
                key={twin._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">{twin.identity.name}</h2>
                  <Trash2
                    className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-600"
                    onClick={handleDelete}
                  />
                </div>
                <p className="text-slate-600">{twin.identity.role}</p>
                <p className="mt-2 text-sm text-slate-500">{twin.identity.bio}</p>
                <div className="mt-6 flex flex-col items-center">
                  <QRCode id={`qr-${twin._id}`} value={`https://digitaltwin.techtrekkers.ai/chatbot/${twin._id}`} size={120} />
                  <button
                    onClick={() => downloadQR(twin._id)}
                    className="mt-3 text-primary text-sm hover:underline"
                  >
                    Download QR
                  </button>
                </div>
                <div className="mt-6 text-xs text-slate-400">
                  Last updated: {new Date(twin.lastUpdated).toLocaleString()}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
