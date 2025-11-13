import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import videoSource from "@/Images/Meet Orion_ Your Digital Twin.mp4";

const VideoDemo = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Detect when video container is visible
  const isInView = useInView(containerRef, {
    once: false,
    amount: 0.4, // 40% visible triggers
  });

  let timerRef = useRef(null);

  // AUTOPLAY WHEN SCROLL REACHES COMPONENT
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      video.currentTime = 0;
      video.play();

      // STOP AT 10s
      timerRef.current = setInterval(() => {
        if (video.currentTime >= 10) {
          video.pause();
          clearInterval(timerRef.current);
        }
      }, 200);
    } else {
      video.pause();
      clearInterval(timerRef.current);
    }
  }, [isInView]);

  // FULL VIDEO BUTTON
  const handleFullVideoPlay = () => {
    const video = videoRef.current;
    clearInterval(timerRef.current);
    video.currentTime = 0;
    video.play();
  };

  return (
    <section className="relative py-24 overflow-hidden bg-[#0a1628]">
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60" />

      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        
        {/* Cyan Glow */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px]"
        />

        {/* Blue Glow */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]"
        />

        {/* Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:80px_80px]"
        />

        {/* Floating particles */}
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [0, 0.4, 0],
              y: [-80, -700],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 6,
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

      {/* MAIN CONTENT */}
      <div
        ref={containerRef}
        className="relative z-20 max-w-7xl mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
      >

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-white"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Watch Our <span className="text-cyan-400">Digital Twin Demo</span>
          </h2>

          <p className="text-slate-300 text-lg mb-8 max-w-lg">
            See how your AI-powered Digital Twin interacts in real-time.
          </p>

          <button
            onClick={handleFullVideoPlay}
            className="px-8 py-4 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white text-lg font-medium shadow-lg shadow-cyan-500/30 transition-all"
          >
            Watch Full Video
          </button>
        </motion.div>

        {/* VIDEO WITH SCROLL ANIMATION */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={
            isInView
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 60, scale: 0.95 }
          }
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/20 border border-cyan-500/20"
        >
          <video
            ref={videoRef}
            src={videoSource}
            className="w-full h-96 rounded-3xl"
          ></video>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoDemo;
