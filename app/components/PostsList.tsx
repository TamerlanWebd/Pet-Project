"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader } from "./Loader";
import { Send, Trash2, Edit3, Calendar, User, Sparkles } from "lucide-react";

type Post = {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: string;
};

export function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorId, setAuthorId] = useState("1");
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/posts");
      const fetchedPosts = await response.json();
      setPosts(fetchedPosts);
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setIsSubmitting(true);
    try {
      if (editingPostId === null) {
        await fetch("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            content,
            authorId: parseInt(authorId),
          }),
        });
      } else {
        await fetch("/api/posts", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingPostId, title, content }),
        });
      }
      setTitle("");
      setContent("");
      setEditingPostId(null);
      await fetchPosts();
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id: number) {
    await fetch("/api/posts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await fetchPosts();
  }

  if (!mounted || isLoading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card rounded-[2rem] p-8 mb-12 border-white/20"
      >
        <h2 className="text-4xl font-black text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-200 flex items-center justify-center gap-4">
          <Sparkles className="text-amber-400" /> WINTER STORIES
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            className="w-full xmas-input p-5 rounded-2xl text-white text-lg"
            placeholder="Title of your story..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full xmas-input p-5 rounded-2xl text-white min-h-[150px] text-lg"
            placeholder="Write something magical..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-red-900/40"
            >
              <Send size={22} />
              {editingPostId ? "UPDATE STORY" : "PUBLISH MAGIC"}
            </motion.button>
            {editingPostId && (
              <button
                type="button"
                onClick={() => {
                  setEditingPostId(null);
                  setTitle("");
                  setContent("");
                }}
                className="px-8 bg-white/10 hover:bg-white/20 rounded-2xl font-bold transition-colors"
              >
                CANCEL
              </button>
            )}
          </div>
        </form>
      </motion.div>

      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-card p-8 rounded-3xl group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
              <div className="flex justify-between items-start">
                <div className="space-y-4 flex-1">
                  <h3 className="text-3xl font-bold text-amber-300">
                    {post.title}
                  </h3>
                  <p className="text-gray-100 text-lg leading-relaxed">
                    {post.content}
                  </p>
                  <div className="flex gap-6 text-sm font-medium text-gray-400 pt-4 border-t border-white/5">
                    <span className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full">
                      <User size={16} className="text-amber-400" /> Elf #
                      {post.authorId}
                    </span>
                    <span className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full">
                      <Calendar size={16} className="text-amber-400" />{" "}
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3 ml-4">
                  <button
                    onClick={() => {
                      setEditingPostId(post.id);
                      setTitle(post.title);
                      setContent(post.content);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="p-3 bg-emerald-600/80 hover:bg-emerald-500 rounded-xl transition-colors"
                  >
                    <Edit3 size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-3 bg-red-600/80 hover:bg-red-500 rounded-xl transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
