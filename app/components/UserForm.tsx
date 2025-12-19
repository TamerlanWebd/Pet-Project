"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserPlus,
  Mail,
  User as UserIcon,
  Trash2,
  CheckCircle,
  Star,
} from "lucide-react";

type User = {
  id: number;
  name: string;
  email: string;
};

export function UserForm({
  onUsersChange,
}: {
  onUsersChange: (users: User[]) => void;
}) {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const response = await fetch("/api/users");
    const fetchedUsers = await response.json();
    setUsers(fetchedUsers);
    onUsersChange(fetchedUsers);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setIsSubmitting(true);
    try {
      await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      setName("");
      setEmail("");
      fetchUsers();
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id: number) {
    await fetch("/api/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchUsers();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-[2rem] p-8 mb-12"
      >
        <h2 className="text-4xl font-black text-center mb-10 text-white flex items-center justify-center gap-4">
          <Star className="text-amber-400 fill-amber-400" /> THE NICE LIST
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="relative">
            <UserIcon
              className="absolute left-5 top-5 text-amber-400"
              size={24}
            />
            <input
              className="w-full xmas-input p-5 pl-14 rounded-2xl text-white text-lg"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-5 top-5 text-amber-400" size={24} />
            <input
              className="w-full xmas-input p-5 pl-14 rounded-2xl text-white text-lg"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            className="md:col-span-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-900/40"
          >
            <UserPlus size={24} /> ADD TO LIST
          </motion.button>
        </form>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {users.map((user) => (
            <motion.div
              key={user.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="glass-card p-6 rounded-3xl flex justify-between items-center border-white/10 hover:border-amber-400/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="bg-amber-400/20 p-3 rounded-2xl text-amber-400">
                  <CheckCircle size={28} />
                </div>
                <div>
                  <div className="font-black text-xl text-white">
                    {user.name}
                  </div>
                  <div className="text-gray-400 font-medium">{user.email}</div>
                </div>
              </div>
              <button
                onClick={() => handleDelete(user.id)}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-3 rounded-xl transition-all"
              >
                <Trash2 size={22} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
