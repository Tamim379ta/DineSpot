"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
     className="relative w-full h-[90vh] flex items-center justify-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold text-white mb-4"
        >
          Discover Your Perfect{" "}
          <span className="text-[#00B37D]">Dining Experience</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-300 mb-8"
        >
          Explore the best restaurants around you and book your table in seconds.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-4"
        >
          <Link
            href="/restaurants"
            className="bg-[#00B37D] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#00a070] transition-colors"
          >
            Find Restaurants
          </Link>
          <Link
            href="/register"
            className="border border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-[#1C1C1E] transition-colors"
          >
            List Your Restaurant
          </Link>
        </motion.div>
      </div>
    </section>
  );
}