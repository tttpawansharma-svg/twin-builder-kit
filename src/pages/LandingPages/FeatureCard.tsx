import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  isInView: boolean;
}

const FeatureCard = ({ icon: Icon, title, description, index, isInView }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className="relative p-10 rounded-3xl bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-500 hover:-translate-y-2 group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
            <Icon className="w-7 h-7 text-cyan-400" />
          </div>
          <h3 className="text-xl font-semibold mb-3 tracking-tight text-white">{title}</h3>
          <p className="text-slate-400 leading-relaxed text-[15px]">{description}</p>
        </div>
      </Card>
    </motion.div>
  );
};

export default FeatureCard;