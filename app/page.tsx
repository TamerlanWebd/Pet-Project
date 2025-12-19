"use client";

import { useState, useEffect } from "react";
import { UserForm } from "./components/UserForm";
import { PostsList } from "./components/PostsList";
import Snowfall from "react-snowfall";
import { motion } from "framer-motion";

export default function Page() {
  const [activeTab, setActiveTab] = useState<"users" | "posts">("users");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="relative min-h-screen py-16 px-6 overflow-hidden">
      {mounted && (
        <Snowfall
          color="white"
          snowflakeCount={150}
          radius={[0.5, 2.5]}
          speed={[0.5, 2.0]}
          wind={[-0.5, 2.0]}
          style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            zIndex: 10,
          }}
        />
      )}

      <div className="relative z-20 max-w-6xl mx-auto">
        <div className="flex justify-center mb-16">
          <div className="glass-card p-2 rounded-[2rem] flex gap-2 border-white/20">
            <button
              onClick={() => setActiveTab("users")}
              className={`px-10 py-4 rounded-[1.5rem] font-black text-lg transition-all duration-500 ${
                activeTab === "users"
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-2xl shadow-red-900/50"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              NICE LIST
            </button>
            <button
              onClick={() => setActiveTab("posts")}
              className={`px-10 py-4 rounded-[1.5rem] font-black text-lg transition-all duration-500 ${
                activeTab === "posts"
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-2xl shadow-red-900/50"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              WINTER BLOG
            </button>
          </div>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: activeTab === "users" ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 120 }}
        >
          {activeTab === "users" ? (
            <UserForm onUsersChange={() => {}} />
          ) : (
            <PostsList />
          )}
        </motion.div>
      </div>
    </main>
  );
}
