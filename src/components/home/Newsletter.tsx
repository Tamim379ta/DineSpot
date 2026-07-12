"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="py-16 bg-[#1C1C1E]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white mb-3">
            Get the Best Dining Deals 🍽️
          </h2>
          <p className="text-gray-400 mb-8">
            Subscribe to our newsletter and never miss exclusive restaurant offers and new openings.
          </p>

          {submitted ? (
            <div className="bg-[#00B37D] text-white font-semibold px-6 py-3 rounded-lg inline-block">
              🎉 Thanks for subscribing!
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-[#1C1C1E] bg-white outline-none text-sm border border-gray-600 focus:border-[#00B37D]"
              />
              <button
                onClick={handleSubmit}
                className="bg-[#00B37D] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#00a070] transition-colors text-sm"
              >
                Subscribe
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}