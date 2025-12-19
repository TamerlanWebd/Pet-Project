"use client";

import { motion } from "framer-motion";
import { Snowflake } from "lucide-react";

export function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050b18]/90 backdrop-blur-xl">
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
          filter: [
            "drop-shadow(0 0 0px #fff)",
            "drop-shadow(0 0 25px #60a5fa)",
            "drop-shadow(0 0 0px #fff)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        <Snowflake size={100} className="text-blue-200" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-8 text-2xl font-black tracking-[0.3em] text-amber-400 uppercase"
      >
        Magic is loading...
      </motion.p>
    </div>
  );
}
