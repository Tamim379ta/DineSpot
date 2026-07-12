"use client";

import { motion } from "framer-motion";

const cuisines = [
  { label: "Italian", icon: "🍕" },
  { label: "Chinese", icon: "🥢" },
  { label: "Indian", icon: "🍛" },
  { label: "Japanese", icon: "🍱" },
  { label: "Mexican", icon: "🌮" },
  { label: "American", icon: "🍔" },
  { label: "Thai", icon: "🍜" },
  { label: "Mediterranean", icon: "🥗" },
];

export default function CuisineSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#1C1C1E]">Browse by Cuisine</h2>
          <p className="text-gray-500 mt-2">Find restaurants that match your cravings</p>
        </div>

        {/* Cuisine Grid */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {cuisines.map((cuisine, index) => (
            <motion.div
              key={cuisine.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-[#00B37D] hover:shadow-md cursor-pointer transition-all"
            >
              <span className="text-4xl">{cuisine.icon}</span>
              <span className="text-sm font-medium text-[#1C1C1E]">{cuisine.label}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}