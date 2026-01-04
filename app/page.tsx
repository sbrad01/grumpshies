"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, ArrowRight } from "lucide-react";

export default function Home() {
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const pauseTimeoutRef = useRef<number | null>(null);

  // Replace or extend this array with your carousel images
  const images = ["/hero2.png", "/eggy.png", "/slank.png", "/snuggles.png"];

  const pauseAuto = () => {
    setIsPaused(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    // resume auto-advance after 4s of inactivity
    pauseTimeoutRef.current = window.setTimeout(() => {
      setIsPaused(false);
      pauseTimeoutRef.current = null;
    }, 4000);
  };

  const handlePrev = () => {
    setIndex((i) => (i - 1 + images.length) % images.length);
    pauseAuto();
  };

  const handleNext = () => {
    setIndex((i) => (i + 1) % images.length);
    pauseAuto();
  };

  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 3000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPaused, images.length]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const container = anchorRef.current;
    if (!container || typeof window === "undefined") return;

    // prevent duplicate injection across mounts / StrictMode
    if ((window as any).__anchorInjected) return;

    // also guard against a script already in the container
    const already = container.querySelector(
      'script[data-uid="983783dc90"], script[src="https://anchor-daily.kit.com/983783dc90/index.js"]'
    );
    if (already) {
      (window as any).__anchorInjected = true;
      return;
    }

    const s = document.createElement("script");
    s.src = "https://anchor-daily.kit.com/983783dc90/index.js";
    s.async = true;
    s.setAttribute("data-uid", "983783dc90");
    s.id = "anchor-script-983783dc90";
    container.appendChild(s);

    (window as any).__anchorInjected = true;

    return () => {
      // remove script element we created (the injected widget may also create global DOM nodes)
      const el = container.querySelector("#anchor-script-983783dc90");
      if (el) el.remove();
      // don't clear __anchorInjected — keeps duplicate prevention robust across remounts
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white font-sans">
      {/* Background Gradients for Depth */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-purple-900/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-orange-900/5 blur-[100px]" />
      </div>

      {/* Navigation */}

      {/* Hero Content */}
      <main className="relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-80px)] items-center px-8 lg:px-16 pb-20 bg-[#121111]">
        {/* Left Side: Copy */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter uppercase mb-6">
              SO UGLY, <br />
              <span className="text-transparent border-b-4 border-purple-500 bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
                YOU'LL OBSESS.
              </span>
            </h1>
            <p className="max-w-sm text-lg text-gray-100 leading-relaxed italic my-10">
              Meet the misfits your mother warned you about. Asymmetrical,
              awkwardly soft, and 100% done with your nonsense.
            </p>

            <p className="max-w-sm text-lg text-gray-100 leading-relaxed italic my-10">
              Are you interested in buying a Grumpshy? <br />
              <span className="text-yellow-500">Join the waitlist now!</span>
            </p>
            <div
              ref={anchorRef}
              className="w-full max-w-md overflow-hidden"
              aria-hidden={false}
            />
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-4 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          ></motion.div>
        </div>

        {/* Right Side: Image Placeholder */}
        <div className="lg:col-span-7 relative flex justify-center items-center h-[500px] lg:h-full mt-12 lg:mt-0">
          <div className="relative w-full h-full max-w-[700px] max-h-[700px]">
            <AnimatePresence initial={false} mode="wait">
              <motion.img
                key={index}
                src={images[index]}
                alt={`The Grumpshies Family ${index + 1}`}
                className="w-full h-full object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.8)]"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                onDragStart={(e) => e.preventDefault()}
              />
            </AnimatePresence>

            {/* Prev / Next Buttons */}
            <button
              aria-label="Previous"
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/50 p-2 hover:bg-black/70"
            >
              <ArrowRight className="rotate-180" />
            </button>

            <button
              aria-label="Next"
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/50 p-2 hover:bg-black/70"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
